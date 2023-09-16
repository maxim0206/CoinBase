import EthBadge from '@assets/images/eth-logo.svg';
import PolygonBadge from '@assets/images/matic-logo.svg';
import {
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
// import { useNetwork } from 'wagmi';
import { Coins, useMyState } from '../../../../common';
import CoinBalance from './CoinBalance';

export default () => {
  const { snap } = useMyState();
  // const { chain } = useNetwork();
  // const [source, setSource] = useState(
  //   chain?.name === 'Ethereum' ? EthBadge : PolygonBadge,
  // );
  // useEffect(() => {
  //   const changeSource = chain?.name === 'Ethereum' ? EthBadge : PolygonBadge;
  //   if (changeSource !== source) {
  //     setSource(changeSource);
  //   }
  // }, [chain]);
  const [source, setSource] = useState(PolygonBadge);
  useEffect(() => {
    const changeSource = PolygonBadge;
    if (changeSource !== source) {
      setSource(changeSource);
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  }, []);
  return (
    <TableContainer pt='3px' w='100%'>
      <Table variant='simple' size='md' w='100%'>
        <Thead h='50px' w='100%'>
          <Tr>
            <Th>
              <Flex sx={{ textAlign: 'center' }}>
                <FormattedMessage id='text.Name' />
                <Image
                  sx={{
                    marginLeft: '5px',
                  }}
                  borderRadius='full'
                  w='20px'
                  h='20px'
                  src={source}
                />
              </Flex>
            </Th>
            <Th>
              <FormattedMessage id='text.Balance' />
            </Th>
            <Th sx={{ textAlign: 'center' }}>
              <FormattedMessage id='text.Operate' />
            </Th>
          </Tr>
        </Thead>
        <Tbody w='100%'>
          {Coins.map((coin) => (
            <CoinBalance coin={coin} key={coin.id} user={snap.session.user} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
