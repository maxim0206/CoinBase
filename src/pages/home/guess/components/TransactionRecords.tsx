import mobile from 'is-mobile'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Text, Flex, Image } from "@chakra-ui/react"
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from 'react';
import { MyPagination } from '@components/MyPagination';
import { useListPage } from '@common/index';
import NoActivity from '@components/NoActivity';
import MoneyImg from "@/assets/images/usdc.svg";
// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import useUtcToLocalTime from '../../../../common/hooks/useUtcToLocalTime'

import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import moment from 'moment'

export default ({ toRefresh, value, minuteMode }: any) => {


    const [transactionData, setTransactionData] = useState<any>([]);
    const intl = useIntl();
    const allowedOptions2 = [
        { key: 'Up', label: "↗ " + intl.formatMessage({ id: 'text.up' }) },
        { key: 'Down', label: "↙ " + intl.formatMessage({ id: 'text.down' }) },
        { key: 'Flat', label: "↔ " + intl.formatMessage({ id: 'text.flat' }) },
    ];
    const directionMarkEnum: any = {
        Up: '↗ ',
        Random: '? ',
        Down: '↙ ',
        Flat: '↔ ',
    }
    const allowedOptions1 = [
        { key: 'No0', label: '0' },
        { key: 'No1', label: '1' },
        { key: 'No2', label: '2' },
        { key: 'No3', label: '3' },
        { key: 'No4', label: '4' },
        { key: 'No5', label: '5' },
        { key: 'No6', label: '6' },
        { key: 'No7', label: '7' },
        { key: 'No8', label: '8' },
        { key: 'No9', label: '9' },
        { key: 'Big', label: intl.formatMessage({ id: 'text.big' }) },
        { key: 'Small', label: intl.formatMessage({ id: 'text.small' }) },
        { key: 'Even', label: intl.formatMessage({ id: 'text.Even' }) },
        { key: 'Odd', label: intl.formatMessage({ id: 'text.Odd' }) }
    ];

    const directionEnum: any = {
        Up: '↗ ' + intl.formatMessage({ id: 'text.up' }),
        Flat: '↔ ' + intl.formatMessage({ id: 'text.flat' }),
        Down: '↙ ' + intl.formatMessage({ id: 'text.down' }),
    }
    const formatter = new Intl.DateTimeFormat(intl.locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    const { getData, getList, pagination, params } = useListPage({
        baseUri: 'lottery/my',
    });
    const getBetTypeLabel = (bet_type: string) => {
        const betTypeItem = (minuteMode === '5m' ? allowedOptions1 : allowedOptions2).find((item) => item.key === bet_type);
        if (betTypeItem)
            return betTypeItem.label;
        else
            return '';
    }
    const getBigOdd = (big: boolean, odd: boolean) => {
        let res = '';
        if (big) {
            res += intl.formatMessage({ id: 'text.big' });
        } else {
            res += intl.formatMessage({ id: 'text.small' });
        }
        res += '/';
        if (odd) {
            res += intl.formatMessage({ id: 'text.Odd' });
        } else {
            res += intl.formatMessage({ id: 'text.Even' });
        }
        return res;
    }
    useEffect(() => {
        dayjs.locale(intl.locale.toLowerCase());
    }, [intl.locale]);

    useEffect(() => {
        (async () => {
            await getList({ type: minuteMode === '5m' ? 'FiveMinutes' : 'OneMin' });
        })()
    }, [toRefresh])

    useEffect(() => {
        setTransactionData([]);
        (async () => {
            await getList({ type: minuteMode === '5m' ? 'FiveMinutes' : 'OneMin' });
        })()
    }, [minuteMode])


    useEffect(() => {
        (async () => {
            let tmpData = getData?.data ? JSON.parse(JSON.stringify(getData?.data)) : [];
            const dt = tmpData.map((item: any) => {
                if (item?.lottery?.result) {
                    item.lottery.result = JSON.parse(item.lottery.result);
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
                            <Text>{new Date(moment(item.created_at + 'Z').format()).toLocaleString()}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" mt={2}>
                            <Flex justify='left' w="50%" fontSize="16px" fontWeight="700"><Image boxSize="25px" mr={1} src={MoneyImg} /> {numberWithCommas(item.bet_amount)}</Flex>
                            <Flex justify='right' w="50%" fontSize="16px" fontWeight="700" color={getTextColor((item.result_amount))}> {item.bet_result == null ? '' : <Image boxSize="25px" mr={1} src={MoneyImg} />}{numberWithCommas(item.result_amount)}</Flex>
                        </Flex>
                        <Text textAlign="center" onClick={() => {
                            changeOpen(index)
                        }}>
                            {
                                !item.openList ? <ChevronDownIcon /> : <ChevronUpIcon />
                            }
                        </Text>
                        {(item.openList &&
                            ((minuteMode === '5m' && item.lottery?.type === 'FiveMinutes') ||
                                (minuteMode === '1m' && item.lottery?.type === 'OneMin'))) && (
                                <>
                                    <Flex>
                                        {minuteMode === '1m' ?
                                            <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px">
                                                <FormattedMessage id="text.Compare" />
                                            </Text> :
                                            <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px">
                                                <FormattedMessage id="text.Openprice" />
                                            </Text>
                                        }
                                        <Text textAlign="center" w="25%">
                                            <Flex flexDirection='column' textAlign="center">
                                                {
                                                    minuteMode === '5m' ?
                                                        <>{item.lottery?.result?.open ? (numberWithCommas(item.lottery?.result?.open)) : '-'}</>
                                                        :
                                                        <Text lineHeight='0.8rem'>{item.lottery?.result?.last?.length > 0 ? formatter.format(item.lottery?.result?.last[0]) : '-'}
                                                            <Text w='120%' ml='-0.5rem' lineHeight='0.8rem'>{item.lottery?.result?.last?.length > 4 ? (' (' + numberWithCommas(item.lottery?.result?.last[1]) + ')') : '-'}</Text></Text>
                                                }
                                            </Flex>
                                        </Text>

                                        {minuteMode === '1m' ?
                                            <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px">
                                                <FormattedMessage id="text.Open" />
                                            </Text> :
                                            <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px">
                                                <FormattedMessage id="text.Opentime" />
                                            </Text>
                                        }
                                        <Text textAlign="center" w="25%">
                                            <Flex flexDirection='column' textAlign="center">
                                                {
                                                    minuteMode === '5m' ?
                                                        <>{item.lottery?.result?.start ? item.lottery?.result?.start?.split(' ')[1] : '-'}</>
                                                        :
                                                        <Text lineHeight='0.8rem'>{item.lottery?.result?.start ? formatter.format(item.lottery?.result?.start) : '-'}
                                                            <Text color={item.lottery?.result?.direction == 'Up' ? 'green' : 'red'} w='120%' lineHeight='0.8rem' ml='-0.5rem'>{item.lottery?.result?.direction ? (' (' + directionMarkEnum[item.lottery?.result?.direction] + numberWithCommas(item.lottery?.result?.open) + ')') : ''}</Text></Text >
                                                }
                                            </Flex>
                                        </Text>
                                    </Flex>
                                    <Flex py={2} my={2}>
                                        <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.BetNumber" /></Text>
                                        <Text textAlign="center" w="25%">{getBetTypeLabel(item.bet_type)}</Text>
                                        <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.Result" /></Text>
                                        <Text textAlign="center" w="25%" >
                                            {/*五分钟竞猜号码*/}
                                            {minuteMode === '5m' ?
                                                <Flex flexDirection='column' textAlign="center">
                                                    {item.bet_result !== null ? <Text>{item.lottery?.result?.number + '   ' + getBigOdd(item.lottery?.result?.is_big, item.lottery?.result?.is_odd)}</Text> : '-'}
                                                </Flex> :
                                                directionEnum?.[item.lottery?.result?.direction]
                                            }
                                        </Text>
                                    </Flex>
                                    <Flex >
                                        <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.GuessNumber" /></Text>
                                        <Text textAlign="center" w="25%" color={item.bet_result == 1 ? 'green' : 'red'}>
                                            {item.bet_result == 1 ? intl.formatMessage({ id: 'text.Win' }) : item.bet_result == 0 ? intl.formatMessage({ id: 'text.Loss' }) : ""}</Text>
                                        <Text textAlign="center" w="25%" border="1px dashed #90909070" borderRadius="5px"><FormattedMessage id="text.Status" />
                                        </Text>
                                        <Text textAlign="center" w="25%" ><FormattedMessage id={'text.' + item.status}></FormattedMessage></Text>
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
                            {minuteMode == '1m' ?
                                <Th fontSize={14} textAlign='center'>
                                    <FormattedMessage id="text.Compare" />
                                </Th> :

                                <Th fontSize={14} textAlign='center'>
                                    <FormattedMessage id="text.Openprice" />
                                </Th>
                            }
                            {minuteMode == '1m' ?
                                <Th fontSize={14} textAlign='center'>
                                    <FormattedMessage id="text.Open" />
                                </Th> :

                                <Th fontSize={14} textAlign='center'>
                                    <FormattedMessage id="text.Opentime" />
                                </Th>
                            }
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
                                <FormattedMessage id="text.Result" />
                            </Th>
                            <Th fontSize={14} textAlign='center'>
                                <FormattedMessage id="text.GuessNumber" />
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
                                    <Td padding='5px' alignItems="center" textAlign='center' justifyContent="center">
                                        {useUtcToLocalTime(item.created_at)}
                                    </Td>
                                    {minuteMode == '5m' ? (
                                        ((item.lottery?.type == 'FiveMinutes' && item.lottery?.result) ?
                                            <>
                                                <Td padding='5px' textAlign="center">
                                                    {item.lottery?.result?.open ? (numberWithCommas(item.lottery?.result?.open)) : '-'}
                                                </Td>
                                                <Td padding='5px' textAlign="center">
                                                    {item.lottery?.result?.start ? item.lottery?.result?.start?.split(' ')[1] : '-'}
                                                </Td>
                                            </>
                                            :
                                            <>
                                                <Td></Td>
                                                <Td></Td>
                                            </>
                                        )
                                    ) : (
                                        ((item.lottery?.type == 'OneMin' && item.lottery?.result) ?
                                            <>
                                                <Td padding='5px' textAlign="center">
                                                    {item.lottery?.result?.last?.length > 0 ? formatter.format(item.lottery?.result?.last[0]) : '-'}
                                                    <Text>{item.lottery?.result?.last?.length > 4 ? (' (' + numberWithCommas(item.lottery?.result?.last[1]) + ')') : '-'}</Text>
                                                </Td>
                                                <Td padding='5px' textAlign="center">
                                                    {item.lottery?.result?.start ? formatter.format(item.lottery?.result?.start) : '-'}
                                                    <Text color={item.lottery?.result?.direction == 'Up' ? 'green' : 'red'}>{item.lottery?.result?.direction ? (' (' + directionMarkEnum[item.lottery?.result?.direction] + numberWithCommas(item.lottery?.result?.open) + ')') : ''}</Text>
                                                </Td>
                                            </>
                                            :
                                            <>
                                                <Td></Td>
                                                <Td></Td>
                                            </>
                                        )

                                    )}

                                    <Td padding='5px' textAlign='center'>
                                        <Flex justify='center' ><Image boxSize="20px" mr={1} src={MoneyImg} />{numberWithCommas(item.bet_amount)}</Flex>
                                    </Td>
                                    <Td padding='5px' textAlign='center' >
                                        <Flex justify='center' color={item.bet_result == 1 ? 'green' : 'red'}>{item.bet_result == null ? '-' : <Image boxSize="20px" mr={1} src={MoneyImg} />}{numberWithCommas(item.result_amount)}</Flex>
                                    </Td>
                                    <Td padding='5px' textAlign='center'>
                                        {getBetTypeLabel(item.bet_type)}
                                    </Td>
                                    <Td padding='5px' textAlign='center'>
                                        {/*五分钟竞猜号码*/}
                                        {minuteMode === '5m' ? <Flex flexDirection='column' padding='5px' textAlign="center">
                                            {item.bet_result !== null ? <Text>{item.lottery?.result?.number + '   ' + getBigOdd(item.lottery?.result?.is_big, item.lottery?.result?.is_odd)}</Text> : '-'}
                                        </Flex> : directionEnum?.[item.lottery?.result?.direction]}
                                    </Td>
                                    <Td padding='5px' textAlign='center'
                                        color={item.bet_result == 1 ? 'green' : 'red'}>
                                        {item.bet_result == 1 ? intl.formatMessage({ id: 'text.Win' }) : item.bet_result == 0 ? intl.formatMessage({ id: 'text.Loss' }) : "-"}
                                    </Td>
                                    <Td padding='5px' textAlign='center'>
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