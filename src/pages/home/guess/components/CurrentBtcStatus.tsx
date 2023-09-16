import { Flex } from "@chakra-ui/layout"
import {Box, Divider, SimpleGrid, Text, Wrap, WrapItem, useMediaQuery, Avatar, Image} from "@chakra-ui/react"
import {getAvatar, MyCard} from "@common/index"
import axios from "axios"
import VS from '@/assets/images/vs.svg';
import { FC, useEffect, useState } from "react"
import { FormattedMessage, useIntl } from 'react-intl';
import useUtcToLocalTime from '../../../../common/hooks/useUtcToLocalTime'
import moment from "moment"
import pagethreesvg27 from "@assets/images/pagethreesvg27.svg";

interface Props {
    btcTime: any
    lastBtcValue: any
    numBigOdd: any
    minuteMode: string
    direction: string
    lastInfo: any
}

interface FieldProps {
    label: any
    value: string
}

const Field: FC<FieldProps> = ({ label, value }) => {
    return (
        <Flex justifyContent={"space-between"} mb={'2px'}>
            <Text color={'gray.500'} fontSize={12}>{label}</Text>
            <Text fontSize={12}>{value}</Text>
        </Flex>
    )

}

const CurrentBtcStatus: FC<Props> = ({ btcTime, lastBtcValue, numBigOdd, minuteMode, direction, lastInfo }) => {
    const intl = useIntl();
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const [dt24hr, setDt24Hr] = useState<any>();
    const directionEnum: any = {
        Up: intl.formatMessage({ id: 'text.up' }),
        Flat: intl.formatMessage({ id: 'text.flat' }),
        Down: intl.formatMessage({ id: 'text.down' }),
    }
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
    });

    const getBinanceServerTime = async () => {
        axios.get('https://data-api.binance.vision/api/v3/ticker/24hr', {
            params: {
                symbol: 'BTCUSDT'
            }
        })
            .then((response: any) => {
                setDt24Hr(response.data);
            }).catch((err) => {
                console.error('Error fetching price data', err);
            });
    }

    useEffect(() => {
        const fetchData = async () => {
            await getBinanceServerTime();
        }
        fetchData();
    }, []);

    const handleLastTime = (time: any) => {
        // useUtcToLocalTime(moment(time).format('YYYY-MM-DD HH:mm:ss'),'YYYY-MM-DD HH:mm:ss')
        return time ? formatter.format(new Date(time).getTime()) : ''
    }
    const handleLastBtcValue = (value: any) => {
        return value ? numberWithCommas(parseFloat(value)?.toFixed(2)) : ''
    }
    const comparativeResult = (nextValue: any, lastValue: any): boolean => {
        return Number(nextValue) - Number(lastValue) > 0
    }

    return (
        <>
            {isLargerThan800 ? <MyCard
                flexDir='row'
                mt={{ base: '-24px', sm: '-24px', md: 'unset', lg: 'unset' }}
                sx={{ overflow: 'hidden' }}
                pb={0}
                borderColor="#afb5c100!important"
            >
                <Flex direction='column'>

                </Flex>
                <Divider orientation='vertical' />
                <Wrap display="flex" justifyContent="center">
                    <WrapItem
                        flexDirection={'column'} pl={3}>
                        <Text pr={2} pt={4} fontSize={18}>BTC/USDT</Text>
                        <Text px={2} color='rgb(240, 185, 11)' fontSize={12} border="1px dashed" borderRadius="5px">
                            POW&nbsp;
                            <FormattedMessage id='text.topVolume'></FormattedMessage>
                        </Text>
                    </WrapItem>
                    <WrapItem
                        flexDirection={'column'} >
                        <Text px={2} pt={5} fontSize={14} color={getTextColor(dt24hr?.priceChange)}>{numberWithCommas(dt24hr?.bidPrice)}</Text>
                        <Text px={2} fontSize={13} >${numberWithCommas(dt24hr?.lastPrice)}</Text>
                    </WrapItem>
                    <WrapItem
                        flexDirection={'column'}>
                        <Text px={2} pt={5} fontSize={14}>
                            <FormattedMessage id='text.24hrChange'></FormattedMessage>
                        </Text>
                        <Text px={2} fontSize={13} color={getTextColor(dt24hr?.priceChange)}>{numberWithCommas(dt24hr?.priceChange)} {numberWithCommas(dt24hr?.priceChangePercent)}%</Text>
                    </WrapItem>
                    <WrapItem
                        flexDirection={'column'} >
                        <Text px={2} pt={5} fontSize={14}>
                            <FormattedMessage id='text.24hrHigh'></FormattedMessage>
                        </Text>
                        <Text px={2} fontSize={13}>{numberWithCommas(dt24hr?.highPrice)}</Text>
                    </WrapItem>
                    <WrapItem
                        flexDirection={'column'} >
                        <Text px={2} pt={5} fontSize={14}>
                            <FormattedMessage id='text.24hrLow'></FormattedMessage>
                        </Text>
                        <Text px={2} fontSize={13}>{numberWithCommas(dt24hr?.lowPrice)}</Text>
                    </WrapItem>
                    {/*<WrapItem*/}
                    {/*    flexDirection={'column'} >*/}
                    {/*    <Text px={2} pt={5} fontSize={14}>*/}
                    {/*        <FormattedMessage id='text.24hrVolumeBTC'></FormattedMessage>*/}
                    {/*    </Text>*/}
                    {/*    <Text px={2} fontSize={13}>{numberWithCommas(dt24hr?.volume)}</Text>*/}
                    {/*</WrapItem>*/}
                    {/*<WrapItem*/}
                    {/*    flexDirection={'column'} >*/}
                    {/*    <Text px={2} pt={5} fontSize={14}>*/}
                    {/*        <FormattedMessage id='text.24hrVolumeUSD'></FormattedMessage>*/}
                    {/*    </Text>*/}
                    {/*    <Text px={2} fontSize={13}>{numberWithCommas(dt24hr?.quoteVolume)}</Text>*/}
                    {/*</WrapItem>*/}

                    {minuteMode === '5m' ?
                        <>
                            <WrapItem
                                flexDirection={'column'} background="#0053ff" color="#fff" borderRadius="10px 0 0 10px" pb="1rem">
                                <Text px={2} pt={5} fontSize={14}>
                                    <FormattedMessage id='text.openAmount'></FormattedMessage>（{handleLastTime(btcTime)}）
                                </Text>
                                <Text px={2} fontSize={13} >{numberWithCommas(lastBtcValue.toFixed(2))}</Text>
                            </WrapItem>
                            <WrapItem
                                flexDirection={'column'} background="#0053ff" color="#fff" ml="-0.5rem" borderRadius="0 10px 10px 0" pb="1rem">
                                <Text px={2} pt={5} fontSize={14}>
                                    <FormattedMessage id='text.resultLoss'></FormattedMessage>
                                </Text>
                                <Text px={2} fontSize={13} >{numBigOdd}</Text>
                            </WrapItem>
                        </> :
                        minuteMode === '1m' ?
                            <>
                                <WrapItem
                                    flexDirection={'column'} background="#0053ff" color="#fff" borderRadius="10px 0 0 10px" pb="1rem">
                                    <Text px={2} pt={5} fontSize={14}>
                                        <FormattedMessage id='text.Compare'></FormattedMessage>（{handleLastTime(lastInfo?.[0])}）
                                    </Text>
                                    <Text px={2} fontSize={13} >{handleLastBtcValue(lastInfo?.[1])}</Text>
                                </WrapItem>
                                <WrapItem
                                    flexDirection={'column'} background="#0053ff" color="#fff" ml="-0.5rem" borderRadius="0 10px 10px 0" pb="1rem">
                                    <Text px={2} pt={5} fontSize={14}>
                                        <FormattedMessage id='text.openAmount'></FormattedMessage>（{handleLastTime(btcTime)}）
                                    </Text>
                                    <Text px={2} fontSize={13} >{(comparativeResult(lastBtcValue.toFixed(2), lastInfo?.[1])) ? (
                                        <Text as="span" color="lime"> ↗ {numberWithCommas(lastBtcValue.toFixed(2))} </Text>) : ((lastBtcValue.toFixed(2)) - (lastInfo?.[1]) < 0 ? (
                                            <Text as="span" color="red"> ↙ {numberWithCommas(lastBtcValue.toFixed(2))}</Text>) : (<Text as="span"> ↔ {numberWithCommas(lastBtcValue.toFixed(2))}</Text>))}</Text>
                                </WrapItem>
                                {/*<WrapItem*/}
                                {/*    flexDirection={'column'} background="#0053ff" color="#fff" ml="-0.5rem" borderRadius="0 10px 10px 0" pb="1rem">*/}
                                {/*    <Text px={2} pt={5} fontSize={14}>*/}
                                {/*        <FormattedMessage id='text.resultWin'></FormattedMessage>*/}
                                {/*    </Text>*/}
                                {/*    <Text px={2} fontSize={13} >{directionEnum?.[direction]}</Text>*/}
                                {/*</WrapItem>*/}
                            </> :
                            <>
                                <WrapItem
                                    flexDirection={'column'} background="#0053ff" color="#fff" borderRadius="10px 0 0 10px" pb="1rem" alignItems="center" px={2}>
                                    <Text px={2} pt={5} fontSize={14}>
                                        <Avatar
                                            src={getAvatar(lastInfo?.avatar1)}
                                            w="25px" h="25px"  mr={2}
                                        />
                                        {lastInfo?.user1}
                                    </Text>
                                    <Text pt={1} fontSize={13} textAlign="center">
                                       ${numberWithCommas(lastInfo?.amt1)}
                                    </Text>
                                </WrapItem>
                                <WrapItem ml="-0.5rem" p={2} background="#0053ff" alignItems={'center'} justifyContent={'center'}>
                                    <Image h='45px' src={VS} />
                                </WrapItem>
                                <WrapItem
                                    flexDirection={'column'} background="#0053ff" color="#fff" ml="-0.5rem" borderRadius="0 10px 10px 0" pb="1rem"  alignItems="center" px={2}>
                                    <Text px={2} pt={5} fontSize={14}>
                                        <Avatar
                                            w="25px" h="25px" mr={2}
                                            src={getAvatar(lastInfo?.avatar2)}
                                        />{lastInfo?.user2}
                                    </Text>
                                    <Text pt={1} fontSize={13}>
                                        ${numberWithCommas(lastInfo?.amt2)}
                                    </Text>
                                </WrapItem>
                            </>

                    }

                </Wrap>
            </MyCard> :
                <SimpleGrid columns={2} spacing={2} px={2}>
                    <Box>
                        <Text fontSize={18} fontWeight={"bold"}>BTC/USDT</Text>
                        <Text fontSize={22} fontWeight={'bold'} color={getTextColor(dt24hr?.priceChange)}>{numberWithCommas(dt24hr?.bidPrice)}</Text>
                        <Flex gap={'2'} alignItems={'center'}>
                            <Text fontSize={13} >≈${numberWithCommas(dt24hr?.lastPrice)} </Text>
                            <Text color={getTextColor(dt24hr?.priceChange)}>{numberWithCommas(dt24hr?.priceChangePercent)}%</Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Field label={<FormattedMessage id='text.24hrHigh'></FormattedMessage>} value={numberWithCommas(dt24hr?.highPrice)} />
                        <Field label={<FormattedMessage id='text.24hrLow'></FormattedMessage>} value={numberWithCommas(dt24hr?.lowPrice)} />
                        {minuteMode === '5m' ?
                            <>
                                <div style={{ color: 'blue' }}><Field label={<><FormattedMessage id='text.openAmount'></FormattedMessage>（{handleLastTime(btcTime)}）</>} value={numberWithCommas(lastBtcValue.toFixed(2))} /></div>
                                <div style={{ color: 'blue' }}><Field label={<FormattedMessage id='text.resultLoss'></FormattedMessage>} value={numBigOdd} /></div>
                            </> :
                            minuteMode === '1m' ?
                                <>
                                    <div style={{ color: 'blue' }}>
                                        <Field
                                            label={
                                                <>
                                                    <FormattedMessage id='text.Compare'></FormattedMessage>
                                                    （{handleLastTime(lastInfo?.[0])}）
                                                </>
                                            }
                                            value={handleLastBtcValue(lastInfo?.[1])}
                                        />
                                    </div>
                                    <div style={{ color: 'blue' }}>
                                        <Field
                                            label={
                                                <>
                                                    <FormattedMessage id='text.openAmount'></FormattedMessage>
                                                    （{handleLastTime(btcTime)}）
                                                </>
                                            }
                                            value={lastBtcValue.toFixed(2) - lastInfo?.[1] > 0 ? (
                                                <Text as='span' color='lime'>
                                                    {' '}
                                                    ↗ {numberWithCommas(lastBtcValue.toFixed(2))}{' '}
                                                </Text> as any
                                            ) : lastBtcValue.toFixed(2) - lastInfo?.[1] < 0 ? (
                                                <Text as='span' color='red'>
                                                    {' '}
                                                    ↙ {numberWithCommas(lastBtcValue.toFixed(2))}
                                                </Text> as any
                                            ) : (
                                                <Text as='span'>
                                                    {' '}
                                                    ↔ {numberWithCommas(lastBtcValue.toFixed(2))}
                                                </Text> as any
                                            )}
                                        />
                                    </div>
                                </> :
                                <>
                                    <div style={{ color: 'blue' }}>
                                        <Field
                                            label={
                                                <>
                                                    <Text  fontSize={14}>
                                                        <Avatar
                                                            w="18px" h="18px" mr={1}
                                                            src={getAvatar(lastInfo?.avatar1)}
                                                        />{lastInfo?.user1}
                                                    </Text>
                                                </>
                                            }
                                            value={lastInfo?.amt1 > 0 ? (
                                                <Text as='span' color='lime'>
                                                  {'$' + numberWithCommas(lastInfo?.amt1)}
                                                </Text> as any
                                            )  : (
                                                <Text as='span' color='red'>
                                                    {'$' + numberWithCommas(lastInfo?.amt1)}
                                                </Text> as any
                                            )}

                                        />
                                    </div>
                                    <div style={{ color: 'blue' }}>
                                        <Field
                                            label={
                                                <>
                                                    <Text fontSize={14}>
                                                        <Avatar
                                                            w="18px" h="18px" mr={1}
                                                            src={getAvatar(lastInfo?.avatar2)}
                                                        />{lastInfo?.user2}
                                                    </Text>
                                                </>
                                            }
                                            value={lastInfo?.amt2 > 0 ? (
                                                <Text as='span' color='lime'>
                                                    {'$' + numberWithCommas(lastInfo?.amt2)}
                                                </Text> as any
                                            )  : (
                                                <Text as='span' color='red'>
                                                    {'$' + numberWithCommas(lastInfo?.amt2)}
                                                </Text> as any
                                            )}
                                        />
                                    </div>
                                </>
                        }
                    </Box>
                </SimpleGrid>
            }

        </>
    )
}


function getTextColor(num: number) {
    return num >= 0 ? 'green' : 'red';
}

function numberWithCommas(num: string) {
    if (!!!num) return '';
    let x = parseFloat(num).toFixed(2);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

export default CurrentBtcStatus
