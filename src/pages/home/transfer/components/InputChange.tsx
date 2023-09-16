import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
export default ({ onChange, defaultval, dispVnd = false, currency = 24000, symbol = "USDC", ...rest }: any) => {
  const [wInput, setWInput] = useState(40);
  const [getScale, setScale] = useState(1);
  const [getValue, setValue] = useState(0);
  const handleChange = (inputVal: any) => {
    let val = parseFloat(inputVal).toString();    
    onChange(val);
    if(isNaN(parseFloat(inputVal)))
      setValue(0);
    else
      setValue(parseFloat(inputVal));

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
  const numberWithCommas = (num: string) => {
    if (!!!num) return '';
    let x = parseFloat(num).toFixed(0);
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  useEffect(() => {
    handleChange(defaultval);
  }, [defaultval]);
  return (
    <Flex
      sx={{ transform: `scale(${getScale})`, padding: "2rem 0" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Flex
        justifyContent="center"
        alignItems="center">
        <input
          type="number"
          style={{ width: `${wInput}ch`, ...styles.inputZ }}
          value={getValue}
          onChange={(e: any) => {
            handleChange(e.target.value);
          }}
          maxLength={20}
          {...rest}
        />
        <Text fontSize="1.6rem" pl={1}>
          {symbol}
        </Text>
      </Flex>
      {dispVnd ? (
        <Flex>
          <Flex alignItems='center' px={9} py={2} color='#5b616e'>
            <Flex w='full'>
              <Text>
                {getValue == 0 ? '' : '≈ '}{numberWithCommas(getValue * currency + '')} VND
              </Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}

    </Flex>
  );
};
