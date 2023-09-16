import { formatMoney, formatPercent } from "../../../../common";
import { Flex, Text } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";


export default ({ ydata }: any) => {
    const [rate, setRate] = useState<number>(0);
    useEffect(() => {
        let vRate = ydata?.rate ?? 0;
        setRate(vRate);
    }, [ydata]);
  return (
    <>
      <Flex
        justifyContent="space-between"
        sx={{ fontSize: "1.1rem" }}
        pb={3}
        pt={5}
      >
        <Text sx={{ fontWeight: "410" }}>
          <FormattedMessage id="text.Earned" />
        </Text>
        <Text>{formatMoney(ydata?.amount, "$")}</Text>
      </Flex>
      <Text sx={{ fontSize: "1rem" }}>
        <FormattedMessage id="earn.your_yield.modal.earnedCont"  values={{ name: "AI Earn"}}/>
      </Text>
      <Flex
        justifyContent="space-between"
        sx={{ fontSize: "1.1rem" }}
        pt={5}
        pb={3}
      >
        <Text sx={{ fontWeight: "410" }}>
          <FormattedMessage id="earn.your_yield.modal.averageTitle" />
        </Text>
          <Text
              fontSize="1.2rem"
              style={{
                  marginTop: 0,
                  fontWeight: "var(--cds-fontWeights-medium)",
              }}
          >
              {rate > 0 ? (
                  <span style={{ color: "#098551" }}>
                    ↗ {formatPercent(rate)}
                  </span>
              ) : (
                  <span style={{ color: "#cf202f" }}>
                    ↘ {formatPercent(rate)}
                  </span>
              )}
          </Text>
      </Flex>
      <Text sx={{ fontSize: "1rem" }}>
        <FormattedMessage id="earn.your_yield.modal.averageCont" />
      </Text>
      <Text pb={4} pt={5} sx={{ color: "#5b616e" }}>
        <FormattedMessage id="earn.your_yield.modal.see" />
        <Link to="/home/learn" style={{ color: "#0052ff" }}>
          <FormattedMessage id="text.LearnMore" />
        </Link>
      </Text>
    </>
  );
};
