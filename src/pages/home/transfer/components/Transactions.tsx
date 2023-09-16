import { Button, Divider, Image, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  MyCard,
  MyIcon,
  TextCardHeader,
  formatAddress,
  formatCoins,
  getDateAll,
  numberWithCommas,
  request,
  useMyState,
} from '../../../../common';
import MyNoActivity from '../../../../components/NoActivity';
import EnclosedTab from './EnclosedTab';
import Vietcombank from '@/assets/images/Vietcombank-small.svg';
import Vietinbank from '@/assets/images/Vietinbank-1.svg';
import MBbank from '@/assets/images/MBbank-1.svg';
import ACB from '@/assets/images/ACB-small.svg';
import BIDV from '@/assets/images/BIDV-1.svg';
import ERC20 from '@/assets/images/ETH.svg';
import POLYGON from '@/assets/images/matic-logo.svg';
import QR from '@/assets/images/QR.svg';
import TRC20 from '@/assets/images/TRX.svg';
import { Web3TransactionsStatusEnum } from '@consts/Enums';
import StakingLogs from './StakingLogs';
import { CryptoQRCode } from '../modal/CryptoQRCode';


const styles = {
  withdrawBtn: {
    width: '35px',
    height: '35px',
    borderRadius: '100%',
    backgroundColor: '#f5f5f5',
    _dark: {
      background: 'none',
      border: '1px solid #ffffff29',
      color: '#5b616e',
    },
  },
};

export default ({ data, api, bankCodes, onCancel }: any) => {
  const { snap } = useMyState();
  const [items, setItems] = useState([]);
  const [curDataType, setCurDataType] = useState('Deposit');
  const intl = useIntl();
  const {
    isOpen: isSelectOpen,
    onOpen: onSelectOpen,
    onClose: onSelectClose,
  } = useDisclosure();
  const [cryptoPayData, setCryptoPayData] = useState<any>({});
  
  useEffect(() => {
    setItems(data ? data[curDataType] : []);
  }, [data]);

  const bankImg: any = {
    Vietinbank,
    Vietcombank,
    MBbank,
    ACB,
    BIDV,
    ERC20,
    TRC20,
    POLYGON
  };

  const getStatusColor = (value: string) => {
    let retVal = 'inherit';
    Web3TransactionsStatusEnum.forEach((val) => {
      if (val[0] == value) {
        retVal = val[1];
      }
    });
    return retVal;
  }

  return (
    <MyCard flexDir='column'>
      <TextCardHeader>
        <FormattedMessage id='text.Transactions' />
      </TextCardHeader>
      <Divider />
      <Flex px={6} py={5} flexDir='column'>
        <EnclosedTab
          onChange={(e: string) => {
            setCurDataType(e);
            setItems([]);
            api.getTransactions(e);
            // setItems(data?.[e] ?? []);
          }}
        />
        {
          (curDataType == 'Staking') ? (
            <StakingLogs></StakingLogs>
          ) : (
            <>
              {items?.length > 0 ? (
                items?.map((res: any, index: number) => {
                  const third_request_json = res?.detail?.api_request_json ? JSON.parse(res.detail?.api_request_json) : null;
                  const bankIdx = third_request_json ? bankCodes.findIndex((s: any) => s.value == third_request_json.bankCode) : -1;
                  let bankName = bankIdx != -1 ? bankCodes[bankIdx].name : '';
                  const isCrypto = (res.symbol == 'USDC' || res.symbol == 'USDT');
                  if (isCrypto) {
                    bankName = res.network;
                  } else if (!bankName) {
                    bankName = intl.formatMessage({ id: 'text.Bank' });
                  }
                  return (
                    <Flex key={`wits_${index}`} alignItems='center' mt={6}>
                      <Flex flexDir='column' textAlign='center'>
                        <Text w='full' lineHeight='20px'>
                          {getDateAll(res?.created_at, 'month')}
                        </Text>
                        <Text w='full'> {getDateAll(res?.created_at, 'day')}</Text>
                      </Flex>
                      <Flex
                        sx={styles.withdrawBtn}
                        alignItems='center'
                        justifyContent='center'
                        mx={4}
                      >

                        <MyIcon icon={curDataType == 'Deposit' ? '' : ''} fontSize='12px' />
                      </Flex>
                      <Flex flexDir='column'>
                        <Text
                          fontWeight='var(--cds-fontWeights-medium)'
                          lineHeight='20px'
                          w={{ base: '82px', sm: '82px', md: '110px', lg: '110px' }}
                        >
                          {numberWithCommas(
                            (curDataType == 'Withdrawal' && res?.symbol == 'VND') ? res?.to_amt : res?.from_amt + '', 0)} &nbsp;

                          {res?.symbol}
                        </Text>
                      </Flex>
                      {
                        (curDataType == 'Withdrawal') ?
                          (
                            <Flex
                              alignItems='start'
                              pl={{ base: 1, sm: 1, md: 3, lg: 3 }}
                              display={{ base: 'none', sm: 'none', md: 'inherit', lg: 'inherit' }}
                            >
                              <Text
                                pr={{ base: 2, sm: 2, md: 4, lg: 4 }}
                                ml={{ base: 1, sm: 2, md: 3, lg: 3 }}
                                fontWeight='410'
                                w={{ base: '82px', sm: '82px', md: '110px', lg: '110px' }}
                              >
                                {bankName}
                              </Text>
                            </Flex>
                          ) : (
                            <Flex
                              alignItems='start'
                              pl={{ base: 1, sm: 1, md: 3, lg: 3 }}
                            >
                              <Image w='80px' h='30px' src={bankImg[bankName]} />
                              <Text
                                pr={{ base: 2, sm: 2, md: 4, lg: 4 }}
                                ml={{ base: 1, sm: 2, md: 3, lg: 3 }}
                                display={{ base: 'none', sm: 'none', md: 'inherit', lg: 'inherit' }}
                                fontWeight='410'
                                w={{ base: '82px', sm: '82px', md: '110px', lg: '110px' }}
                              >
                                {bankName}
                              </Text>
                            </Flex>
                          )
                      }
                      <Flex
                        flex='1'>
                        <Flex
                          flex='1'
                          alignItems={'center'}
                          justifyContent={'center'}
                          cursor={'pointer'}
                          onClick={() => {
                            if (res.status === 'WAITING' && res.network !== 'VND') {
                              setCryptoPayData({
                                ...res?.detail,
                                network: res?.network,
                                symbol: res?.symbol
                              });
                              onSelectOpen();
                            }
                          }}
                        >
                          <>
                            {(curDataType == 'Deposit' || curDataType == 'Withdrawal') ?
                              (
                                <Text color={getStatusColor(res?.status)}>
                                  <FormattedMessage id={`text.` + res?.status} />{' '}
                                </Text>
                              ) : (
                                <Text color={getStatusColor(res?.pending_status)}>
                                  <FormattedMessage id={`text.` + res?.pending_status} />{' '}
                                </Text>
                              )
                            }
                          </>
                          
                        </Flex>
                        <Flex
                          textAlign='right'
                          flexDir='column'
                          flex={1}
                        >
                          <Text
                            w='full'
                            lineHeight='20px'
                            fontWeight='var(--cds-fontWeights-medium)'
                          ></Text>
                          <Flex flexDir='column'>
                            {
                              (curDataType == 'Deposit') ? (
                                <Text w='full' sx={{ fontSize: '1rem' }}>
                                  +{formatCoins(res?.to_amt, 'USDC')}
                                </Text>
                              ) : (
                                (curDataType == 'Withdrawal') ? (
                                  <Text w='full' sx={{ fontSize: '1rem' }}>
                                    +{formatCoins(res?.from_amt, 'USDC')}
                                  </Text>
                                ) : (
                                  <Text w='full' sx={{ fontSize: '1rem' }}>
                                    +{formatCoins(res?.balance, 'USDC')}
                                  </Text>
                                )

                              )
                            }

                            <Text w='full' color='#89909e'>
                              (FEE:{formatCoins(res?.fee, 'USDC')})
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>

                    </Flex>
                  );
                })
              ) : (
                <MyNoActivity label={<FormattedMessage id='text.NoActivityYet' />} />
              )}
            </>
          )
        }

      </Flex>
      <CryptoQRCode
        open={isSelectOpen}
        onClose={onSelectClose}
        data={{
          toAddress: cryptoPayData.to_address,
          fromAddress: cryptoPayData.from_address,
          coin_symbol: cryptoPayData.symbol,
          network: cryptoPayData.network,
          amount: cryptoPayData.amount
        }}
        onChange={(res: any) => {
          onSelectClose();
        }}
      />
    </MyCard >
  );
};
