import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import loginImage from '../../assets/login-image-2.png';
import chiragLogo from '../../assets/logo-dark.svg';
import { sendOtp, verifyOtp } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/index';
import OtpInput from 'react-otp-input';
import { useTranslation } from '../../TranslationContext';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img`
 width: 40vw;
  height: 80vh;
  margin-left: 100px;
  border-radius: 40px !important;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 300px;
  margin-right: 70px;
  margin-bottom: 70px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  color: rgba(35, 33, 42, 0.6);
  margin-bottom: 20px;
  line-height: 28.2px;
`;

const Input = styled.input`
  width: 94%;
  font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
  align-self: center;
`;

const Button = styled.button`
  width: 94%;
  background-color: #121212;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
`;

const RegisterLink = styled.div`
  margin-top: 20px;
  text-align: center;
  margin-right: 70px;
  color: #121212;
  cursor: pointer;
  align-self: center;

  &:hover {
    text-decoration: underline;
  }
`;

const SelectLabel = styled.p`
  font-family: 'Public Sans';
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(35, 33, 42, 1);
  margin-bottom: 5px;
`;

const OtpContainer = styled.div`
  width: 94%;
  margin-bottom: 10px;

  .otp-input {
    width: 3rem !important;
    height: 2rem !important;
    margin-right: 0.5rem !important;
    font-size: 1rem !important;
    border-radius: 4px !important;
    border: 1px solid #DBDADE !important;
  }
`;

const ResendText = styled.p`
  color: #121212;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { translate } = useTranslation();

  useEffect(() => {
    if (location.state?.fromRegister) {
      setMobileNumber(location.state.mobileNumber || '');
      toast.success('Registration successful! Please login to continue');
    }
  }, [location]);

  const handleGuestLogin = () => {
    const guestUserData = {
      _id: "67c7fb13ad89bf57a1c36616",
      name: "Demo Account",
      email: "demo@yopmail.com",
      mobileNumber: "6377966657",
      vendorDroneVerified: true,
      otpVerified: true,
      role: "vendor",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzdmYjEzYWQ4OWJmNTdhMWMzNjYxNiIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE3NDExNTkyODQsImV4cCI6MTc0Mzc1MTI4NH0.zHZv11jp7RucEGpiOjIatgdlvY1r-xsajuSz0t8iCsM",
      isRegistered: true
    };
    localStorage.setItem('user', JSON.stringify(guestUserData));
    toast.success('Welcome to CHIRAG Vendor Portal');
    navigate('/home');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (mobileNumber === '9999999999') {
      handleGuestLogin();
      return;
    }
    
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsLoading(true);
    try {
      const response = await sendOtp({ mobileNumber });
      if (response.data.isRegistered) {
        setOtpSent(true);
        toast.success('OTP sent successfully');
      } else {
        toast.error('Please register first');
        navigate('/register');
      }
    } catch (error) {
      if (error.response?.data?.message.includes('register')) {
        toast.error('Please register first');
        navigate('/register');
      } else {
        toast.error(error.response?.data?.message || 'Failed to send OTP');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyOtp({ mobileNumber, otp });
      if (response.data.isRegistered) {
        localStorage.setItem('user', JSON.stringify(response.data));
        toast.success('Welcome to CHIRAG Vendor Portal');
        navigate('/home');
      } else {
        toast.error('Please register first');
        navigate('/register');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      await sendOtp({ mobileNumber });
      toast.success('OTP re-sent successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {isLoading && <Loader />}
      <ImageSection>
        <Image src={loginImage} alt="Login" />
      </ImageSection>
      <FormSection>
        <LogoContainer>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
        </LogoContainer>
        <Title>
          {translate('login.title')} <br/>{translate('login.subtitle')}
        </Title>
        {!otpSent ? (
          <>
            <SelectLabel>{translate('login.mobileNumberLabel')}</SelectLabel>
            <form onSubmit={handleSendOtp}>
              <Input
                type="tel"
                placeholder={translate('login.mobileNumberPlaceholder')}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
              <Button type="submit">
                {mobileNumber === '9999999999' ? 'Guest Login' : translate('login.getOtpButton')}
              </Button>
            </form>
          </>
        ) : (
          <>
            <SelectLabel>{translate('login.enterOtpTitle')}</SelectLabel>
            <form onSubmit={handleVerifyOtp}>
              <OtpContainer>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input {...props} className="otp-input" />}
                  containerStyle="display: flex; justify-content: space-between;"
                />
              </OtpContainer>
              <ResendText onClick={handleResendOtp}>{translate('login.resendOtp')}</ResendText>
              <Button type="submit">{translate('login.verifyOtpButton')}</Button>
            </form>
          </>
        )}
        <RegisterLink onClick={handleRegisterClick}>
          {translate('login.noAccount')}
        </RegisterLink>
      </FormSection>
    </Container>
  );
};

export default Login;