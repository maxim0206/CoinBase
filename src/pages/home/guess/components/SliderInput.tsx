import { Flex } from "@chakra-ui/layout"
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/number-input"
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from "@chakra-ui/slider"
import React from "react"

export default () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (value: React.SetStateAction<number>) => setValue(value)

  return (
    <Flex>
      <NumberInput maxW='100px' mr='2rem' value={value}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        flex='1'
        focusThumbOnChange={false}
        value={value}
        onChange={handleChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize='sm' boxSize='32px' children={value} />
      </Slider>
    </Flex>
  )
}