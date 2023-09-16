
import axios from 'axios';
import { MyRadioButtons } from "@common/components/MyRadioButtons";
import { Flex } from "@chakra-ui/layout";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { FormattedMessage, useIntl } from "react-intl";
import { useDisclosure } from "@chakra-ui/hooks";
import { useEffect, useState } from 'react';
import { MyPagination } from '@components/MyPagination';
import { ConfigProvider, Pagination } from 'antd';
import { useColorModeValue, Text } from '@chakra-ui/react';
import NoActivity from '@components/NoActivity';
import moment from 'moment';
// import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import { Locale } from 'antd/es/locale';
import useUtcToLocalTime from '../../../../common/hooks/useUtcToLocalTime'
import { getPaginationLocale, useMyState } from '@common/index';

export default ({ tdata, onRefresh, minuteMode }: any) => {

    const intl = useIntl();
    const { snap } = useMyState();
    const [current_page, setCurrentPage] = useState(0);
    const [per_page, setPerPage] = useState(20);
    const [total, setTotal] = useState(tdata.length);
    const [dispData, setDispData] = useState([]);
    const [locale, setLocal] = useState<Locale>(getPaginationLocale(intl.locale));
    const defauleDark = useColorModeValue('ant', 'antdark');
    const formatter = new Intl.DateTimeFormat(intl.locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    const directionEnum: any = {
        Up: intl.formatMessage({ id: 'text.up' }),
        Flat: intl.formatMessage({ id: 'text.flat' }),
        Down: intl.formatMessage({ id: 'text.down' }),
    }

    const directionMarkEnum: any = {
        Up: '↗ ',
        Random: '? ',
        Down: '↙ ',
        Flat: '↔ ',
    }

    const sonTotal = (total: any) => {
        let labels = intl.formatMessage({ id: "page.total" });
        return { total: total, label: labels };
    };
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
        setLocal(getPaginationLocale(snap.storage.locale));
        dayjs.locale(snap.storage.locale.toLowerCase());
    }, [snap.storage.locale]);
    useEffect(() => {
        setTotal(tdata.length);
        setDispData(tdata.slice(current_page * per_page, current_page * per_page + per_page));
    }, [tdata]);
    return (
        <>
            <TableContainer pt="3px" w="100%">
                <Table variant="simple" size="md" w="100%" maxHeight='700px'>
                    <Thead h="50px" w="100%">
                        <Tr>
                            <Th p='2px' textAlign='center'>
                                {minuteMode == '1m' ?
                                    <FormattedMessage id="text.Open" />
                                    : <FormattedMessage id="text.Time" />
                                }
                                
                            </Th>
                            <Th p='2px' textAlign='center'>
                                {minuteMode == '1m' ?
                                    <FormattedMessage id="text.Compare" />
                                    : <FormattedMessage id="text.QuizResult" />
                                }

                            </Th>
                            {minuteMode === '5m' && <Th p='2px' textAlign='center'>
                                <FormattedMessage id="text.SizeOddEven" />
                            </Th>}
                            {/*<Th>{lang?.td4}</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody w="100%">
                        {dispData?.map((item: any) => {
                            return (
                                <Tr key={"tr_" + item.id}>


                                    {minuteMode == '5m' ? (
                                        (item.type == 'FiveMinutes' && item.result) ?
                                            <>
                                                <Td padding='5px' alignItems='center'>
                                                    <Flex flexDirection={'column'} w='full' textAlign={'center'}>
                                                        <Text>{useUtcToLocalTime(item?.round_at, 'YYYY/MM/DD HH:mm:00')}</Text>
                                                        <Text>{'(' + item?.result?.open + ')'}</Text>
                                                    </Flex>
                                                </Td>
                                                <Td padding='5px'>
                                                    {item?.result?.number}
                                                </Td>
                                            </> :
                                            <>
                                                <Td></Td>
                                                <Td></Td>
                                            </>
                                    ) : (
                                        (item.type == 'OneMin' && item.result) ?
                                            <>
                                                <Td padding='5px' textAlign={'center'}>
                                                    {useUtcToLocalTime(item?.round_at, 'YYYY/MM/DD HH:mm:00')}
                                                    <Text color={item.result?.direction == 'Up' ? 'green' : 'red'}>{item.result?.direction ? (' (' + directionMarkEnum[item.result?.direction] + numberWithCommas(item.result?.open) + ')') : ''}</Text>
                                                </Td>
                                                <Td padding='5px' textAlign={'center'}>
                                                    {item.result?.last?.length > 0 ? formatter.format(item.result?.last[0]) : '-'}
                                                    <Text>{item.result?.last?.length > 1 ? (' (' + numberWithCommas(item.result?.last[1]) + ')') : ''}</Text>
                                                </Td>
                                            </> :
                                            <>
                                                <Td></Td>
                                                <Td></Td>
                                            </>
                                    )}

                                    {minuteMode === '5m' && <Td padding='5px'>
                                        {getBigOdd(item?.result?.is_big, item?.result?.is_odd)}
                                    </Td>}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            {!dispData || dispData?.length == 0 ? <NoActivity /> : ''}
            <ConfigProvider prefixCls={defauleDark}
                locale={locale}>
                <Flex py={5} justifyContent="center">
                    <Pagination
                        current={current_page || 1}
                        total={total || 0}
                        pageSize={per_page || 20}
                        onChange={(page: number, pageSize: number) => {
                            setPerPage(pageSize);
                            setCurrentPage(page);
                            setDispData(tdata.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize));
                        }}
                        showTotal={(total) => {
                            let obj = sonTotal(total);
                            return obj?.total + ' ' + obj?.label;
                        }}
                        showSizeChanger
                        showQuickJumper
                    />
                </Flex>
            </ConfigProvider>

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