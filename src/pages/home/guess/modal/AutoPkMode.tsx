import { Field, Form, Formik } from "formik";
import { PrimaryButton, getErrorMessage, request, useMyState, useMyToast } from "../../../../common";
import { Checkbox, Divider, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftAddon, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

export default ({ pkInfo, isOpenModal, onCloseModal }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showSuccess, showError } = useMyToast();
  const [isLoading, setLoading] = useState(false);

  function showRes(reason: any) {
    showError({ description: getErrorMessage(reason.message, intl) });
  }

  const getRoundValue = (num: number) => {
    if (!num || parseFloat(num.toString()) == 0) {
      return null;
    }
    if (parseFloat(num.toString()) - parseInt(num.toString()) == 0) {
      return parseInt(num.toString());
    } else {
      return parseFloat(num.toString()).toFixed(2);
    }
  }

  const [initialValues, setInitialValues] = useState<any>({
    max_accept_num: pkInfo?.max_accept_num > 0 ? getRoundValue(pkInfo?.max_accept_num) : 100,
    max_win_amount: pkInfo?.max_win_amount > 0 ? getRoundValue(pkInfo?.max_win_amount) : 100000,
    max_loss_amount: pkInfo?.max_loss_amount > 0 ? getRoundValue(pkInfo?.max_loss_amount) : 100000,
    max_bet_amount: pkInfo?.max_bet_amount > 0 ? getRoundValue(pkInfo?.max_bet_amount) : 100000,
  });
  const intl = useIntl();
  
  useEffect(() => {
    if (isOpenModal) {
      onOpen();
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (pkInfo) {
      setInitialValues({
        max_accept_num: pkInfo?.max_accept_num > 0 ? getRoundValue(pkInfo?.max_accept_num) : 100,
        max_win_amount: pkInfo?.max_win_amount > 0 ? getRoundValue(pkInfo?.max_win_amount) : 100000,
        max_loss_amount: pkInfo?.max_loss_amount > 0 ? getRoundValue(pkInfo?.max_loss_amount) : 100000,
        max_bet_amount: pkInfo?.max_bet_amount > 0 ? getRoundValue(pkInfo?.max_bet_amount) : 100000,
      })
    }
    

  }, [pkInfo])


  return (
    <>
      <Modal
        isCentered
        onClose={() => {
          onClose();
          if (onCloseModal)
            onCloseModal(false);
        }}
        isOpen={isOpen}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id="text.setAutoPkMode" />
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            {
              <Flex flexDir="column">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialValues}
                  onSubmit={(values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
                    setLoading(true);
                    request('pk_lottery/update_pk_settings', {
                      data: {
                        ...values,
                        auto_enabled: true
                      }
                    })
                      .then((res) => {
                        onClose();
                        onCloseModal(true);
                      })
                      .catch(showRes)
                      .finally(() => {
                        setLoading(false);
                        actions.setSubmitting(false);
                      });
                  }}
                >
                    <Form>

                      <Field name='max_accept_num'>
                        {({ field, form }: any) => {
                          return (                          
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <InputGroup
                              mt={4}>
                              <InputLeftAddon
                                w='300px'
                                children={<FormattedMessage id='text.MaxAcceptNumber' />} pt='6px' fontSize='1.2em' />
                              <Input
                                {...field}
                                type="number"
                              />
                            </InputGroup>

                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}}
                      </Field>

                      <Field name='max_bet_amount'>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <InputGroup
                              mt={4}>
                              <InputLeftAddon
                                w='300px'
                                children={<FormattedMessage id='text.MaxBetAmount' />} pt='6px' fontSize='1.2em' />
                              <Input
                                {...field}
                                type="number"
                              />
                            </InputGroup>

                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name='max_win_amount'>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <InputGroup
                              mt={4}>
                              <InputLeftAddon
                                w='300px'
                                pointerEvents="none" children={<FormattedMessage id='text.MaxWinAmount' />} pt='6px' fontSize='1.2em' />
                              <Input
                                {...field}
                                type="number"
                              />
                            </InputGroup>

                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name='max_loss_amount'>
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <InputGroup
                              mt={4}>
                              <InputLeftAddon
                                w='300px'
                                pointerEvents="none" children={<FormattedMessage id='text.MaxLossAmount' />} pt='6px' fontSize='1.2em' />
                              <Input
                                {...field}
                                type="number"
                              />
                            </InputGroup>

                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {/* <Field name='accept_diff_pk'>
                        {({ field, form }: any) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <InputGroup
                              mt={4}>
                              <Checkbox
                                {...field}
                                type="password"
                                onChange={(e) => {
                                }}
                              >
                                <FormattedMessage id='text.acceptDifferentPK'></FormattedMessage>
                              </Checkbox >
                            </InputGroup>

                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field> */}
                      <Flex justifyContent="center" pt={3} pb={7}>
                        <PrimaryButton
                          type='submit'
                          isLoading={isLoading}
                          pl={10} pr={10} w='100%'
                        >
                          <FormattedMessage id="text.Confirm" />
                        </PrimaryButton>
                      </Flex>
                    </Form>
                </Formik>
              </Flex>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
