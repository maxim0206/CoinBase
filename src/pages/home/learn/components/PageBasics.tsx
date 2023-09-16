import { Flex, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Defi from "../../../../assets/images/coinbase-lend.svg";
import Mining from "../../../../assets/images/Copy_of_Learn_Illustration_What_is_Mining.svg";
import Retirement from "../../../../assets/images/Crypto___Retirement_Op2-D.svg";
import debunking from "../../../../assets/images/debunking-bitcoin-myths-1__2_.svg";
import Dollar from "../../../../assets/images/Dollar-Cost_avg.svg";
import DonatingCrypto from "../../../../assets/images/Donating-Crypto.svg";
import EarningRewards from "../../../../assets/images/Earning-Rewards.svg";
import Equity from "../../../../assets/images/Former_Private_Equity__1_.svg";
import Group_31612615 from "../../../../assets/images/Group_31612615.svg";
import icp from "../../../../assets/images/icp.svg";
import image from "../../../../assets/images/image.svg";
import Key from "../../../../assets/images/Learn_Illustration_Private_Key.svg";
import Blockchain from "../../../../assets/images/Learn_Illustration_Ultimate_Guide_Blockchain.svg";
import Essential from "../../../../assets/images/Learn_Illustration_Ultimate_Guide_Essential_Reading.svg";
import Fork from "../../../../assets/images/Learn_Illustration_What_is_a_Fork.svg";
import Protocol from "../../../../assets/images/Learn_Illustration_What_is_a_Protocol.svg";
import SmartContract from "../../../../assets/images/Learn_Illustration_What_is_a_Smart_Contract__1_.svg";
import Stablecoin from "../../../../assets/images/Learn_Illustration_What_is_a_Stablecoin.svg";
import Token from "../../../../assets/images/Learn_Illustration_What_is_a_Token.svg";
import Cryptography from "../../../../assets/images/Learn_Illustration_What_is_Cryptography.svg";
import Cefi from "../../../../assets/images/Learn_Illustration_What_is_DeFi.svg";
import Marketcap from "../../../../assets/images/Learn_Illustration_What_is_Marketcap.svg";
import Staking from "../../../../assets/images/Learn_Illustration_What_is_Staking.svg";
import Technical from "../../../../assets/images/Learn_Illustration_What_is_Technical_Analysis__1_.svg";
import lightningnetwork from "../../../../assets/images/lightning-network.svg";
import Candlesticks from "../../../../assets/images/Making-Sense-Of-Candlesticks.svg";
import polkadot from "../../../../assets/images/polkadot.svg";
import polygon from "../../../../assets/images/polygon1.svg";
import seedphrase from "../../../../assets/images/seed-phrase.svg";
import Sending_Crypto from "../../../../assets/images/Sending_Crypto.svg";
import taxes from "../../../../assets/images/taxes__1_.svg";
import Bitcoin from "../../../../assets/images/Ultimate_Guide_Bitcoin.svg";
import Video_02 from "../../../../assets/images/Video_02.svg";
import Volatility from "../../../../assets/images/Volatility.svg";
import Weathering from "../../../../assets/images/Weathering-the-crypto-dip.svg";
import bullbear from "../../../../assets/images/what-are-a-bull-and-bear-market-2_2.svg";
import Ethereum from "../../../../assets/images/what-is-ethereum.svg";
import uniswap from "../../../../assets/images/What-is-uniswap.svg";
import CryptoWallet from "../../../../assets/images/What_is_a_Crypto_Wallet.svg";
import Inflation from "../../../../assets/images/What_is_Inflation_Rate.svg";
import { useMyIntl } from "../../../../common";
const styles = {
  CoverImgC: {
    overflow: "hidden",
    width: "100%",
  },
  CoverImg: {
    _hover: {
      transition: " transform 5s",
      transform: "scale(1.05)",
      opacity: "0.9",
    },
  },
};
export default () => {
  const { lang } = useMyIntl("Howtoearncryptorewards");
  return (
      <Flex flexDir="column" py={10}>
        <Text as="b" fontSize="3rem" w="full" textAlign="center" pt="3rem" id="Tips-and-tutorials">
          {lang[0]}
        </Text>
        <Text w="full" color="#5b616e" textAlign="center">
          {lang[1]}
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2 }} spacing={20} mt="3rem" pb="3rem" borderBottom="1px solid var(--cds-colors-chakra-border-color)">
          <Link to="/home/learn/How-to-earn-crypto-rewards">
            <Flex flexDir="column" w="full">
              <Flex sx={styles.CoverImgC}>
                <Image src={EarningRewards} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[2]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[3]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[4]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/How-to-set-up-a-crypto-wallet">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Video_02} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[5]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[6]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[7]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/how-to-read-candlestick-charts">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Candlesticks} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[8]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[9]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[10]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/when-is-the-best-time-to-invest-in-crypto">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Dollar} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[11]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[12]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[13]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/how-to-send-crypto">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Sending_Crypto} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[14]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[15]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[16]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/how-to-donate-crypto">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={DonatingCrypto} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[17]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[18]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[19]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/expert-tips-ben-forman">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Equity} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[20]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[21]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[22]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/how-to-minimize-your-losses-during-a-falling-market">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Weathering} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[23]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[24]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[25]}
                </Text>
              </Heading>
            </Flex>
          </Link>
        </SimpleGrid>
        <Text as="b" fontSize="3rem" w="full" textAlign="center" pt="3rem" id="Crypto-Basics">
          {lang[26]}
        </Text>
        <Text w="full" color="#5b616e" textAlign="center">
          {lang[27]}
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2 }} spacing={20} mt="3rem" pb="1.5rem">
          <Link to="/home/learn/What-is-Ethereum">
            <Flex flexDir="column" w="full">
              <Flex sx={styles.CoverImgC}>
                <Image src={Ethereum} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[28]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[29]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[30]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-bitcoin">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Bitcoin} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[31]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[32]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[33]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-cryptocurrency">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={CryptoWallet} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[34]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[35]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[36]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-blockchain">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Blockchain} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[37]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[38]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[39]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/What-is-Staking">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Staking} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[40]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[41]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[42]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/crypto-retirement-account">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Retirement} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[43]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[44]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[45]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/understanding-crypto-taxes">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={taxes} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[46]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[47]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[48]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/essential-reading">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Essential} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[49]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[50]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[51]}
                </Text>
              </Heading>
            </Flex>
          </Link>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={20} mt="3rem" pb="4rem" borderBottom="1px solid var(--cds-colors-chakra-border-color)">
          <Link to="/home/learn/7-biggest-bitcoin-myths">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={debunking} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[52]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[53]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[54]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/crypto-slang-guide">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Group_31612615} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1} id="Glossary">
                {lang[55]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[56]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[57]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-lightning">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={lightningnetwork} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[58]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[59]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[60]}
                </Text>
              </Heading>
            </Flex>
          </Link>
        </SimpleGrid>
        <Text as="b" fontSize="3rem" w="full" textAlign="center" pt="3rem">
          {lang[61]}
        </Text>
        <Text w="full" color="#5b616e" textAlign="center">
          {lang[62]}
        </Text>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2 }} spacing={20} mt="3rem">
          <Link to="/home/learn/what-is-cefi">
            <Flex flexDir="column" w="full">
              <Flex sx={styles.CoverImgC}>
                <Image src={Cefi} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[63]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[64]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[65]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-defi">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Defi} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[66]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[67]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[68]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-mining">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Mining} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[69]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[70]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[71]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-token">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Token} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[72]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[73]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[74]}
                </Text>
              </Heading>
            </Flex>
          </Link>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} spacing={20} mt="3rem">
          <Link to="/home/learn/what-is-a-smart-contract">
            <Flex flexDir="column" w="full">
              <Flex sx={styles.CoverImgC}>
                <Image src={SmartContract} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[75]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[76]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[77]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-seed-phrase">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={seedphrase} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[78]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[79]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[80]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-private-key">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Key} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[81]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[82]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[83]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-cryptography">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Cryptography} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[84]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[85]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[86]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-stablecoin">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Stablecoin} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[87]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[88]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[89]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-proof-of-work-or-proof-of-stake">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={image} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[90]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[91]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[92]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-protocol">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Protocol} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[93]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[94]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[95]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-market-cap">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Marketcap} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[96]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[97]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[98]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-are-technical-analysis-and-fundamental-analysis">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Technical} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[99]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[100]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[101]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-volatility">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Volatility} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[102]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[103]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[104]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-bull-or-bear-market">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={bullbear} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[105]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[106]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[107]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-a-fork">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Fork} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[108]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[109]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[110]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-inflation">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={Inflation} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[111]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[112]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[113]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-internet-computer">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={icp} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[114]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[115]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[116]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-polkadot">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={polkadot} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[117]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[118]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[119]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-polygon">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={polygon} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[120]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[121]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[122]}
                </Text>
              </Heading>
            </Flex>
          </Link>
          <Link to="/home/learn/what-is-uniswap">
            <Flex flexDir="column">
              <Flex sx={styles.CoverImgC}>
                <Image src={uniswap} w="full" sx={styles.CoverImg} />
              </Flex>
              <Text pt={3} pb={1}>
                {lang[123]}
              </Text>
              <Text fontWeight="var(--cds-fontWeights-medium)" fontSize="1.6rem">
                {lang[124]}
              </Text>
              <Heading noOfLines={3}>
                <Text fontSize="1rem" fontWeight="400" lineHeight="1.3rem">
                  {lang[125]}
                </Text>
              </Heading>
            </Flex>
          </Link>
        </SimpleGrid>
      </Flex>
  );
};
