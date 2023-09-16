import { MyContent } from "../../../common/components/MyContent";
import { useMyIntl } from "../../../common";
import Aitradelearn from "@/assets/images/What-is-a-newbie-card.svg";
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
  const { lang } = useMyIntl("Thenewbiecard");
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
          <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
            {lang[3]}
          </Text>
          <Wrap py={6} spacing="24px" flexWrap="wrap">
            <WrapItem flexDir="column" flex="1">
              <Flex w="full">
                <Image src={Aitradelearn} w="full" />
              </Flex>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={12} pb={4} fontSize="2rem" id="How-can-get-a-newbie-card">
                {lang[4]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[5]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={12} pb={4} fontSize="2rem" id="What-are-the-functions-of-the-newbie-card">
                {lang[6]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[7]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={12} pb={4} fontSize="2rem" id="How-long-can-I-use-the-newbie-card-after-receiving-it">
                {lang[8]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[9]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={12} pb={4} fontSize="2rem" id="If-the-newbie-card-is-upgraded-to-VIP1-on-the-way">
                {lang[10]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[11]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" pt={12} pb={4} fontSize="2rem" id="When-upgrading-directly-from-VIP0-to-VIP1">
                {lang[12]}
              </Text>
              <Text fontSize="1.2rem" lineHeight="2rem"  pt={6} >
                {lang[13]}
              </Text>
            </WrapItem>
            <WrapItem w="400px" sx={{ display: { base: "none", sm: "none", lg: "block" } }}>
              <Flex sx={getFixed} py="0.8rem" px="1.2rem">
                <List>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#How-can-get-a-newbie-card">
                      {lang[14]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#What-are-the-functions-of-the-newbie-card">
                      {lang[15]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#How-long-can-I-use-the-newbie-card-after-receiving-it">
                      {lang[16]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#If-the-newbie-card-is-upgraded-to-VIP1-on-the-way">
                      {lang[17]}
                    </Link>
                  </ListItem>
                  <ListItem fontSize="1rem" color="#5b616e" lineHeight="1.8rem" pb={2}>
                    <Link href="#When-upgrading-directly-from-VIP0-to-VIP1">
                      {lang[18]}
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
