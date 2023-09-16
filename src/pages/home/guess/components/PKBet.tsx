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
  Input,
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
  Checkbox,
  useColorMode,
  Divider,
  Icon
} from '@chakra-ui/react';
import copy from "copy-to-clipboard";
import { Radio } from 'antd';
import { MyCardDivider, OutlineButton, formatAddress, formatURL, getMyHostname, request, useMyToast } from '@common/index';
import { FormattedMessage, useIntl } from 'react-intl';
import SliderInput from './SliderInput';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'antd';
import MyRestrictNumberInput from '@common/components/MyRestrictNumberInput';
import mobile from 'is-mobile';
import { stateActions, useMyState } from '../../../../common/state';
import '../style.scss'
import { useSetState } from 'react-use';
import AutoPkMode from '../modal/AutoPkMode';
import { CopyIcon } from '@chakra-ui/icons';
import PkLink from '../modal/PkLink';
const styles = {
  InputStyle: {
    border: "1px solid rgba(91, 97, 110, 0.66)",
    height: "35px",
    borderRadius: "8px",
  },
  RadioBetBtn: {
    _light: {
      bg: "gray.0",
      borderColor: "line",
    },
  }
};

export default ({
  data,
  onChange,
  lottery_amount,
  selectedUser,
  ...rest
}: any) => {
  const { colorMode } = useColorMode();
  const intl = useIntl();
  const { showError, showSuccess } = useMyToast();
  const [sliderValue, setSliderValue] = useState(0);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [mobBetBtnHidden, setMobBetBtnHidden] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAutoPkModeOpen, setAutoPkModeOpen] = useState(false);
  const [isPkLinkOpen, setPkLinkOpen] = useState(false);
  const { snap } = useMyState();

  const [pkInfo, setPkInfo] = useSetState<any>();
  const [pkSendInfo, setPkSendInfo] = useSetState<any>({
    receiver: -1,
    bet_amount: 0,
    bet_type: 'Random'
  });

  const allowedOptions2 = [
    {
      key: 'Random',
      label: (
        <div>
          <span style={{ fontFamily:'CoinbaseIcons'}}></span>   {intl.formatMessage({ id: 'text.Random' })}
        </div>
      ),
    },
    {
      key: 'Up',
      label: (
        <div >
          ↗ {intl.formatMessage({ id: 'text.up' })}
        </div>
      ),
    },
    {
      key: 'Down',
      label: (
        <div >
          ↙ {intl.formatMessage({ id: 'text.down' })}
        </div>
      ),
    },
  ];

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  useEffect(() => {
    if (data) {
      let users: any[] = [{
        id: -1,
        nickname: intl.formatMessage({ id: 'text.AutoMatch' })
      }];
      if (data?.myPkUsers?.length > 0) {
        
        data.myPkUsers.forEach((user: any) => {
          const oldIdx = users.findIndex((s: any) => s.id == user.to_user?.id);
          if(oldIdx == -1){
            users.push({
              id: user.to_user?.id,
              nickname: user.to_user?.nickname
            });
          }
        });
      }
      setPkInfo({
        ...data,
        myPkUsers: users
      });
    }
  }, [data]);

  useEffect(() => {
    if (selectedUser) {
      if (pkInfo?.myPkUsers?.length >= 0) {
        let nIdx = -1;
        pkInfo?.myPkUsers.forEach((user: any) => {
          if (user.id == selectedUser.user_id) {
            nIdx = user.id;
          }
        })
        if (nIdx == -1) {
          pkInfo?.myPkUsers?.unshift({
            id: selectedUser.user_id,
            nickname: selectedUser.nickname
          });
        }
        setPkSendInfo({
          receiver: selectedUser.user_id,
          bet_amount: 0,
          bet_type: 'Random'
        });
      }

    }
  }, [selectedUser])


  const betAIEarn = () => {
    setBtnLoading(true);
    request('pk_lottery/pkbet_manual', {
      data: pkSendInfo,
    })
      .then(async (res: any) => {
        stateActions.me();
        await onChange();
        setBtnLoading(false);
        setPkSendInfo({
          receiver: -1,
          bet_amount: 0,
          bet_type: 'Random'
        });
        showSuccess({ title: intl.formatMessage({ id: 'text.sendPkSuccess' }) });
        setSliderValue(0);
        if (mobile()) {
          onClose();
          setMobBetBtnHidden(false);
        }
        
      })
      .catch((err) => {
        setBtnLoading(false);
        showError({ description: err.message });
      });
  };

  const disableAutoMode = () => {
    request('pk_lottery/update_pk_settings', {
      data: {
        auto_enabled: false
      },
    })
      .then(async (res: any) => {
        setPkInfo({
          autoPkMode: {
            ...pkInfo?.autoPkMode,
            auto_enabled: false
          }
        });
        showSuccess({ title: intl.formatMessage({ id: 'text.disabledAutoPkMode' }) });
      })
      .catch((err) => {
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


  const getContent = () => {
    return (
      <>
        <Flex>
          <FormattedMessage id='text.PKReceiver'></FormattedMessage>
        </Flex>
        <Select
          value={pkSendInfo?.receiver}
          onChange={(e: any) => {
            setPkSendInfo({
              receiver: e.target.value
            });
          }}
        >
          {pkInfo?.myPkUsers?.map((option: any) => (
            <option key={option.id} value={option.id}>
              {option.nickname}
            </option>
          ))}
        </Select>

        <Flex mt={4}>
          <FormattedMessage id='text.Amount'></FormattedMessage> (USDC)
        </Flex>

        <NumberInput
          value={pkSendInfo?.bet_amount}
          max={lottery_amount}
          precision={2}
          step={0.1}
          onChange={(valueString: any) => {
            if (!valueString) {
              setPkSendInfo({
                bet_amount: 0,
              });
              setSliderValue(0);
              return;
            }
            setPkSendInfo({
              bet_amount: parseFloat(valueString),
            });
            const amount = parseFloat(lottery_amount as string);
            if (amount == 0) {
              setSliderValue(0);
            } else {
              const sliderVal = (parseFloat(valueString) / amount) * 100;
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
                setPkSendInfo({
                  bet_amount: parseFloat(((lottery_amount * val) / 100).toFixed(2)),
                });
              } else {
                setPkSendInfo({
                  bet_amount: 0,
                });
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
          <FormattedMessage id='text.BetType'></FormattedMessage>
        </Flex>
        <Radio.Group
          buttonStyle="solid"
          onChange={(e: any) => {
            setPkSendInfo({
              bet_type: e.target.value,
            });
          }}
          value={pkSendInfo?.bet_type}
          style={{ width: '100%' }}
          className='order_radio_group'
        >
          {allowedOptions2.map((option: any) => (
            <Radio.Button
              key={option.key}
              value={option.key}
              style={{
                background: colorMode === 'light' ? (pkSendInfo?.bet_type === option.key ? 'rgb(55, 115, 245)' : '#DDD') : (pkSendInfo?.bet_type === option.key ? 'rgb(55, 115, 245)' : '#FFF'),
                padding: "0",
                margin: "1.5%",
                borderRadius: '500px',
                width: '30%',
                border: 'none'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                {option.label}
                <span style={{ color: colorMode === 'light' ? 'rgb(0, 0, 0, 0.85)' : '#fff' }}>(1 : {pkInfo?.pkodds ? pkInfo?.pkodds[option.key] : '-'})</span>
              </div>
            </Radio.Button>
          ))}
        </Radio.Group>

        <Flex mt={4} mb={4}>
          <FormattedMessage id='text.AvailableAmount'></FormattedMessage> (
          {lottery_amount ? lottery_amount.toFixed(2) : '0'})
        </Flex>


        <Button
          style={{
            background:
              lottery_amount == 0
                ? '#999'
                : '#ca4064',
            color:
              lottery_amount == 0
                ? '#DDD'
                : 'white',
            marginTop: '5px',
            width: '100%',
            borderWidth: '0px',
            borderRadius: '25px',
          }}
          loading={isBtnLoading}
          disabled={lottery_amount == 0}
          onClick={() => {
            if (lottery_amount == 0) return;
            betAIEarn();
          }}
        >
          <FormattedMessage id='text.SendPK'></FormattedMessage>
        </Button>

        <Flex justifyContent="space-between" mt={2}>
          <Flex mt={2}>
            <Checkbox
              style={{
                color: colorMode == 'light' ? 'black' : 'white'
              }}
              isChecked={pkInfo?.autoPkMode?.auto_enabled}
              onChange={(e) => {
                const val = e.target.checked;
                setPkInfo({
                  autoPkMode: {
                    ...pkInfo?.autoPkMode,
                    auto_enabled: !val
                  }
                });
                if (val) {
                  setAutoPkModeOpen(true);
                } else {
                  disableAutoMode();
                }
                // setPkInfo({
                //   autoPkMode: e
                // })
              }}
            >
              <FormattedMessage id='text.autoPkMode'></FormattedMessage>
            </Checkbox >
          </Flex>
          <Flex mt={2} color='#8c8c8c8f'>
            <FormattedMessage id='text.Rates'></FormattedMessage>
            <Text border={'1px dashed #8c8c8c8f'} borderRadius={3} px={1} ml={2}>
              0.2%
            </Text>
          </Flex>

        </Flex>


        <Flex mt={6}>
          <MyCardDivider />
        </Flex>


        <Flex mt={4} alignItems='center'>
          <FormattedMessage id='text.SharePkLink'></FormattedMessage>
          <Button
            style={{
              background: '#3773f5',
              color: 'white',
              marginLeft: '5px',
              marginTop: '5px',
              borderWidth: '0px',
              borderRadius: '25px',
            }}
            onClick={() => {
              setPkLinkOpen(true);
            }}
            type='primary'>
            <FormattedMessage id='text.GenerateLink' />
          </Button>
        </Flex>
        <Flex
          sx={styles.InputStyle}
          pl={4}
          mt={2}
          w={{ base: "100%", sm: "100%", md: "400px", lg: "400px" }}
          alignItems="center"
        >
          <Input
            variant="unstyled"
            readOnly={true}
            value={pkInfo?.pkLinkInfo?.hash ? formatURL(`https://${getMyHostname()}/home/guess?gameMode=pk&pkhash=` + pkInfo?.pkLinkInfo?.hash, 20) : ''}
            placeholder={intl.formatMessage({ id: "text.PKLink" })}
          />
          <Flex>
            <OutlineButton
              onClick={() => {
                if (pkInfo?.pkLinkInfo?.hash) {
                  copy(`https://${getMyHostname()}/home/guess?gameMode=pk&pkhash=` + pkInfo?.pkLinkInfo?.hash);
                  showSuccess({ title: <FormattedMessage id="text.Copied" /> });
                }

              }}
            >
              <Icon as={CopyIcon} />
            </OutlineButton>
          </Flex>
        </Flex>

        <AutoPkMode
          pkInfo={pkInfo?.autoPkMode}
          isOpenModal={isAutoPkModeOpen}
          onCloseModal={(enabled: boolean) => {
            if (enabled) {
              setPkInfo({
                autoPkMode: {
                  ...pkInfo?.autoPkMode,
                  auto_enabled: true
                }
              });
            }
            setAutoPkModeOpen(false);
          }} />
        <PkLink
          pkLinkInfo={pkInfo?.pkLinkInfo}
          isOpenModal={isPkLinkOpen}
          betTypes={allowedOptions2}
          pkodds={pkInfo?.pkodds}
          onCloseModal={(linkInfo: any) => {
            setPkLinkOpen(false);
            if (linkInfo) {
              setPkInfo({
                pkLinkInfo: linkInfo
              })
            }
          }} />
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
              background: '#ca4064',
              color: 'white',
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
            <FormattedMessage id='text.SendPK'></FormattedMessage>&nbsp;
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
