import { MyIcon, getAvatar } from '@/common';
import { useCallback, useEffect, useRef, useState } from 'react';

import ChangeCamera from '../../../../assets/images/change-camera.svg';
import FaceOutlineSvg from '../../../../assets/images/face_outline.svg';
import IdCardOutLineSvg from '../../../../assets/images/idcard_outline.svg';
import IdCardOutLineSvg1 from '../../../../assets/images/idcard_outline1.svg';
import capture from '../../../../assets/imgs/idcard.png';

import { WarningTwoIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import Webcam, { WebcamProps } from 'react-webcam';
interface Styles {
  [key: string]: React.CSSProperties;
}

const styles: Styles = {
  customCenter: {
    display: 'flex',
    alignSelf: 'center',
  },

  blankingText: {
    opacity: 0,
    fontSize: '20px',
    transition: 'opacity 2s ease-in-out infinite',
  },
  middleCircle: {
    display: 'flex',
    width: '50%',
    height: '95%',
    borderRadius: '50%',
    marginLeft: 50,
    alignSelf: 'center',
    border: 'solid 5px red',
    zIndex: 10000,
  },
  videoStyle: {
    display: 'none',
    width: '100%',
    // height: 400,
    margin: 'auto',
    alignSelf: 'center',
  },
  photoWraper: {
    display: 'none',
    width: 400,
    alignSelf: 'center',
  },
  photoStyle: {
    width: 400,
    marginBottom: 50,
    marginTop: 50,
  },
};
interface ExtendedWebcamProps extends WebcamProps {
  videoWidth?: number;
  videoHeight?: number;
}
let videoConstraints = {
  width: 1024,
  height: 768,
  facingMode: 'environment',
};

export default ({
  onChange,
  label,
  mainTitle,
  subTitle,
  h = '180px',
  photoType,
  isMobile,
  emptyImg,
  defaultFacingMode,
  defaultVal = '',
  status,
  ...field
}: any) => {
  if (isMobile) h = '220px';
  videoConstraints.facingMode = defaultFacingMode;
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [getUrl, setUrl] = useState(defaultVal);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<Webcam>(null);
  const initialImgRef = useRef<HTMLImageElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const videoWraper = useRef<HTMLDivElement>(null);
  const imgPrevRef = useRef<HTMLImageElement>(null);
  const [pauseWebcam, setPauseWebcam] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const FACING_MODE_USER = 'user';
  const FACING_MODE_ENVIRONMENT = 'environment';
  const [facingMode, setFacingMode] = useState(defaultFacingMode);
  const intl = useIntl();
  useEffect(() => {
    setIsVideoVisible(true);
    setIsPhotoVisible(true);
    startCapture();
  }, []);

  async function checkCameraPermission4Desk() {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'camera' as PermissionName,
      });
      if (permissionStatus.state === 'granted') {
        // User has granted camera permission
        setHasCameraPermission(true);
      } else if (permissionStatus.state === 'prompt') {
        // We need to ask for camera permission
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setHasCameraPermission(true);
      } else {
        // Camera permission denied
        setHasCameraPermission(false);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  async function checkCameraPermission4Mobi() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        // Camera access was granted
        setHasCameraPermission(true);
      })
      .catch((err) => {
        // Camera access was denied or errored
        setHasCameraPermission(false);
      });
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current && photoRef.current) {
      const videoWidth: number =
        (videoRef.current as unknown as ExtendedWebcamProps).videoWidth ?? 0;
      const videoHeight: number =
        (videoRef.current as unknown as ExtendedWebcamProps).videoHeight ?? 0;
      setDimensions({
        width: videoWidth,
        height: videoHeight,
      });
      photoRef.current.width = videoWidth;
      photoRef.current.height = videoHeight;
    }
  };
  const savePhoto = () => {
    if (!hasCameraPermission) return;

    let webcam = videoRef.current;
    let photo = photoRef.current;
    if (photo) {
      let ctx = photo.getContext('2d');
      if (ctx && webcam) {
        const video = webcam.video;
        if (video) {
          photo.width = video.videoWidth;
          photo.height = video.videoHeight;
          let imgData = videoRef.current?.getScreenshot();
          if (!hasPhoto) {
            ctx.drawImage(video, 0, 0);
            setUrl(imgData);
          }
          setHasPhoto(true);
          onChange({ src: imgData });
          onClose();
        }
      }
    }
  };

  const shootPhoto = () => {
    if (!hasCameraPermission) return;

    let webcam = videoRef.current;
    let photo = photoRef.current;
    if (photo) {
      let ctx = photo.getContext('2d');
      if (ctx && webcam) {
        const video = webcam.video;
        if (video) {
          photo.width = video.videoWidth;
          photo.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          setHasPhoto(true);
          let imgData = videoRef.current?.getScreenshot();
          onChange({ src: imgData });
          setUrl(imgData);
          setPauseWebcam(true);
          if (imgPrevRef.current && photoRef.current) {
            imgPrevRef.current.width = photoRef.current.width;
            imgPrevRef.current.height = photoRef.current.height;
          }
          setTimeout(() => {
            setPauseWebcam(false);
          }, 50000);
        }
      }
    }
  };
  const retryCapture = () => {
    setHasPhoto(false);
    setUrl('');
    closeModal();
  };
  const startCapture = () => {
    setIsPhotoVisible(false);
    setIsVideoVisible(true);
  };

  const closeModal = () => {
    onClose();
  };
  const openModal = () => {
    setHasPhoto(false);
    if (isMobile) checkCameraPermission4Mobi();
    else checkCameraPermission4Desk();
    onOpen();
  };

  const switchCamera1 = async () => {
    if (videoConstraints.facingMode == 'user')
      videoConstraints.facingMode = 'environment';
    else if (videoConstraints.facingMode == 'environment')
      videoConstraints.facingMode = 'user';
    let webcam = videoRef.current;
    if (webcam?.video) {
      const mediaStream = webcam.video.srcObject as MediaStream;
      const videoTrack = mediaStream.getVideoTracks()[0];
      try {
        await videoTrack.applyConstraints(videoConstraints);
        console.log('New video constraints applied successfully');
      } catch (error) {
        console.error('Error applying new video constraints', error);
      }
    }
  };

  const switchCamera = useCallback(() => {
    setFacingMode((prevState: string) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER,
    );
  }, []);

  return (
    <>
      <Flex
        borderRadius='8px'
        border='1px solid #89909e'
        flexDir='column'
        h={h}
        overflow='hidden'
        justifyContent='center'
        w='full'
        onClick={openModal}
      >
        {getUrl ? (
          <Flex width='100%'>
            {status == 'Failed' && (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: 'calc(100% - 29px)',
                  background: 'rgba(0,0,0, .58)',
                  left: '50%',
                  top: '56%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
              >
                <WarningTwoIcon color='yellow.500' boxSize={10} />
                <Button
                  colorScheme='yellow'
                  style={{ marginTop: 12 }}
                  size='xs'
                  onClick={openModal}
                >
                  <FormattedMessage id='Text.Update' />
                </Button>
              </div>
            )}
            <Image
              src={getAvatar(getUrl, true)}
              margin='auto'
              maxHeight='100%'
              maxWidth='100%'
            />
          </Flex>
        ) : (
          <Flex flexDir='column'>
            {emptyImg ? (
              <Image src={emptyImg} style={{ margin: '0 auto' }} width='80px' />
            ) : (
              <MyIcon
                icon=''
                fontSize='5rem'
                h='50px'
                color='#dedfe2'
                w='full'
              />
            )}
            <Text
              color='#5b616e'
              w='full'
              textAlign='center'
              fontSize='12px'
              pt={3}
            >
              {label}
            </Text>
          </Flex>
        )}
      </Flex>
      <Modal isOpen={isOpen} onClose={closeModal} size='xl'>
        <ModalOverlay />
        <ModalContent
          w={{ base: '100vw', sm: '100vw', md: '100%', lg: '100%' }}
          mt={{ base: '0', sm: '0', md: '100px', lg: '100px' }}
        >
          <ModalHeader
            style={{
              display: 'flex',
              alignSelf: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              background: 'white',
            }}
            sx={{ _dark: { background: '#2d3748!important' } }}
          >
            <Text>{mainTitle}</Text>
            <Text
              color='#d1d1d1'
              w='full'
              textAlign='center'
              fontSize='14px'
              pt={3}
            >
              {subTitle}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody
            // h={{
            //   base: "350", sm: "400", md: "500px", lg: "600px"
            // }}
            // maxH={{
            //   base: "350", sm: "400", md: "500px", lg: "600px"
            // }}
            py={0}
          >
            <Flex
              borderRadius='8px'
              flexDir='column'
              justifyContent='center'
              w='full'
            >
              <div
                ref={videoWraper}
                style={{
                  display: isVideoVisible ? 'flex' : 'none',
                  maxWidth: '576px',
                  width: '100vw',
                  alignSelf: 'center',
                }}
              >
                {hasCameraPermission ? (
                  <Flex
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      position: 'relative',
                    }}
                    top={{ base: '-50px', sm: '-50px', md: '0', lg: '0' }}
                  >
                    <Webcam
                      style={{
                        ...styles.videoStyle,
                        display: isVideoVisible ? 'flex' : 'none',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        minWidth: '100%',
                        minHeight: '430px',
                        zIndex: -1,
                      }}
                      audio={false}
                      forceScreenshotSourceSize={isMobile}
                      mirrored={false}
                      screenshotFormat={'image/jpeg'}
                      minScreenshotHeight={isMobile ? 0 : 1024}
                      minScreenshotWidth={isMobile ? 0 : 768}
                      videoConstraints={{
                        ...videoConstraints,
                        facingMode,
                      }}
                      ref={videoRef}
                      onLoadedMetadata={handleLoadedMetadata}
                      playsInline
                      muted
                      autoPlay
                    />
                    {photoType == 1 && (
                      <div
                        style={{
                          width: '100%',
                          height: '30%',
                          bottom: 0,
                          position: 'absolute',
                          display: 'flex',
                        }}
                      >
                        <Flex
                          animation='heartbeat 1.5s ease-in-out infinite both'
                          style={{ margin: 'auto' }}
                        >
                          <Text
                            style={{ margin: 'auto', marginBottom: '30px' }}
                          >
                            {intl.formatMessage({
                              id: 'identity.text.takePhotos',
                            })}
                          </Text>
                        </Flex>
                      </div>
                    )}

                    {photoType == 1 ? (
                      <Flex
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          display: 'flex',
                        }}
                      >
                        <Image
                          src={FaceOutlineSvg}
                          style={{
                            margin: 'auto',
                            width: '95%',
                            height: '95%',
                          }}
                        ></Image>
                      </Flex>
                    ) : photoType === 2 ? (
                      <Flex
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          display: 'flex',
                        }}
                      >
                        <Image
                          src={IdCardOutLineSvg}
                          style={{
                            margin: 'auto',
                            width: '95%',
                            height: '95%',
                          }}
                        ></Image>
                      </Flex>
                    ) : (
                      <Flex
                        style={{
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          display: 'flex',
                        }}
                      >
                        <Image
                          src={IdCardOutLineSvg1}
                          style={{
                            margin: 'auto',
                            width: '95%',
                            height: '95%',
                          }}
                        ></Image>
                      </Flex>
                    )}
                  </Flex>
                ) : (
                  <div
                    style={{
                      height: 400,
                      color: 'red',
                      lineHeight: 400,
                      margin: 'auto',
                    }}
                  >
                    <FormattedMessage id='identity.cameraNotAllowed' />
                  </div>
                )}
              </div>

              <div
                id='image'
                style={{
                  display: isVideoVisible || isPhotoVisible ? 'none' : 'flex',
                  alignSelf: 'center',
                }}
              >
                {
                  <Flex flexDir='column'>
                    {emptyImg ? (
                      <Image
                        w='80%'
                        h='60%'
                        src={capture}
                        style={{
                          width: 400,
                          height: 300,
                          marginBottom: 50,
                          marginTop: 50,
                        }}
                        ref={initialImgRef}
                      />
                    ) : (
                      <Image
                        w='80%'
                        h='60%'
                        src={emptyImg}
                        style={{
                          width: 400,
                          height: 300,
                          marginBottom: 50,
                          marginTop: 50,
                        }}
                        ref={initialImgRef}
                      />
                    )}
                  </Flex>
                }
              </div>
              <div
                className='text-center'
                ref={photoWrapRef}
                style={styles.photoWraper}
              >
                <canvas ref={photoRef} style={styles.photoStyle}></canvas>
              </div>
            </Flex>
          </ModalBody>
          {isMobile ? (
            <ModalFooter
              position='relative'
              background='white'
              top={{ base: '-100px', sm: '-100px', md: '0', lg: '0' }}
              marginBottom={{ base: '-100px', sm: '-100px', md: '0', lg: '0' }}
              sx={{ _dark: { background: '#2d3748!important' } }}
            >
              <SimpleGrid
                spacing={3}
                height='auto'
                columns={3}
                width='100%'
                alignItems='center'
              >
                <Flex justifyContent='center' alignItems='center'>
                  <button onClick={retryCapture}>
                    <svg
                      height='30px'
                      width='30px'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 800 800'
                    >
                      <path
                        style={{ fill: '#0052ff' }}
                        d='M196.6,690.5c117.9,78.1,271.2,78.1,389.1,0c-11.8-107.5-108.5-185-216-173.1
	C278.6,527.4,206.6,599.4,196.6,690.5z'
                      />
                      <line
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        x1='760'
                        y1='365.9'
                        x2='544'
                        y2='149.9'
                      />
                      <line
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        x1='760'
                        y1='149.9'
                        x2='544'
                        y2='365.9'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M392.3,514.4c-100.9-0.5-185.6,75.8-195.7,176.2c117.9,78.1,271.2,78.1,389.1,0
	C575.7,591,492.3,515.1,392.3,514.4z'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M470.6,222c-23.9-13.5-50.8-20.7-78.3-20.7c-86.5-0.1-156.7,69.9-156.8,156.4
	s69.9,156.7,156.4,156.8c45.1,0.1,88.1-19.3,117.8-53.2'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M724.3,514.4c-17.4,49.6-45.7,94.5-83,131.5C503.8,783.6,280.7,783.7,143,646.2
	S5.2,285.6,142.7,148c66.2-66.2,156-103.4,249.6-103.3c40-0.1,79.8,6.8,117.4,20.4'
                      />
                    </svg>
                  </button>
                </Flex>
                <Flex justifyContent='center' alignItems='center'>
                  <button onClick={savePhoto}>
                    <svg
                      width='50px'
                      height='50px'
                      viewBox='0 0 104 104'
                      xmlns='http://www.w3org/2000/svg'
                    >
                      <g
                        id='3.Multimedia'
                        stroke='none'
                        strokeWidth='3.5'
                        fill='none'
                        fillRule='evenodd'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <g
                          id='Multimedia-(Color)'
                          transform='translate(-1298.000000, -903.000000)'
                          stroke='#a1a1a1'
                          strokeWidth='3.5'
                        >
                          <g
                            id='47-multimeda-stop-begin'
                            transform='translate(1300.000000, 905.000000)'
                          >
                            <circle
                              id='Layer-1'
                              fill='#FFFFFF'
                              cx='50'
                              cy='50'
                              r='50'
                            ></circle>
                            <circle
                              id='Layer-2'
                              fill='#0052ff'
                              cx='50'
                              cy='50'
                              r='37'
                            ></circle>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </Flex>
                <Flex justifyContent='center' alignItems='center'>
                  <button onClick={switchCamera}>
                    <Image src={ChangeCamera} height={30} width={30}></Image>
                  </button>
                </Flex>
              </SimpleGrid>
            </ModalFooter>
          ) : (
            <ModalFooter
              position='relative'
              background='white'
              top={{ base: '-100px', sm: '-100px', md: '0', lg: '0' }}
              marginBottom={{ base: '-100px', sm: '-100px', md: '0', lg: '0' }}
              sx={{ _dark: { background: '#2d3748!important' } }}
            >
              <SimpleGrid
                spacing={3}
                height='auto'
                columns={3}
                width='100%'
                alignItems='center'
              >
                <Flex justifyContent='center' alignItems='center'>
                  <button onClick={retryCapture}>
                    <svg
                      height='30px'
                      width='30px'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 800 800'
                    >
                      <path
                        style={{ fill: '#0052ff' }}
                        d='M196.6,690.5c117.9,78.1,271.2,78.1,389.1,0c-11.8-107.5-108.5-185-216-173.1
	C278.6,527.4,206.6,599.4,196.6,690.5z'
                      />
                      <line
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        x1='760'
                        y1='365.9'
                        x2='544'
                        y2='149.9'
                      />
                      <line
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        x1='760'
                        y1='149.9'
                        x2='544'
                        y2='365.9'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M392.3,514.4c-100.9-0.5-185.6,75.8-195.7,176.2c117.9,78.1,271.2,78.1,389.1,0
	C575.7,591,492.3,515.1,392.3,514.4z'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M470.6,222c-23.9-13.5-50.8-20.7-78.3-20.7c-86.5-0.1-156.7,69.9-156.8,156.4
	s69.9,156.7,156.4,156.8c45.1,0.1,88.1-19.3,117.8-53.2'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M724.3,514.4c-17.4,49.6-45.7,94.5-83,131.5C503.8,783.6,280.7,783.7,143,646.2
	S5.2,285.6,142.7,148c66.2-66.2,156-103.4,249.6-103.3c40-0.1,79.8,6.8,117.4,20.4'
                      />
                    </svg>
                  </button>
                </Flex>
                <Flex justifyContent='center' alignItems='center'>
                  <button onClick={shootPhoto}>
                    <svg
                      width='50px'
                      height='50px'
                      viewBox='0 0 104 104'
                      xmlns='http://www.w3org/2000/svg'
                    >
                      <g
                        id='3.Multimedia'
                        stroke='none'
                        strokeWidth='3.5'
                        fill='none'
                        fillRule='evenodd'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <g
                          id='Multimedia-(Color)'
                          transform='translate(-1298.000000, -903.000000)'
                          stroke='#a1a1a1'
                          strokeWidth='3.5'
                        >
                          <g
                            id='47-multimeda-stop-begin'
                            transform='translate(1300.000000, 905.000000)'
                          >
                            <circle
                              id='Layer-1'
                              fill='#FFFFFF'
                              cx='50'
                              cy='50'
                              r='50'
                            ></circle>
                            <circle
                              id='Layer-2'
                              fill='#0052ff'
                              cx='50'
                              cy='50'
                              r='37'
                            ></circle>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </Flex>
                <Flex justifyContent='center' alignItems='center'>
                  <button onClick={savePhoto}>
                    <svg
                      height='30px'
                      width='30px'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 800 800'
                    >
                      <path
                        style={{ fill: '#0052ff' }}
                        d='M196.6,690.5c117.9,78.1,271.2,78.1,389.1,0c-11.8-107.5-108.5-185-216-173.1
	C278.6,527.4,206.6,599.4,196.6,690.5z'
                      />
                      <polyline
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        points='760,189.6 585.7,393.8 488,308.6 '
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M392.3,514.4c-100.9-0.5-185.6,75.8-195.7,176.2c117.9,78.1,271.2,78.1,389.1,0
	C575.7,591,492.3,515.1,392.3,514.4z'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M470.6,222c-23.9-13.5-50.8-20.7-78.3-20.7c-86.5-0.1-156.7,69.9-156.8,156.4
	s69.9,156.7,156.4,156.8c45.1,0.1,88.1-19.3,117.8-53.2'
                      />
                      <path
                        style={{
                          fill: 'none',
                          stroke: '#a1a1a1',
                          strokeWidth: '50',
                        }}
                        d='M724.3,514.4c-17.4,49.6-45.7,94.5-83,131.5C503.8,783.6,280.7,783.7,143,646.2
	S5.2,285.6,142.7,148c66.2-66.2,156-103.4,249.6-103.3c40-0.1,79.8,6.8,117.4,20.4'
                      />
                    </svg>
                  </button>
                </Flex>
              </SimpleGrid>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
