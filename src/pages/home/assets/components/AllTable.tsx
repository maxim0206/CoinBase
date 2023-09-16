import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Flex,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { MyPagination } from "../../../../components/MyPagination";
import NoActivity from "../../../../components/NoActivity";
import { ConfigProvider } from "antd";
import { formatCoins, getDayYmHm, useListPage } from "../../../../common";
import { useEffect, useState } from "react";

export default ({ accountType }: any) => {
  const defauleDark = useColorModeValue("ant", "antdark");
  const [tblData, setTblData] = useState<any>([]);
  const { getData, getList, pagination, params } = useListPage({
    baseUri: "assets/list",
    defaultParams: {
      account_type: accountType
    }
  });
  useEffect(() => {
    setTblData([]);
    getList({
      account_type: accountType
    });
  }, [accountType]);

  useEffect(() => {
    setTblData(getData?.data);
  }, [getData]);
  return (
    <Flex flexDir="column" w="full">
      <ConfigProvider prefixCls={defauleDark}>
        {tblData?.length > 0 ? (
          <TableContainer pt="3px" w="100%">
            <Table variant="simple" size="md" w="100%">
              <Thead h="50px" w="100%">
                <Tr>
                  <Th>
                    <FormattedMessage id="text.Date" />
                  </Th>
                  {
                    (!accountType) ? (
                      <Th>
                        <FormattedMessage id="text.Type" />
                      </Th>
                    ) : (
                      <></>
                    )
                  }
                  <Th>
                    <FormattedMessage id="text.Method" />
                  </Th>
                  <Th>
                    <FormattedMessage id="text.Before" />
                  </Th>
                  <Th>
                    <FormattedMessage id="text.Amount" />
                  </Th>
                  <Th>
                    <FormattedMessage id="text.After" />
                  </Th>
                  <Th>
                    <FormattedMessage id="text.Remark" />
                  </Th>
                </Tr>
              </Thead>
              <Tbody w="100%">
                {tblData?.map((res: any, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td>{getDayYmHm(res.created_at)}</Td>
                      {
                        (!accountType) ? (
                          <Td>
                            <FormattedMessage id={'text.' + res?.account_type} />
                          </Td>
                        ) : (
                          <></>
                        )
                      }

                      <Td>
                        <FormattedMessage id={res?.type} />
                        {/* {res?.type.indexOf('On') == 0 ? res?.type.substring(2).split(/(?=[A-Z])/).join(' ') : res?.type.split(/(?=[A-Z])/).join(' ')} */}
                      </Td>
                      <Td>{formatCoins(res?.before_amount, "USDC", 2)}</Td>
                      <Td>{formatCoins(res?.amount, "USDC", 2)}</Td>
                      <Td>{formatCoins(res?.after_amount, "USDC", 2)}</Td>
                      <Td>
                        {/* <FormattedMessage id={`text.${res?.remark}`} /> */}
                        {res?.remark}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <NoActivity />
        )}

        <MyPagination {...pagination} />
      </ConfigProvider>
    </Flex>
  );
};
