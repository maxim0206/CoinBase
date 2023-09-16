import { Button, Divider, Image, Flex, Text, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
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
  useListPage,
  useMyState,
} from '../../../../common';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import enUS from 'antd/locale/en_US';
import zhTW from 'antd/locale/zh_TW';
import { Locale } from 'antd/es/locale';

import { MyPagination } from '@components/MyPagination';
import { ConfigProvider } from 'antd';
import pagination from 'antd/es/pagination';
import { locale } from 'dayjs';
import moment from 'moment';
import NoActivity from '../../../../components/NoActivity';
import { subscribe } from 'valtio';


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

export default ({ }: any) => {

  const defauleDark = useColorModeValue('ant', 'antdark');
  const intl = useIntl();
  const [locale, setLocal] = useState<Locale>(intl.locale.toLowerCase() == 'en' ? enUS : zhTW);
  const [items, setItems] = useState<any>([]);
  const [initFlag, setInitFlag] = useState(false);
  const { getData, getList, pagination, params } = useListPage({
    baseUri: 'assets/list',
    defaultParams: {
      account_type: 'Staking'
    }
  });


  return (
    <Flex w="full" direction="column">
      <TableContainer pt="3px" w="100%">
        <Table variant="simple" size="md" w="100%">
          <Thead h="50px" w="100%">
            <Tr>
              <Th fontSize={14} textAlign='center'>
                <FormattedMessage id="text.Date" />
              </Th>
              <Th fontSize={14} textAlign='center'>
                <FormattedMessage id="text.Type" />
              </Th>
              <Th fontSize={14} textAlign='center'>
                <FormattedMessage id="text.Amount" />
              </Th>
              <Th fontSize={14} textAlign='center'>
                <FormattedMessage id="text.Before" />
              </Th>
              <Th fontSize={14} textAlign='center'>
                <FormattedMessage id="text.After" />
              </Th>
            </Tr>
          </Thead>
          <Tbody w="100%">
            {getData?.data?.map((res: any) => {
              return (
                <Tr key={"tr_" + res.id}>
                  <Td alignItems="center">
                    <Flex flexDir='column' textAlign='center'>
                      <Text w='full' lineHeight='20px'>
                        {getDateAll(res?.created_at, 'month')}
                      </Text>
                      <Text w='full'> {getDateAll(res?.created_at, 'day')}</Text>
                    </Flex>
                  </Td>
                  <Td textAlign='center'>

                    <Text
                      fontWeight='var(--cds-fontWeights-medium)'
                      lineHeight='20px'
                    >
                      {res?.type}
                    </Text>
                  </Td>
                  <Td textAlign='center'>

                    <Text
                      fontWeight='var(--cds-fontWeights-medium)'
                      lineHeight='20px'
                    >
                      {numberWithCommas(res?.amount + '', 0)} &nbsp; USDC
                    </Text>
                  </Td>
                  <Td textAlign='center' >
                    <Text
                      fontWeight='var(--cds-fontWeights-medium)'
                      lineHeight='20px'
                    >
                      {numberWithCommas(res?.before_amount + '', 0)} &nbsp; USDC
                    </Text>
                  </Td>
                  <Td textAlign='center'>
                    <Text
                      fontWeight='var(--cds-fontWeights-medium)'
                      lineHeight='20px'
                    >
                      {numberWithCommas(res?.after_amount + '', 0)} &nbsp; USDC
                    </Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {!getData?.data || getData?.data?.length == 0 ? <NoActivity /> : ''}
      <ConfigProvider prefixCls={defauleDark}
        locale={locale}>
        <MyPagination {...pagination} />
      </ConfigProvider>
    </Flex>
  );
};
