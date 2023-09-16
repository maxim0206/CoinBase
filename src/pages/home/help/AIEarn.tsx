import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import MyIconTitle1 from "@/assets/images/help/ProAppIcon.svg";
import { useEffect, useState } from "react";
import GettingFooter from "./components/GettingFooter";
import { useMyIntl } from "../../../common";
import { Link } from "react-router-dom";

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

  const { lang } = useMyIntl("Gettingstartedai");
  return (
      <Flex sx={styles.helpSearchC}>
        <Flex w="100%" flexDir="column" margin="0 auto" px={5}>
          <Flex pt={10} flexWrap="wrap">
            <Flex flexDir="column" flex="1" sx={{padding: {base: "0 0.2rem", sm: "0 0.2rem", md: "0 2rem 0 0", lg: "0 2rem 0 0",},}}>
              <Flex>
                <Breadcrumb color="#708599" fontSize="13px">
                  <BreadcrumbItem>
                    <BreadcrumbLink>
                      {lang[0]}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>
                      {lang[1]}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
              <Flex alignItems="center" pt={10}>
                <Image boxSize="58px" marginRight="30px" src={MyIconTitle1} />
                <Text fontWeight="var(--cds-fontWeights-medium)" fontSize={{base: "1.75rem", sm: "1.75rem", md: "2.5rem", lg: "2.5rem",}} pl={3}>
                  {lang[2]}
                </Text>
              </Flex>
              <Flex flexDir="column" sx={styles.gettingList}>
                <Divider />
                <Text fontWeight="var(--cds-fontWeights-medium)" pt={8} fontSize={{base: "1.25rem", sm: "1.25rem", md: "1.75rem", lg: "1.75rem",}} id="#">
                  {lang[3]}
                </Text>
                <Text as="ul" listStyleType="disc" fontSize="1rem" pl={6}>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Ai-Trade-exactly">
                      {lang[4]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-do-I-need-to-start-an-account">
                      {lang[5]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/Whats-a-wallet">What’s a ‘wallet’?</Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/How-do-I-connect-my-wallets">
                      {lang[6]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/Supported-countries">
                      {lang[7]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6} pb={10}>
                    <Link to="/home/help/Supported-Networks">
                      {lang[8]}
                    </Link>
                  </Text>
                </Text>
                <Divider />
                <Text fontWeight="var(--cds-fontWeights-medium)" pt={8} fontSize={{base: "1.25rem", sm: "1.25rem", md: "1.75rem", lg: "1.75rem",}} id="#">
                  {lang[9]}
                </Text>
                <Text as="ul" listStyleType="disc" fontSize="1rem" pl={6}>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/Verifying-emails-and-protecting-accounts">
                      {lang[10]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-type-of-security-does-Ai-Trade-provide">
                      {lang[11]}
                    </Link>
                  </Text>
                </Text>
                <Divider />
                <Text fontWeight="var(--cds-fontWeights-medium)" pt={8} fontSize={{base: "1.25rem", sm: "1.25rem", md: "1.75rem", lg: "1.75rem",}} id="#">
                  {lang[12]}
                </Text>
                <Text as="ul" listStyleType="disc" fontSize="1rem" pl={6}>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/How-do-I-edit-my-username-or-profile">
                      {lang[13]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6} pb={10}>
                    <Link to="/home/help/How-to-check-my-VIP-level-and-personal-permissions">
                      {lang[14]}
                    </Link>
                  </Text>
                </Text>
                <Divider />
                <Text fontWeight="var(--cds-fontWeights-medium)" pt={8} fontSize={{base: "1.25rem", sm: "1.25rem", md: "1.75rem", lg: "1.75rem",}} id="#">
                  {lang[15]}
                </Text>
                <Text as="ul" listStyleType="disc" fontSize="1rem" pl={6}>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/learn/what-is-staking">
                      {lang[16]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/learn/What-is-defi">
                      {lang[17]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-leverage-Whats-the-use-of-turning-it-on">
                      {lang[18]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/what-is-APY">
                      {lang[19]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Loyalty-Value-What-does-it-do">
                      {lang[20]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-a-node-and-how-many-nodes-earn-a-day">
                      {lang[21]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/How-many-tokens-will-Ai-Trade-automatically-invest-in-each-round">
                      {lang[22]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-are-the-types-of-investment-periods-and-what-are-the-differences">
                      {lang[23]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Automatic-exchange">
                      {lang[24]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Profit-guarantee">
                      {lang[25]}
                    </Link>
                  </Text>

                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Auto-loan-repayment">
                      {lang[26]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Liquidation-protection">
                      {lang[27]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-E-mail-notification">
                      {lang[28]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Automatic-Airdrop-Bonus">
                      {lang[29]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-Automatic-staking">
                      {lang[30]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6} pb={10}>
                    <Link to="/home/help/What-is-Automatic-withdrawal">
                      {lang[31]}
                    </Link>
                  </Text>
                </Text>
                <Divider />
                <Text fontWeight="var(--cds-fontWeights-medium)" pt={8} fontSize={{base: "1.25rem", sm: "1.25rem", md: "1.75rem", lg: "1.75rem",}} id="#">
                  {lang[32]}
                </Text>
                <Text as="ul" listStyleType="disc" fontSize="1rem" pl={6}>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/learn/How-to-claim-the-20-real-name-authentication-bonus">
                      {lang[33]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/learn/How-to-refer-friends-and-earn-referral-bonuses">
                      {lang[34]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/learn/How-to-refer-friends-and-earn-referral-bonuses">
                      {lang[35]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6} pb={10}>
                    <Link to="/home/learn/How-to-claim-the-trial-fund">
                      {lang[36]}
                    </Link>
                  </Text>
                </Text>
                <Divider />
                <Text fontWeight="var(--cds-fontWeights-medium)" pt={8} fontSize={{base: "1.25rem", sm: "1.25rem", md: "1.75rem", lg: "1.75rem",}} id="#">
                  {lang[37]}
                </Text>
                <Text as="ul" listStyleType="disc" fontSize="1rem" pl={6}>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-are-the-tokens-that-support-staking">
                      {lang[38]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-the-minimum-staking-amount-for-a-single-transaction">
                      {lang[39]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/Why-do-I-need-to-verify-the-balance-for-withdrawal">
                      {lang[40]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/How-long-does-it-take-for-the-withdrawal-to-arrive">
                      {lang[41]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6}>
                    <Link to="/home/help/What-is-the-minimum-withdrawal-amount">
                      {lang[42]}
                    </Link>
                  </Text>
                  <Text as="li" display="list-item" pt={6} pb={10}>
                    <Link to="/home/help/Is-there-a-fee-for-withdrawals">
                      {lang[43]}
                    </Link>
                  </Text>
                </Text>
                <Divider />
                <Text fontWeight="var(--cds-fontWeights-medium)" pt={8} fontSize={{base: "1.25rem", sm: "1.25rem", md: "1.75rem", lg: "1.75rem",}} id="#">
                  {lang[44]}
                </Text>
                <Text as="ul" listStyleType="disc" fontSize="1rem" pl={6}>
                  <Text as="li" display="list-item" pt={6}>
                    <Text as="li" display="list-item" pt={6}>
                      <Link to="/home/help/How-to-use-the-support-system">
                        {lang[45]}
                      </Link>
                    </Text>
                  </Text>
                </Text>
              </Flex>
            </Flex>
            <Flex w={{ base: "100%", sm: "100%", md: "33%", lg: "33%" }} px={{ base: 5, sm: 5, md: 0, lg: 0 }} mt={{ base: 5, sm: 5, md: 0, lg: 0 }} display="block">
              <div style={getFixed}></div>
            </Flex>
          </Flex>
        </Flex>
        <GettingFooter />
      </Flex>
  );
};
