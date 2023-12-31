import aiset from "@/assets/images/aiset.svg";
import { Flex, Image, Text } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { MyCard, TextBody, TextCardHeader } from "../../../../common";
import ShowItem from "./ShowItem";
import TheTooltip from "./TheTooltip";

const styles = {
  TableTh: {
    height: "55px",
    lineHeight: "55px",
    borderTop: "1px solid #acacac4d",
  },
};

export default ({ vips, user }: any) => {
  return (
    <MyCard flexDir="column" w="auto" mx={5} px={0} mb={8}>
      <Flex py={4} px={4} bg="rgba(0,183,217,0.15)" borderRadius="8px 8px 0 0">
        <Flex w="40px">
          <Image src={aiset} />
        </Flex>
        <Flex flexDir="column" pl={4}>
          <TextCardHeader p={0}>
            <FormattedMessage id="text.AiTrade" values={{ name: "AI Earn" }} />
          </TextCardHeader>
          <TextBody>
            <FormattedMessage id="vip.FunctionApplication" />
          </TextBody>
        </Flex>
      </Flex>
      {vips?.map((item: any, index: number) => {
        return (
          <Flex w="full" sx={styles.TableTh} key={"flex_" + index}>
            <Flex w="244px" px={3} alignItems="center">
              <Text pr={2} fontSize="14px" lineHeight="1rem">
                {item.name}
              </Text>
              <TheTooltip desc={item.desc} />
            </Flex>
            <Flex flex="1">
              {item?.values.map((value: any, index1: number) => {
                return (
                  <ShowItem
                    key1={item.key}
                    name={item.name}
                    active={user?.vips_id === index1 + 1}
                    value={value}
                  />
                );
              })}
            </Flex>
          </Flex>
        );
      })}
    </MyCard>
  );
};
