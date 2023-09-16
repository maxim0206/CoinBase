import { MyContent } from "../../../common/components/MyContent";
import { useMyIntl } from "../../../common";
import Aitradelearn from "@/assets/images/How-to-claim-the-20-real-name-authentication-bonus.svg";
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
  const { lang } = useMyIntl("Throughreal");
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
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="AiTrade">
                {lang[4]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[5]}
                <Text  as="b" >
                  {lang[6]}
                </Text> -{">"} <Text  as="b" >
                {lang[7]}
              </Text></Text>
              <Text as="ul" fontSize="1.2rem" lineHeight="2rem" listStyleType="circle" pt={6} pl={6} pb="4" ><Text as="li" display="list-item">
                {lang[8]}
              </Text>
                <Text as="li" display="list-item">
                  {lang[9]}
                </Text></Text>
              <Text fontSize="1.2rem" lineHeight="2rem" pt={6} >
                {lang[10]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="Why-does-my-ID-real-name-authentication-fail" >
                {lang[11]}
              </Text>
              <Text as="ul" fontSize="1.2rem" lineHeight="2rem" listStyleType="circle" pt={6} pl={6} pb="4" ><Text as="li" display="list-item"><Text as="li" display="list-item">
                {lang[12]}
              </Text></Text>
                <Text as="li" display="list-item">
                  {lang[13]}
                </Text>
                <Text as="li" display="list-item">
                  {lang[14]}
                </Text></Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={12} pb={4} fontSize={{base: "1em", sm: "1rem", md: "1.25rem", lg: "1.25rem"}} letterSpacing="-0.08rem" id="#">
                {lang[17]}
              </Text>
              <Text fontSize="1rem" pt={6} ><Link color="#1652f0" href="https://etherscan.io/">ETH</Link></Text>
              <Text fontSize="1rem" pt={6} ><Link color="#1652f0" href="https://polygonscan.com/">POLYGON</Link></Text>
            </WrapItem>
            <WrapItem w="400px" sx={{ display: { base: "none", sm: "none", lg: "block" } }}>
              <Flex sx={getFixed} py="0.8rem" px="1rem">
                <List>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#AiTrade">
                      {lang[15]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Why-does-my-ID-real-name-authentication-fail">
                      {lang[16]}
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
