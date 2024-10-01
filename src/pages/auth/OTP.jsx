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
 font-family: 'Public Sans';
  font-weight: 400; /* Regular */
  font-size: 48px;
  line-height: 52px;
  color: rgba(35, 33, 42, 1);
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
   font-family: 'Public Sans';
   line-height: 24px;
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
  font-size: 18px;
 color: rgba(35, 33, 42, 1);
   font-family: 'Public Sans';
  font-weight: 400; /* Regular */
  margin-bottom: 10px;
  line-height: 24px;
`;

const OTPInputContainer = styled.div`
  display: flex;
  justify-content: center;  /* Center the OTP boxes */
  margin-bottom: 20px;
`;

const OTPInput = styled.input`
  width: 50px;  /* Adjusted width for larger input boxes */
  height: 50px; /* Adjusted height for larger input boxes */
  text-align: center;
  font-size: 18px;
  border: 1px solid #DBDADE;
  border-radius: 8px;  /* Adjusted border radius */
  margin-right: 16px;  /* Space between boxes */

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;  /* Optional: change border color on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);  /* Optional: add focus shadow */
  }
`;

const Button = styled.button`
  background-color: rgba(56, 56, 56, 1);
;
  color: white;
  padding: 10px;
   font-family: 'Public Sans';
  font-weight: 400; /* Regular */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
    line-height: 24px;
`;

// const ResendLink = styled.a`
//   // color: #007bff;
//   text-decoration: none;
//   font-size: 18px;
//   margin-top: 10px;
//     font-weight: 400;
//     font-family: 'Public Sans';
//     text-align: center;
//     line-height: 24px;
//     color: rgba(35, 33, 42, 1);
//   cursor: pointer;
// `;
const ResendText = styled.p`
  font-family: 'Public Sans';
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: rgba(35, 33, 42, 1);
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;


`;

const ResendLink = styled.a`
  color: rgba(115, 103, 240, 1);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline; /* Optional hover effect */
  }
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
        <Subtitle>We sent a verification code to your mobile. Enter the code <br />from the mobile in the field below.</Subtitle>
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
        <ResendText>
  Didn't get the code? <ResendLink>Resend</ResendLink>
</ResendText>

      </FormSection>
    </Container>
  );
};

export default OTP;
