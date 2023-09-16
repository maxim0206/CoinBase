import { Flex, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AirdropImg from "../../../../assets/images/airdrop.svg";

const styles = {
  inputZ: {
    textAlign: "center",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "4.5rem",
    _focus: {
      outline: "none",
      backgroundColor: "transparent",
      border: "none",
    },
  },
};
export default ({ onChange, defaultval, formLabel, ...rest }: any) => {
  const [wInput, setWInput] = useState(45);
  const [getScale, setScale] = useState(1);
  const handleChange = (inputVal: any) => {
    let val = parseFloat(inputVal).toString();    
    onChange(val);
    setWInput(parseFloat(inputVal) > 0 ? val.length : 1);
    if (val && val.length > 4) {
      setScale(
        document.body.clientWidth < 600
          ? 1 - val.length / 30
          : 1 - val.length / 55
      );
    } else {
      setScale(1);
    }
  };
  useEffect(() => {
    handleChange(defaultval);
  }, [defaultval]);
  return (
    <Flex
      sx={{ transform: `scale(${getScale})`, padding: "2rem 0" }}
      justifyContent="center"
      alignItems="center"
    >
      <input
        type="number"
        style={{ width: `${wInput}ch`, ...styles.inputZ }}
        onChange={(e: any) => {
          handleChange(e.target.value);
        }}
        maxLength={20}
        {...rest}
      />
      {/* <Input
        variant="unstyled"
        w={`${wInput}px`}
        textAlign="center"
        fontSize="4.6rem"
        onChange={(e: any) => {
          handleChange(e.target.value);
        }}
        {...rest}
      /> */}
      <Image w="30px" h="30px" ml={1} mt={1} src={AirdropImg} />
      {/* <Text fontSize="1.6rem" pt={5} pl={1}>
        {formLabel}
      </Text> */}
    </Flex>
  );
};
