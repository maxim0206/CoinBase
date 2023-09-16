import { Flex, Image, useColorMode } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import pagethreesvg27 from '@/assets/images/pagethreesvg27.svg';
import pagethreesvg29 from '@/assets/images/pagethreesvg29.svg';
import {
  MyIcon,
  MyCard,
  MyContent,
  request,
  stateActions,
  useMyState,
  useMyToast,
  getMyHostname,
} from '../../../common';
import './style.scss';
import { Link, useSearchParams } from 'react-router-dom';
import MyChart from './components/LineChart';

import TransactionRecords from './components/TransactionRecords';
import OrderPart from './components/OrderPart';
import QuizzRecords from './components/QuizzRecords';
import CurrentBtcStatus from './components/CurrentBtcStatus';
import moment from 'moment';
import PKBet from './components/PKBet';
import PKTransactions from './components/PKTransactions';
import PKTopRateUsers from './components/PKTopRateUsers';
import { useSetState } from 'react-use';
import useWebSocket from 'react-use-websocket';

export default () => {
  const { colorMode } = useColorMode();
  const intl = useIntl();
  const { snap } = useMyState();
  const [betAvailable, setBetAvailable] = useState(false);
  const [oneodds, setOneodds] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const gameParamMode: string = searchParams.get('gameMode') || '';
  const [gameMode, setGameMode] = useState(['5m', '1m', 'pk'].indexOf(gameParamMode) === -1 ? '5m' : gameParamMode);
  const pkhash = searchParams.get('pkhash');

  const [btcTime, setBtcTime] = useState<number>(0);
  const [lastBtcValue, setLastBtcValue] = useState(0);
  const [quizRecords, setQuizRecords] = useState<any>([]);
  const [numBigOdd, setNumBigOdd] = useState<string>('');
  const [lotteryId, setLotteryId] = useState('');
  const [orderTimeOut, setOrderTimeOut] = useState(300);
  const [direction, setDirection] = useState('')
  const [lastInfo, setLastInfo] = useState({});
  const [lastPkLottery, setLastPkLottery] = useState({});
  const [pkInfo, setPkInfo] = useSetState<any>();
  const [pkSelectedUser, setPkSelectedUser] = useState();
  const { showError, showSuccess } = useMyToast();

  const toRefreshData = useRef(0);

  // 这里
  const getNumBigOdd = (num: number, big: boolean, odd: boolean) => {
    let res = '';
    res += !num ? '0' : num;
    res += '/';
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
  };

  const WSS_FEED_URL = `wss://ws.${getMyHostname()}/ws/lottery`;
  const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
    onOpen: () => {
      if (snap.session.user?.id) {
        sendJsonMessage({
          userid: snap.session.user.id.toString()
        });
      }
    },
    onClose: () => {},
    shouldReconnect: (closeEvent) => true,
    onMessage: (event) => processMessages(event),
  });

  const processMessages = (event: MessageEvent<any>) => {
    // parsing input socket data from backend
    const res = JSON.parse(event.data);    
    if(res.type == 'LotteryInfo'){
      // getLotteryInfo(false);
    } else if(res.type == 'MyGuessResult'){
      toRefreshData.current = (toRefreshData.current + 1) % 2;
    } else if(res.type == 'LastPkLottery'){
      setLastPkLottery(res.data);
    }
  };

  const getLotteryInfo = (dispLoading = true) => {
    if (dispLoading)
      stateActions.addLoading();
    request('lottery/info', {
      data: { min: gameMode === '5m' ? 5 : 1 },
    })
      .then((res) => {
        setOneodds(res?.data?.oneodds || {});
        if (res.data?.current?.id) {
          setLotteryId(res.data.current.id);
        }
        let timeout = res.data?.countdown
        setOrderTimeOut(timeout);

        const betAvailableTime = gameMode === '5m' ? 180 : 10;
        if (timeout > betAvailableTime) {
          setBetAvailable(true);
        } else {
          setBetAvailable(false);
        }
        const lotteryData = res.data?.prevRounds?.map((lottery: any) => {
          lottery.result = JSON.parse(lottery.result);
          return lottery;
        });
        if (lotteryData && lotteryData.length > 0) {
          setQuizRecords(lotteryData);
          const lottery = lotteryData[0].result;
          const direction = lottery?.direction;
          setNumBigOdd(
            getNumBigOdd(lottery?.number, lottery?.is_big, lottery?.is_odd),
          );
          const lotteryDt = new Date(
            new Date(moment(lotteryData[0].round_at + 'Z').format()).getTime()
          );
          setLastInfo(lotteryData?.[0]?.result?.last)
          setBtcTime(lotteryDt.getTime());
          setDirection(direction)

          setLastBtcValue(parseFloat(lottery?.open));

        } else {
          setBtcTime(0);
        }
      })
      .catch((e) => {
        // setTimeout(() => {
        //   getLotteryInfo(false);
        // }, 3000);
      });
  };

  const getPkInfo = () => {
    request('pk_lottery/pkinfo', {})
      .then(async (res: any) => {
        if (res?.data?.lastPkLottery) {
          setPkInfo(res.data);
          setLastPkLottery(res?.data.lastPkLottery);
        }

      })
      .catch((err) => {
        showError({ description: err.message });
      });
  }
  useEffect(() => {
    setQuizRecords([]);
    getLotteryInfo();
    if (gameMode == 'pk') {
      getPkInfo();
    }
    // stateActions.subLoading();
  }, [gameMode]);
  useEffect(() => {
    if (pkhash) {
      request('pk_lottery/pkaccept_by_link', {
        data: { pkhash },
      })
        .then((res) => {
          // showSuccess({ title: intl.formatMessage({ id: 'text.betPkLinkSuccess' }) });
          searchParams.delete('pkhash');
          setSearchParams(searchParams);
        })
        .catch((e) => {
          showError({ description: e.message });
        });
    }
  }, [pkhash])

  const handleGameModeChange = (mode: string) => {
    setGameMode(mode);
    setOrderTimeOut(0);
  };

  const getGameModeColor = (mode: string) => {
    return gameMode === mode
      ? '#0053ff'
      : colorMode === 'light'
        ? '#1a202c'
        : 'rgba(255, 255, 255, 0.92)';
  }

  return (
    <MyContent>
      <Flex direction='column' align='start'>
        <Flex w='full' flexWrap='wrap' className='earn-c'>
          <Flex className='earn-l-c' display='block'>
            <CurrentBtcStatus
              minuteMode={gameMode}
              btcTime={btcTime}
              lastBtcValue={lastBtcValue}
              numBigOdd={numBigOdd}
              direction={direction}
              lastInfo={gameMode == 'pk' ? lastPkLottery : lastInfo}
            />

            <MyCard sx={{ overflow: 'hidden' }} flexDirection='column' mt={3}>
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
                  <Flex
                    cursor='pointer'
                    color={getGameModeColor('5m')}
                    lineHeight='40px'
                    paddingRight='12px'
                    onClick={() => {
                      handleGameModeChange('5m');
                    }}
                  >
                    <MyIcon icon='' w='22px' fontSize='14px' lineHeight='40px' /> <FormattedMessage id='text.fiveMinutes' />
                  </Flex>
                  <Flex
                    color={getGameModeColor('1m')}
                    cursor='pointer'
                    lineHeight='40px'
                    paddingRight='12px'
                    onClick={() => {
                      handleGameModeChange('1m');
                    }}
                  >
                    | <MyIcon icon=''  w='22px' fontSize='16px' lineHeight='40px' /> <FormattedMessage id='text.oneMinute' />
                  </Flex>
                  <Flex
                    color={getGameModeColor('pk')}
                    cursor='pointer'
                    lineHeight='40px'
                    // paddingRight='12px'
                    onClick={() => {
                      handleGameModeChange('pk');
                    }}
                  >
                    | <MyIcon icon=''  w='22px' fontSize='12px' lineHeight='40px' /> PK
                  </Flex>
                </Flex>
                <Link to='/home/learn/what-is-guess'>
                  <Flex
                    alignItems={'center'}
                    fontSize='16px'
                    // paddingLeft='12px'
                    // paddingRight='12px'
                  >
                    <MyIcon icon='' fontSize='16px' w='22px'  lineHeight='40px' /> <FormattedMessage id='text.Rule' />
                  </Flex>
                </Link>
              </Flex>

              <Flex w='full' flexWrap='wrap'>
                <MyChart gameMode={gameMode} onChange={() => { }} />
              </Flex>
            </MyCard>

            <Flex
              mt={3}
              w={{ base: '100vw', sm: '100vw', md: '420px', lg: '420px' }}
              direction='row'
              justify='center'
              fontSize='16px'
              color='#fff'
              fontWeight='600'
              display={{ base: 'flex', sm: 'flex', md: 'none', lg: 'none' }}
            >
              <Link to='/home/transfer?tab=Deposit'>
                <Flex
                  w={{ base: '50vw', sm: '50vw', md: '210px', lg: '210px' }}
                  justify='center'
                  background='#0053ff'
                  py={3}
                  // borderRadius='10px 0 0 10px'
                >
                  <Image h='24px' pr={2} src={pagethreesvg29} />
                  <FormattedMessage id='text.Deposit' />
                </Flex>
              </Link>
              <Link to='/home/transfer?tab=Withdrawal'>
                <Flex
                  w={{ base: '50vw', sm: '50vw', md: '210px', lg: '210px' }}
                  justify='center'
                  background='#3773f5'
                  py={3}
                  // borderRadius='0 10px 10px 0'
                >
                  <Image h='24px' pr={2} src={pagethreesvg27} />
                  <FormattedMessage id='text.Withdrawal' />
                </Flex>
              </Link>
            </Flex>

            <MyCard mt={3} sx={{ overflow: 'hidden' }}>
              <Flex w='full' flexWrap='wrap' mt={5}>
                {
                  gameMode == 'pk' ? (
                    <PKTransactions
                      toRefresh={toRefreshData.current}
                    />
                  ) : (
                    <TransactionRecords
                      minuteMode={gameMode}
                      toRefresh={toRefreshData.current}
                    />
                  )
                }

              </Flex>
            </MyCard>
          </Flex>

          <Flex className='earn-r-c' minH={500} direction='column'>
            <Flex
              w={{ base: '100vw', sm: '100vw', md: '420px', lg: '420px' }}
              direction='row'
              justify='center'
              fontSize='16px'
              color='#fff'
              fontWeight='600'
              display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
            >
              <Link to='/home/transfer?tab=Deposit'>
                <Flex
                  w={{ base: '50vw', sm: '50vw', md: '210px', lg: '210px' }}
                  justify='center'
                  background='#0053ff'
                  py={3}
                  borderRadius='10px 0 0 10px'
                >
                  <Image h='24px' pr={2} src={pagethreesvg29} />
                  <FormattedMessage id='text.Deposit' />
                </Flex>
              </Link>
              <Link to='/home/transfer?tab=Withdrawal'>
                <Flex
                  w={{ base: '50vw', sm: '50vw', md: '210px', lg: '210px' }}
                  justify='center'
                  background='#3773f5'
                  py={3}
                  borderRadius='0 10px 10px 0'
                >
                  <Image h='24px' pr={2} src={pagethreesvg27} />
                  <FormattedMessage id='text.Withdrawal' />
                </Flex>
              </Link>
            </Flex>

            <MyCard
              direction='column'
              w='full'
              mt={{ base: -6, sm: -6, md: 3, lg: 3 }}
            >
              {
                (gameMode === 'pk') ? (
                  <PKBet
                    data={pkInfo}
                    lottery_amount={parseFloat(
                      snap.session?.user?.balance_withdrawable,
                    )}
                    selectedUser={pkSelectedUser}
                    onChange={() => {
                      toRefreshData.current = (toRefreshData.current + 1) % 2;
                    }}
                  />
                ) : (
                  <OrderPart
                    betAvailable={betAvailable}
                    minuteMode={gameMode}
                    oneodds={oneodds}
                    lotteries_id={lotteryId}
                    lottery_amount={
                      parseFloat(
                        snap.session?.user?.balance_withdrawable,
                      )}
                    orderTimeOut={orderTimeOut}
                    onTimeout={()=>{
                      getLotteryInfo(false);
                    }}
                    onChange={() => {
                        toRefreshData.current = (toRefreshData.current + 1) % 2;
                    }}
                  />
                )
              }

            </MyCard>
            <MyCard direction='column' w='full' mt={3}>
              {
                gameMode == 'pk' ? (
                  <PKTopRateUsers
                    onSelectedPkUser={(user: any) => {
                      setPkSelectedUser(user);
                    }}></PKTopRateUsers>
                ) : (
                  <QuizzRecords tdata={quizRecords} minuteMode={gameMode} />
                )
              }

            </MyCard>
          </Flex>
        </Flex>
      </Flex>
    </MyContent>
  );
};
