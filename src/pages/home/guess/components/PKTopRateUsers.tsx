import { Text, Flex, Image, Avatar, Tag, Checkbox, useColorMode } from "@chakra-ui/react"
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { FormattedMessage, useIntl } from "react-intl";
import { useEffect, useState } from 'react';
import { MyIcon, formatVip, getAvatar, request, useListPage, useMyState, useMyToast } from '@common/index';

import MoneyImg from "@/assets/images/usdc.svg";


export default ({onSelectedPkUser}: any) => {
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
    const { colorMode } = useColorMode();
    const intl = useIntl();
    const { showError, showSuccess } = useMyToast();
    const { snap } = useMyState();
    const [getData, setData] = useState<any>([]);
    const [rankType, setRankType] = useState<number>(1);
    const getRankTypeColor = (mode: number) => {
        return rankType === mode
            ? '#0053ff'
            : colorMode === 'light'
                ? '#1a202c'
                : 'rgba(255, 255, 255, 0.92)';
    }
    const rankTypes = [
        {
            label: intl.formatMessage({ id: 'text.Today' }),
            value: 1,
            icon: '',
        },
        {
            label: intl.formatMessage({ id: 'text.ThisMonth' }),
            value: 2,
            icon: '',
        },
        {
            label: intl.formatMessage({ id: 'text.Total' }),
            value: 3,
            icon: '',
        }
    ]
    useEffect(() => {
        if (!rankType) return;
        setData([]);
        request('pk_lottery/ranking', { data: { rankType } }).then((res) => {
            if (res.data?.length > 0) {
                setData(res.data);
            }
        }).catch((err) => {
            showError({ description: err.message });
        });
    }, [rankType])


    return (
        <>
            <Flex
                w='100%'
                backgroundColor={
                    colorMode === 'light' ? '#fff' : 'rgb(10,11,13)'
                }
                fontWeight='500'
                display="flex"
                justifyContent='space-between'
                borderBottom='1px solid'
                paddingLeft='6px'
                paddingRight='6px'
                borderBottomColor={
                    colorMode === 'light'
                        ? '#E2E8F0'
                        : 'rgba(255, 255, 255, 0.16)'
                }
            >
                <Flex
                    display='flex'
                    fontSize='16px'
                >
                    {rankTypes?.map((option: any, index: number) => (
                        <Flex
                            key={'rank_type' + index}
                            cursor='pointer'
                            color={getRankTypeColor(option.value)}
                            lineHeight='40px'
                            paddingRight='12px'
                            onClick={() => {
                                setRankType(option.value);
                            }}
                        >
                            {
                                index > 0 ? '| ' : ''
                            }
                            {/* <MyIcon icon={item.icon} w='22px' fontSize='14px' lineHeight='40px' />  */}
                            <Text paddingLeft={index > 0 ? '12px' : '0px'}>{option.label}</Text>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex w='full'>
                <TableContainer pt="3px" w="100%">
                    <Table variant="simple" size="md" w="100%">
                        <Thead h="50px" w="100%">
                            <Tr>
                                <Th fontSize={14} textAlign='center' padding='0 10px'>
                                    №
                                </Th>
                                <Th fontSize={14} textAlign='center' padding='0 5px'>
                                    PK
                                </Th>
                                <Th fontSize={14} textAlign='center' minW='150px'>
                                    <FormattedMessage id="text.User" />
                                </Th>
                                <Th fontSize={14} textAlign='center'>
                                    <FormattedMessage id="text.ProfitAmount" />
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody w="100%">
                            {getData?.map((item: any, idx: number) => {
                                return (
                                    <Tr key={"tr_" + idx}>
                                        <Td textAlign="center" padding='0 5px'>
                                            {idx + 1}
                                        </Td>
                                        <Td padding='0 5px'>
                                            <Flex alignItems="center" justifyContent={'center'} flexDirection={'column'}>
                                                <Checkbox isChecked={item.auto_enabled} readOnly></Checkbox>
                                                <Text>{numberWithCommas(item.max_bet_amount, true)}</Text>
                                            </Flex>
                                        </Td>
                                        <Td textAlign='left' p={1}>
                                            <Flex alignItems='center' w='100%'
                                                cursor='pointer'
                                                onClick={() => {
                                                    if (onSelectedPkUser) {
                                                        if (item.user_id != snap.session.user?.id) {
                                                            onSelectedPkUser(item);
                                                            showSuccess({ title: intl.formatMessage({ id: 'text.userIsSelected' }) });
                                                        }
                                                    }
                                                }}>
                                                <Flex sx={styles.Online}>
                                                    <Avatar
                                                        size='sm'
                                                        name={item?.nickname || '-'}
                                                        src={getAvatar(item?.avatar)}
                                                    />
                                                    {item?.user?.online_status ? (
                                                        <Flex sx={styles.OnlineDot}></Flex>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Flex>
                                                <Flex flexDir='column' ml={2}>
                                                    <Text
                                                        style={{
                                                            color: item.total_amount < 0 ? 'red' : 'green'
                                                        }}
                                                        fontSize='1rem'
                                                        lineHeight='1.5rem'
                                                    >
                                                        {item?.nickname || '-'}
                                                    </Text>
                                                    <Flex>
                                                        <Tag
                                                            variant='solid'
                                                            borderRadius='full'
                                                            colorScheme='messenger'
                                                            size='sm'
                                                        >
                                                            {formatVip(item?.vips_id || '')}
                                                        </Tag>
                                                    </Flex>
                                                </Flex>
                                            </Flex>

                                        </Td>
                                        <Td textAlign='left'>
                                            <Flex ><Image boxSize="20px" mr={1} src={MoneyImg} />{numberWithCommas(item.total_amount)}</Flex>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>


    )

};
function numberWithCommas(num: string, zeroDisplay?: boolean) {
    if (!!!num) return '';
    if (zeroDisplay && parseFloat(num) == 0) {
        return '';
    }
    let x = zeroDisplay ? parseFloat(num).toFixed(0) : parseFloat(num).toFixed(2);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function getTextColor(num: number) {
    return num >= 0 ? 'green' : 'red';
}