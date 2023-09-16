import { Flex, Divider } from "@chakra-ui/react";
import EnclosedTab from "./EnclosedTab";
import StakingTable from "./StakingTable";
import WithdrawableTable from "./WithdrawableTable";
import PendingTable from "./PendingTable";
import { useState } from "react";
import WalletTable from "./WalletTable";
import MyNoActivity from "../../../../components/NoActivity";
import { FormattedMessage } from "react-intl";
import AllTable from "./AllTable";
import { MyCard, TextCardHeader } from "../../../../common";

export default ({ res, onRefresh }: any) => {
  const [getIdx, setIdx] = useState(0);
  const ShowTable = (idx: number) => {
    if (idx == 0) {
      return <AllTable />;
    }
    if (idx == 1) {
      // return <StakingTable tdata={res?.staking} />;
      return <AllTable accountType='Staking'/>;
    }
    if (idx == 2) {
      return <AllTable accountType='Withdrawable'/>;
    }
    if (idx == 3) {
      return <AllTable accountType='Airdrop'/>;      
    }
    if (idx == 4) {
      return <AllTable accountType='Loyalty'/>;      
    }
    if (idx == 5) {
      return <AllTable accountType='Bonus'/>;      
    }
    return (
      <MyNoActivity label={<FormattedMessage id="text.NoActivityYet" />} />
    );
  };
  return (
    <>
      <MyCard flexDir="column">
        <Flex
          w="full"
          flexWrap="wrap"
          alignItems="center"
          justifyContent={{
            base: "center",
            sm: "center",
            md: "flex-end",
            lg: "flex-end",
          }}
          py={1}
        >
          <TextCardHeader flex="1">
            <FormattedMessage id="text.YourAssets" />
          </TextCardHeader>
          <Flex pb={{ base: 1, sm: 1, md: 0, lg: 0 }}>
            <EnclosedTab
              idx={0}
              onChange={(idx: number) => {
                setIdx(idx);
              }}
            />
          </Flex>
        </Flex>
        <Divider />
        <Flex>{ShowTable(getIdx)}</Flex>
      </MyCard>
    </>
  );
};
