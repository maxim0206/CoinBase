import {
  Flex,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import MyCoinbaseIconSvg from '../../assets/images/coinbase-icon.svg';
import MyLineSvg from '../../assets/images/line.svg';
import MyLogoSvg from '../../assets/images/logo.svg';
import { PrimaryButton, stateActions, useMyState } from '../../common';
import MyNation from '../MyNation';
import './scss/nav.scss';
import SignIn from '@components/Authentication/SignIn';
import SignUp from '@components/Authentication/SignUp';
import ForgotPassword from '@components/Authentication/ForgotPassword';
import SocialLogin from '@components/Authentication/SocialLogin';

const styles = {
  lab: {
    cursor: 'pointer',
    textIndent: '-9999px',
    width: '52px',
    height: '27px',
    background: 'grey',
    borderRadius: '100px',
    position: 'relative',
    margin: '0',
  },
  AiTradeC: {
    fontWeight: 200,
    fontSize: { base: '1.2rem', sm: '1.6rem', md: '1.8rem', lg: '1.8rem' },
  },
  AiTag: {
    padding: '0 0.4em',
    backgroundColor: '#57b4fc',
    borderRadius: '0.6em 0',
    fontWeight: '400',
    // letterSpacing: "0.1em",
    color: '#fff',
  },
  navbar: {
    display: 'flex',
    position: 'fixed',
    zIndex: '1000',
    width: '100%',
    top: '0',
    padding: {
      base: '1rem 0.5rem',
      sm: '1.5rem 0.5rem',
      md: '1.5rem 0.5rem',
      lg: '1.5rem 0.5rem',
    },
    backgroundColor: '#a3a3a31f',
    backdropFilter: 'blur(5px)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
};

export default function PageNav() {
  const { openConnectModal } = useConnectModal();
  const { toggleColorMode } = useColorMode();
  const { snap } = useMyState();
  const getThemeStatus = useColorModeValue('toggle', 'toggle theme_switch_btn');

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  useEffect(() => {
    // console.log('useEffect', address, connector, chain, snap.storage.isLogin);
    if (!snap.storage.token) {
      stateActions.loginFailed();
    } else {
      stateActions.loginSuccess();
    }
    // if (address && !chain) {
    //   console.log('address && !chain', address, chain);
    //   return;
    // }
    // if (!address && !chain && !snap.storage.isLogin) {
    //   // 都为空，则登录失败
    //   stateActions.walletLoginFailed({ address, chain, connector });
    // } else if (address && chain && snap.storage.isLogin) {
    //   // 都不为空，则登录成功
    //   stateActions.walletLogin({ address, chain, connector });
    // } else if (address && chain && !snap.storage.isLogin) {
    //   // 钱包已登录，但是本地没有登录状态，则登录失败
    //   stateActions.walletLoginFailed({ address, chain, connector });
    // } else if (!(address && chain) && snap.storage.isLogin) {
    //   // 钱包未登录，但是本地登录状态，则登录失败
    //   stateActions.walletLoginFailed({ address, chain, connector });
    // } else {
    //   // state.session.ready = true;
    // }
  }, [snap.storage.isLogin]);

  return (
    <Flex sx={styles.navbar}>
      <Flex
        w={{ base: '100%', sm: '100%', md: '100%', lg: '1270px' }}
        justifyContent='space-between'
      >
        <Flex alignItems='center'>
          <Flex>
            <Link to='/'>
              <Image
                src={MyCoinbaseIconSvg}
                alt='AIEarn Logo'
                w={{ base: '30px', sm: '30px', md: '45px', lg: '45px' }}
              />
            </Link>
          </Flex>
          <Flex px={3}>
            <Image src={MyLineSvg} alt='seperator' />
          </Flex>
          <Flex sx={styles.AiTradeC} alignItems='center'>
            <Text
              sx={styles.AiTag}
              mr={{ base: 1, sm: 2, md: 2, lg: 3 }}
              textAlign='center'
            >
              AI
            </Text>
            Earn
          </Flex>
        </Flex>
        <Flex alignItems='center'>
          <Flex animation='heartbeat 1.5s ease-in-out infinite both'>
            <PrimaryButton
              fontSize={{
                base: '0.8rem',
                sm: '0.8rem',
                md: '1.2rem',
                lg: '1.2rem',
              }}
              h={{ base: '35px', sm: '40px', md: '40px', lg: '40px' }}
              w={{ base: '90px', sm: '90px', md: '150px', lg: '150px' }}
              onClick={() => {
                stateActions.setIsLogin(true);
                // if (openConnectModal) openConnectModal();
                // else console.log('openConnectModal is null');
                setShowLoginModal(true);
              }}
            >
              <FormattedMessage id='text.GetStart' />
            </PrimaryButton>
          </Flex>
          <Flex
            p={{ base: '0 5px', sm: '0 5px', md: '0 14px', lg: '0 14px' }}
            className={getThemeStatus}
            onClick={() => {
              toggleColorMode();
            }}
          >
            <Text sx={styles.lab} className='label'>
              <FormattedMessage id='text.Toggle' />
            </Text>
          </Flex>
          <Flex>
            <MyNation />
          </Flex>
        </Flex>
      </Flex>
      <SignIn
        isOpenModal={showLoginModal}
        onCloseModal={() => {
          setShowLoginModal(false);
        }}
        onGotoSignUp={() => {
          setShowLoginModal(false);
          setShowSignUpModal(true);
        }}
        onGotoForgotPassword={() => {
          setShowLoginModal(false);
          setShowForgotModal(true);
          setShowSignUpModal(false);
        }}
      />
      <SignUp
        isOpenModal={showSignUpModal}
        onCloseModal={() => {
          setShowSignUpModal(false);
        }}
        onGotoSignIn={() => {
          setShowLoginModal(true);
          setShowSignUpModal(false);
          setShowForgotModal(false);
        }}
      />
      <ForgotPassword
        isOpenModal={showForgotModal}
        onCloseModal={() => {
          setShowForgotModal(false);
        }}
        onGotoSignIn={() => {
          setShowLoginModal(true);
          setShowSignUpModal(false);
          setShowForgotModal(false);
        }}
      />
      <SocialLogin
        isOpenModal={showSocialModal}
        onCloseModal={() => {
          setShowSocialModal(false);
        }}
      />
    </Flex>
  );
}

