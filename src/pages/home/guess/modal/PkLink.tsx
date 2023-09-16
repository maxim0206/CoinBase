import { Field, Form, Formik } from "formik";
import { PrimaryButton, getErrorMessage, request, useMyState, useMyToast } from "../../../../common";
import { Checkbox, Divider, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftAddon, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import { useSetState } from "react-use";

export default ({ pkLinkInfo, betTypes, pkodds, isOpenModal, onCloseModal }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showSuccess, showError } = useMyToast();
  const { colorMode } = useColorMode();
  const { snap } = useMyState();
  const [betType, setBetType] = useState<string>(pkLinkInfo?.bet_type ?? 'Random');
  const [isLoading, setLoading] = useState(false);
  const intl = useIntl();
  useEffect(() => {
    if (isOpenModal) {
      onOpen();
    }
  }, [isOpenModal]);
  useEffect(() => {

  }, [pkLinkInfo])
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

  return (
    <>
      <Modal
        isCentered
        onClose={() => {
          onClose();
          if (onCloseModal)
            onCloseModal();
        }}
        isOpen={isOpen}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id="text.SharePkLink" />
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            {
              <Flex flexDir="column">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    bet_amount: getRoundValue(pkLinkInfo?.bet_amount) ?? 100,
                    max_accept_num: getRoundValue(pkLinkInfo?.max_accept_num) ?? 100,
                    max_win_amount: getRoundValue(pkLinkInfo?.max_win_amount) ?? 100000,
                    max_loss_amount: getRoundValue(pkLinkInfo?.max_loss_amount) ?? 100000,
                    bet_type: pkLinkInfo?.bet_type,
                  }}
                  onSubmit={(values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
                    setLoading(true);
                    request('pk_lottery/update_pk_links', {
                      data: {
                        ...values,
                        bet_type: betType
                      }
                    })
                      .then((res) => {
                        onClose();
                        if (onCloseModal)
                          onCloseModal({
                            ...values,
                            bet_type: betType,
                            hash: res?.data?.hash
                          });
                      })
                      .catch(showRes)
                      .finally(() => {
                        actions.setSubmitting(false);
                        setLoading(false);
                      });
                  }}
                >
                  {(props: any) => (
                    <Form>
                      <Field name='bet_amount'>
                        {({ field, form }: any) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <InputGroup
                              mt={4}>
                              <InputLeftAddon
                                w='300px'
                                children={<FormattedMessage id='text.BetAmount' />} pt='6px' fontSize='1.2em' />
                              <Input
                                {...field}
                                type="number" />
                            </InputGroup>

                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='max_accept_num'>
                        {({ field, form }: any) => (
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
                                type="number" />
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
                                type="number" />
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
                                type="number" />
                            </InputGroup>

                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Flex mt={4}>
                        <FormattedMessage id='text.BetType'></FormattedMessage>
                      </Flex>
                      <Field name='bet_type'>
                        {({ field, form }: any) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <InputGroup mt={2}>
                              <Radio.Group
                                onChange={(e: any) => {
                                  setBetType(e.target.value);
                                }}
                                name="bet_type"
                                value={betType}
                                buttonStyle="solid"
                                style={{ width: '100%' }}
                                className='order_radio_group'
                              >
                                {betTypes?.map((option: any) => (
                                  <Radio.Button
                                    key={option.key}
                                    value={option.key}
                                    style={{
                                      background: colorMode === 'light' ? (betType === option.key ? 'rgb(55, 115, 245)' : '#DDD') : (betType === option.key ? 'rgb(55, 115, 245)' : '#FFF'),
                                      margin: "1.5%",
                                      borderRadius: '500px',
                                      width: '30%',
                                      border: 'none'
                                    }}
                                  >
                                    <div style={{ textAlign: 'center' }}>
                                      {option.label}<span style={{ color: colorMode === 'light' ? 'rgb(0, 0, 0, 0.85)' : '#fff' }}>(1 : {pkodds ? pkodds[option.key] : '-'})</span>
                                    </div>
                                  </Radio.Button>
                                ))}
                              </Radio.Group>
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
                  )}
                </Formik>
              </Flex>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
