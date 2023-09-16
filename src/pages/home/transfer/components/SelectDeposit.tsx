import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Icon, Image, Input, TabPanel, TabPanels, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSetState } from "react-use";
import { MyRender, PrimaryButton, formatCoins, formatMoney, useMyState } from "../../../../common";
import Tabs from "./Tabs";
import Vietcombank from '@/assets/images/Vietcombank-small.svg';
import Vietinbank from '@/assets/images/Vietinbank-1.svg';
import MBbank from '@/assets/images/MBbank-1.svg';
import ACB from '@/assets/images/ACB-small.svg';
import BIDV from '@/assets/images/BIDV-1.svg';
import QR from '@/assets/images/QR.svg';
import Bank from '@/assets/images/Bank.svg';
import { FormattedMessage } from "react-intl";

const styles = {
  SearchC: {
    border: "1px solid #b2b2b238",
    borderRadius: "8px",
  },
  cell_select: {
    borderRadius: "5px",
    cursor: "pointer",
    _hover: {
      backgroundColor: "#f6f6f6",
      _dark: {
        backgroundColor: "#000",
      },
    },
    "&.active": {
      backgroundColor: "#f6f6f6",
      _dark: {
        backgroundColor: "#000",
      },
    },
  },
  bank_select: {
    borderRadius: "5px",
    cursor: "pointer",
    _hover: {
      backgroundColor: "#f6f6f6",
      _dark: {
        backgroundColor: "#efefef",
      },
    },
    "&.active": {
      backgroundColor: "#f6f6f6",
      _dark: {
        backgroundColor: "#efefef",
      },
    },
  },
  type_select: {
    borderRadius: "5px",
    cursor: "pointer",
    _hover: {
      backgroundColor: "#f6f6f6",
      _dark: {
        backgroundColor: "#c1c1c1",
      },
    },
    "&.active": {
      backgroundColor: "#f6f6f6",
      _dark: {
        backgroundColor: "#c1c1c1",
      },
    },
  },
};

const bankData = [
  {
    icon: Vietcombank,
    symbol: 'Vietcomabnk'
  }, 
  {
    icon: Vietinbank,
    symbol: 'Vietinbank'
  }, 
  {
    icon: MBbank,
    symbol: 'MBbank'
  }, 
  {
    icon: Vietcombank,
    symbol: 'Vietcomabnk'
  }, 
  {
    icon: Vietcombank,
    symbol: 'Vietcomabnk'
  }
]

const Asset = ({ coin, index, coinIndex, onChange }: any) => {
  // const { data } = useContractRead({
  //   address: coin.address,
  //   abi: erc20ABI,
  //   functionName: "balanceOf",
  //   args: [user.address],
  // });

  // const setBalance = (res: any) => {
  //   res.balance = formatMyUnits(data, 6).replace(",", "");
  //   return res.balance;
  // };

  return (
    <Flex
      key={index}
      mx={10}
      alignItems="center"
      px={5}
      py={4}
      mb={6}
      sx={styles.cell_select}
      className={index == coinIndex ? "active" : ""}
      onClick={() => {
        onChange(coin, index);
      }}
    >
      <Image w="40px" h="40px" borderRadius="full" src={coin.icon} />
      <Flex flex="1" flexDir="column" px={4}>
        <Text
          fontSize="17px"
          fontWeight="var(--cds-fontWeights-medium)"
          lineHeight="20px"
        >
          {coin.name}
        </Text>
        <Text fontSize="14px" color="#89909e">
          {coin.symbol}
        </Text>
      </Flex>
      <Flex flexDir="column" textAlign="right">
        <Text
          w="full"
          fontSize="17px"
          fontWeight="var(--cds-fontWeights-medium)"
          lineHeight="20px"
        >
          {formatCoins(coin.balance, coin.symbol)}
        </Text>
        <Text w="full" fontSize="14px" color="#89909e">
          {formatMoney(coin.usd, " ≈ $")}
        </Text>
      </Flex>
      {index == coinIndex ? (
        <Flex pl={5}>
          <Icon as={CheckIcon} color="#0052ff" />
        </Flex>
      ) : (
        ""
      )}
    </Flex>
  );
};

const BankItem = ({ index, bankIndex, symbol, icon, onChange, ...rest }: any) => {
  // const { data } = useContractRead({
  //   address: coin.address,
  //   abi: erc20ABI,
  //   functionName: "balanceOf",
  //   args: [user.address],
  // });

  // const setBalance = (res: any) => {
  //   res.balance = formatMyUnits(data, 6).replace(",", "");
  //   return res.balance;
  // };

  return (
    <Flex
      key={index}
      p={4}
      my={2}
      mx={2}
      alignItems="center"
      sx={styles.bank_select}
      className={index == bankIndex ? "active" : ""}
      onClick={() => {
        onChange(index, icon, symbol);
      }}
      {...rest}
    >
      <Image w="full" src={icon} />
    </Flex>
  );
};

const TypeItem = ({ index, typeIndex, symbol, icon, onChange, ...rest }: any) => {
  // const { data } = useContractRead({
  //   address: coin.address,
  //   abi: erc20ABI,
  //   functionName: "balanceOf",
  //   args: [user.address],
  // });

  // const setBalance = (res: any) => {
  //   res.balance = formatMyUnits(data, 6).replace(",", "");
  //   return res.balance;
  // };

  return (
    <Flex
      key={index}
      p={4}
      my={2}
      mx={2}
      alignItems="center"
      sx={styles.type_select}
      justifyContent='center'
      className={index == typeIndex ? "active" : ""}
      onClick={() => {
        onChange(index);
      }}
      {...rest}
    >
      <Image src={icon} h='30px' />
    </Flex>
  );
};

export default ({
  coinIndex,
  coins,
  bankIndex,
  modalType,
  modalName,
  onChange,
  modalTypeItems,
}: any) => {
  const [getAct, setAct] = useState<any>(coins[modalType]);
  const { snap } = useMyState();
  const [selects, setSelects] = useSetState({
    modalType: modalType,
    coinIndex: coinIndex,
    bankIndex: bankIndex,
    modalName: modalName,
    conin: {},
  });
  const [typeIndex, setTypeIndex] = useState(0);
  const [bkIndex, setBkIndex] = useState(bankIndex);

  useEffect(() => {
    setAct(coins[modalType]);
  }, []);
  const onChangeWallet = (idx: number, icon: any, symbol: string) => {
    setSelects({
      bankIndex: idx,
    });
    setBkIndex(idx);
    onChange({
      ...selects,
      ...{
        bankIndex: idx,
        conin: {
          icon,
          name: symbol,
        }
      },
    });
  }
  const onChangeType = (idx: number) => {
    setTypeIndex(idx);
  }
  return (
    <Flex flexDir="column" w="full" minHeight={300} px={3}>
      <Tabs
        value={selects?.modalType}
        items={modalTypeItems}
        onChange={(val: string, index: number) => {
          setAct(coins[val]);
          setSelects({
            modalType: val,
            modalName: modalTypeItems[index].label,
          });
        }}
      />
      <MyRender
        render={() => {
          return (selects?.modalType == 'FromBank') ?
            (
              <Flex w='full' direction='column' mb={2}>
                {/* <Flex w='full' direction='row'
                  mt={2}
                  borderBottom='3px solid #0052ff'>
                  <TypeItem
                    icon={QR}
                    index={0}
                    typeIndex={typeIndex}
                    height='30px'
                    width='50%'
                    onChange={onChangeType} />
                  <TypeItem
                    icon={Bank}
                    index={1}
                    typeIndex={typeIndex}
                    height='30px'
                    width='50%'
                    onChange={onChangeType} />
                </Flex> */}
                <Flex w='full' direction='row'>
                  <BankItem
                    icon={Vietcombank}
                    index={0}
                    bankIndex={bkIndex}
                    width='50%'
                    symbol='Vietcombank'
                    onChange={onChangeWallet} />
                  <BankItem
                    icon={Vietinbank}
                    index={1}
                    symbol='Vietinbank'
                    bankIndex={bkIndex}
                    width='50%'
                    onChange={onChangeWallet} />
                </Flex>
                <Flex w='full' direction='row'>
                  <BankItem
                    icon={MBbank}
                    index={2}
                    symbol='MBbank'
                    bankIndex={bkIndex}
                    width='33%'
                    onChange={onChangeWallet} />
                  <BankItem
                    icon={ACB}
                    index={3}
                    symbol='ACB'
                    bankIndex={bkIndex}
                    width='33%'
                    onChange={onChangeWallet} />
                  <BankItem
                    icon={BIDV}
                    index={4}
                    symbol='BIDV'
                    bankIndex={bkIndex}
                    width='33%'
                    onChange={onChangeWallet} />
                </Flex>

                {/* <Flex mx={9} pt={5}>
                  <PrimaryButton
                    w='full'
                    h='50px'
                    onClick={() => {
                      onChange({
                        ...selects,
                        ...{
                          bankIndex: bkIndex,
                          conin: {
                            icon: bankData[bkIndex].icon,
                            name: bankData[bkIndex].symbol,
                          }
                        },
                      });
                    }}
                  >
                    <FormattedMessage id='text.OK' />
                  </PrimaryButton>
                </Flex> */}
              </Flex>

            ) :
            (
              <Flex pt={5} w="full" flexDir="column">
                {getAct?.map((coin: any, index: number) => {
                  return (
                    <Asset
                      key={index}
                      coin={coin}
                      index={index}
                      coinIndex={coinIndex}
                      // getAct={getAct}
                      onChange={(val: any, idx: number) => {
                        setSelects({
                          conin: val,
                          coinIndex: idx,
                        });
                        onChange({
                          ...selects,
                          ...{
                            conin: val,
                            coinIndex: idx,
                          },
                        });
                      }}
                    // setAct={setAct}
                    // user={snap.session.user}
                    />
                  );
                })}
              </Flex>
            )
        }}
      />

    </Flex>
  );
};
