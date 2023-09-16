import {
  Button,
  Checkbox,
  Flex,
  Image,
  Text,
  Input,
  Center,
  Spacer,
  Radio,
  RadioGroup,
  Switch,
  Stack,
  Wrap,
  Box,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";

import QRCode from "antd/es/qrcode";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  CloseButton
} from '@chakra-ui/react'

import {
  ArrowBackIcon
} from '@chakra-ui/icons'
import React from "react";
import { PrimaryButton } from "@common/index";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router";
import MyMessageSvg from '/img/message.svg';
// import { useAccount, useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import { stateActions } from "@common/index";
import { code } from "@uiw/react-md-editor";
import { request, useMyToast } from "@common/index";
import Fee from '@/assets/images/fee.svg';
import MoneyImg from '@/assets/images/usdc.svg';
import EthBadge from '@assets/images/eth-logo.svg';
import PolygonBadge from '@assets/images/matic-logo.svg';
import { formatMoney, useMyState } from "@common/index";
import { computeAddress } from "ethers/lib/utils.js";
import FirstStakeIncentive from "@pages/home/help/First-stake-incentive";

import BANK from '@/assets/images/VND.svg';
import ERC20 from '@/assets/images/ETH.svg';
import POLYGON from '@/assets/images/matic-logo.svg';
import TRC20 from '@/assets/images/TRX.svg';
import USDC from '@/assets/images/usdc.svg';
import USDT from '@/assets/images/USDT.svg';

const withMethodImg: any = {
  BANK,
  ERC20,
  POLYGON,
  TRC20
};

const styles = {
  body: {
    padding: '20px',
    flexDirection: 'row'
  },
  textInput: {
    border: '1px solid #000',
    width: '50px'
  },
  MPointer: {
    cursor: 'pointer',
  },
  ArrowBackIcon: {
    position: 'absolute',
  },
  button: {
    border: '1px solid #000'
  },
  tdbackground: {
    backgroundColor: '#2A2B30'
  }
};


export default ({ Amount, network, bankName, onClose, onChange, enable2FA, tdata }: any) => {
  const navigate = useNavigate();
  // const { chain } = useNetwork();
  // const { address, connector } = useAccount();
  const [useFree, setUseFree] = useState(false);
  const [codevalue, setCodeValue] = useState('');
  const [isEnable2FA, setIsEnable2FA] = useState(enable2FA);
  const [isToEnable2FA, setIsToEnable2FA] = useState(!enable2FA);
  const { showSuccess, showError, showRes } = useMyToast();
  const [authonticatoryKey, setAuthonticatoryKey] = useState('');
  const { snap } = useMyState();
  const userInfo = snap.session.user;
  // const [source, setSource] = useState(
  //   chain?.name === 'Ethereum' ? EthBadge : PolygonBadge,
  // );

  const intl = useIntl();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {

  }, [network]);
  useEffect(() => {
    if (!enable2FA) {
      request('google2fa/api_2fa_secret_key', {})
        .then((res) => {
          setAuthonticatoryKey(res?.data?.key);
        }).catch(showRes);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e: any) => {
    setCodeValue(e.target.value);
  }

  const onClickWithdraw = () => {
    if (codevalue === '') {
      showError({ description: intl.formatMessage({ id: 'transfer.gauth.verifyError' }) });
    }
    else {
      request('google2fa/api_2fa_secret_check', { data: { verifyCode: codevalue } })
        .then((res) => {
          if (res.data['result'] == 1) {
            onChange(tdata?.canFree);
          }
          else {
            showError({ description: intl.formatMessage({ id: 'transfer.gauth.verifyError' }) });
            setCodeValue('');
          }
        }).catch(showRes);
    }
  }

  return (
    <AlertDialogContent
      maxW="full"
      w={isSmallScreen ? "100%" : "600px"}
      borderRadius={'20px'} backgroundColor={'#1F2024'}
      padding="20px"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#1F2024",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "gray",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        },
      }}
    >
      <AlertDialogHeader fontSize='lg' fontWeight='bold' borderRadius={'20px'}>
        <Flex>
          <ArrowBackIcon w={8} h={8} color="white"
            onClick={() => {
              if (enable2FA === 0 && isEnable2FA === true) {
                setIsEnable2FA(!isEnable2FA);
                setIsToEnable2FA(!isToEnable2FA);
              }
              else {
                onClose();
              }
            }} />
          <Spacer />
          <Text
            color={'white'}
            overflowWrap={'break-word'}
            display={'inline'}
            textAlign="justify"
          >
            <FormattedMessage id='transfer.gauth.title.Withdraw_USDC'></FormattedMessage>
          </Text>
          <Spacer />
          <CloseButton color="white" onClick={onClose} />
        </Flex>
      </AlertDialogHeader>
      <AlertDialogBody>
        <Table color={'white'} size='sm' fontSize={12} variant="simple" style={{ width: '100%', tableLayout: 'fixed' }}>
          <Tbody border={'1px solid gray'} fontSize={8}>
            <Tr>
              <Td border={'1px solid gray'} w="111px">
                <Text
                  overflowWrap={'break-word'} whiteSpace={'normal'}
                >
                  <FormattedMessage id={network == 'BANK' ? 'text.Bank' : 'transfer.gauth.table.Network'}></FormattedMessage>
                </Text>
              </Td>
              <Td border={'1px solid gray'} style={styles.tdbackground}>
                {
                  network == 'BANK' ?
                    (
                      <Flex>
                        <Flex>
                          <Text textAlign='center' marginTop={'2px'} overflowWrap={'break-word'} whiteSpace={'normal'}>
                            {/* {chain?.name} */}
                            {bankName}
                          </Text>
                        </Flex>
                      </Flex>
                    ) : (
                      <Flex>
                        <Image borderRadius='full' w='20px' h='20px' src={withMethodImg[network]} />
                        <Flex>
                          <Text textAlign='center' marginTop={'2px'} overflowWrap={'break-word'} whiteSpace={'normal'}>
                            {/* {chain?.name} */}
                            {network}
                          </Text>
                        </Flex>
                      </Flex>
                    )
                }
              </Td>
            </Tr>
            <Tr>
              <Td border={'1px solid gray'}>
                <Text
                  overflowWrap={'break-word'} whiteSpace={'normal'}
                >
                  <FormattedMessage id='transfer.gauth.table.Destination'></FormattedMessage>
                </Text>
              </Td>
              <Td border={'1px solid gray'} style={styles.tdbackground}>
                {network == 'BANK' ? userInfo.card_no : (network == 'ERC20') ? userInfo.erc_address : (network == 'POLYGON') ? userInfo.polygon_address : userInfo.trc_address}
              </Td>
            </Tr>
            <Tr>
              <Td border={'1px solid gray'}>
                <Text
                  overflowWrap={'break-word'} whiteSpace={'normal'}
                >
                  <FormattedMessage id='transfer.gauth.table.Amount'></FormattedMessage>
                </Text>
              </Td>
              <Td border={'1px solid gray'} style={styles.tdbackground}>
                <Flex>
                  <Image w='20px' h='20px' pr='5px' src={network == 'BANK' ? BANK : MoneyImg} />
                  {
                    network == 'BANK' ? (
                      <Text textAlign='center' marginTop={'2px'} overflowWrap={'break-word'} whiteSpace={'normal'}>{formatMoney(Amount, '')} VND </Text>
                    ) : (
                      <Text textAlign='center' marginTop={'2px'} overflowWrap={'break-word'} whiteSpace={'normal'}>{formatMoney(Amount, '')} USDC </Text>
                    )
                  }

                </Flex>
              </Td>
            </Tr>
            <Tr>
              <Td border={'1px solid gray !important'}>
                <Text
                  overflowWrap={'break-word'} whiteSpace={'normal'}
                >
                  <FormattedMessage id='transfer.gauth.table.Fee'></FormattedMessage>
                </Text>
              </Td>
              <Td border={'1px solid gray !important'} style={styles.tdbackground}>
                <Flex>
                  <Image w='20px' h='20px' pr='5px' src={Fee} />
                  <Text textAlign='center' marginTop={'2px'} overflowWrap={'break-word'} whiteSpace={'normal'}>{network == 'BANK' ? '0.0' : formatMoney(tdata?.fee, '')} </Text>
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        {
          isToEnable2FA ?
            <>
              <Flex>
                <Text
                  overflowWrap={'break-word'}
                  display={'inline'}
                  color={'white'}
                  textAlign="justify"
                  fontSize="14px"
                  marginTop="10px"
                >
                  &nbsp;&nbsp;<FormattedMessage id='transfer.gauth.codeText'></FormattedMessage>
                </Text>
              </Flex>
              <Flex flexDirection={isSmallScreen ? 'column' : 'row'}>
                <Flex flexDirection={'column'}>
                  <Flex maxWidth={"100%"}>
                    <Spacer />
                    <QRCode value={`otpauth://totp/${userInfo?.username ?? ''} - Ai Earn?secret=` + authonticatoryKey} color='white' />
                    <Spacer />
                  </Flex>
                  <Flex w="182px" alignSelf='center'>
                    <Input
                      placeholder="-"
                      maxLength={60}
                      value={authonticatoryKey}
                      color={'white'}
                      isDisabled
                      fontSize="14px"
                    />
                  </Flex>
                </Flex>
                <Flex flexDirection={'column'} marginLeft="10px" alignSelf={'center'}>
                  <Flex marginTop={3}>
                    <Text
                      overflowWrap={'break-word'}
                      display={'inline'}
                      color={'white'}
                      textAlign="justify"
                      fontSize="14px"
                    >
                      <FormattedMessage id='transfer.gauth.text1'></FormattedMessage>
                    </Text>
                  </Flex>

                  <Flex marginTop={6}>
                    <Text
                      overflowWrap={'break-word'}
                      display={'inline'}
                      color={'white'}
                      textAlign="justify"
                      fontSize="14px"
                    >
                      <FormattedMessage id='transfer.gauth.text2'></FormattedMessage>
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </>
            : null
        }
        {
          isEnable2FA ?
            <>
              <Flex alignItems={"center"} marginTop={4}>
                <Spacer />
                <Image src={MyMessageSvg} width={50} height={50} />
                <Input width={150} marginLeft={2} color={'white'} value={codevalue} onChange={handleChange} />
                <Spacer />
              </Flex>

              <Flex marginTop={1}>
                <Spacer />
                <Text
                  whiteSpace={'nowrap'}
                  display={'inline'}
                  color={'white'}
                >
                  <FormattedMessage id='transfer.gauth.text3'></FormattedMessage>
                </Text>
                <Spacer />
              </Flex>
            </>
            : null
        }
      </AlertDialogBody>

      <Flex marginTop={4}>
        {
          !isEnable2FA ?
            <>
              <Button marginLeft={2} marginRight={1} flex={1} borderRadius={0} backgroundColor={'#747474'} color={'black'} fontSize={10}
                onClick={() => {
                  onChange(tdata?.canFree);
                }}
              >
                <FormattedMessage id='transfer.gauth.title.Withdraw_USDC_without_2FA' />
              </Button>
              <Button marginLeft={1} marginRight={2} flex={1} borderRadius={0} backgroundColor={'#3772F4'} color={'white'} fontSize={10}
                onClick={() => {
                  setIsEnable2FA(!isEnable2FA);
                  setIsToEnable2FA(!isToEnable2FA);
                }}>
                <FormattedMessage id='transfer.gauth.title.Withdraw_USDC_with_2FA' />
              </Button>
            </>
            :
            <>
              <Button marginLeft={1} marginRight={2} flex={1} borderRadius={0} backgroundColor={'#3772F4'} color={'white'} fontSize={10}
                onClick={() => onClickWithdraw()}>
                <FormattedMessage id='transfer.gauth.title.Withdraw_USDC' />
              </Button>
            </>
        }

      </Flex>

    </AlertDialogContent >
  );
};
