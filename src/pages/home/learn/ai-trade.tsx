import { MyContent } from "../../../common/components/MyContent";
import { useMyIntl } from "../../../common";
import Aitradelearn from "@/assets/images/aitradelearn.svg";
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
  const { lang } = useMyIntl("Howtowisely");
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
                <BreadcrumbLink href="/home/learn#Glossary">
                  {lang[1]}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Flex>
          <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="3rem" py={3}>
            {lang[2]}
          </Text>
          <Text fontSize="1.2rem"  color="#5b616e">
            {lang[3]}
          </Text>
          <Wrap py={6} spacing="24px" flexWrap="wrap">
            <WrapItem flexDir="column" flex="1">
              <Flex w="full">
                <Image src={Aitradelearn} w="full" />
              </Flex>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="Background-of-Ai-Trade-Inception">
                {lang[4]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e">
                {lang[5]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="Importance-of-Ethereum-Chain-Merging">
                {lang[6]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e">
                {lang[7]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="Era-Background-of-AI-Trade">
                {lang[8]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e">
                {lang[9]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="Definition-and-Features-of-AI-Trade">
                {lang[10]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e">
                {lang[11]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="AI-Trade-Incentive-System">
                {lang[12]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e">
                {lang[13]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="AI-Trade-Leverage-Mode">
                {lang[14]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e">
                {lang[15]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={3} pb={2} fontSize="2rem" id="AI-Trade-Negative-Interest-Safeguard">
                {lang[16]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e">
                {lang[17]}
              </Text>
              <Text fontSize="1.2rem" color="#5b616e"  pt={6} >
                {lang[18]}
              </Text>
            </WrapItem>
            <WrapItem w="400px" sx={{ display: { base: "none", sm: "none", lg: "block" } }}>
              <Flex sx={getFixed} py="0.8rem" px="1.2rem">
                <List>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Background-of-Ai-Trade-Inception">
                      {lang[19]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Importance-of-Ethereum-Chain-Merging">
                      {lang[20]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Era-Background-of-AI-Trade">
                      {lang[21]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#Definition-and-Features-of-AI-Trade">
                      {lang[22]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#AI-Trade-Incentive-System">
                      {lang[23]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#AI-Trade-Leverage-Mode">
                      {lang[24]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#AI-Trade-Negative-Interest-Safeguard">
                      {lang[25]}
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
