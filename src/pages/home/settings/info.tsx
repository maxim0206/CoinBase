import {
  Divider,
  Flex,
  Text,
  Image,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useDisclosure,
  Icon,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import {
  MyCard,
  MyContent,
  PrimaryButton,
  TextCardHeader,
  request,
  stateActions,
  useMyState,
  useMyToast,
} from '../../../common';
import PInput from './components/Input';
import MyMore from './components/More';
import PageTab from './components/PageTab';
import TTextarea from './components/Textarea';
import IUploadAvatar from './components/UploadAvatar';

import { FormattedMessage, useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import VND from '@/assets/images/VND.svg';
import { useSetState } from 'react-use';
import { DepositSelectAsset } from '../transfer/modal/DepositSelectAsset';


const styles = {
  SettingsLC: {
    width: { base: '100%', sm: '100%', md: '100%', lg: 'calc(100% - 374px)' },
  },
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
const Coins = [
  {
    id: 4,
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    ERC20: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    POLYGON: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    icon: '/img/usdc.svg',
    name: 'USD Coin',
    symbol: 'USDC',
    balance: 0,
    usd: 0,
    decimals: 6,
  },
  {
    id: 3,
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    ERC20: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    POLYGON: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    icon: '/img/usdt.svg',
    name: 'Tether',
    symbol: 'USDT',
    balance: 0,
    usd: 0,
    decimals: 6,
  },
];

export default () => {
  const { showRes } = useMyToast();
  const { snap } = useMyState();
  const intl = useIntl();
  const userInfo = snap.session.user;
  const {
    isOpen: isSelectOpen,
    onOpen: onSelectOpen,
    onClose: onSelectClose,
  } = useDisclosure();
  const [coinData, setCoinData] = useSetState({
    icon: '',
    name: 'Select a Bank',
    bankIndex: 0,
    coins: {
      // 弹窗中的数据
      FromWithdrawable: [
        { ...Coins[0], balance: 0, usd: 0 },
      ],
      FromWallet: Coins,
    },
    modalType: 'FromBank', // 弹窗的类型，参考 modalTypeItems
    modalName: intl.formatMessage({ id: 'text.Bank' }),
    coin: {
      name: '',
      symbol: '',
      icon: '',
      bank_code: 'bank',
    }, // 当前选中的coin
    amount: '', // 输入的金额
  });
  const [bankCodes, setBankCodes] = useState<any>([]);
  const [bizTypes, setBizTypes] = useState([]);
  const [myBankCode, setMyBankCode] = useState(userInfo?.bank_code);
  useEffect(() => {
    request('transfer/info').then((res: any) => {
      let banks = [].concat();
      setBankCodes(res?.data?.user_banks);
      setBizTypes(res?.data?.biz_type ?? []);
      if (res?.data?.user_banks.length > 0) {
        const idx = res.data.user_banks.findIndex((s: any) => s.value == userInfo.bank_code)
        if (idx == -1)
          setMyBankCode(res.data.user_banks[0].value);
        else
          setMyBankCode(res.data.user_banks[idx].value);
      }

      if (res?.data?.user_banks && res?.data?.user_banks.length > 0) {
        setCoinData({
          coin: {
            name: '',
            symbol: '',
            icon: '',
            bank_code: bankCodes[0].value
          }
        })
      }

    }).catch((e: any) => {
      console.log(e);
    });
  }, []);

  return (
    <MyContent>
      <Flex w='full' flexWrap='wrap'>
        <Flex sx={styles.SettingsLC}>
          <MyCard flexDir='column' alignItems='center'>
            <TextCardHeader w='full'>
              <FormattedMessage id='text.IdentityVerification' />
            </TextCardHeader>
            <Divider />
            <PageTab idx={1} />
            <Divider />
            {snap.session.user?.id ? (
              <Flex
                w={{ base: '100%', sm: '100%', md: '100%', lg: '100%' }}
                maxWidth='600px'
                flexDir='column'
                px={{ base: 5, sm: 5, md: 5, lg: 0 }}
                py={16}
              >
                <Formik
                  initialValues={{
                    avatar: snap.session.user.avatar,
                    username: snap.session.user.username ?? '',
                    bio: snap.session.user.bio ?? '',
                    phone_number: snap.session.user.phone_number ?? '',
                    facebook: snap.session.user.facebook ?? '',
                    telegram: snap.session.user.telegram ?? '',
                    wechat: snap.session.user.wechat ?? '',
                    skype: snap.session.user.skype ?? '',
                    whatsapp: snap.session.user.whatsapp ?? '',
                    line: snap.session.user.line ?? '',
                    zalo: snap.session.user.zalo ?? '',
                    card_no: snap.session.user.card_no ?? '',
                    trc_address: snap.session.user.trc_address ?? '',
                    bank_code: snap.session.user.bank_code ?? '',
                    erc_address: snap.session.user.erc_address ?? '',
                    acc_name: snap.session.user.acc_name ?? '',
                  }}
                  onSubmit={(values, actions) => {
                    request('auth/update_profile', {
                      data: {
                        ...values,
                        bank_code: myBankCode,
                      }
                    })
                      .then((res) => {
                        showRes(res);
                      })
                      .catch(showRes)
                      .finally(() => {
                        actions.setSubmitting(false);
                      });
                    // request('transfer/update_my_payment_info', {
                    //   data: {
                    //     bank_code: coinData.coin.bank_code,
                    //     acc_name: values.acc_name,
                    //     card_no: values.card_no,
                    //     phone: values.phone_number,
                    //     trc_address: values.trc_address,
                    //     polygon_address: values.polygon_address,
                    //     erc_address: values.erc_address,
                    //   }
                    // }).then((res1: any) => {
                    //   showRes(res1);
                    //   stateActions.me();
                    // })
                    //   .catch(showRes)
                    //   .finally(() => {
                    //     actions.setSubmitting(false);
                    //   });
                  }}
                >
                  {(props: any) => (
                    <Form>
                      <Field name='avatar'>
                        {({ field, form }: any) => (
                          <FormControl
                            isRequired={snap.session.user.avatar ? false : true}
                            h='140px'
                            isInvalid={
                              form.errors.avatar && form.touched.avatar
                            }
                          >
                            <FormLabel fontSize='14px'>
                              <FormattedMessage id='text.Avatar' />
                            </FormLabel>
                            <IUploadAvatar
                              name='avatar'
                              defaultVal={snap.session.user.avatar}
                              onChange={(e: any) => {
                                if (e) {
                                  props.setFieldValue('avatar', e);
                                }
                              }}
                            />
                            <FormErrorMessage>
                              {form.errors.avatar}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='username'>
                        {({ field, form }: any) => (
                          <FormControl
                            isRequired
                            h='115px'
                            isInvalid={
                              form.errors.nickname && form.touched.nickname
                            }
                          >
                            <FormLabel fontSize='14px'>
                              <FormattedMessage id='text.Username' />
                            </FormLabel>
                            <PInput
                              name='username'
                              isDisabled={true}
                              onChange={field.onChange}
                              placeholder={intl.formatMessage({
                                id: 'text.Username',
                              })}
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.nickname}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='bio'>
                        {({ field, form }: any) => (
                          <FormControl
                            h='140px'
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel fontSize='14px'>
                              <FormattedMessage id='text.Bio' />
                            </FormLabel>
                            <TTextarea
                              name='bio'
                              placeholder={intl.formatMessage({
                                id: 'text.Bio',
                              })}
                              onChange={field.onChange}
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Divider mb='2' />
                      <Flex gap={6}>
                        <Field name='bank_code'>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              h='90px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.selectbank' />
                              </FormLabel>
                              <Select
                                value={myBankCode}
                                onChange={(e: any) => {
                                  setMyBankCode(e.target.value);
                                  setCoinData({
                                    coin: {
                                      ...coinData.coin,
                                      bank_code: e.target.value
                                    },
                                  });
                                }}
                              >
                                {bankCodes ? (
                                  bankCodes.map((item: any) => {
                                    return (
                                      <option key={`code_${item.value}`} value={item.value}>
                                        {item.name}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <></>
                                )}

                              </Select>
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      {/* <Flex
                        alignItems='center'
                        py='24px'
                        w='full'
                        sx={styles.MPointer}
                      >
                        <Flex alignItems='center' pl={{ base: 1, sm: 1, md: 3, lg: 3 }}>
                          <Text
                            pr={{ base: 2, sm: 2, md: 4, lg: 4 }}
                            fontWeight='410'
                            w={{ base: '85px', sm: '85px', md: '100px', lg: '100px' }}
                          >
                            {coinData.modalName}
                          </Text>
                          <Image
                            borderRadius='full'
                            w={'30px'
                            }
                            h='30px'
                            display={coinData.coin.icon ? 'block' : 'none'}
                            src={coinData.coin.icon}
                          />
                        </Flex>
                        <Flex flex='1' pl={3}>
                          <Text>{coinData.coin.name || intl.formatMessage({id: 'text.selectbank'})}</Text>
                        </Flex>
                        <Icon fontSize='30px' as={ChevronRightIcon} />
                      </Flex> */}
                      <Divider mb={4} />
                      <Flex gap={6}>
                        <Field name='card_no'>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.CardNumber' />
                              </FormLabel>
                              <PInput
                                name='card_no'
                                placeholder={intl.formatMessage({
                                  id: 'text.CardNumber',
                                })}
                                onChange={field.onChange}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='acc_name'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isRequired
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.CardHolderName' />
                              </FormLabel>
                              <PInput
                                name='acc_name'
                                onChange={field.onChange}
                                isDisabled={userInfo?.['acc_name'] ? true : false}
                                placeholder={intl.formatMessage({
                                  id: 'text.CardHolderName',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      <Field name='erc_address'>
                        {({ field, form }: any) => (
                          <FormControl
                            h='115px'
                            isInvalid={
                              form.errors.nickname && form.touched.nickname
                            }
                          >
                            <FormLabel fontSize='14px'>
                              <FormattedMessage id='text.Erc20Address' />
                            </FormLabel>
                            <PInput
                              name='erc_address'
                              onChange={field.onChange}
                              placeholder={intl.formatMessage({
                                id: 'text.Erc20Address',
                              })}
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.nickname}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='trc_address'>
                        {({ field, form }: any) => (
                          <FormControl
                            h='115px'
                            isInvalid={
                              form.errors.nickname && form.touched.nickname
                            }
                          >
                            <FormLabel fontSize='14px'>
                              <FormattedMessage id='text.Trc20Address' />
                            </FormLabel>
                            <PInput
                              name='trc_address'
                              onChange={field.onChange}
                              placeholder={intl.formatMessage({
                                id: 'text.Trc20Address',
                              })}
                              {...field}
                            />
                            <FormErrorMessage>
                              {form.errors.nickname}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Divider />
                      <Divider mb='2' />
                      <Flex gap={6}>
                        <Field name='phone_number'>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.PhoneNumber' />
                              </FormLabel>
                              <PInput
                                name='phone_number'
                                placeholder={intl.formatMessage({
                                  id: 'text.PhoneNumber',
                                })}
                                isDisabled={
                                  userInfo?.['profile_status'] == 'OK'
                                }
                                onChange={field.onChange}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='facebook'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.Facebook' />
                              </FormLabel>
                              <PInput
                                name='facebook'
                                onChange={field.onChange}
                                placeholder={intl.formatMessage({
                                  id: 'text.Facebook',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                      <Flex gap={6}>
                        <Field name='telegram'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                {/* <FormattedMessage id="text.Telegram" /> */}
                                Telegram
                              </FormLabel>
                              <PInput
                                name='telegram'
                                onChange={field.onChange}
                                placeholder={intl.formatMessage({
                                  id: 'text.Telegram',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='wechat'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.Wechat' />
                              </FormLabel>
                              <PInput
                                name='wechat'
                                onChange={field.onChange}
                                placeholder={intl.formatMessage({
                                  id: 'text.Wechat',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex gap={6}>
                        <Field name='skype'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                {/* <FormattedMessage id="text.Skype" /> */}
                                Skype
                              </FormLabel>
                              <PInput
                                name='skype'
                                onChange={field.onChange}
                                placeholder={intl.formatMessage({
                                  id: 'text.Skype',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='whatsapp'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                {/* <FormattedMessage id="text.WhatsApp" /> */}
                                Whats app
                              </FormLabel>
                              <PInput
                                name='whatsapp'
                                onChange={field.onChange}
                                placeholder={intl.formatMessage({
                                  id: 'text.WhatsApp',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex gap={6}>
                        <Field name='line'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                {/* <FormattedMessage id="text.Line" /> */}
                                Line
                              </FormLabel>
                              <PInput
                                name='line'
                                onChange={field.onChange}
                                placeholder={intl.formatMessage({
                                  id: 'text.Line',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='zalo'>
                          {({ field, form }: any) => (
                            <FormControl
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                {/* <FormattedMessage id="text.Zalo" /> */}
                                Zalo
                              </FormLabel>
                              <PInput
                                name='zalo'
                                onChange={field.onChange}
                                placeholder={intl.formatMessage({
                                  id: 'text.Zalo',
                                })}
                                {...field}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex w='full' pt={5} key='submit'>
                        <PrimaryButton
                          isLoading={props.isSubmitting}
                          type='submit'
                        >
                          <FormattedMessage id='text.UpdateProfile' />
                        </PrimaryButton>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </Flex>
            ) : (
              <></>
            )}
          </MyCard>
        </Flex>
        <Flex
          mt={{ base: '24px', sm: '24px', md: '24px', lg: '0' }}
          ml={{ base: '0', sm: '0', md: '0', lg: '24px' }}
          w={{ base: '100%', sm: '100%', md: '100%', lg: '350px' }}
        >
          <MyMore />
        </Flex>
      </Flex>

      {/* <DepositSelectAsset
        open={isSelectOpen}
        onClose={onSelectClose}
        data={coinData}
        modalTypeItems={[]}
        onChange={(res: any) => {
          console.log(res);
          if (res?.bankIndex) {

          }
          (async () => {
            await setCoinData({
              bankIndex: res?.bankIndex,
              icon: res?.icon,
              name: res?.name,
              coin: {
                ...res?.conin,
                bank_code: res?.bankIndex >= 0 ? bankCodes[res?.bankIndex].value : ''
              },
              modalType: res?.modalType,
              modalName: res?.modalName,
            });
          })();

          onSelectClose();
        }}
      /> */}
    </MyContent>
  );
};
function setState(arg0: {}): [any, any] {
  throw new Error('Function not implemented.');
}

