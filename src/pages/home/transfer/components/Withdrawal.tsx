import { Divider, Flex, Image, Input, Select, Text, useColorMode } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSetState } from 'react-use';
import MoneyImg from '@/assets/images/usdc.svg';
import ETH from '@assets/images/ETH.svg';
import POLYGON from '@/assets/images/matic-logo.svg';
import TRON from '@/assets/images/TRX.svg';
import CARD from '@/assets/images/bankcard.svg';
import wallet from '@/assets/images/wallet.svg';
import {
  MyIcon,
  PrimaryButton,
  computeMoney,
  formatAddress,
  formatCoins,
  formatMoney,
  stateActions,
  useMyToast
} from '@/common';
import InputChange from './InputChange';
import { useEffect, useRef, useState } from 'react';
import CoinbaseCardForTheEUAndUK from '@pages/home/help/Coinbase-Card-for-the-EU-and-UK';
import { request } from '@/common';
// import { useAccount } from "wagmi";
import ChangeNetwork from '@components/ChangeNetwork';
import {
  Select as AntdSelect,
} from 'antd';
import '../style.scss'


const styles = {
  FormC: {
    border: '1px solid #b2b2b238',
    borderRadius: '8px',
  },
  MPointer: {
    cursor: 'pointer',
  },
  ArrowBackIcon: {
    position: 'absolute',
  },
};

export default ({ methods, user, price, res, currency, api }: any) => {
  const [data, setData] = useSetState<any>({
    amount: '',
  });
  // const { address, connector } = useAccount();
  const { colorMode } = useColorMode();

  const [withdrawMethod, setWithdrawMethod] = useState('Wallet');
  const [payWith, setPayWith] = useState('Guess');
  const [subMethod, setSubMethod] = useState('POLYGON');
  const { showRes } = useMyToast();
  const [getLoading, setLoading] = useState(false);

  const intl = useIntl();
  const payWithTypes = [
    {
      code: 'Guess',
      label: intl.formatMessage({ id: 'text.Guess' }),
    },
    {
      code: 'Withdrawable',
      label: intl.formatMessage({ id: 'text.Withdrawable' }),
    },
  ];
  const [withdrawMethods, setWithdrawMethods] = useState([
    {
      icon: wallet,
      code: 'Wallet',
      label: intl.formatMessage({ id: 'text.Wallet' }),
    },
    {
      icon: CARD,
      code: 'BankCard',
      label: intl.formatMessage({ id: 'text.BankCard' }),
    },
  ]);

  const crypoTypes = [
    {
      icon: POLYGON,
      label: 'POLYGON',
      code: 'POLYGON'
    },
    {
      icon: ETH,
      label: 'ETH',
      code: 'ERC20'
    },
    {
      icon: TRON,
      label: 'TRON',
      code: 'TRC20'
    },
  ];

  const onSubmit = () => {
    //提交
    setLoading(true);
    // if (parseFloat(data.amount) >= res.min) {
      methods.withdraw(parseFloat(data.amount), withdrawMethod, res, {
        from_amt: data.amount,
        network: withdrawMethod == 'BankCard' ? 'BANK' : subMethod,
        symbol: 'USDC',
      }, (withdrawRes: any) => {
        setLoading(false);
        setData({
          amount: 0
        })
        if (withdrawRes && withdrawRes.code == 0) {
          api.getTransactions('Withdrawal');
        }
      }, 
      false);
    // }
    // if (withdrawMethod == 'BankCard') {
    //   request('lottery_payments/withdraw_vnd', { data: { from_amt: data.amount } })
    //     .then((res: any) => {
    //       setLoading(false);
    //       if (res.code == 0) {
    //         api.getTransactions('Withdrawal');
    //       }
    //     }).catch((e: any) => {
    //       showRes(e);
    //       setLoading(false);
    //     })
    // } else {
    //   if (withdrawMethod == 'Wallet') {
    //     request('lottery_payments/pre_withdraw_crypto', {
    //       data: {
    //         network: subMethod,
    //         symbol: 'USDC',
    //         from_amt: data.amount
    //       }
    //     }).then((res: any) => {
    //       request('lottery_payments/withdraw_crypto', {
    //         data: {
    //           network: subMethod,
    //           symbol: 'USDC',
    //           from_amt: data.amount
    //         }
    //       }).then((res: any) => {
    //         setLoading(false);
    //         if (res.code == 0) {
    //           api.getTransactions('Withdrawal');
    //         }
    //       }).catch((e: any) => {
    //         setLoading(false);
    //         showRes(e);
    //       })
    //     }).catch((e: any) => {
    //       setLoading(false);
    //       showRes(e);
    //     })
    //   }
    // }
  };

  const userAddr = user?.address ?? '';
  useEffect(() => {
    let wallletAddr = subMethod == 'TRC20' ? user.trc_address : user.erc_address;
    if(wallletAddr)
      wallletAddr = ' (' + wallletAddr + ')';
    else
      wallletAddr = ' (' + intl.formatMessage({id: 'text.NoAddress'}) + ')';
    let cardNo = user.card_no ?? intl.formatMessage({id: 'text.NoCard'});
    setWithdrawMethods([
      {
        icon: wallet,
        code: 'Wallet',
        label: intl.formatMessage({ id: 'text.Wallet' }) + wallletAddr,
      },
      {
        icon: CARD,
        code: 'BankCard',
        label: intl.formatMessage({ id: 'text.BankCard' }) + ' (' + cardNo + ')',
      },
    ])
  }, [subMethod]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const isTextOverflowing = () => {
    const elemStyle = inputRef?.current && window.getComputedStyle(inputRef?.current);
    if (elemStyle) {
      const charWidth = parseFloat(elemStyle.fontSize);
      const containerWidth = parseFloat(elemStyle.width);
      const maxCharsPerLine = Math.floor(containerWidth / charWidth);
      return userAddr.length - maxCharsPerLine * 1.8 + 5;

    } else {
      return 0;
    }
  }
  const getEmphasisText = () => {
    if (inputRef?.current) {
      const len = isTextOverflowing();
      const txt = userAddr;
      const txt1 = txt.substring(txt.length - (txt.length - len) / 2 + 3, txt.length);
      return txt.substring(0, (txt.length - len) / 2) + '...' + txt1;
    } else {
      return '';
    }
  }
  const setAddrValue = () => {
    if (isTextOverflowing() > 0) {
      if (inputRef?.current) {
        const ctr = getEmphasisText();
        inputRef.current.value = getEmphasisText();
      }
    } else {
      if (inputRef?.current) {
        inputRef.current.value = userAddr;
      }
    }
  }
  useEffect(() => {
    setAddrValue();
    function handleResize() {
      setAddrValue();
    }
    if (inputRef?.current) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [inputRef]);

  const CheckAmount = (val: any) => {
    if (!val) {
      return {
        status: true,
        label: intl.formatMessage({ id: 'transfer.requiredAmount2' }),
      };
    }
    val = parseFloat(val);
    // if (val > res?.max) {
    //   return {
    //     status: true,
    //     label: intl.formatMessage({ id: 'transfer.requiredAmount3' }),
    //   };
    // } else if (val < res?.min) {
    //   return {
    //     status: true,
    //     label:
    //       intl.formatMessage({ id: 'transfer.requiredAmount4' }) +
    //       formatMoney(res?.min, ''),
    //   };
    // } else {
      return { status: false, label: '' };
    // }
  };


  const { Option } = AntdSelect;


  return (
    <Flex flexDir='column'>
      <Flex
        justifyContent='center'
        alignItems='center'
        pt={8}
        pb={2}
        color='#0052ff'
      >
        <InputChange
          defaultval={data.amount}
          value={data.amount}
          dispVnd={withdrawMethod == 'BankCard'}
          currency={currency?.withdrawal}
          placeholder='0'
          onChange={(val: number) => {
            setData({ amount: val });
          }}
        />
      </Flex>
      <Flex
        color='#5b616e'
        w='full'
        justifyContent='center'
        mb={4}
        h='18px'
        sx={{ textAlign: 'center' }}
      >
        {CheckAmount(data.amount).label}
      </Flex>
      <Flex justifyContent='center'>
        <Text
          pt={0.5}
          pb={1}
          px={4}
          sx={{
            cursor: 'pointer',
            bg: '#f5f8ff',
            fontSize: '1rem',
            border: '1px solid #dedfe2',
            borderRadius: '6px',
            color: '#89909e',
          }}
          onClick={() => {
            setData({ amount: ('' + res.balance).replace(',', '') });
          }}
        >
          <FormattedMessage id='text.SendAll' />
        </Text>
      </Flex>
      <Flex
        mx={{ base: 1, sm: 1, md: 9, lg: 9 }}
        sx={styles.FormC}
        mt={6}
        flexDir='column'
      >
        <Flex
            alignItems='center'
            py='24px'
            px={{ base: 2, sm: 2, md: 4, lg: 4 }}
            color='#5b616e'
            w='full'
            sx={styles.MPointer}
        >
          <Flex alignItems='center' pl={{ base: 1, sm: 1, md: 3, lg: 3 }}>
            <Text
                pr={{ base: 2, sm: 2, md: 4, lg: 4 }}
                fontWeight='410'
                w={
                  data?.modalType == 'FromWallet'
                      ? { base: '85px', sm: '85px', md: '100px', lg: '100px' }
                      : { base: '85px', sm: '85px', md: '100px', lg: '100px' }
                }
            >
              <FormattedMessage id='text.Balance'></FormattedMessage>
            </Text>
            <Image
                borderRadius='full'
                w='30px'
                h='30px'
                src={data?.coin?.icon || MoneyImg}
            />
          </Flex>
          <Flex flex='1' pl={3}>
            <Text>{data?.coin?.symbol || 'USDC'}</Text>
          </Flex>
        </Flex>
        <Divider />
        <Flex
          alignItems='center'
          py='19px'
          px={{ base: 2, sm: 2, md: 4, lg: 4 }}
          color='#5b616e'
          w='full'
        >
          <Flex
            alignItems='center'
            w='140px'
            pl={{ base: 1, sm: 1, md: 3, lg: 3 }}
          >
            <Text
              pr={{ base: 2, sm: 2, md: 4, lg: 4 }}
              fontWeight='410'
              w={{ base: '82px', sm: '82px', md: '100px', lg: '100px' }}
            >
              <FormattedMessage id='text.to' />
            </Text>
            {(() => {
              const icon = (withdrawMethods?.find((item: any) => item.code === withdrawMethod) as any)?.icon
              return icon ? <Image  w='30px' h='30px' src={icon} /> : <MyIcon icon='' />
            })()}

          </Flex>
          <Flex flex='1' pl={3}>
            <AntdSelect
              style={{
                width: "100%"
              }}
              bordered={false}
              optionLabelProp="label"
              onChange={(value: any) => {
                setWithdrawMethod(value);
              }}
              className={colorMode === 'dark' ? 'antd_select_dark' : ''}
              popupClassName={colorMode === 'dark' ? 'antd_select_popup_dark' : ''}
              value={withdrawMethod}
            >
              {withdrawMethods.map((item: any) => {
                return (
                  <Option key={`code_${item.label}`} label={item.label} value={item.code}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img style={{ width: 20, height: 20, marginRight: 8 }} src={item?.icon} />
                      <span style={{ fontSize: 18, lineHeight: '40px' }}>{item.label}</span>
                    </div>
                  </Option>
                );
              })}
            </AntdSelect>

            {/* <Select
              onChange={(e: any) => {
                setWithdrawMethod(e.target.value);
              }}
            >
              {withdrawMethods.map((item: any) => {
                return (
                  <option key={`code_${item.code}`} value={item.code}>
                    {item.label}
                  </option>
                );
              })}
            </Select> */}
            {/* <Input
              variant='unstyled'
              h='30px'
              isDisabled
              defaultValue={user?.address}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              placeholder='Mobile,email,or address'
            /> */}
          </Flex>
        </Flex>
        <Divider />
        <Flex
          alignItems='center'
          display={withdrawMethod == 'Wallet' ? 'inherit' : 'none'}
          py='24px'
          px={{ base: 2, sm: 2, md: 4, lg: 4 }}
          color='#5b616e'
          w='full'
          sx={styles.MPointer}
        >
          <Flex
            alignItems='center'
            w='140px'
            pl={{ base: 1, sm: 1, md: 3, lg: 3 }}
          >
            <Text
              pr={{ base: 2, sm: 2, md: 4, lg: 4 }}
              fontWeight='410'
              w={{ base: '85px', sm: '85px', md: '100px', lg: '100px' }}
            >
              <FormattedMessage id='text.Network' />
            </Text>
            <Image borderRadius='full' w='30px' h='30px' src={(crypoTypes?.find((item: any) => item.code === subMethod) as any)?.icon || POLYGON} />
          </Flex>
          <Flex flex='1' pl={3}>

            <AntdSelect
              style={{
                width: "100%"
              }}
              bordered={false}
              disabled={withdrawMethod != 'Wallet'}
              optionLabelProp="label"
              className={colorMode === 'dark' ? 'antd_select_dark' : ''}
              popupClassName={colorMode === 'dark' ? 'antd_select_popup_dark' : ''}
              onChange={(value: any) => {
                setSubMethod(value);
              }}
              value={subMethod}
            >
              {crypoTypes.map((item: any) => {
                return (
                  <Option key={`code_${item.label}`} label={item.label} value={item.code}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img style={{ width: 20, height: 20, marginRight: 8 }} src={item?.icon} />
                      <span style={{ fontSize: 18, lineHeight: '40px' }}>{item.label}</span>
                    </div>
                  </Option>
                );
              })}
            </AntdSelect>


            {/* <Select
              disabled={withdrawMethod != 'Wallet'}
              onChange={(e: any) => {
                setSubMethod(e.target.value);
              }}
            >
              {crypoTypes.map((item: any) => {
                return (
                  <option key={`code_${item.code}`} value={item.code}>
                    {item.label}
                  </option>
                );
              })}
            </Select> */}
          </Flex>

        </Flex>
      </Flex>
      <Flex mx={9} pt={5}>
        <PrimaryButton
          w='full'
          h='50px'
          isLoading={getLoading}
          isDisabled={CheckAmount(data.amount).status}
          onClick={onSubmit}
        >
          <FormattedMessage id='text.Continue' />
        </PrimaryButton>
      </Flex>
      <Flex alignItems='center' px={9} py={5} color='#5b616e'>
        <Flex w='full'>
          <Text>
          <FormattedMessage id='text.Balance' />
          </Text>
        </Flex>
        <Flex w='full' textAlign='right'>
          <Text w='full'>
            {formatCoins(res?.balance, 'USDC')} {computeMoney(res?.balance, price.usdc)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
