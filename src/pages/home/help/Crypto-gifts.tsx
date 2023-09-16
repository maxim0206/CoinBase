import {
  Flex,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  ListItem,
  Divider,
  UnorderedList,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  OrderedList,
  Box,
  Highlight,
  Image,
  Button,
  Alert,
  Link,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { MyContent } from "../../../common/components/MyContent";

import { useMyIntl } from "../../../common/libs/intl/useMyIntl";
import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import MyIconTitle1 from "@/assets/images/help/ProAppIcon.svg";
import MyFootIcon from "@/assets/images/footer-cta-icon.svg";
import Right from "@/assets/images/right.svg";
import Close from "@/assets/images/close.svg";
import React, { useEffect, useState } from "react";

import GettingFooter from "./components/GettingFooter";
import PageHelpful from "./components/PageHelpful";

const styles = {
  helpSearchC: {
    width: "100%",
    minHeight: "calc(100vh - 68px - 64px)",
    display: "block",
  },
  headSearch: {
    border: "1px solid #5b636ea8",
    height: "60px",
    alignItems: "center",
    margin: "24px 0",
    borderRadius: "50px",
  },
  headIcon: {
    padding: "0 1.6rem",
  },
  headClone: {
    padding: "0 1.3rem",
  },
  gettingList: {
    padding: "2rem 0 1rem 0",
  },
  ListItems: {
    lineHeight: "2rem",
    "&:hover": {
      color: "#1652f0",
      textDecoration: "underline",
    },
  },
  GettingRightFixed: {
    borderLeft: "1px solid #98989829",
    fontSize: "14px",
    position: "fixed",
    top: "100px",
  },
  GettingRightRel: {
    borderLeft: "1px solid #98989829",
    fontSize: "14px",
    position: "relative",
    top: "0",
  },
  footers: {
    backgroundColor: "#90909024",
    padding: "6rem 0",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "2rem",
  },
  CellLink: {
    color: "#050f19",
    borderLeft: "4px solid #fff",
    padding: "0.35rem 0 0.35rem 1rem",
  },
  RAcives: {
    borderLeft: "4px solid #1652f0",
    color: "#1652f0",
    padding: "0.35rem 0 0.35rem 1rem",
  },
};
export default () => {
  const [getFixed, setFixed] = useState<any>(styles.GettingRightRel);
  const onScroll = (e: any) => {
    if (document.body.clientWidth > 768) {
      if (e.target.documentElement.scrollTop > 100) {
        setFixed(styles.GettingRightFixed);
      } else {
        setFixed(styles.GettingRightRel);
      }
    }
  };
  const resizeUpdate = (e: any) => {
    if (document.body.clientWidth < 768) {
      setFixed(styles.GettingRightRel);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", resizeUpdate);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.addEventListener("resize", resizeUpdate);
    };
  });
  const { lang } = useMyIntl("Cryptogifts");
  return (
    <Flex sx={styles.helpSearchC}>
      <Flex w="100%" flexDir="column" margin="0 auto" px={5}>
        <Flex sx={styles.headSearch}>
          <Flex sx={styles.headIcon}>
            <SearchIcon />
          </Flex>
          <Flex flex="1" pr={4}>
            <Input variant="unstyled" placeholder="How can we help you?" />
          </Flex>
          <Flex sx={styles.headClone}>
            <SmallCloseIcon boxSize={6} />
          </Flex>
        </Flex>
        <Flex pt={10} flexWrap="wrap">
          <Flex
            flexDir="column"
            flex="1"
            sx={{
              padding: {
                base: "0 0.2rem",
                sm: "0 0.2rem",
                md: "0 2rem 0 0",
                lg: "0 2rem 0 0",
              },
            }}
          >
            <Flex>
              <Breadcrumb color="#708599" fontSize="13px">
                <BreadcrumbItem>
                  <BreadcrumbLink>{lang[0]}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/home/help/Trading-and-funding">
                    {lang[1]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{lang[2]}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Flex>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              fontSize="var(--cds-sizes-10)"
              py={3}
            >
              {lang[3]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[4]}
            </Text>
            <Text as="b">{lang[5]}</Text>
            <Text
              as="ul"
              listStyleType="disc"
              fontSize="1rem"
              pt={6}
              pl={6}
              pb="4"
            >
              <Text as="li" display="list-item">
                {lang[6]}
                <Link color="#1652f0" href="#">
                  {lang[7]}
                </Link>
                {lang[8]}
              </Text>
              <Text as="li" display="list-item">
                {lang[9]}
              </Text>
              <Text as="li" display="list-item">
                {lang[10]}
              </Text>
              <Text as="li" display="list-item">
                {lang[11]}
              </Text>
              <Text as="li" display="list-item">
                {lang[12]}
              </Text>
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.75rem"
              letterSpacing="-0.08rem"
              id="#"
            >
              {lang[13]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[14]}
            </Text>
            <Text
              as="ul"
              listStyleType="decimal"
              fontSize="1rem"
              pt={6}
              pl={6}
              pb="4"
            >
              <Text as="li" display="list-item">
                Tap {">"}{" "}
                <Text as="b">
                  <Text as="b">{lang[15]}</Text>
                </Text>{" "}
                (mobile) or click{" "}
                <Text as="b">
                  <Text as="b">{lang[16]}</Text>
                </Text>
                {lang[17]}
              </Text>
              <Text as="li" display="list-item">
                {lang[18]}
              </Text>
              <Text as="li" display="list-item">
                {lang[19]}
                <Text as="b">{lang[20]}</Text>.
              </Text>
              <Text as="li" display="list-item">
                {lang[21]}
              </Text>
              <Text as="li" display="list-item">
                {lang[22]}
              </Text>
              <Text
                as="ul"
                fontSize="1rem"
                listStyleType="circle"
                pt={6}
                pl={6}
                pb="4"
              >
                <Text as="li" display="list-item">
                  <Text as="li" display="list-item">
                    {lang[23]}
                  </Text>
                </Text>
              </Text>
              <Text as="li" display="list-item">
                {lang[24]}
                <Link color="#1652f0" href="#">
                  {lang[25]}
                </Link>
                {lang[26]}
              </Text>
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[27]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[28]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[29]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[30]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[31]}
              <Link color="#1652f0" href="#">
                {lang[32]}
              </Link>
              {lang[33]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[34]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[35]}
              <Text as="b">{lang[36]}</Text>
              {lang[37]}
              <Text as="b">{lang[38]}</Text>
              {lang[39]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[40]}
            </Text>
            <Text
              as="ul"
              listStyleType="disc"
              fontSize="1rem"
              pt={6}
              pl={6}
              pb="4"
            >
              <Text as="li" display="list-item">
                {lang[41]}
              </Text>
              <Text as="li" display="list-item">
                {lang[42]}
              </Text>
              <Text as="li" display="list-item">
                {lang[43]}
              </Text>
              <Text as="li" display="list-item">
                {lang[44]}
              </Text>
              <Text as="li" display="list-item">
                {lang[45]}
              </Text>
              <Text as="li" display="list-item">
                {lang[46]}
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[47]}
              <Text as="b">{lang[48]}</Text>
              {lang[49]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[50]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[51]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[52]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[53]}
              <Text as="b">{lang[54]}</Text>.
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[55]}
              <Link color="#1652f0" href="#">
                {lang[56]}
              </Link>
              .
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[57]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[58]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[59]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.75rem"
              letterSpacing="-0.08rem"
              id="#"
            >
              {lang[60]}
            </Text>
            <Text
              as="ul"
              listStyleType="disc"
              fontSize="1rem"
              pt={6}
              pl={6}
              pb="4"
            >
              <Text as="li" display="list-item">
                <Text as="b">{lang[61]}</Text>
                {lang[62]}
              </Text>
              <Text as="li" display="list-item">
                <Text as="b">{lang[63]}</Text>
                {lang[64]}
                <Link color="#1652f0" href="#">
                  {lang[65]}
                </Link>
                {lang[66]}
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Text as="b">{lang[67]}</Text>
              {lang[68]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[69]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[70]}
              <Link color="#1652f0" href="#">
                no-reply@coinbase.com
              </Link>
              {lang[71]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[72]}
              <Link color="#1652f0" href="#">
                {lang[73]}
              </Link>
              .
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.75rem"
              letterSpacing="-0.08rem"
              id="#"
            >
              {lang[74]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[75]}
            </Text>
            <Text
              as="ul"
              listStyleType="disc"
              fontSize="1rem"
              pt={6}
              pl={6}
              pb="4"
            >
              <Text as="li" display="list-item">
                {lang[76]}
              </Text>
              <Text as="li" display="list-item">
                {lang[77]}
              </Text>
              <Text as="li" display="list-item">
                {lang[78]}
                <Link color="#1652f0" href="#">
                  {lang[79]}
                </Link>
                {lang[80]}
              </Text>
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.75rem"
              letterSpacing="-0.08rem"
              id="#"
            >
              {lang[81]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[82]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[83]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[84]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.25rem"
              id="#"
            >
              {lang[85]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[86]}
              <Link color="#1652f0" href="#">
                {lang[87]}
              </Link>
              .
            </Text>
          </Flex>
          <Flex
            w={{ base: "100%", sm: "100%", md: "33%", lg: "33%" }}
            px={{ base: 5, sm: 5, md: 0, lg: 0 }}
            mt={{ base: 5, sm: 5, md: 0, lg: 0 }}
            display="block"
          ></Flex>
        </Flex>
      </Flex>
      <PageHelpful />
      <GettingFooter />
    </Flex>
  );
};
