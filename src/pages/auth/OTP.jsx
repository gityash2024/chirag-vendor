import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import otpImage from '../../assets/otp-image.png';
import chiragLogo from '../../assets/chirag-logo-dark.png';

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
  width: 50vw;
  height: 80vh;
  object-fit: contain;
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
  justify-content: flex-start;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 250px;
`;

const Title = styled.h2`
 font-family: 'Public Sans', sans-serif;
  font-weight: 600; /* Regular */
  font-size: 24px;
  color: rgba(35, 33, 42, 0.6);
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
   font-family: 'Public Sans', sans-serif;
  font-weight: 400; /* Regular */
  color: rgba(35, 33, 42, 0.6);
  margin-bottom: 20px;
`;

const MobileNumber = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const OTPInputLabel = styled.p`
  font-size: 14px;
  color: #666;
   font-family: 'Public Sans', sans-serif;
  font-weight: 400; /* Regular */
  margin-bottom: 10px;
`;

const OTPInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const OTPInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

const Button = styled.button`
  background-color: #121212;
  color: white;
  padding: 10px;
   font-family: 'Public Sans', sans-serif;
  font-weight: 600; /* Regular */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
`;

const ResendLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
`;

const OTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <Container>
      <ImageSection>
        <Image src={otpImage} alt="OTP Verification" />
      </ImageSection>
      <FormSection>
        <LogoContainer>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
        </LogoContainer>
        <Title>Enter OTP</Title>
        <Subtitle>We sent a verification code to your mobile. Enter the code from the mobile in the field below.</Subtitle>
        <MobileNumber>******9763</MobileNumber>
        <OTPInputLabel>Type your 4 digit security code</OTPInputLabel>
        <form onSubmit={handleSubmit}>
          <OTPInputContainer>
            {otp.map((data, index) => (
              <OTPInput
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </OTPInputContainer>
          <Button type="submit">Submit</Button>
        </form>
        <ResendLink>Didn't get the code? Resend</ResendLink>
      </FormSection>
    </Container>
  );
};

export default OTP;