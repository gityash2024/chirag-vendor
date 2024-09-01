import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import addMoneyImage from '../../assets/add-money-image.png';
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
  align-items: center;
  padding: 40px;
  position: relative;
`;

const FormContent = styled.div`
  width: 100%;
  max-width: 80%;
`;

const Logo = styled.img`
  width: 180px;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-family: 'Public Sans', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #121212;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #121212;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
`;

const QuickAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const QuickAmountButton = styled.button`
  background-color: transparent;
  border: 1px solid #DBDADE;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const SkipButton = styled.button`
  background-color: transparent;
  color: #121212;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  position: absolute;
     top: 45px;
    right: -80%;
  font-size: 14px;
`;

const AddMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleQuickAmount = (value) => {
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Amount added:', amount);
    navigate('/home');
  };

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <Container>
      <ImageSection>
        <Image src={addMoneyImage} alt="Add Money" />
      </ImageSection>
      <FormSection>
        <SkipButton onClick={handleSkip}>Skip for now »</SkipButton>
        <FormContent>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
          <Title>Add an amount to your Wallet</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="number"
              value={amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              required
            />
            <QuickAmountContainer>
              {[100, 200, 300, 400, 500].map((value) => (
                <QuickAmountButton
                  key={value}
                  type="button"
                  onClick={() => handleQuickAmount(value)}
                >
                  {value}
                </QuickAmountButton>
              ))}
            </QuickAmountContainer>
            <Button type="submit">Add Money</Button>
          </form>
        </FormContent>
      </FormSection>
    </Container>
  );
};

export default AddMoney;