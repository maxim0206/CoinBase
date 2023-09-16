import { MyContent } from "../../../common/components/MyContent";
import { useMyIntl } from "../../../common";
import Aitradelearn from "@/assets/images/what-is-guess.svg";
import time00 from "@/assets/imgs/00.jpg";
import time05 from "@/assets/imgs/05.jpg";
import time5 from "@/assets/imgs/5.jpg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
  Link,
  List,
  ListItem,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
const styles = {
  Fiexs: {
    position: "fixed",
    top: "100px",
    background: "#f2f2f2",
    _dark: { background: "#333" },
  },
  Relative: {
    position: "relative",
    top: "0",
    background: "#f2f2f2",
    _dark: { background: "#333" },
  },
};
export default () => {
  const [getFixed, setFixed] = useState({});
  const onScroll = (e: any) => {
    if (e.target.documentElement.scrollTop > 300) {
      setFixed(styles.Fiexs);
    } else {
      setFixed(styles.Relative);
    }
    console.log(e.target.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });
  const { lang } = useMyIntl("GuessisagameforBTCUSDTmarketprediction");
  return (
      <MyContent w={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}>
        <Flex w="full" flexDir="column">
          <Flex>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home/learn">
                  {lang[0]}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home/learn#Tips-and-tutorials">
                  {lang[1]}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="3rem" py={3}>
            {lang[2]}
          </Text>
          <Text color="#5b616e">
            {lang[3]}
          </Text>
          <Wrap py={6} spacing="24px" flexWrap="wrap">
            <WrapItem flexDir="column" flex="1">
              <Flex w="full">
                <Image src={Aitradelearn} w="full" />
              </Flex>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="What-is-a-guess-number">
                {lang[4]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} fontSize="1.4rem">
                {lang[5]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[6]}
                <Link color="#1652f0" href="https://www.binance.com/en-NG/trade/BTC_USDT">
                  {lang[7]}
                </Link>
                {lang[8]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} pb={2} >
                {lang[9]}
              </Text>
              <Flex w="full">
                <Image src={time00} w="full" />
              </Flex>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} pb={2} >
                {lang[10]}
              </Text>
              <Flex w="full">
                <Image src={time05} w="full" />
              </Flex>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={6}fontSize="1.4rem">
                {lang[11]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} pb={2} >
                {lang[12]}
                <Link color="#1652f0" href="https://www.binance.com/en-NG/trade/BTC_USDT">
                  {lang[13]}
                </Link>
                {lang[14]}
              </Text>
              <Flex w="full">
                <Image src={time5} w="full" />
              </Flex>

              <Text fontWeight="var(--cds-fontWeights-medium)" pt={6}fontSize="1.4rem">
                PK
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} pb={2} >
                {lang[43]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} pb={2} >
                {lang[44]}
              </Text>



              <Text fontWeight="var(--cds-fontWeights-medium)" pt={5} fontSize="2rem" id="Are-guess-numbers-globally-standardized">
                {lang[15]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[16]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={5}fontSize="2rem" id="How-long-is-each-guess-round">
                {lang[17]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem">
                {lang[18]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[19]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem" >
                {lang[20]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[21]}
              </Text>

              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem" >
               PK
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[45]}
              </Text>


              <Text fontWeight="var(--cds-fontWeights-medium)" pt={5}fontSize="2rem" id="What-constitutes-a-win-and-what-are-the-winning-odds">
                {lang[22]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem">
                {lang[23]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[24]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem">
                {lang[25]}
              </Text>
              <Text as="ul" fontSize="1.2rem" lineHeight="2rem" listStyleType="circle" pt={5} pl={6} pb="4" ><Text as="li" display="list-item"><Text as="li" display="list-item">
                {lang[26]}
              </Text></Text>
                <Text as="li" display="list-item">
                  {lang[27]}
                </Text>
                <Text as="li" display="list-item">
                  {lang[28]}
                </Text></Text>

              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem" >
                PK
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[46]}
              </Text>

              <Text fontWeight="var(--cds-fontWeights-medium)" pt={5} fontSize="2rem" id="">
                {lang[47]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem" >
                {lang[48]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[49]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem" >
                {lang[50]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[51]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3}fontSize="1.4rem" >
                {lang[52]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={5} >
                {lang[53]}
              </Text>

              <Text fontWeight="var(--cds-fontWeights-medium)" pt={5} fontSize="2rem" id="Is-a-turnover-requirement-needed-for-withdrawals">
                {lang[29]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[30]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={5} fontSize="2rem" id="Is-a-fee-required-for-participation">
                {lang[31]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[32]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={5}fontSize="2rem" id="Are-there-fees-for-deposits-and-withdrawals">
                {lang[33]}
              </Text>
              <Text as="ul" fontSize="1.2rem" lineHeight="2rem" listStyleType="circle" pt={6} pl={6} pb="4" ><Text as="li" display="list-item"><Text as="li" display="list-item">
                {lang[34]}
              </Text></Text>
                <Text as="li" display="list-item">
                  {lang[35]}
                </Text></Text>
            </WrapItem>
            <WrapItem w="400px" sx={{ display: { base: "none", sm: "none", lg: "block" } }}>
              <Flex sx={getFixed} py="0.8rem" px="1rem">
                <List>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#What-is-a-guess-number">
                      {lang[36]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Are-guess-numbers-globally-standardized">
                      {lang[37]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#How-long-is-each-guess-round">
                      {lang[38]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#What-constitutes-a-win-and-what-are-the-winning-odds">
                      {lang[39]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Is-a-turnover-requirement-needed-for-withdrawals">
                      {lang[40]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Is-a-fee-required-for-participation">
                      {lang[41]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Are-there-fees-for-deposits-and-withdrawals">
                      {lang[42]}
                    </Link>
                  </ListItem>
                </List>
              </Flex>
            </WrapItem>
          </Wrap>
        </Flex>
      </MyContent>
  );
};
