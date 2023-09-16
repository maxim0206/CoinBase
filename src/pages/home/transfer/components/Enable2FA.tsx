import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Checkbox,
  Flex,
  Image,
  Text,
  Input,
  Center,
  Spacer
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  CloseButton,
  useDisclosure
} from '@chakra-ui/react'

import {
  ArrowBackIcon
} from '@chakra-ui/icons'
import { PrimaryButton } from "@common/index";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import MyMessageSvg from '/img/message.svg';
import { useState } from "react";
import { useSetState } from "react-use";
import GoogleAuthenticator from "./GoogleAuthenticator";
const styles = {
  body: {
    padding: '20px',
    flexDirection: 'row'
  },
  textInput: {
    border: '1px solid #000',
    width: '50px'

  },
  MPointer: {
    cursor: 'pointer',
  },
  ArrowBackIcon: {
    position: 'absolute',
  },
  button: {
    border: '1px solid #000'
  },
  tdbackground: { 
    backgroundColor: '#2A2B30'
  }
};


export default ({Amount, Close, onChange}: any) => {
  const navigate = useNavigate();
  const [useFree, setUseFree] = useState(false);
  const [codevalue, setCodeValue] = useState('');
  const [res, setRes] = useSetState<any>({
    transactions: {
      Withdrawal: [],
      Staking: [],
    },
    recent_sends: [],
    price: {
      usdc: 1,
      usdt: 1,
    },
    coins: [],
    dialog: <></>,
    preWithdrawal: {},
  });
  const { isOpen, onOpen, onClose} = useDisclosure();
  return (
    <AlertDialogContent>
      <AlertDialogBody sx={{ lineHeight: '2.5rem' }}>
        <TableContainer>
          <Text
              whiteSpace={'nowrap'}
              display={'inline'}
              color={'black'}
            >
              Do you want to enable 2FA?
          </Text>
        </TableContainer>
      </AlertDialogBody>
      <AlertDialogFooter>
        <Button onClick={() => onChange(useFree, true)}>
          <FormattedMessage id='text.Yes' />
        </Button>
        <Button 
          marginLeft={3}
          onClick={() => {
            onChange(useFree, false);
          }}>
          <FormattedMessage id='No' />
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
