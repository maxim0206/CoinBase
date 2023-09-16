import { Flex, Image, Text } from "@chakra-ui/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import MyCardNavigation from "../../../../assets/images/help/cardNavigation.svg";
import MyLearningRewardsNavigation from "../../../../assets/images/help/learningRewardsNavigation.svg";
import MyProappIcon from "../../../../assets/images/help/ProAppIcon.svg";
import MyWallet from "../../../../assets/images/help/wallet.svg";
import USDCoinUSDC from "../../../../assets/images/usdc.svg";
import CoinbaseEarn from "../../../../assets/images/earnNavigation.svg";
import Dapps from "../../../../assets/images/dapps.svg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyIntl } from "../../../../common";
const styles = {
  ProductC: {
    position: "relative",
    display: "block",
  },
  SlideC: {
    border: "1px solid var(--cds-colors-chakra-border-color)",
    borderRadius: "8px",
    height: "236px",
    color: "#135",
    _dark: {
      color: "#fff",
    },
  },
};
export default () => {
  const [getResizeStatus, setResizeStatus] = useState<any>(4);
  const resizeUpdate = () => {
    if (document.body.clientWidth < 800) {
      setResizeStatus(1);
    } else if (
      document.body.clientWidth < 1000 &&
      document.body.clientWidth > 800
    ) {
      setResizeStatus(2);
    } else if (document.body.clientWidth > 1000) {
      setResizeStatus(4);
    }
  };
  useEffect(() => {
    resizeUpdate();
    window.addEventListener("resize", resizeUpdate);
    return () => {
      window.removeEventListener("resize", resizeUpdate);
    };
  }, []);
  const { lang } = useMyIntl("Anapptosendreceivecrypto");
  return (
      <Flex sx={styles.ProductC} w="full" py={5}>
        <Swiper modules={[Pagination]} spaceBetween={35} slidesPerView={getResizeStatus} pagination={{ clickable: true }} onSlideChange={() => console.log("slide change")} onSwiper={(swiper) => console.log(swiper)} style={{ height: "300px" }}>
          <SwiperSlide>
            <Link to="/home/help/AIEarn">
              <Flex sx={styles.SlideC} alignItems="center" textAlign="center" flexDir="column">
                <Flex pt={8}>
                  <Image w="48px" src={MyProappIcon} />
                </Flex>
                <Text fontWeight="var(--cds-fontWeights-medium)" w="full" fontSize="1.3rem" py={2}>
                  {lang[0]}
                </Text>
                <Text w="80%" color="#5b616e" fontSize="0.9rem">
                  {lang[1]}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/home/help/wallet">
              <Flex sx={styles.SlideC} alignItems="center" textAlign="center" flexDir="column">
                <Flex pt={8}>
                  <Image w="48px" src={MyWallet} />
                </Flex>
                <Text fontWeight="var(--cds-fontWeights-medium)" w="full" fontSize="1.3rem" py={2}>
                  {lang[2]}
                </Text>
                <Text w="80%" color="#5b616e" fontSize="0.9rem">
                  {lang[3]}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/home/help/Learning-rewards">
              <Flex sx={styles.SlideC} alignItems="center" textAlign="center" flexDir="column">
                <Flex pt={8}>
                  <Image w="48px" src={MyLearningRewardsNavigation} />
                </Flex>
                <Text fontWeight="var(--cds-fontWeights-medium)" w="full" fontSize="1.3rem" py={2}>
                  {lang[4]}
                </Text>
                <Text w="80%" color="#5b616e" fontSize="0.9rem">
                  {lang[5]}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>

          <SwiperSlide>
            <Link to="/home/help/coinbase-card-for-the-us">
              <Flex sx={styles.SlideC} alignItems="center" textAlign="center" flexDir="column">
                <Flex pt={8}>
                  <Image w="48px" src={MyCardNavigation} />
                </Flex>
                <Text fontWeight="var(--cds-fontWeights-medium)" w="full" fontSize="1.3rem" py={2}>
                  {lang[6]}
                </Text>
                <Text w="80%" color="#5b616e" fontSize="0.9rem">
                  {lang[7]}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/home/help/What-is-USD-Coin">
              <Flex sx={styles.SlideC} alignItems="center" textAlign="center" flexDir="column">
                <Flex pt={8}>
                  <Image w="48px" src={USDCoinUSDC} />
                </Flex>
                <Text fontWeight="var(--cds-fontWeights-medium)" w="full" fontSize="1.3rem" py={2}>
                  {lang[8]}
                </Text>
                <Text w="80%" color="#5b616e" fontSize="0.9rem">
                  {lang[9]}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/home/help/trading-and-funding#Coinbaseearn">
              <Flex sx={styles.SlideC} alignItems="center" textAlign="center" flexDir="column">
                <Flex pt={8}>
                  <Image w="48px" src={CoinbaseEarn} />
                </Flex>
                <Text fontWeight="var(--cds-fontWeights-medium)" w="full" fontSize="1.3rem" py={2}>
                  {lang[10]}
                </Text>
                <Text w="80%" color="#5b616e" fontSize="0.9rem">
                  {lang[11]}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/home/help/Dapps">
              <Flex sx={styles.SlideC} alignItems="center" textAlign="center" flexDir="column">
                <Flex pt={8}>
                  <Image w="48px" src={Dapps} />
                </Flex>
                <Text fontWeight="var(--cds-fontWeights-medium)" w="full" fontSize="1.3rem" py={2}>Dapps</Text>
                <Text w="80%" color="#5b616e" fontSize="0.9rem">
                  {lang[12]}
                </Text>
              </Flex>
            </Link>
          </SwiperSlide>
        </Swiper>
      </Flex>
  );
};
