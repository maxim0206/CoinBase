import {
  Box,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import QRCode, { QRCodeSVG } from "qrcode.react";
import { FormattedMessage } from "react-intl";
import { formatAddress, formatHelper } from '../../../../common/utils/formatHelper';
import mobile from 'is-mobile';
const styles = {
  qrimg: {
    position: "relative",
    zIndex: 5,
    overflow: "hidden",
    padding: '10px',
    background: 'white',
    borderRadius: "10px",
    boxShadow: "0 1px 20px 0 rgb(0 0 0 / 10%)",
    w: { base: "150px", sm: "250px", md: "250px", lg: "250px" },
    h: { base: "150px", sm: "250px", md: "250px", lg: "250px" },
  },
  wallet_addr: {
    _dark: { background: "#404855" },
    background: '#DDD',
    borderRadius: '10px',
    padding: '5px'
  }
};
const CryptoTransferQR = ({
  contract = "0x6ae7dfc73e0dde2aa99ac063dcf7e8a63265108c",
  chain = "137",
  to = "0xF1c51266886c539Bd3e613ff17DBBDF653ae151e",
  amount = 1000,
  decimals = "18",
  size = 250,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  level = "L",
  includeMargin = false,
  renderAs = "canvas",
} = {}) => {
  return (
    <>
      <QRCodeSVG
        value={
          // chain +
          // ":" +
          to
        }
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        includeMargin={false}
        width='100%'
        height='100%'

      />
    </>
  );
};

export function CryptoQRCode(props: {
  open: boolean,
  onClose: () => void,
  data: any,
  onChange: (res: any) => void
}) {
  return <Modal isOpen={props.open} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent p={3}>
      <ModalHeader>
        {/* <Flex alignItems="center" pt={3} pb={2}>
          <Flex w="full" textAlign="center">
            <Text fontSize={15} w="full"
              sx={styles.wallet_addr}>
              {mobile() ? formatAddress(props.data?.toAddress, 4) : formatAddress(props.data?.toAddress, 14)}
            </Text>
          </Flex>
        </Flex> */}
      </ModalHeader>
      <ModalCloseButton />
      <Flex
        className="qr-img-c"
        w="full"
        justifyContent="center"
        pt={3}
        pb={4}
      >
        <Box sx={styles.qrimg}>
          <CryptoTransferQR
            contract={props.data?.fromAddress}
            chain={props.data?.network}
            to={props.data?.toAddress}
            amount={props.data?.amount}
          />
        </Box>
      </Flex>
      <Flex flexDir="column">
        <Text>
          <FormattedMessage id="text.PleaseReadQR" />
          <Text
            fontWeight="700"
            fontSize="1.5rem"
            color="#177ddc"
            borderRadius="80px"
            border="1px solid #177ddc"
            background="#f1f3fa"
            textAlign="center"
            my="1rem"
          >
            {formatHelper.coins(props.data?.amount, props.data?.coin_symbol)}
          </Text>
          <Text>
            ({props.data?.network}) <FormattedMessage id="text.AddressBelow" />
          </Text>
          <Text fontWeight="700" fontSize="0.9rem" my="1rem" color="#2196f3">
            {props.data?.toAddress}
          </Text>
        </Text>
        <Text
          as="ul"
          listStyleType="disc"
          sx={{
            background: "#f6f6f6",
            _dark: {
              background: "#53637f24",
            },
          }}
          borderRadius="5px"
          pl="35px"
          py={3}
          mb={4}
        >
          <Text as="li" pt={2}>
            <FormattedMessage id="text.WeAccept" values={{
              coinSymbol: 
                <Text as="b" color="#2196f3">
                  {props.data?.coin_symbol} ({props.data?.network}){" "}
                </Text>
            }} />{" "}
          </Text>
          <Text as="li" pt={2}>
            <FormattedMessage id="text.YouMustCheckWallet" />
          </Text>
          <Text as="li" py={2}>
            <FormattedMessage id="text.TransactionsWillBe" />
          </Text>
        </Text>
      </Flex>
    </ModalContent>
  </Modal>;
}