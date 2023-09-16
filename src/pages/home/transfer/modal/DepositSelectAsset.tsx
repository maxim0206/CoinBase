import {
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import SelectDeposit from "../components/SelectDeposit";
import React from "react";

export function DepositSelectAsset(props: {
  open: boolean,
  onClose: () => void,
  data: any,
  modalTypeItems: ({ label: string; value: string } | {
    label: string;
    value: string
  })[],
  onChange: (res: any) => void
}) {
  return <Modal isOpen={props.open} onClose={props.onClose} size="2xl">
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>
        <Flex alignItems="center" pt={3} pb={2}>
          <Flex w="full" textAlign="center">
            <Text fontWeight="var(--cds-fontWeights-medium)" w="full">            
            </Text>
          </Flex>
        </Flex>
      </ModalHeader>
      <SelectDeposit
        bankIndex={props.data?.bankIndex}
        typeIndex={props.data?.typeIndex}
        coinIndex={props.data?.coinIndex}
        modalType={props.data?.modalType}
        coins={props.data?.coins}
        modalTypeItems={props.modalTypeItems}
        modalName={props.data?.modalName}
        onChange={props.onChange}
      />
    </ModalContent>
  </Modal>;
}