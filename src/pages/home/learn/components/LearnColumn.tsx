import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {useMyIntl} from "@/common";
export default ({ icon, label, href, ...rest }: any) => {
    const { lang } = useMyIntl("Howtoearncryptorewards");
  return (
    <Flex flex="1" justifyContent="center" {...rest}>
      <Image src={icon} />
      <Flex pl={3} flexDir="column">
        <Text fontWeight="410" fontSize="1.3rem">
          {label}
        </Text>
        <Link to={href}>
          <Text sx={{ _hover: { color: "#0052ff" } }}>
              {lang[126]}
              <ArrowForwardIcon />
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};
