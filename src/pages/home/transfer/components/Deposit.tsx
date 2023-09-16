import DefLogo from '@/assets/images/logo-small.svg';
import MoneyImg from '@/assets/images/usdc.svg';
import Vietcombank from '@/assets/images/Vietcombank-small.svg';
import Vietinbank from '@/assets/images/Vietinbank-1.svg';
import MBbank from '@/assets/images/MBbank-1.svg';
import ACB from '@/assets/images/ACB-small.svg';
import BIDV from '@/assets/images/BIDV-1.svg';
import QR from '@/assets/images/QR.svg';
import Bank from '@/assets/images/Bank.svg';
import VND from '@/assets/images/VND.svg';
import ETH from '@/assets/images/ETH.svg';
import POLYGON from '@/assets/images/matic-logo.svg';
import TRON from '@/assets/images/TRX.svg';
import USDC from '@/assets/images/usdc.svg';
import USDT from '@/assets/images/USDT.svg';
import '../style.scss'
import {
  Coins,
  GetAddressByCoin,
  MyIcon,
  PrimaryButton,
  formatCoins,
  formatMoney,
  getErrorMessage,
  stateActions,
  useMyState,
  useMyToast,
} from '@/common';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Select as AntdSelect,
} from 'antd';
import {
  Divider,
  Flex,
  Icon,
  Image,
  Select,
  Text,
  useDisclosure,
  useToast,
  useColorMode
} from '@chakra-ui/react';
import { parseUnits } from 'ethers/lib/utils.js';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSetState } from 'react-use';
// import {
//   erc20ABI,
//   useContractReads,
//   useContractWrite,
//   usePrepareContractWrite,
// } from 'wagmi';
import { StakingSelectAsset } from '../modal/StakingSelectAsset';
import InputChange from './InputChange';
import { MemberShipTips } from './MemberShipTips';
import { DepositSelectAsset } from '../modal/DepositSelectAsset';
import { CryptoQRCode } from '../modal/CryptoQRCode';

const optionImageMap = {
  BANK: VND,
  USDT: USDT,
  USDC: USDC,
};


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

export default ({ price, balance, bankCodes, bizTypes, vndCurrency, cryptoConfig, api }: any) => {
  const { snap } = useMyState();
  const { colorMode } = useColorMode();
  const { user } = snap.session;
  const {
    isOpen: isSelectOpen,
    onOpen: onSelectOpen,
    onClose: onSelectClose,
  } = useDisclosure();

  const bankImg: any = {
    Vietinbank,
    Vietcombank,
    MBbank,
    ACB,
    BIDV
  };

  const crypoTypesUSDC = [
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
  const crypoTypesUSDT = [
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

  const [subMethod, setSubMethod] = useState('vietinbank');
  const [banks, setBanks] = useState<any>([]);
  const [subTypes, setSubTypes] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState<string>('BANK');
  const [dispVnd, setDispVnd] = useState(true);
  const [getLoading, setLoading] = useState(false);
  const [cryptoPayData, setCryptoPayData] = useState<any>({});

  const intl = useIntl();
  const { showError } = useMyToast();
  const despositFromTypes = [
    {
      icon: VND,
      label: intl.formatMessage({ id: 'text.Bank' }),
      code: 'BANK'
    },
    {
      icon: USDC,
      label: 'USDC',
      code: 'USDC'
    },
    {
      icon: USDT,
      label: 'USDT',
      code: 'USDT'
    },
  ];
  const toast = useToast();

  const modalTypeItems = [
    {
      label: intl.formatMessage({ id: 'text.FromBank' }),
      value: 'FromBank',
    },
    {
      label: intl.formatMessage({ id: 'text.FromWallet' }),
      value: 'FromWallet',
    },
  ];

  const [data, setData] = useSetState<any>({
    coinIndex: 0, // 弹窗中选中的coin的index
    bankIndex: 0,
    typeIndex: 0,
    res: {}, // pre_staking 接口返回的数据
    coins: {
      FromBank: Coins,
      // 弹窗中的数据
      FromWallet: [
        { ...Coins[0], balance: balance, usd: balance * price.usdc },
      ],
    },
    modalType: 'FromBank', // 弹窗的类型，参考 modalTypeItems
    modalName: intl.formatMessage({ id: 'text.FromBank' }),
    coin: {
      name: 'BANK',
      symbol: 'USDC',
      icon: VND
    }, // 当前选中的coin
    amount: '', // 输入的金额
  });


  useEffect(() => {
    setData({
      coins: {
        FromBank: [
          {
            ...data.coins.FromBank[0],
            balance: balance,
            usd: balance * price.usdc,
          },
        ],
        FromWallet: data.coins.FromWallet,
      },
      coin: {
        ...data?.coin,
        ...{ balance: balance, usd: balance * price.usdc },
      },
    });
  }, [balance, price]);

  const ViInputAmount = () => {
    if (!data?.amount) {
      return {
        status: true,
        label: intl.formatMessage({ id: 'transfer.requiredAmount2' }),
      };
    }
    return { status: false, label: '' };
  };

  const onSubmit = () => {
    
    setLoading(true);
    if (selectedOption == 'BANK') {
      let bizType = '';
      if (bizTypes && bizTypes.length > 0) {
        const idx = bizTypes.findIndex((s: any) => s.name == 'QR');
        if (idx != -1) {
          bizType = bizTypes[idx].value;
        }
      }
      return api.getDepositVND(
        {
          bank_code: subMethod,
          biz_type: bizType + '' ?? '',
          to_amt: parseFloat(data?.amount),
        },
        (res: any) => {
          setLoading(false);
          if (res?.code == 0) {
            window.open(res.data?.url, '_blank', 'noreferrer');
            api.getTransactions('Deposit');
            // if (data?.modalType == 'FromWallet') {
            //   api.staking_from_withdrawable({ amount: parseFloat(data?.amount) });
            // } else {
            //   write?.();
            // }
          }
        },
      );
    } else {
      return api.getDepositCrypto(
        {
          network: subMethod,
          symbol: selectedOption,
          to_amt: parseFloat(data?.amount),
        },
        (res: any) => {
          setLoading(false);
          if (res?.code == 0) {
            setCryptoPayData(res?.data);
            onSelectOpen();
            api.getTransactions('Deposit');
            // if (data?.modalType == 'FromWallet') {
            //   api.staking_from_withdrawable({ amount: parseFloat(data?.amount) });
            // } else {
            //   write?.();
            // }
          }
        },
      );
    }

  };

  useEffect(() => {
    if (bankCodes && bankCodes.length > 0) {
      setBanks(
        bankCodes.map((bank: any) => {
          bank.label = bank.name;
          bank.icon = bankImg[bank.name];
          bank.code = bank.value;
          return bank;
        })
      );
      setSubTypes(
        bankCodes.map((bank: any) => {
          bank.label = bank.name;
          bank.icon = bankImg[bank.name];
          bank.code = bank.value;
          return bank;
        })
      );
      setSubMethod(bankCodes[0].value);
    } else {
      setBanks([]);
      setSubMethod('');
    }
  }, [bankCodes, bizTypes]);
  // const
  // useEffect(() => {
  //   api.pre_staking().then((res: any) => {
  //     setData({
  //       res: res.data,
  //     });
  //   });
  //   stateActions.addLoading();
  // }, []);


  const { Option } = AntdSelect;


  return (
    <Flex flexDir='column' position={'relative'}>
      <Flex
        justifyContent='center'
        alignItems='center'
        pt={8}
        pb={2}
        direction='column'
        color='#0052ff'
      >
        <InputChange
          defaultval={data?.amount}
          value={data?.amount}
          placeholder='0'
          dispVnd={dispVnd}
          currency={vndCurrency}
          symbol={data?.coin?.symbol}
          onChange={(val: number) => {
            setData({ amount: val });
          }}
        />
      </Flex>
      <Flex
        mx={{ base: 1, sm: 1, md: 9, lg: 9 }}
        sx={styles.FormC}
        mt={6}
        flexDir='column'
      >
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
              <FormattedMessage id='text.From' />
            </Text>
            <Image borderRadius='full' w='30px' h='30px' src={optionImageMap[selectedOption as keyof typeof optionImageMap]} />

          </Flex>
          <Flex flex='1' pl={3}>
            <AntdSelect
              style={{
                width: "100%",
              }}
              className={colorMode === 'dark' ? 'antd_select_dark' : ''}
              popupClassName={colorMode === 'dark' ? 'antd_select_popup_dark' : ''}
              bordered={false}
              optionLabelProp="label"
              value={selectedOption}
              onChange={(value: any) => {
                const selectedValue = value;
                setSelectedOption(selectedValue);

                if (selectedValue === 'BANK') {
                  setDispVnd(true);
                  setSubTypes(banks);
                } else if (selectedValue === 'USDT') {
                  setDispVnd(false);
                  setSubTypes(crypoTypesUSDT);
                  setSubMethod(crypoTypesUSDT[0].code);
                } else if (selectedValue === 'USDC') {
                  setDispVnd(false);
                  setSubTypes(crypoTypesUSDC);
                  setSubMethod(crypoTypesUSDC[0].code);
                }
              }}>
              {despositFromTypes.map((item) => {
                return (
                  <Option key={`code_${item.label}`} label={item.label} value={item.code}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img style={{ width: 20, height: 20, marginRight: 8 }} src={item?.icon} />
                      <span style={{ fontSize: 18, lineHeight: '40px' }}>{item.label}</span>
                    </div>
                  </Option>
                );
              })}
            </AntdSelect>
            {/* <Select border="none" onChange={(e: any) => {
              const selectedValue = e.target.value;
              setSelectedOption(selectedValue);

              if (selectedValue === 'BANK') {
                setDispVnd(true);
                setSubTypes(banks);
              } else if (selectedValue === 'USDT') {
                setDispVnd(false);
                setSubTypes(crypoTypesUSDT);
                setSubMethod(crypoTypesUSDT[0].code);
              } else if (selectedValue === 'USDC') {
                setDispVnd(false);
                setSubTypes(crypoTypesUSDC);
                setSubMethod(crypoTypesUSDC[0].code);
              }
            }}>
              {despositFromTypes.map((item) => {
                return (
                  <option key={`code_${item.label}`} value={item.code}>
                    {item.label}
                  </option>
                );
              })}
            </Select> */}
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
            </Text>
            <Image borderRadius='full' w='30px' h='30px' src={subTypes?.find((item: any) => item.code === subMethod)?.icon || Vietcombank} />
          </Flex>
          <Flex flex='1' pl={3}>
            <AntdSelect
              style={{
                width: "100%",
                border: 0
              }}
              bordered={false}
              value={subMethod}
              className={colorMode === 'dark' ? 'antd_select_dark' : ''}
              optionLabelProp="label"
              popupClassName={colorMode === 'dark' ? 'antd_select_popup_dark' : ''}
              onChange={(value, option) => {
                setSubMethod(value);
              }}>
              {subTypes.map((item: any) => {
                return (
                  <Option key={`code_${item.label}`} label={item.label} value={item.code}>
                    <div style={{ display: 'flex', alignItems: 'center' }}><img style={{ width: 20, height: 20, marginRight: 8 }} src={item?.icon} />
                      <span style={{ fontSize: 18, lineHeight: '40px' }}>{item.label}</span>
                    </div>
                  </Option>
                );
              })}
            </AntdSelect>
            {/* <Select border="none"
              onChange={(e) => {
                setSubMethod(e.target.value);
              }}>
              {subTypes.map((item: any) => {
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
          isDisabled={ViInputAmount().status}
          onClick={onSubmit}
          isLoading={getLoading}
        >
          <FormattedMessage id='text.Continue' />
        </PrimaryButton>
      </Flex>
      <Flex alignItems='center' px={9} py={5} color='#5b616e'>
        <Flex w='full'>
          <Text>
            <FormattedMessage id="text.Balance"></FormattedMessage>
          </Text>
        </Flex>
        <Flex w='full' textAlign='right'>
          <Text w='full'>
            {formatCoins(data?.coin?.balance, data?.coin.symbol)}
            {formatMoney(data?.coin.usd, ' ≈ $')}
          </Text>
        </Flex>
      </Flex>

      <CryptoQRCode
        open={isSelectOpen}
        onClose={onSelectClose}
        data={{
          toAddress: cryptoPayData.to_address,
          fromAddress: cryptoPayData.from_address,
          coin_symbol: selectedOption,
          network: cryptoPayData.network == 'ERC20' ? 'ERC 2.0' : cryptoPayData.network == 'POLYGON' ? 'Polygon' : 'TRC 2.0',
          amount: cryptoPayData.from_amt
        }}
        onChange={(res: any) => {
          onSelectClose();
        }}
      />
    </Flex>
  );
};
