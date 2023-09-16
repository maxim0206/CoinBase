import { showTransfer } from '@/api/transfer';
import {
  MyContent,
  request,
  stateActions,
  useMyState,
  useMyToast,
} from '@/common';
import {
  AlertDialog,
  AlertDialogOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSetState } from 'react-use';
import CryptoGifts from './components/CryptoGifts';
import RecentSends from './components/RecentSends';
import Transactions from './components/Transactions';
import WithdrawalAndStaking from './components/WithdrawalAndStaking';
import MServiceCharge from './modal/ServiceCharge';
import MFriendList from './modal/friendList';
import MIdentityDialog from './modal/identityDialog';
import MupGrade from './modal/upgrade';
import GoogleAuthenticator from './components/GoogleAuthenticator';
import Enable2FA from './components/Enable2FA';
import './style.scss';
import { Outlet } from 'react-router';

export default () => {
  const cancelRef: any = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showRes } = useMyToast();
  const { snap } = useMyState();
  const { showError, showSuccess } = useMyToast();
  const intl = useIntl();

  const [res, setRes] = useSetState<any>({
    transactions: {
      Deposit: [],
      Withdrawal: [],
      Staking: [],
    },
    recent_sends: [],
    price: {
      usdc: 1,
      usdt: 1,
    },
    coins: [],
    bankCodes: [],
    userBankCodes: [],
    bizTypes: [],
    dialog: <></>,
    currency: {
      deposit: 24000,
      withdrawal: 23000,
    },
    cryptoConfig: {},
    preWithdrawal: {},
  });
  const api = {
    show: () => {
      // showTransfer().then((json) => {
      //   // console.log(json, 'shows');
      //   setRes(json?.data);
      // });
      api.getBankCodes();
    },
    getBankCodes: () => {
      request('transfer/info').then((res: any) => {
        setRes({
          bankCodes: res.data.bank_code,
          userBankCodes: res.data.user_banks,
          bizTypes: res.data.biz_type,
          cryptoConfig: res.data.config,
          currency: {
            deposit: res.data.config.deposit_vnd.rate,
            withdrawal: res.data.config.withdrawal_vnd.rate,
          }
        });
        // setBankCodes(res.data.bank_code);
        // setBizTypes(res.data.biz_type);
      }).catch(showRes);
    },
    // pre_withdrawal: () =>
    //   request('transfer/pre_withdrawal').then((json) => {
    //     const preWithdrawal = JSON.parse(JSON.stringify(json?.data));
    //     setRes({ preWithdrawal });
    //     return preWithdrawal;
    //   }),
    pre_staking: () => {
      // request('transfer/pre_staking', {})
    },
    getStaking: (data: any, setData: any) => {
      return request('transfer/staking', { data: data })
        .then((res) => {
          setData(res);
        })
        .catch(showRes);
    },
    getDepositVND: (data: any, setData: any) => {
      return request('transfer/deposit_vnd', { data })
        .then((res) => {
          setData(res);
        })
        .catch((e: any) => {
          showRes(e);
          setData(null);
          setTimeout(() => {
            if (!snap?.session?.user?.card_no)
              location.href = '/home/settings/info';
          }, 2000);

        });
    },
    getDepositCrypto: (data: any, setData: any) => {
      return request('transfer/deposit_crypto', { data })
        .then((res) => {
          setData(res);
        })
        .catch((e: any) => {
          showRes(e);
          setData(null);
          setTimeout(() => {
            if (e.code == 9999 && data?.network == 'POLYGON' && !snap?.session?.user?.polygon_address) {
              location.href = '/home/settings/info';
            } else if (e.code == 9999 && data?.network == 'TRC20' && !snap?.session?.user?.trc_address) {
              location.href = '/home/settings/info';
            } else if (e.code == 9999 && data?.network == 'ERC20' && !snap?.session?.user?.erc_address) {
              location.href = '/home/settings/info';
            }
          }, 2000);
        });
    },
    staking_from_wallet: (data: any) => {
      request('transfer/staking_from_wallet', { data: data })
        .then((res) => {
          showSuccess({
            description: intl.formatMessage({ id: 'success.StakingSuccess' }),
          });
          api.show();
          // api.pre_withdrawal();
        })
        .catch(() => {
          showError({
            description: intl.formatMessage({ id: 'error.common' }),
          });
        });
    },
    staking_from_withdrawable: (data: any) => {
      // request('transfer/staking_from_withdrawable', { data: data })
      //   .then((res) => {
      //     showSuccess({
      //       description: intl.formatMessage({ id: 'success.StakingSuccess' }),
      //     });
      //     api.show();
      //     // api.pre_withdrawal();
      //   })
      //   .catch((err) => {
      //     showError({
      //       description: intl.formatMessage({ id: 'error.common' }),
      //     });
      //   });
    },
    cancelWithdraw: (id: number) => {
      return request('/transfer/cancel_friend_help', { data: { id } }).then(
        (res) => {
          api.show();
        },
      );
    },
    onWithdrawVND: (
      getInputAmount: any,
      setWithdrawResult: any
    ) => {
      request('transfer/withdraw_vnd', {
        data: { from_amt: getInputAmount },
      })
        .then((res: any) => {
          if (res?.code === 0) {
            showRes(res);
            stateActions.me();
            setWithdrawResult({ amount: 0 });
            onClose();
          } else {
            setRes({
              dialog: (
                <MupGrade
                  tdata={{
                    ...res?.data,
                    flag: true,
                    input_amount: getInputAmount,
                  }}
                  methods={methods}
                  onClose={onClose}
                />
              ),
            });
            setWithdrawResult(null);
            onOpen();
          }
        })

        .catch((err) => {
          if (err.code == 10006) {
            onClose();
            setRes({
              dialog: <MIdentityDialog message={err} onClose={onClose} />,
            });
            setWithdrawResult(null);
            onOpen();
            return false;
          }
          if (err.code == 10004) {
            console.log({
              flag: false,
              message: err.message,
            });
            onClose();
            setRes({
              dialog: (
                <MupGrade
                  tdata={{
                    flag: false,
                    message: err.message,
                  }}
                  methods={methods}
                  onClose={onClose}
                />
              ),
            });
            setWithdrawResult(null);
            onOpen();
            return false;
          }
          if (err.code == 10010) {
            setRes({
              dialog: (
                <MFriendList
                  tdata={{
                    flag: false,
                    ...JSON.parse(err.message),
                  }}
                  api={api}
                  onClose={onClose}
                />
              ),
            });
            onOpen();
            setWithdrawResult(null);
            return false;
          }
          if (err.code == 10006) {
            setRes({
              dialog: <MIdentityDialog message={err} onClose={onClose} />,
            });
            onOpen();
            setWithdrawResult(null);
            return false;
          }
          showRes(err);
        })
        .finally(() => {
          api.show();
          setWithdrawResult(null);
        });
    },
    onWithdrawCrypto: (
      apiUrl: string,
      getInputAmount: any,
      OUData: any,
      params: any,
      setWithdrawResult: any
    ) => {
      request(apiUrl, {
        data: params,
      })
        .then((res: any) => {
          if (res?.code === 0) {
            if ('transfer/pre_withdraw_crypto' == apiUrl) {
              const preWithdrawal = JSON.parse(JSON.stringify(res?.data));
              let ouData = OUData;
              ouData.fee = (Math.round(preWithdrawal.token_fee * 100) / 100).toFixed(2);
              methods.withdraw(
                getInputAmount,
                'Wallet',
                ouData,
                params,
                setWithdrawResult,
                true);
              return;
            }
            stateActions.me();
            showRes(res);
            setWithdrawResult({ amount: 0 });
            onClose();
          } else {
            setRes({
              dialog: (
                <MupGrade
                  tdata={{
                    ...res?.data,
                    flag: true,
                    input_amount: getInputAmount,
                  }}
                  methods={methods}
                  onClose={onClose}
                />
              ),
            });
            setWithdrawResult(null);
            onOpen();
          }
        })

        .catch((err) => {
          console.log(err);
          if (err.code == 10006) {
            onClose();
            setRes({
              dialog: <MIdentityDialog message={err} onClose={onClose} />,
            });
            setWithdrawResult(null);
            onOpen();
            return false;
          }
          if (err.code == 10004) {
            console.log({
              flag: false,
              message: err.message,
            });
            onClose();
            setRes({
              dialog: (
                <MupGrade
                  tdata={{
                    flag: false,
                    message: err.message,
                  }}
                  methods={methods}
                  onClose={onClose}
                />
              ),
            });
            setWithdrawResult(null);
            onOpen();
            return false;
          }
          if (err.code == 10010) {
            setRes({
              dialog: (
                <MFriendList
                  tdata={{
                    flag: false,
                    ...JSON.parse(err.message),
                  }}
                  api={api}
                  onClose={onClose}
                />
              ),
            });
            onOpen();
            setWithdrawResult(null);
            return false;
          }
          if (err.code == 10006) {
            setRes({
              dialog: <MIdentityDialog message={err} onClose={onClose} />,
            });
            onOpen();
            setWithdrawResult(null);
            return false;
          }
          showRes(err);
        })
        .finally(() => {
          api.show();
          setWithdrawResult(null);
        });
    },
    onStaking: (params: any) => {
      request('transfer/submit_staking', { data: params })
        .then(() => {
          showSuccess({
            description: intl.formatMessage({ id: 'success.StakingSuccess' }),
          });
          api.show();
          // api.getTransactions();
          // api.getRecentSends();
        })
        .catch((err) => {
          showError({
            description: intl.formatMessage({ id: 'error.common' }),
          });
        });
    },
    onSendInvite: (data: any, funct: any) => {
      request('friends/send_invite', { data: data })
        .then((res) => {
          showRes(res);
          return funct(res);
        })
        .catch(showRes);
    },
    getTransactions: (type: string) => {
      if (type == 'Staking') {
        request('assets/list', { data: { account_type: 'Staking' } })
          .then((res) => {
            let obj: any = {};
            obj[type] = res?.data;
            setRes({ transactions: obj });
          })
          .catch(showRes);
      } else {
        request('transfer/payment_list', {
          data: { type }
        })
          .then((res) => {
            let obj: any = {};
            obj[type] = res?.data;
            setRes({ transactions: obj });
          })
          .catch(showRes);
      }

    },
    getRecentSends: () => {
      request('transfer/get_recent_sends', {})
        .then((res) => {
          setRes({ recent_sends: res?.data || [] });
        })
        .catch(showRes);
    },
  };

  const methods = {
    onFriendFun: (data: any) => {
      onClose();
      setRes({
        dialog: <MFriendList api={api} tdata={data} onClose={onClose} />,
      });
      onOpen();
    },
    handleCancelWithdraw: async (id: number) => {
      return api.cancelWithdraw(id).then(() =>
        stateActions.me().then((res) => {
          setRes({
            preWithdrawal: {
              balance: res.total_balance,
            },
          });
        }),
      );
    },
    withdraw: (getInputAmount: number, withdrawMethod: string, OUData: any, params: any, setWithdrawResult: any, getPreWithdraw: boolean) => {
      let bankName = '';
      const currency = res.currency.withdrawal;
      if (!getPreWithdraw && withdrawMethod == 'Wallet') {
        api.onWithdrawCrypto('transfer/pre_withdraw_crypto', getInputAmount, OUData, params, setWithdrawResult);
        return;
      }
      if (res.userBankCodes?.length > 0) {
        const idx = res.userBankCodes.findIndex((s: any) => s.value == snap.session.user.bank_code);
        if (idx != -1) {
          bankName = res.userBankCodes[idx].name;
        }
      }
      request('google2fa/is2fa_enable', { data: { destination: snap.session.user.username, input_amount: getInputAmount } })
        .then((res) => {
          setRes({
            dialog: (
              <GoogleAuthenticator
                Amount={params.network == 'BANK' ? getInputAmount * currency : getInputAmount}
                network={params.network}
                bankName={bankName}
                onClose={() => {
                  onClose();
                  setWithdrawResult(null);
                }}
                onChange={(useFree: boolean) => {
                  if (withdrawMethod == 'BankCard') {
                    api.onWithdrawVND(getInputAmount, setWithdrawResult);
                  } else if (withdrawMethod == 'Wallet') {
                    api.onWithdrawCrypto('transfer/withdraw_crypto', getInputAmount, OUData, params, setWithdrawResult);
                  }

                }}
                enable2FA={res?.data?.is_verified_key}
                tdata={OUData}
              />
            ),
          });
          onOpen();
        })
        .catch((err) => {
          setWithdrawResult(null);
          if (err.code == 10006) {
            // if (getInputAmount < 5000) {
              setRes({
                dialog: (
                  <GoogleAuthenticator
                    Amount={params.network == 'BANK' ? getInputAmount * currency : getInputAmount}
                    network={params.network}
                    bankName={bankName}
                    onClose={() => {
                      onClose();
                      setWithdrawResult(null);
                    }}
                    onChange={(useFree: boolean) => {
                      if (withdrawMethod == 'BankCard') {
                        api.onWithdrawVND(getInputAmount, setWithdrawResult);
                      } else if (withdrawMethod == 'Wallet') {
                        api.onWithdrawCrypto('transfer/withdraw_crypto', getInputAmount, OUData, params, setWithdrawResult);
                      }

                    }}
                    enable2FA={res?.data?.is_verified_key}
                    tdata={OUData}
                  />
                ),
              });
              onOpen();
            // } else {
            //   onClose();
            //   setRes({
            //     dialog: <MIdentityDialog message={err} onClose={onClose} />,
            //   });
            //   onOpen();
            // }

            return false;
          }
          if (err.code == 10004) {
            onClose();
            setRes({
              dialog: (
                <MupGrade
                  tdata={{
                    flag: false,
                    message: err.message,
                  }}
                  methods={methods}
                  onClose={onClose}
                />
              ),
            });
            onOpen();
            return false;
          }
          if (err.code == 10010) {
            setRes({
              dialog: (
                <MFriendList
                  tdata={{
                    flag: false,
                    ...JSON.parse(err.message),
                  }}
                  api={api}
                  onClose={onClose}
                />
              ),
            });
            onOpen();
            return false;
          }
          showRes(err);
        })
        .finally(() => {
          api.show();
          setWithdrawResult(null);
        });
    },
  };

  useEffect(() => {
    // api.show();
    // api.pre_withdrawal();
    api.getBankCodes();
    api.getTransactions('Deposit');
  }, []);

  return (
    <MyContent w='100%'>
      <Flex flexWrap='wrap'>
        <Flex flexDir='column' className='trans-l-c'>
          <WithdrawalAndStaking
            api={api}
            methods={methods}
            user={snap.session.user}
            res={res}
          />
          <Transactions
            api={api}
            bankCodes={res?.bankCodes}
            data={res?.transactions}
            onCancel={methods.handleCancelWithdraw}
          />
        </Flex>
        <Flex className='trans-r-c' flexDir='column'>
          <CryptoGifts />
          <RecentSends data={res?.recent_sends} />
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>{res?.dialog}</AlertDialogOverlay>
      </AlertDialog>
    </MyContent>
  );
};
