import mobile from 'is-mobile'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Text, Flex, Image, Avatar, Tag } from "@chakra-ui/react"
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from 'react';
import { MyPagination } from '@components/MyPagination';
import { formatVip, getAvatar, request, useListPage, useMyState } from '@common/index';
import NoActivity from '@components/NoActivity';
import MoneyImg from "@/assets/images/usdc.svg";
// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import useUtcToLocalTime from '../../../../common/hooks/useUtcToLocalTime'

import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { Locale } from 'antd/es/locale';
import moment from 'moment'

export default ({ toRefresh }: any) => {
    const styles = {
        Online: {
            position: 'relative',
        },
        OnlineDot: {
            width: '8px',
            height: '8px',
            borderRadius: '100%',
            backgroundColor: '#52c41a',
            position: 'absolute',
            bottom: 0,
            right: 0,
        },
    };
    const { snap } = useMyState();
    const [transactionData, setTransactionData] = useState<any>([]);
    const intl = useIntl();
    const formatter = new Intl.DateTimeFormat(intl.locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    const allowedOptions2 = [
        { key: 'Up', label: "↗ " + intl.formatMessage({ id: 'text.up' }) },
        { key: 'Down', label: "↙ " + intl.formatMessage({ id: 'text.down' }) },
        { key: 'Flat', label: "↔ " + intl.formatMessage({ id: 'text.flat' }) },
    ];

    const directionEnum: any = {
        Up: '↗ ' + intl.formatMessage({ id: 'text.up' }),
        Random: '? ' + intl.formatMessage({ id: 'text.Random' }),
        Down: '↙ ' + intl.formatMessage({ id: 'text.down' }),
        Flat: '↔ ' + intl.formatMessage({ id: 'text.flat' }),
    }

    const directionMarkEnum: any = {
        Up: '↗ ',
        Random: '? ',
        Down: '↙ ',
        Flat: '↔ ',
    }
    const { getData, getList, pagination, params } = useListPage({
        baseUri: 'pk_lottery/my',
    });
    const getBetTypeLabel = (bet_type: string) => {
        const betTypeItem = allowedOptions2.find((item) => item.key === bet_type);
        if (betTypeItem)
            return betTypeItem.label;
        else
            return '';
    }
    useEffect(() => {
        dayjs.locale(intl.locale.toLowerCase());
    }, [intl.locale]);

    useEffect(() => {
        (async () => {
            await getList({});
        })();
    }, [toRefresh]);


    useEffect(() => {
        (async () => {
            let tmpData = getData?.data ? JSON.parse(JSON.stringify(getData?.data)) : [];
            const dt = tmpData.map((item: any) => {
                if (item?.result) {
                    item.result = JSON.parse(item.result);
                }
                if (item.receiver_id == snap.session.user?.id) {
                    item.bet_result = item.receiver_bet_result;
                    item.result_amount = item.receiver_result_amt;
                    item.bet_type = item.sender_bet_type;
                    item.result_bet_type = item.final_bet_type == 'Up' ? 'Down' : 'Up';
                    item.pk_member = item.sender;
                }
                if (item.sender_id == snap.session.user?.id) {
                    item.bet_result = item.sender_bet_result;
                    item.result_amount = item.sender_result_amt;
                    item.bet_type = item.sender_bet_type;
                    item.result_bet_type = item.final_bet_type;
                    item.pk_member = item.receiver;
                }
                if (mobile()) {
                    item.openList = false;
                }
                return item;
            })
            setTransactionData(dt);
        })()

    }, [getData]);

    const changeOpen = (index: any) => {
        const newTransactionData = transactionData.concat([])
        newTransactionData[index]["openList"] = !newTransactionData[index]["openList"]
        setTransactionData(newTransactionData);
    }

    return mobile() ? (
        <>
            {transactionData?.map((item: any, index: any) => {
                return (
                    <div className="table-cell" key={"tr_" + item.id}>
                        <Flex justifyContent="space-between">
                            <Text>{new Date(moment(item.start_at + 'Z').format()).toLocaleString()}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" mt={2}>
                            <Flex justify='left' w="50%" fontSize="16px" fontWeight="700"><Image boxSize="25px" mr={1} src={MoneyImg} /> {numberWithCommas(item.bet_amount)}</Flex>
                            <Flex justify='right' w="50%" fontSize="16px" fontWeight="700" color={getTextColor((item.result_amount))}>
                                {
                                    item.status == 'Started' ? (
                                        <></>
                                    ) : (
                                        <>
                                            {!item.result_amount ? '' : <Image boxSize="25px" mr={1} src={MoneyImg} />}{numberWithCommas(item.result_amount)}
                                        </>
                                    )
                                }

                            </Flex>
                        </Flex>
                        <Text textAlign="center" onClick={() => {
                            changeOpen(index)
                        }}>
                            {
                                !item.openList ? <ChevronDownIcon /> : <ChevronUpIcon />
                            }
                        </Text>
                        {item.openList && (
                            <>
                                <Flex mt={2} flexDir='row' justifyContent='center' w="100%">
                                    <Flex w="50%" flexDir='row' >
                                        <Text textAlign="center" w="50%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.Compare" /></Text>
                                        <Flex w="50%" flexDir='column'  textAlign="center">
                                            <Text lineHeight="0.8rem">{item.result?.last?.length > 0 ? formatter.format(item.result?.last[0]) : '-'}</Text>
                                            <Text lineHeight="0.8rem" ml='-0.5rem'>{item.result?.last?.length > 4 ? (' (' + numberWithCommas(item.result?.last[1]) + ')') : ''}</Text>
                                        </Flex>
                                    </Flex>

                                    <Flex w="50%" flexDir='row'  textAlign="center">
                                        <Text textAlign="center" w="50%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.Open" /></Text>
                                        <Flex w="50%" flexDir='column' >
                                            <Text lineHeight="0.8rem"  textAlign="center">{item.result?.start ? formatter.format(item.result?.start) : '-'}</Text>
                                            <Text  textAlign="center" ml='-0.5rem' w='120%' lineHeight="0.8rem" color={item.result?.direction == 'Up' ? 'green' : 'red'}>{item.result?.direction ? (' (' + directionMarkEnum[item.result?.direction] + numberWithCommas(item.result?.open) + ')') : ''}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                <Flex alignItems='center' w='100%' justifyContent='center' pt={2} mt={3} mb={2}>
                                    <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.PKMember" /></Text>
                                    <Flex sx={styles.Online} w="25%" alignItems='center' justifyContent='center'>
                                        <Avatar
                                            style={{
                                                width:"15px",
                                                height:"15px",
                                                paddingRight:"3px"
                                            }}
                                            name={item?.pk_member?.nickname || '-'}
                                            src={getAvatar(item?.pk_member?.avatar)}
                                        />
                                        <Flex flexDir='column'  textAlign="center">
                                            <Text  textAlign="center"
                                                style={{
                                                    color: item.total_amount < 0 ? 'red' : 'green'
                                                }}
                                                fontSize='1rem'
                                                lineHeight='1.5rem'
                                            >
                                                {item?.pk_member?.nickname || '-'}
                                            </Text>
                                            {/*<Flex>*/}
                                            {/*    <Tag*/}
                                            {/*        variant='solid'*/}
                                            {/*        borderRadius='full'*/}
                                            {/*        colorScheme='messenger'*/}
                                            {/*        size='sm'*/}
                                            {/*    >*/}
                                            {/*        {formatVip(item?.pk_member?.vips_id || '')}*/}
                                            {/*    </Tag>*/}
                                            {/*</Flex>*/}
                                        </Flex>
                                    </Flex>

                                    <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.BetNumber" /></Text>
                                    <Text textAlign="center" w="25%">{getBetTypeLabel(item.result_bet_type)}</Text>
                                </Flex>

                                <Flex mt={5} >
                                    <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.PKResult" /></Text>
                                    {
                                        item.status == 'Started' ? (
                                            <Text w="25%">-</Text>
                                        ) : (
                                            <Text textAlign="center" w="25%">
                                                {directionEnum?.[item.result?.direction]}</Text>
                                        )
                                    }
                                    <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.Result" /></Text>
                                    <Text textAlign="center" w="25%" color={item.bet_result == 1 ? 'green' : 'red'}>
                                        {
                                            item.status == 'Started' ? (
                                                <></>
                                            ) : (
                                                <Text textAlign="center">
                                                    {item.bet_result == 1 ? intl.formatMessage({ id: 'text.Win' }) : item.bet_result == 0 ? intl.formatMessage({ id: 'text.Loss' }) : ""}
                                                </Text>
                                            )
                                        }

                                    </Text>
                                </Flex>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    ) : (
        <>
            <TableContainer pt="3px" w="100%">
                <Table variant="simple" size="md" w="100%">
                    <Thead h="50px" w="100%">
                        <Tr>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.TradingHours" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.Compare" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.Open" />
                            </Th>
                            <Th fontSize={14} textAlign='center' minW='150px'>
                                <FormattedMessage id="text.PKMember" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.TransactionAmount" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.ProfitAmount" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.BetNumber" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.PKResult" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.Result" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.Status" />
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody w="100%">
                        {transactionData?.map((item: any) => {
                            return (
                                <Tr key={"tr_" + item.id}>
                                    <Td padding='5px'  alignItems="center"  textAlign='center'  justifyContent="center">
                                        {item.start_at ? useUtcToLocalTime(item.start_at) : '-'}
                                    </Td>
                                    <Td padding='5px' textAlign='center' alignItems="center">
                                        {item.result?.last?.length > 0 ? formatter.format(item.result?.last[0]) : '-'}
                                        <Text>{item.result?.last?.length > 4 ? (' (' + numberWithCommas(item.result?.last[1]) + ')') : ''}</Text>
                                    </Td>
                                    <Td padding='5px' textAlign='center' alignItems="center" justifyContent="center">
                                        {item.result?.start ? formatter.format(item.result?.start) : '-'}
                                        <Text color={item.result?.direction == 'Up' ? 'green' : 'red'}>{item.result?.direction ? (' (' + directionMarkEnum[item.result?.direction] + numberWithCommas(item.result?.open) + ')') : ''}</Text>
                                    </Td>
                                    <Td padding='5px'  p={1}>
                                        <Flex alignItems='center' w='100%'  justifyContent="center">
                                            <Flex sx={styles.Online}>
                                                <Avatar
                                                    size='sm'
                                                    name={item?.pk_member?.nickname || '-'}
                                                    src={getAvatar(item?.pk_member?.avatar)}
                                                />
                                            </Flex>
                                            <Flex flexDir='column' ml={2}>
                                                <Text
                                                    style={{
                                                        color: item.total_amount < 0 ? 'red' : 'green'
                                                    }}
                                                    fontSize='1rem'
                                                    lineHeight='1.5rem'
                                                >
                                                    {item?.pk_member?.nickname || '-'}
                                                </Text>
                                                <Flex>
                                                    <Tag
                                                        variant='solid'
                                                        borderRadius='full'
                                                        colorScheme='messenger'
                                                        size='sm'
                                                    >
                                                        {formatVip(item?.pk_member?.vips_id || '')}
                                                    </Tag>
                                                </Flex>
                                            </Flex>
                                        </Flex>

                                    </Td>
                                    <Td padding='5px' >
                                        <Flex  justifyContent="center"><Image boxSize="20px" mr={1} src={MoneyImg} />{numberWithCommas(item.bet_amount)}</Flex>
                                    </Td>
                                    <Td padding='5px'  >
                                        {
                                            item.status == 'Started' ?
                                                (
                                                    <></>
                                                ) : (
                                                    <Flex color={item.bet_result == 1 ? 'green' : 'red'}   justifyContent="center">
                                                        {!item.result_amount ? '' : <Image boxSize="20px" mr={1} src={MoneyImg} />}{item.result_amount ? numberWithCommas(item.result_amount) : ''}
                                                    </Flex>
                                                )
                                        }
                                    </Td>
                                    <Td padding='5px' textAlign='center'>
                                        {getBetTypeLabel(item.result_bet_type)}
                                    </Td>
                                    <Td padding='5px' textAlign='center'>
                                        {directionEnum?.[item.result?.direction]}
                                    </Td>
                                    <Td padding='5px' textAlign='center'
                                        color={item.bet_result == 1 ? 'green' : 'red'}>
                                        {
                                            item.status == 'Started' ?
                                                (
                                                    <></>
                                                ) : (
                                                    <>
                                                        {item.bet_result == 1 ? intl.formatMessage({ id: 'text.Win' }) : item.bet_result == 0 ? intl.formatMessage({ id: 'text.Loss' }) : ""}
                                                    </>
                                                )
                                        }

                                    </Td>
                                    <Td padding='5px'  textAlign='center'>
                                        <FormattedMessage id={'text.' + item.status}></FormattedMessage>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            {!getData?.data || getData?.data?.length == 0 ? <NoActivity /> : ''}
            <MyPagination {...pagination} />
        </>
    )
};
function numberWithCommas(num: string) {
    if (!!!num) return '';
    let x = parseFloat(num).toFixed(2);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function getTextColor(num: number) {
    return num >= 0 ? 'green' : 'red';
}