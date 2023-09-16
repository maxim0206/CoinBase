import React, { useRef, useEffect, useState, useImperativeHandle } from "react";
import {
    createChart,
    IChartApi,
    ISeriesApi,
    CandlestickData,
    CrosshairMode,
    ColorType,
    LineData,
    LineStyle,
    UTCTimestamp,
} from "lightweight-charts";
import axios from 'axios';
import { TvApiAdapter } from "tradingview-api-adapter";
import { useIntl } from "react-intl";
import { useColorMode } from "@chakra-ui/react";
import useWebSocket from "react-use-websocket";
import { Flex } from "@chakra-ui/react";

interface ChartProps {
    onChange: any;
    gameMode: string
}

interface MarketData {
    method: string;
    params: string[];
    id: number;
}

let lastTime: number = 0;
let binanceServerTime = 0;
let intervalTimeout = 0;
let priceData: CandlestickData[] = [];
let volumeData: LineData[] = [];
let lastCandleData: any = null;
let candleSeries: any = null;
let volumeSeries: any = null;
let priceLine: any = null;
let isChartValid: boolean = false;

const LineChart: React.FC<ChartProps> = ({ onChange, gameMode }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartBackRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<IChartApi | null>(null);
    const currentDate = new Date();
    const intl = useIntl();
    const [dataLoaded, setDataLoaded] = useState(false);
    const binanceTimeoutRef = useRef<any>(null)
    

    const { colorMode } = useColorMode();

    const BINANCE_TIMEOUT = gameMode === '5m' ? 60 * 5 : 60;

    const WSS_FEED_URL = `wss://data-stream.binance.vision/ws/btcusdt@kline_1s`;
    const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
        onOpen: () => {},
        onClose: () => {},
        shouldReconnect: (closeEvent) => true,
        onMessage: (event) => processMessages(event),
    });

    const processMessages = (event: MessageEvent<any>) => {
        // parsing input socket data from backend
        if (!dataLoaded) return;
        if (!candleSeries || !volumeSeries) return;
        const responseObject = JSON.parse(event.data);
        const { t, o, h, l, c, v } = responseObject.k;
        const timestamp = ((parseInt(t) / 1000)) as UTCTimestamp;
        if (!isChartValid) return; // Check if chart instance is still valid

        if (volumeSeries && candleSeries) {
            // if (lastTime > 0 && lastTime < parseInt(t)) {
                if (priceLine) {
                    candleSeries.removePriceLine(priceLine);
                }
                priceLine = candleSeries.createPriceLine({ price: parseFloat(c) });

                // 添加实时价格颜色变化逻辑
                const realTimePriceColor = parseFloat(c) < parseFloat(lastCandleData.open) ?
                    "#f6465d" : "#0ecb81";

                // 更新实时价格的颜色
                priceLine.applyOptions({ color: realTimePriceColor });

                if (gameMode !== 'pk' && lastCandleData && ((parseInt(t) / 1000) % 60 != 0)) {

                    const candle = {
                        time: lastCandleData.time,
                        open: lastCandleData.open,
                        high: lastCandleData.high,
                        low: lastCandleData.low,
                        close: parseFloat(c),
                    };
                    // const next = {
                    //     time: lastCandleData.time,
                    //     value: parseFloat(v),
                    //     color: close < open ?
                    //         "rgba(255, 128, 159, 0.25)" : "rgba(107, 255, 193, 0.25)"
                    // }
                    // volumeSeries.update(next);
                    candleSeries.update(candle);
                } else if (gameMode === 'pk') {
                    const candle = {
                        time: timestamp,
                        open: parseFloat(o),
                        high: parseFloat(h),
                        low: parseFloat(l),
                        close: parseFloat(c),
                    };
                    // const next = {
                    //     time: timestamp,
                    //     value: parseFloat(v),
                    //     color: close < open ?
                    //         "rgba(255, 128, 159, 0.25)" : "rgba(107, 255, 193, 0.25)"
                    // }
                    // volumeSeries.update(next);
                    candleSeries.update(candle);
                    // lastTime = parseInt(t);
                }

            // }
        }
    };


    const getBinanceData = () => {
        const fetchData = async () => {
            await axios.get('https://data-api.binance.vision/api/v3/klines', {
                params: {
                    symbol: 'BTCUSDT',
                    interval: (gameMode === '5m' || gameMode === '1m')  ? gameMode : '1s',
                    limit: 2000
                }
            }).then((response) => {
                priceData = response.data.map((dataPoint: string[]) => ({
                    time: parseFloat(dataPoint[0]) / 1000,
                    open: parseFloat(dataPoint[1]),
                    high: parseFloat(dataPoint[2]),
                    low: parseFloat(dataPoint[3]),
                    close: parseFloat(dataPoint[4])
                }));
                // volumeData = response.data.map((dataPoint: string[]) => ({
                //     time: parseFloat(dataPoint[0]) / 1000,
                //     value: parseFloat(dataPoint[5]),
                //     color: parseFloat(dataPoint[4]) < parseFloat(dataPoint[1]) ?
                //         "rgba(255, 128, 159, 0.25)" : "rgba(107, 255, 193, 0.25)"
                // }));
                // priceData.sort((a, b) => parseInt(a.time.toString()) - parseInt(b.time.toString()));
                // volumeData.sort((a, b) => parseInt(a.time.toString()) - parseInt(b.time.toString()));
                if (priceData.length > 0) {
                    const binData = priceData[priceData.length - 1];
                    const timeout = (binanceServerTime - parseInt(binData.time.toString()) * 1000) / 1000;
                    lastTime = parseInt(priceData[0].time.toString());
                    priceData.forEach((item: any) => {
                        if (lastTime <= item.time) {
                            lastTime = item.time;
                            lastCandleData = item;
                        }
                    });
                    if (timeout < 0) {
                        intervalTimeout = BINANCE_TIMEOUT;
                    } else {
                        intervalTimeout = BINANCE_TIMEOUT - timeout;
                    }
                }
                setDataLoaded(true);

            }).catch((err) => {
                console.error('Error fetching price data', err);
            });
            // Extract the relevant price data from the response

        };
        fetchData();
    }



    const getBinanceServerTime = () => {
        const fetchData = async () => {
            await axios.get('https://data-api.binance.vision/api/v3/time', {})
                .then((response: any) => {
                    binanceServerTime = parseInt(response.data.serverTime);
                    getBinanceData();
                }).catch((err) => {
                    console.error('Error fetching price data', err);
                });

        };
        fetchData();
    }
    useEffect(() => {
        getBinanceServerTime();
        setDataLoaded(false)
    }, [gameMode, colorMode]);

    useEffect(() => {

        if (!chartContainerRef.current) return;
        if (!dataLoaded) return;
        
        // Create a new chart instance

        const handleResize = () => {
            if (!chartContainerRef.current) return;
            if (!chartInstance.current) return;
            chartInstance.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
        chartInstance.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                // background: {
                //     type: ColorType.Solid,
                //     color: colorMode == 'dark' ? '#0a0b0d00' : '#FFFFFF',
                // },
                background: { type: ColorType.Solid, color: 'transparent' },
                textColor: colorMode == 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            },
            localization: {
                locale: intl.locale || 'en',
                dateFormat: 'yyyy/MM/dd'
            },
            grid: {
                vertLines: {
                    color: colorMode == 'dark' ? '#1d1e20' : '#f4f4f4',
                },
                horzLines: {
                    color: colorMode == 'dark' ? '#1d1e20' : '#f4f4f4',
                }
            },
            crosshair: {
                mode: CrosshairMode.Normal,
                horzLine: {
                    width: 2,
                    color: '#C3BCDB44',
                    style: LineStyle.Dashed,
                    visible: true,
                    labelVisible: true,
                },
                vertLine: {
                    width:2,
                    color: '#C3BCDB44',
                    style: LineStyle.Dashed,
                    visible: true,
                    labelVisible: true,
                },
            },
            leftPriceScale: {
                borderColor: colorMode == 'dark' ? '#1d1e20' : 'rgba(0, 0, 0, 0.1)',
            },
            overlayPriceScales: {
                borderColor: colorMode == 'dark' ? '#1d1e20' : 'rgba(0, 0, 0, 0.1)',
            },
            rightPriceScale: {
                borderColor: colorMode == 'dark' ? '#1d1e20' : 'rgba(0, 0, 0, 0.1)',
            },
            timeScale: {
                rightOffset: 5,
                barSpacing: 5,
                minBarSpacing: 1,
                fixLeftEdge: true,
                timeVisible: true,
                secondsVisible: false,
                tickMarkFormatter: (time: number, tickMarkType: any, locale: string | string[] | undefined) => {

                    const formatter = new Intl.DateTimeFormat(locale,
                        (gameMode == 'pk') ? {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                        } : {
                            hour: 'numeric',
                            minute: 'numeric',
                        });
                    return formatter.format(time * 1000);
                },
                shiftVisibleRangeOnNewBar: true,
                borderColor: colorMode == 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            },
            // watermark: {
            //     text: "AI Earn",
            //     fontFamily: "Arial-black",
            //     fontSize: 50,
            //     color: colorMode == 'dark' ? 'rgba(255, 255, 255, 0.13)' : 'rgba(0, 0, 0, 0.22)',
            //     visible: true
            // }
        });        
        const oldBackground = document.getElementById('chart_back');
        if(oldBackground) oldBackground.remove();
        const background = document.createElement('div');        
        background.id = 'chart_back';
        // place below the chart
        background.style.position = 'absolute';
        // set size and position to match container
        background.style.inset = '0px';
        background.style.backgroundImage = colorMode == 'dark' ? `url(/img/chart_back_dark.svg)` : `url(/img/chart_back_light.svg)`;
        background.style.backgroundRepeat = 'no-repeat';
        chartContainerRef.current.appendChild(background);
        if (window.innerWidth < 768) {
            background.style.backgroundSize = '200px 200px';
            background.style.backgroundPosition = 'calc(50vw - 140px) 0px';
        } else {
            background.style.backgroundSize = '300px 300px';
            background.style.backgroundPosition = 'center -20px';
        }

        chartInstance.current.timeScale().setVisibleLogicalRange({
            from: gameMode == 'pk' ? priceData.length - 120 : priceData.length - 120,
            to: priceData.length + 4,
        });

        candleSeries = chartInstance.current.addCandlestickSeries({
            upColor: "#0ecb81",
            downColor: "#ff4976",
            borderDownColor: "#ff4976",
            borderUpColor: "#0ecb81",
            wickDownColor: "#ff4976",
            wickUpColor: "#0ecb81",
            wickVisible: true,
            lastValueVisible: false,
            priceLineVisible: false,
        });
        candleSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0, // highest point of the series will be 10% away from the top
                bottom: 0, // lowest point will be 40% away from the bottom
            },
        });
        // Apply data to the line series
        candleSeries.setData(priceData);
        volumeSeries = chartInstance.current.addHistogramSeries({
            color: "#385263",
            priceFormat: {
                type: "volume"
            },
            lastValueVisible: false,
            priceScaleId: '', // set as an overlay by setting a blank priceScaleId
        });
        // volumeSeries.priceScale().applyOptions({
        //     autoScale: true, // disables auto scaling based on visible content
        //     scaleMargins: {
        //         top: 0.8,
        //         bottom: 0,
        //     },
        // });
        //
        // volumeSeries.setData(volumeData);
        // clearTimeout(binanceTimeoutRef.current)
        const binanceTimeout = () => {
            binanceTimeoutRef.current = setTimeout(() => {
                (async () => {
                    try {
                        const response = await axios.get('https://data-api.binance.vision/api/v3/klines', {
                            params: {
                                symbol: 'BTCUSDT',
                                interval: gameMode === '5m' ? '5m' : '1m',
                                limit: 2,
                            }
                        });
                        if (!isChartValid) return; // Check if chart instance is still valid

                        if (response.data.length > 0) {
                            const dataPoint = response.data[0];
                            if (lastTime > 0 && lastTime < parseInt(dataPoint[0]) / 1000) {
                                const timestamp = (parseInt(dataPoint[0]) / 1000) as UTCTimestamp;
                                const candle = {
                                    time: timestamp,
                                    open: parseFloat(dataPoint[1]),
                                    high: parseFloat(dataPoint[2]),
                                    low: parseFloat(dataPoint[3]),
                                    close: parseFloat(dataPoint[4])
                                };
                                // const next = {
                                //     time: timestamp,
                                //     value: parseFloat(dataPoint[5]),
                                //     color: parseFloat(dataPoint[4]) < parseFloat(dataPoint[1]) ?
                                //         "rgba(255, 128, 159, 0.25)" : "rgba(107, 255, 193, 0.25)"
                                // }
                                if (volumeSeries && candleSeries) {
                                    // volumeSeries.update(next);
                                    candleSeries.update(candle);
                                    lastTime = parseInt(dataPoint[0]) / 1000;
                                    lastCandleData = candle;
                                    onChange({
                                        // next,
                                        candle
                                    });
                                }
                            }
                        }
                    } catch (e) {
                        console.error(e);
                    }
                })();
                intervalTimeout = BINANCE_TIMEOUT;
                binanceTimeout();
            }, 1000 * intervalTimeout);

        }
        binanceTimeout();
        // const interval = setInterval(() => {

        //     axios.get('https://data-api.binance.vision/api/v3/klines', {
        //         params: {
        //             symbol: 'BTCUSDT',
        //             interval: '5m',
        //             limit: 2,
        //         }
        //     }).then((response: { data: any }) => {
        //         if (!isChartValid) return; // Check if chart instance is still valid

        //         if (response.data.length > 0) {
        //             const dataPoint = response.data[0];
        //             if (lastTime > 0 && lastTime < parseInt(dataPoint[0])) {
        //                 const timestamp = (parseInt(dataPoint[0]) / 1000) as UTCTimestamp;
        //                 const candle = {
        //                     time: timestamp,
        //                     open: parseFloat(dataPoint[1]),
        //                     high: parseFloat(dataPoint[2]),
        //                     low: parseFloat(dataPoint[3]),
        //                     close: parseFloat(dataPoint[4])
        //                 };
        //                 const next = {
        //                     time: timestamp,
        //                     value: parseFloat(dataPoint[5]),
        //                     color: parseFloat(dataPoint[4]) < parseFloat(dataPoint[1]) ?
        //                         "rgba(255, 128, 159, 0.25)" : "rgba(107, 255, 193, 0.25)"
        //                 }
        //                 if (volumeSeries && candleSeries) {
        //                     volumeSeries.update(next);
        //                     candleSeries.update(candle);
        //                     lastTime = parseInt(dataPoint[0]);
        //                     onChange({
        //                         next,
        //                         candle
        //                     });
        //                 }
        //             }
        //         }
        //     }).catch((error: any) => {
        //         console.error(error);
        //     });
        // }, 1000 * intervalTimeout);
        isChartValid = true;

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (!chartInstance.current) return;
            isChartValid = false;
            chartInstance.current.remove();
            // clearInterval(interval);
            clearTimeout(binanceTimeoutRef.current)
        };
    }, [dataLoaded]);

    return <Flex ref={chartContainerRef} style={{ width: "100%", height: "100%", position: 'relative' }} minHeight={{ base: "250px", sm: "250px", md: "350px", lg: "350px" }} ></Flex>;

};

export default LineChart;