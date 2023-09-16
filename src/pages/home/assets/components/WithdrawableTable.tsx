import {
  Avatar,
  Flex,
  Text,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { MyIcon, PrimaryButton, formatCoins, formatMoney, getDateAll, numberWithCommas, request, useMyToast } from "../../../../common";
import MyNoActivity from '../../../../components/NoActivity';
import { YesNo } from "../modal/YesNo";
import Vietcombank from '@/assets/images/Vietcombank-small.svg';
import Vietinbank from '@/assets/images/Vietinbank-1.svg';
import MBbank from '@/assets/images/MBbank-1.svg';
import ACB from '@/assets/images/ACB-small.svg';
import BIDV from '@/assets/images/BIDV-1.svg';
import ERC20 from '@/assets/images/ETH.svg';
import POLYGON from '@/assets/images/matic-logo.svg';
import TRC20 from '@/assets/images/TRX.svg';
import { Web3TransactionsStatusEnum } from "@consts/Enums";

let styles = {
  Ftd: {
    paddingLeft: 0,
  },
  Ltd: {
    paddingRight: 0,
  },
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



export default ({ bankCodes, curDataType='Deposit', onRefresh }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getModalCont, setModalCont] = useState<any>(null);
  const intl = useIntl();
  const { showRes } = useMyToast();
  const [items, setItems] = useState([]);
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
      if(val[0] == value){
        retVal = val[1];
      }
    });
    return retVal;
  }

  useEffect(() => {
    request('transfer/payment_list', {
      data: { type: curDataType }
    })
      .then((res) => {
        setItems(res.data);
      })
      .catch(showRes);
  }, [])

  return (
    <>
      {/* <TableContainer pt="3px" w="100%">
        <Table variant="simple" size="md" w="100%">
          <Thead h="50px" w="100%">
            <Tr>
              <Th>
                <FormattedMessage id="text.Name" />
              </Th>
              <Th>
                <FormattedMessage id="text.Balance" />
              </Th>
              <Th sx={{ textAlign: "right" }}>
                <FormattedMessage id="text.Opertate" />
              </Th>
            </Tr>
          </Thead>
          <Tbody w="100%">
            {tdata?.map((item: any) => {
              return (
                <Tr key={"tr_" + item.id}>
                  <Td alignItems="center">
                    <Flex alignItems="center">
                      <Avatar src={item?.icon} w="32px" h="32px" mr="2" />
                      <Flex flexDir="column" fontWeight="410">
                        {item?.symbol}
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    {formatMoney(item.balance, "")} {item?.symbol}
                  </Td>
                  <Td sx={{ textAlign: "right" }}>
                    <PrimaryButton
                      px={4}
                      w="120px"
                      onClick={() => {
                        onOpen();
                        setModalCont({
                          title: intl.formatMessage({
                            id: "transfer.withdrawalToStaking",
                          }),
                          ch: (
                            <YesNo
                              params={item}
                              onChange={() => {
                                onRefresh();
                                onClose();
                              }}
                            />
                          ),
                        });
                      }}
                      fontSize="14px"
                      py={0}
                    >
                      <FormattedMessage id="text.Staking" />
                    </PrimaryButton>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{getModalCont?.title}</ModalHeader>
          <ModalCloseButton />
          {getModalCont?.ch}
        </ModalContent>
      </Modal> */}

      <Flex px={6} py={5} flexDir='column' w='full'>
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
                  {
                    // curDataType == 'Deposit' ?
                    //   (
                    //     // <Text color='#89909e'>
                    //     //   <FormattedMessage id='text.From'></FormattedMessage> &nbsp;
                    //     //   {formatAddress(
                    //     //     snap.storage.address ? snap.storage.address : '',
                    //     //   )}
                    //     // </Text>
                    //     <></>
                    //   ) : (
                    //     <Text color='#89909e'>
                    //       <FormattedMessage id='text.To'></FormattedMessage> &nbsp;
                    //       {formatAddress(
                    //         snap.storage.address ? snap.storage.address : '',
                    //       )}
                    //     </Text>
                    //   )
                  }

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
                      <Text w='full' sx={{ fontSize: '1rem' }}>
                        +{formatCoins(curDataType == 'Deposit' ? res?.to_amt : res?.balance, 'USDC')}
                      </Text>
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
      </Flex>
    </>
  );
};
