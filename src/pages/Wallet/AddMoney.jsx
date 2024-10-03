import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import addMoneyImage from '../../assets/add-money-image.png';
import chiragLogo from '../../assets/chirag-logo-dark.png';
import { createCashfreeOrder, verifyCashfreePayment } from '../../services/commonService';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  // max-width: 1200px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  padding: 40px;
  position: relative;
`;

const FormContent = styled.div`
  width: 100%;
  max-width: 400px;
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
  top: 20px;
  right: 20px;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderResponse = await createCashfreeOrder({ amount: parseFloat(amount) });
      const order = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_CASHFREE_APP_ID,
        order_id: order.order_id,
        order_amount: order.order_amount,
        order_currency: order.order_currency,
        customer_details: order.customer_details,
        order_meta: order.order_meta,
        order_expiry_time: order.order_expiry_time,
        order_status: order.order_status,
        order_note: 'Add money to wallet',
        handler: async function(response) {
          try {
            await verifyCashfreePayment({
              orderId: response.orderId,
              orderAmount: order.order_amount,
              referenceId: response.referenceId,
              paymentStatus: response.paymentStatus
            });
            alert('Payment successful!');
            navigate('/wallet');
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
      };

      const cashfree = new window.Cashfree(options);
      cashfree.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/wallet');
  };

  return (
    <Container>
      <ContentWrapper>
        <ImageSection>
          <Image src={addMoneyImage} alt="Add Money" />
        </ImageSection>
        <FormSection>
          <SkipButton onClick={handleBack}>Back »</SkipButton>
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
      </ContentWrapper>
    </Container>
  );
};

export default AddMoney;