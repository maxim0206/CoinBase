import { Avatar, Flex, Td, Text, Tr } from '@chakra-ui/react';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { FormattedMessage, useIntl } from 'react-intl';
// import {
//   erc20ABI,
//   useContractRead,
//   useContractWrite,
//   usePrepareContractWrite,
// } from 'wagmi';
import {
  GetAddressByCoin,
  PrimaryButton,
  getErrorMessage,
  request,
  stateActions,
  useMyToast,
} from '../../../../common';

export default ({ coin, user }: any) => {
  const { showError, showSuccess } = useMyToast();
  const intl = useIntl();

  const contractAddress = GetAddressByCoin(coin) as any;

  // const { data } = useContractRead({
  //   address: contractAddress,
  //   abi: erc20ABI,
  //   functionName: 'balanceOf',
  //   args: [user.address],
  //   enabled: !!contractAddress && !!user.address,
  // });

  // const { config } = usePrepareContractWrite({
  //   address: contractAddress,
  //   abi: erc20ABI,
  //   functionName: 'transfer',
  //   args: [
  //     coin.symbol == 'USDC' ? user.usdcReceive : user.usdtReceive,
  //     data ? data : BigNumber.from('0'),
  //   ], // constants.MaxUint256
  //   onError(error) {
  //     stateActions.subLoading();
  //     showError({ description: getErrorMessage(error.message, intl) });
  //   },
  // });

  // const { write } = useContractWrite({
  //   ...config,
  //   onError(error) {
  //     stateActions.subLoading();
  //     showError({ description: getErrorMessage(error.message, intl) });
  //   },
  //   onSuccess(cData) {
  //     stateActions.subLoading();
  //     let params = {
  //       coins_id: coin.id,
  //       symbol: coin.symbol,
  //       input_amount: formatUnits(data ?? BigNumber.from(0), coin.decimals),
  //       hash: cData.hash,
  //     };
  //     console.log('onSuccess', params);
  //     request('transfer/staking', { data: params })
  //       .then(() => {
  //         showSuccess({
  //           description: intl.formatMessage({ id: 'success.StakingSuccess' }),
  //         });
  //       })
  //       .catch((err) => {
  //         showError({
  //           description: intl.formatMessage({ id: 'error.common' }),
  //         });
  //       });
  //   },
  // });

  const api = {
    onPreStaking: (params: any) => {
      return request('transfer/pre_staking', { data: params })
        .then(() => {
          // write?.();
        })
        .catch((res) => showError({ description: res?.message }));
    },
  };

  return (
    <Tr key={coin.id}>
      <Td alignItems='center'>
        <Flex>
          <Avatar src={coin.icon} w='32px' h='32px' mr='2' />
          <Flex flexDir='column'>
            <Text fontWeight='410' lineHeight='1rem'>
              {coin.name}
            </Text>
            <Text fontSize='13px'>{coin.symbol}</Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        {/* {formatUnits(data ?? BigNumber.from(0), coin?.decimals ?? 6)}{' '} */}
        {formatUnits(BigNumber.from(0), coin?.decimals ?? 6)}{' '}
        {coin?.symbol}
      </Td>
      <Td sx={{ textAlign: 'center' }}>
        <PrimaryButton
          px={4}
          w='120px'
          fontSize='14px'
          py={0}
          onClick={() => {
            stateActions.addLoading();
            api.onPreStaking({
              symbol: coin.symbol,
              input_amount: formatUnits(
                // data ?? BigNumber.from(0),
                BigNumber.from(0),
                coin?.decimals ?? 6,
              ),
            });
          }}
        >
          <FormattedMessage id='text.Staking' />
        </PrimaryButton>
      </Td>
    </Tr>
  );
};
