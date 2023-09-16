import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Slider,
  SliderMark,
  SliderTrack,
  SliderThumb,
  Text,
  Select,
  SliderFilledTrack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useColorMode
} from '@chakra-ui/react';
import { Radio } from 'antd';
import { MyCardDivider, request, useMyToast } from '@common/index';
import { FormattedMessage, useIntl } from 'react-intl';
import SliderInput from './SliderInput';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import MyRestrictNumberInput from '@common/components/MyRestrictNumberInput';
import mobile from 'is-mobile';
import { stateActions } from '../../../../common/state';
import '../style.scss'

export default ({
  lotteries_id,
  onChange,
  onTimeout,
  betAvailable,
  lottery_amount,
  orderTimeOut,
  onRefreshData,
  minuteMode,
  oneodds,
  ...rest
}: any) => {
  const { colorMode } = useColorMode();
  const intl = useIntl();
  const { showError, showSuccess } = useMyToast();
  const TTabs = [intl.formatMessage({ id: 'text.ThisRound' })];
  const [counterNum, setCounterNum] = useState<any>(0);
  const intervalRef = useRef<any>(null);
  const [betTimeAvailable, setBetTimeAvailable] = useState(betAvailable);
  const [sliderValue, setSliderValue] = useState(0);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [betType, setBetType] = useState('No0');
  const [myAvailable, setMyAvailable] = useState(true);
  const [doneBetTypes, setDoneBetTypes] = useState<any>([]);
  const [mobBetBtnHidden, setMobBetBtnHidden] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const allowedOptions2 = [
    {
      key: 'up',
      label: "↗ " + intl.formatMessage({ id: 'text.up' }),
      odds: oneodds?.up || '-',
    },
    {
      key: 'flat',
      label: "↔ " + intl.formatMessage({ id: 'text.flat' }),
      odds: oneodds?.flat || '-',
    },
    {
      key: 'down',
      label: "↙ " + intl.formatMessage({ id: 'text.down' }),
      odds: oneodds?.down || '-',
    },
  ];
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
    { key: 'Odd', label: intl.formatMessage({ id: 'text.Odd' }) },
  ];

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  useEffect(() => {
    if (minuteMode === '5m') {
      setBetType('No0');
    } else {
      setBetType('up');
    }
  }, [minuteMode]);

  const checkBetTypes = () => {
    if (!lotteries_id) return;
    setDoneBetTypes([]);
    let tmpData: any[] = [];
    (async () => {
      await request('lottery/my', {
        data: {
          type: minuteMode === '5m' ? 'FiveMinutes' : 'OneMin',
        },
      }).then((res) => {
        if (res?.data) {
          res.data.forEach((item: { lotteries_id: any; bet_type: any }) => {
            if (item.lotteries_id == lotteries_id) {
              tmpData.push(item.bet_type);
            }
          });
          setDoneBetTypes(tmpData);
          if (tmpData.indexOf(betType) != -1) {
            setMyAvailable(false);
          } else {
            setMyAvailable(true);
          }
        }
      });
    })();
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkBetTypes();
    };
    fetchData();
  }, [lotteries_id]);

  const initInterval = (timeout: number) => {
    let newTimeOut = timeout;
    intervalRef.current = setInterval(async () => {
      newTimeOut = newTimeOut - 1;
      if (newTimeOut < 0) {
        newTimeOut = minuteMode === '5m' ? 299 : 59;
        setBetTimeAvailable(true);
      } else if (newTimeOut == 0) {
        onTimeout();
      }
      setCounterNum(newTimeOut);
      const betAvailableTime = minuteMode === '5m' ? 180 : 10;
      if (newTimeOut >= betAvailableTime) {
        setBetTimeAvailable(true);
      } else {
        setBetTimeAvailable(false);
      }
    }, 1000);
  };

  useEffect(() => {
    clearInterval(intervalRef.current);
    setMyAvailable(true);
    initInterval(orderTimeOut);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [orderTimeOut]);

  // useEffect(() => {
  //   discountTime = totalTime;
  //   console.log('discountTime', discountTime);
  //   const discountInterval = setInterval(() => {
  //     console.log('discountTimeInterval', discountTime);
  //     // if(discountTime >= 180){
  //     //   setMyAvailable(true);
  //     // }else{
  //     //   setMyAvailable(false);
  //     // }
  //     // if(discountTime <= 0){
  //     //   onRefreshData();
  //     //   return;
  //     // }
  //     discountTime -= 1;
  //     setDiscountLabel(secondsToMin(discountTime));
  //   }, 1000);
  //   return () => {
  //     clearInterval(discountInterval);
  //   }

  // }, [totalTime]);

  const betAIEarn = () => {
    request(minuteMode === '5m' ? 'lottery/bet' : 'lottery/betfor1min', {
      data: {
        lotteries_id,
        bet_type: betType,
        bet_amount: betAmount,
      },
    })
      .then(async (res: any) => {
        stateActions.me();
        await onChange();
        showSuccess({ title: intl.formatMessage({ id: 'text.betsuccess' }) });
        checkBetTypes();
        setMyAvailable(false);
        setBetAmount(0);
        setBetType(minuteMode === '5m' ? 'No0' : 'up');
        setSliderValue(0);
        if (mobile()) {
          onClose();
          setMobBetBtnHidden(false);
        }
      })
      .catch((err) => {
        setMyAvailable(true);
        showError({ description: err.message });
      });
  };

  const getSliderValueString = (sliderVal: number) => {
    const fixedVal = parseInt(sliderVal.toString());
    if (sliderVal - fixedVal == 0) {
      return parseInt(sliderVal.toString());
    } else {
      return sliderVal.toFixed(2);
    }
  };

  const str_pad_left = (
    string: number,
    pad: string | undefined,
    length: number,
  ) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };
  const secondsToMin = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    const finalTime =
      str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
    return finalTime;
  };

  const counterDown = useMemo(() => {
    return secondsToMin(counterNum) || '00:00';
  }, [counterNum]);

  const getContent = () => {
    return (
      <>
        <Flex>
          <FormattedMessage id='text.SelectedNumber'></FormattedMessage>
        </Flex>
        {/* <MyRestrictNumberInput
            allowedOptions={allowedOptions}>
          </MyRestrictNumberInput> */}
        {minuteMode === '5m' ? (
          <Select
            value={betType}
            onChange={(e: any) => {
              setBetType(e.target.value);
              if (doneBetTypes.indexOf(e.target.value) != -1) {
                setMyAvailable(false);
              } else {
                setMyAvailable(true);
              }
            }}
          >
            {allowedOptions1.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : (
          <Radio.Group
            buttonStyle="solid"
            onChange={(e: any) => {
              setBetType(e.target.value);
              if (doneBetTypes.indexOf(e.target.value) !== -1) {
                setMyAvailable(false);
              } else {
                setMyAvailable(true);
              }
            }}
            value={betType}
            style={{ width: '100%' }}
            className='order_radio_group'
          >
            {allowedOptions2.map((option: any) => (
              <Radio.Button
                key={option.key}
                value={option.key}
                style={{
                  background: colorMode === 'light' ? (betType === option.key ? 'rgb(55, 115, 245)' : '#DDD') : (betType === option.key ? 'rgb(55, 115, 245)' : '#FFF'),
                  margin: "1.5%",
                  borderRadius: '500px',
                  width: '30%',
                  border: 'none'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  {option.label} <br /><span style={{ color: colorMode === 'light' ? 'rgb(0, 0, 0, 0.85)' : '#fff' }}>(1 : {option.odds})</span>
                </div>
              </Radio.Button>
            ))}
          </Radio.Group>
        )}
        {/* <NumberInput >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput> */}

        <Flex mt={4}>
          <FormattedMessage id='text.Amount'></FormattedMessage> (USDC)
        </Flex>

        <NumberInput
          value={betAmount}
          max={lottery_amount}
          precision={2}
          step={0.1}
          onChange={(valueString: any) => {
            if (!valueString) {
              setBetAmount(0);
              setSliderValue(0);
              return;
            }
            setBetAmount(parseFloat(valueString));
            const amount = parseFloat(lottery_amount as string);
            if (amount == 0) {
              setSliderValue(0);
            } else {
              const sliderVal = (betAmount / amount) * 100;
              setSliderValue(sliderVal);
            }
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Box pt={10} pb={2} ml={6} w='90%'>
          <Slider
            aria-label='slider-ex-6'
            onChange={(val) => {
              if (val) {
                setSliderValue(val);
                setBetAmount(
                  parseFloat(((lottery_amount * val) / 100).toFixed(2)),
                );
              } else {
                setBetAmount(0);
              }
            }}
            defaultValue={0}
            value={sliderValue}
            focusThumbOnChange={false}
          >
            <SliderMark value={25} {...labelStyles}>
              25%
            </SliderMark>
            <SliderMark value={50} {...labelStyles}>
              50%
            </SliderMark>
            <SliderMark value={75} {...labelStyles}>
              75%
            </SliderMark>
            <SliderMark
              value={sliderValue}
              textAlign='center'
              color={colorMode == 'dark' ? 'white' : 'black'}
              mt='-10'
              ml='-5'
              w='12'
            >
              {getSliderValueString(sliderValue)}%
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>

        <Flex mt={4}>
          <FormattedMessage id='text.AvailableAmount'></FormattedMessage> (
          {lottery_amount ? lottery_amount.toFixed(2) : '0'})
        </Flex>
        <Flex mt={6} mb={6}>
          <MyCardDivider />
        </Flex>
        <Button
          style={{
            background:
              !betTimeAvailable || lottery_amount == 0 || !myAvailable
                ? '#999'
                : '#ca4064',
            color:
              !betTimeAvailable || lottery_amount == 0 || !myAvailable
                ? '#DDD'
                : 'white',
            marginTop: '5px',
            width: '100%',
            borderWidth: '0px',
            borderRadius: '25px',
          }}
          disabled={!betTimeAvailable || lottery_amount == 0 || !myAvailable}
          onClick={() => {
            if (!betTimeAvailable) return;
            if (lottery_amount == 0) return;
            if (!myAvailable) return;
            setMyAvailable(false);
            betAIEarn();
          }}
        >
          <FormattedMessage id='text.ConfirmOrder'></FormattedMessage>&nbsp;
          {' (' + counterDown + ')'}
        </Button>
        <Flex mt={2} color='#8c8c8c8f'>
          <FormattedMessage id='text.Rates'></FormattedMessage>
          <Text border={'1px dashed #8c8c8c8f'} borderRadius={3} px={1} ml={2}>
            0.2%
          </Text>
        </Flex>
      </>
    );
  };
  if (mobile()) {
    return (
      <>
        <Flex
          justifyContent='center'
          w='full'
          zIndex={999}
          display={{
            base: mobBetBtnHidden ? 'none' : 'block',
            sm: 'block',
            md: 'none',
            lg: 'none',
          }}
          position='fixed'
          p='4'
          bottom='0'
          left='0'
          background='#5656567d'
          backdropFilter='blur(5px)'
        >
          <Button
            style={{
              background: !betTimeAvailable ? '#999' : '#ca4064',
              color: !betTimeAvailable ? '#DDD' : 'white',
              marginTop: '5px',
              width: '100%',
              borderWidth: '0px',
              borderRadius: '25px',
            }}
            onClick={() => {
              setMobBetBtnHidden(true);
              onOpen();
            }}
          >
            <FormattedMessage id='text.ConfirmOrder'></FormattedMessage>&nbsp;
            {' (' + counterDown + ')'}
          </Button>
        </Flex>
        <Modal
          isOpen={isOpen}
          motionPreset='slideInBottom'
          onClose={() => {
            onClose();
            setMobBetBtnHidden(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            style={{
              position: 'fixed',
              bottom: 0,
              paddingBottom: 0,
              marginBottom: 0,
            }}
          >
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>{getContent()}</ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <Tabs w='full' {...rest}>
        <TabList>
          <Tab>
            <FormattedMessage id='text.OrderView'></FormattedMessage>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{getContent()}</TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
};
