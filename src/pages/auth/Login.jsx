import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loginImage from '../../assets/login-image.png';
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
  justify-content: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 250px;
  margin-right: 70px;
`;

const Title = styled.h2`
  font-size: 24px;
   font-family: 'Public Sans', sans-serif;
  font-weight: 400; /* Regular */
  color: rgba(35, 33, 42, 0.6);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 94%;
   font-family: 'Public Sans', sans-serif;
  font-weight: 400; /* Regular */
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
  align-self: center;
`;

const Button = styled.button`
  width:94%;
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

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/otp');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Container>
      <ImageSection>
        <Image src={loginImage} alt="Login" />
      </ImageSection>
      <FormSection>
        <LogoContainer>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
        </LogoContainer>
        <Title>Please login with your registered <br/>mobile number</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="tel"
            placeholder="Mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <Button type="submit">Get OTP</Button>
        </form>
        <RegisterLink onClick={handleRegisterClick}>
          Don't have an account? Register
        </RegisterLink>
      </FormSection>
    </Container>
  );
};

export default Login;
