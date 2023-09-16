import { MyContent } from "../../../common/components/MyContent";

import Mining from "@/assets/images/Copy_of_Learn_Illustration_What_is_Mining.svg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMyIntl } from "../../../common";
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
  const { lang } = useMyIntl("Whatismining");
  return (
    <MyContent w="100%" px={3}>
      <Flex w="full" flexDir="column">
        <Flex>
          {" "}
          <Breadcrumb>
            {" "}
            <BreadcrumbItem>
              <BreadcrumbLink href="/home/learn">{lang[0]}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home/learn#Crypto-Basics">
                {lang[1]}
              </BreadcrumbLink>{" "}
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="3rem" py={3}>
          {lang[2]}
        </Text>
        <Wrap py={6} spacing="24px" flexWrap="wrap">
          <WrapItem flexDir="column" flex="1">
            <Flex w="full">
              <Image src={Mining} w="full" />
            </Flex>
            <Text mt={6} p={6} sx={{ background: "#f2f2f2", _dark: { background: "#333" } }} fontSize="1rem">
              <Text as="b">{lang[3]}</Text>
              <Text pt={6}>{lang[4]}</Text>
            </Text>
            <Text fontSize="1.2rem" lineHeight="2rem" pt={6}>
              {lang[5]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="2rem"
              id="#"
            >
              {lang[6]}
            </Text>
            <Text fontSize="1.2rem" lineHeight="2rem" pt={6}>
              {lang[7]}
            </Text>
            <Text fontSize="1.2rem" lineHeight="2rem" pt={6}>
              {lang[8]}
              <Text as="i">{lang[9]}</Text>
              {lang[10]}
            </Text>
            <Text
              as="ul"
              listStyleType="disc"
              fontSize="1.2rem"
              lineHeight="2rem"
              pt={6}
              pl={6}
              pb="4"
            >
              <Text as="li" display="list-item">
                {lang[11]}
              </Text>
              <Text as="li" display="list-item">
                {lang[12]}
              </Text>
              <Text as="li" display="list-item">
                {lang[13]}
              </Text>
              <Text as="li" display="list-item">
                {lang[14]}
              </Text>
              <Text as="li" display="list-item">
                {lang[15]}
              </Text>
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="2rem"
              id="#"
            >
              {lang[16]}
            </Text>
            <Text fontSize="1.2rem" lineHeight="2rem" pt={6}>
              {lang[17]}
            </Text>
          </WrapItem>
          <WrapItem
            w="400px"
            sx={{ display: { base: "none", sm: "none", lg: "block" } }}
          ></WrapItem>
        </Wrap>
      </Flex>
    </MyContent>
  );
};
