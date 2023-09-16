import { SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
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

  const { lang } = useMyIntl("Whatsawallet");
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
                  <BreadcrumbLink href="/home/help/AIEarn">
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
              fontSize={{
                base: "1.75rem",
                sm: "1.75rem",
                md: "2.5rem",
                lg: "2.5rem",
              }}
              py={3}
            >
              {lang[3]}
            </Text>
            <Flex fontSize="1rem" mt={10} pt={6}>
              <Alert
                status="warning"
                variant="subtle"
                bg="#f4c62117"
                py={6}
                sx={{ borderRadius: "10px", border: "1px solid #f4c622" }}
              >
                <Flex>
                  <AlertIcon w="var(--cds-sizes-6)" color="#f4c622" />{" "}
                  <AlertDescription>
                    {lang[4]}
                    <Link color="#1652f0" href="#">
                      {lang[5]}
                    </Link>
                    {lang[6]}
                    <Link color="#1652f0" href="#">
                      {lang[7]}
                    </Link>
                    {lang[8]}
                    <Text fontSize="1rem" pt={6}>
                      {lang[9]}
                    </Text>
                  </AlertDescription>
                </Flex>{" "}
              </Alert>{" "}
            </Flex>
            <Text fontSize="1rem" pt={6}>
              {lang[10]}
              <Link color="#1652f0" href="#">
                {lang[11]}
              </Link>
              {lang[12]}
              <Link color="#1652f0" href="#">
                {lang[13]}
              </Link>
              {lang[14]}
              <Link color="#1652f0" href="#">
                {lang[15]}
              </Link>
              {lang[16]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[17]}
              <Link color="#1652f0" href="#">
                {lang[18]}
              </Link>
              {lang[19]}
              <Link color="#1652f0" href="#">
                {lang[20]}
              </Link>
              {lang[21]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[22]}
              <Link color="#1652f0" href="#">
                {lang[23]}
              </Link>
              {lang[24]}
              <Link color="#1652f0" href="#">
                {lang[25]}
              </Link>
              {lang[26]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              A{" "}
              <Link color="#1652f0" href="#">
                {lang[27]}
              </Link>
              {lang[28]}
            </Text>
            <Text
              fontWeight="var(--cds-fontWeights-medium)"
              pt={12}
              pb={4}
              fontSize={{
                base: "1em",
                sm: "1rem",
                md: "1.25rem",
                lg: "1.25rem",
              }}
              letterSpacing="-0.08rem"
              id="#"
            >
              {lang[29]}
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
                <Link color="#1652f0" href="https://www.coinbase.com/wallet">
                  {lang[30]}
                </Link>
              </Text>
              <Text as="li" display="list-item">
                <Link color="#1652f0" href="https://metamask.io/">
                  {lang[31]}
                </Link>
              </Text>
              <Text as="li" display="list-item">
                {lang[32]}
                <Link color="#1652f0" href="https://walletconnect.com/">
                  {lang[33]}
                </Link>
              </Text>
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[34]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Text as="b">{lang[35]}</Text>
              {lang[36]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[37]}
              <Text as="b">{lang[38]}</Text>
              {lang[39]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              <Link
                color="#1652f0"
                href="/home/learn/how-to-set-up-a-crypto-wallet"
              >
                {lang[40]}
              </Link>
              {lang[41]}
            </Text>
            <Text fontSize="1rem" pt={6}>
              {lang[42]}
              <Link
                color="#1652f0"
                href="https://www.coinbase.com/wallet/getting-started-mobile"
              >
                {lang[43]}
              </Link>
              {lang[44]}
              <Link
                color="#1652f0"
                href="https://www.coinbase.com/wallet/getting-started-extension"
              >
                {lang[45]}
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
