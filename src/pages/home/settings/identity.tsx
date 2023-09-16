import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  MyCard,
  MyContent,
  PrimaryButton,
  TextCardHeader,
  request,
  stateActions,
  useMyState,
  useMyToast,
} from '../../../common';
import CapturePhoto from './components/CapturePhoto';
import PInput from './components/Input';
import MyMore from './components/More';
import PageTab from './components/PageTab';
import PersonalImg from '/img/Personal.svg';
import IdBSvg from '/img/id-b.svg';
import IdFSvg from '/img/id-f.svg';
const styles = {
  SettingsLC: {
    width: { base: '100%', sm: '100%', md: '100%', lg: 'calc(100% - 374px)' },
  },
};

const isMobileDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    /iphone|ipad|ipod/.test(userAgent) ||
    userAgent.includes('mobile') ||
    userAgent.includes('android')
  );
};
export default () => {
  const { showRes } = useMyToast();
  const { snap } = useMyState();
  const intl = useIntl();
  const userInfo = snap.session.user;
  let cookies_info = localStorage.getItem('cookies');
  const isMobile = isMobileDevice();

  const [selfPhotoImgStatus, setSelfPhotoImgStatus] = useState<string>();
  const [idFrontImgStatus, setIdFrontImgStatus] = useState<string>();
  const [idReverseImgStatus, setIdReverseImgStatus] = useState<string>();

  return (
    <>
      <MyContent>
        <Flex w='full' flexWrap='wrap'>
          <Flex sx={styles.SettingsLC}>
            <MyCard flexDir='column' alignItems='center'>
              <TextCardHeader w='full'>
                <FormattedMessage id='home.sidebar.Settings/identity' />
              </TextCardHeader>
              <Divider />
              <PageTab idx={2} />
              <Divider />
              {userInfo?.id ? (
                //  {true ? (
                <Flex
                  w={{ base: '100%', sm: '100%', md: '100%', lg: '600px' }}
                  flexDir='column'
                  px={{ base: 5, sm: 5, md: 5, lg: 0 }}
                  py={16}
                >
                  <Formik
                    initialValues={{
                      full_name: userInfo?.full_name ?? '',
                      id_no: userInfo?.id_no ?? '',
                      country: userInfo?.country ?? '',
                      city: userInfo?.city ?? '',
                      self_photo_img: userInfo?.self_photo_img,
                      id_front_img: userInfo?.id_front_img,
                      id_reverse_img: userInfo?.id_reverse_img,
                    }}
                    onSubmit={(values, actions) => {
                      request('auth/update_identity', { data: values })
                        .then((res) => {
                          showRes(res);
                          stateActions.me();
                        })
                        .catch(showRes)
                        .finally(() => {
                          actions.setSubmitting(false);
                        });
                    }}
                  >
                    {(props: any) => (
                      <Form>
                        <Field name='full_name'>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.FullName' />
                              </FormLabel>
                              <PInput
                                {...field}
                                placeholder={intl.formatMessage({
                                  id: 'text.FullName',
                                })}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='id_no'>
                          {({ field, form }: any) => (
                            <FormControl
                              isRequired
                              h='110px'
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <FormLabel fontSize='14px'>
                                <FormattedMessage id='text.PassportNumber' />
                              </FormLabel>
                              <PInput
                                {...field}
                                placeholder={intl.formatMessage({
                                  id: 'text.PassportNumber',
                                })}
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Flex gap={6}>
                          <Field name='country'>
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                              >
                                <FormLabel fontSize='14px'>
                                  <FormattedMessage id='text.Country' />
                                </FormLabel>
                                <PInput
                                  {...field}
                                  placeholder={intl.formatMessage({
                                    id: 'text.Country',
                                  })}
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                          <Field name='city'>
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired
                                h='110px'
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                              >
                                <FormLabel fontSize='14px'>
                                  <FormattedMessage id='text.City' />
                                </FormLabel>
                                <PInput
                                  {...field}
                                  placeholder={intl.formatMessage({
                                    id: 'text.City',
                                  })}
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Flex w='full' pb={6}>
                          <Field name='self_photo_img'>
                            {({ field, form }: any) => (
                              <FormControl
                                isRequired={
                                  userInfo?.self_photo_img ? false : true
                                }
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                              >
                                <FormLabel fontSize='14px'>
                                  <FormattedMessage id='identity.text.selfPhoto1' />
                                </FormLabel>
                                <CapturePhoto
                                  status={
                                    selfPhotoImgStatus ||
                                    userInfo?.self_photo_img_status
                                  }
                                  h='240px'
                                  label={intl.formatMessage({
                                    id: 'identity.selfPhoto2',
                                  })}
                                  subTitle={intl.formatMessage({
                                    id: 'identity.text.dlgSubTitleFace',
                                  })}
                                  mainTitle={intl.formatMessage({
                                    id: 'identity.text.dlgMainTitleFace',
                                  })}
                                  photoType={1}
                                  isMobile={isMobile}
                                  defaultVal={userInfo?.self_photo_img}
                                  emptyImg={PersonalImg}
                                  defaultFacingMode={'user'}
                                  onChange={(e: any) => {
                                    if (e) {
                                      setSelfPhotoImgStatus('Default');
                                      props.setFieldValue(
                                        'self_photo_img',
                                        e.src,
                                      );
                                    }
                                  }}
                                />
                                <FormErrorMessage>
                                  {form.errors.name}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Flex
                          sx={{
                            gap: { base: 0, sm: 0, md: 6, lg: 6 },
                            display: {
                              base: 'block',
                              sm: 'block',
                              md: 'flex',
                              lg: 'flex',
                            },
                          }}
                        >
                          <Flex w='full'>
                            <Field name='id_front_img'>
                              {({ field, form }: any) => (
                                <FormControl
                                  isRequired={
                                    userInfo?.id_front_img ? false : true
                                  }
                                  isInvalid={
                                    form.errors.name && form.touched.name
                                  }
                                >
                                  <FormLabel
                                    fontSize='14px'
                                    sx={{ 'white-space': 'nowrap' }}
                                  >
                                    <FormattedMessage id='text.UploadPassportFront' />
                                  </FormLabel>

                                  <CapturePhoto
                                    status={
                                      idFrontImgStatus ||
                                      userInfo?.id_front_img_status
                                    }
                                    label={intl.formatMessage({
                                      id: 'identity.upload.label1',
                                    })}
                                    subTitle={intl.formatMessage({
                                      id: 'identity.text.dlgSubTitleIDFront',
                                    })}
                                    mainTitle={intl.formatMessage({
                                      id: 'identity.text.dlgMainTitleIDFront',
                                    })}
                                    photoType={2}
                                    isMobile={isMobile}
                                    defaultVal={userInfo?.id_front_img}
                                    emptyImg={IdFSvg}
                                    defaultFacingMode={'user'}
                                    onChange={(e: any) => {
                                      if (e) {
                                        setIdFrontImgStatus('Default');
                                        props.setFieldValue(
                                          'id_front_img',
                                          e.src,
                                        );
                                      }
                                    }}
                                  />

                                  <FormErrorMessage>
                                    {form.errors.name}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Flex>
                          <Flex
                            w='full'
                            sx={{
                              paddingTop: {
                                base: '1.5rem',
                                sm: '1.5rem',
                                md: 0,
                                lg: 0,
                              },
                            }}
                          >
                            <Field name='id_reverse_img'>
                              {({ field, form }: any) => (
                                <FormControl
                                  isRequired={
                                    userInfo?.id_front_img ? false : true
                                  }
                                  isInvalid={
                                    form.errors.name && form.touched.name
                                  }
                                >
                                  <FormLabel
                                    fontSize='14px'
                                    opacity='1'
                                    sx={{ 'white-space': 'nowrap' }}
                                  >
                                    <FormattedMessage id='text.UploadPassportBack' />
                                  </FormLabel>
                                  <CapturePhoto
                                    status={
                                      idReverseImgStatus ||
                                      userInfo?.id_reverse_img_status
                                    }
                                    label={intl.formatMessage({
                                      id: 'identity.upload.label2',
                                    })}
                                    subTitle={intl.formatMessage({
                                      id: 'identity.text.dlgSubTitleIDBack',
                                    })}
                                    mainTitle={intl.formatMessage({
                                      id: 'identity.text.dlgMainTitleIDBack',
                                    })}
                                    photoType={3}
                                    isMobile={isMobile}
                                    defaultVal={userInfo?.id_reverse_img}
                                    emptyImg={IdBSvg}
                                    defaultFacingMode={'user'}
                                    onChange={(e: any) => {
                                      if (e) {
                                        setIdReverseImgStatus('Default');
                                        props.setFieldValue(
                                          'id_reverse_img',
                                          e.src,
                                        );
                                      }
                                    }}
                                  />

                                  <FormErrorMessage>
                                    {form.errors.name}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Flex>
                        </Flex>

                        <Flex w='full' pt={10} key='submit'>
                          <PrimaryButton
                            type='submit'
                            isLoading={props.isSubmitting}
                            // isDisabled={userInfo?.['identity_status'] == 'OK'}
                          >
                            <FormattedMessage id='text.UpdateProfile' />
                          </PrimaryButton>
                        </Flex>
                      </Form>
                    )}
                  </Formik>
                </Flex>
              ) : (
                <></>
              )}
            </MyCard>
          </Flex>
          <Flex
            mt={{ base: '24px', sm: '24px', md: '24px', lg: '0' }}
            ml={{ base: '0', sm: '0', md: '0', lg: '24px' }}
            w={{ base: '100%', sm: '100%', md: '100%', lg: '350px' }}
          >
            <MyMore />
          </Flex>
        </Flex>
      </MyContent>
    </>
  );
};
