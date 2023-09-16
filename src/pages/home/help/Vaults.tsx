import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useMyIntl } from "../../../common";
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
  const { lang } = useMyIntl("Vaults");
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
                  <BreadcrumbLink href="/home/help/getting-started">
                    {lang[1]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="/home/help/Vaults">
                    {lang[2]}
                  </BreadcrumbLink>
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
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[5]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[6]}
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
                {lang[7]}
              </Text>
              <Text as="li" display="list-item">
                {lang[8]}
              </Text>
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[9]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[10]}
              <Link color="#1652f0" href="#">
                {lang[11]}
              </Link>
              {lang[12]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[13]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[14]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[15]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[16]}
              <Link color="#1652f0" href="#">
                {lang[17]}
              </Link>
              {lang[18]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[19]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[20]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[21]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[22]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[23]}
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
                {lang[24]}
              </Text>
              <Text as="li" display="list-item">
                {lang[25]}
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[26]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[27]}
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
                {lang[28]}
                <Link color="#1652f0" href="#">
                  {lang[29]}
                </Link>
              </Text>
              <Text as="li" display="list-item">
                {lang[30]}
              </Text>
              <Text as="li" display="list-item">
                {lang[31]}
              </Text>
              <Text as="li" display="list-item">
                {lang[32]}
              </Text>
              <Text as="li" display="list-item">
                {lang[33]}
              </Text>
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[34]}
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
                {lang[35]}
                <Text as="b">{lang[36]}</Text>
              </Text>
              <Text as="li" display="list-item">
                {lang[37]}
              </Text>
              <Text as="li" display="list-item">
                {lang[38]}
              </Text>
              <Text as="li" display="list-item">
                {lang[39]}
                <Text as="b">{lang[40]}</Text>
                {lang[41]}
              </Text>
              <Text as="li" display="list-item">
                {lang[42]}
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Text as="b">{lang[43]}</Text>
              {lang[44]}
              <Text as="b">{lang[45]}</Text>
              {lang[46]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[47]}
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
                {lang[48]}
                <Link color="#1652f0" href="#">
                  {lang[49]}
                </Link>
              </Text>
              <Text as="li" display="list-item">
                {lang[50]}
              </Text>
              <Text as="li" display="list-item">
                {lang[51]}
                <Text as="b">{lang[52]}</Text>
                {lang[53]}
                <Text as="b">{lang[54]}</Text>
              </Text>{" "}
              <Text as="li" display="list-item">
                {lang[55]}
                <Text as="b">{lang[56]}</Text>
                {lang[57]}
              </Text>
              <Text as="li" display="list-item">
                {lang[58]}
                <Text as="b">{lang[59]}</Text>
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[60]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Text as="b">{lang[61]}</Text>
              {lang[62]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[63]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[64]}
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
                {lang[65]}
                <Link color="#1652f0" href="#">
                  {lang[66]}
                </Link>
                {lang[67]}
              </Text>
              <Text as="li" display="list-item">
                {lang[68]}
                <Text as="b">{lang[69]}</Text>
              </Text>
              <Text as="li" display="list-item">
                {lang[70]}
                <Text as="b">{lang[71]}</Text>
                {lang[72]}
              </Text>
              <Text as="li" display="list-item">
                {lang[73]}
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[74]}
              <Text as="b">{lang[75]}</Text>
              {lang[76]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Text as="b">{lang[77]}</Text>
              {lang[78]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[79]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[80]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
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
              fontSize="1.3rem"
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
              fontSize="1.3rem"
              id="#"
            >
              {lang[85]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[86]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[87]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[88]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[89]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[90]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[91]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[92]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Link color="#1652f0" href="#">
                {lang[93]}
              </Link>
              {lang[94]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Text as="b">{lang[95]}</Text>
              {lang[96]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize="1.3rem"
              id="#"
            >
              {lang[97]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[98]}
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
                {lang[99]}
                <Link color="#1652f0" href="#">
                  {lang[100]}
                </Link>
                {lang[101]}
              </Text>
              <Text as="li" display="list-item">
                {lang[102]}
              </Text>
              <Text as="li" display="list-item">
                {lang[103]}
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[104]}
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
