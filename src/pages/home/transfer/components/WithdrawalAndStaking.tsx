import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useSearchParams } from 'react-router-dom';
import { MyCard, MyRender, useMyState } from '../../../../common';
import Staking from './Staking';
import Tabs from './Tabs';
import Withdrawal from './Withdrawal';
import Deposit from './Deposit';

export default function WithdrawalAndStaking({ api, methods, user, res }: any) {
  const intl = useIntl();
  const { snap } = useMyState();
  const [searchParams]: any = useSearchParams();
  const [key, setKey] = useState(searchParams.get('tab') || 'Deposit');
  const [data, setData] = useState({
    min: 0,
    max: 0,
    fee: 0,
    balance: 0,
    canFree: false,
  } as any);

  const items = [
    { value: 'Deposit', label: intl.formatMessage({ id: 'text.Deposit' }) },
    { value: 'Staking', label: intl.formatMessage({ id: 'text.Staking' }) },
    {
      value: 'Withdrawal',
      label: intl.formatMessage({ id: 'text.Withdrawal' }),
    },

  ];
  useEffect(() => {
    // if (!res?.preWithdrawal)
    //   return api.pre_withdrawal().then((res1: any) =>
    //     setData({
    //       min: parseFloat(res1.min),
    //       max: parseFloat(res1.max),
    //       fee: res1.fee,
    //       balance: Number(snap.session?.user?.lottery_amount) ?? 0,
    //       canFree: res1.canFree,
    //     }),
    //   );
    // const { balance, min, max, fee } = res.preWithdrawal;
    // if (balance && min && max && fee) {
    //   setData({
    //     min: parseFloat(res?.preWithdrawal?.min),
    //     max: parseFloat(res?.preWithdrawal?.max),
    //     fee: res?.preWithdrawal?.fee,
    //     balance: Number(snap.session?.user?.lottery_amount) ?? 0,
    //     canFree: res.preWithdrawal.canFree,
    //   });
    // }
    setData({
      min: 0,
      max: 0,
      fee: 0,
      balance: Number(snap.session?.user?.balance_withdrawable) ?? 0,
      canFree: 0,
    });
  }, [snap.session?.user?.balance_withdrawable]);

  return (
    <MyCard flexDir='column' mb={5}>
      <Tabs value={key} items={items} onChange={setKey} />
      <MyRender
        render={() => {
          if (key == 'Withdrawal')
            return (
              <Withdrawal
                methods={methods}
                user={user}
                price={res.price}
                res={data}
                currency={res.currency}
                api={api}
              />
            );
          else if (key == 'Staking')
            return (
              <Staking
                api={api}
                methods={methods}
                user={user}
                price={res.price}
                balance={data.balance}
              />
            );
          else if (key == 'Deposit')
            return (
              <Deposit
                api={api}
                methods={methods}
                user={user}
                price={res.price}      
                cryptoConfig = {res.cryptoConfig}
                vndCurrency={res.currency?.deposit}
                bankCodes={res.bankCodes}
                bizTypes={res.bizTypes}
                balance={data.balance}
              />
            );
        }}
      />
    </MyCard>
  );
}
