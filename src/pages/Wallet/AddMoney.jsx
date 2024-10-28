import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import addMoneyImage from '../../assets/add-money-image.png';
import chiragLogo from '../../assets/chirag-logo-dark.png';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import WarningIcon from '@mui/icons-material/Warning';
import { createCashfreeOrder,verifyCashfreePayment } from '../../services/commonService';

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
  
  @media (max-width: 768px) {
    display: none;
  }
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
  padding: 40px;
  position: relative;
`;

const FormContent = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
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

  &:focus {
    outline: none;
    border-color: #383838;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const QuickAmountContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const QuickAmountButton = styled.button`
  background-color: ${props => props.selected ? '#383838' : 'transparent'};
  color: ${props => props.selected ? 'white' : '#383838'};
  border: 1px solid #383838;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.selected ? '#383838' : '#f5f5f5'};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #383838;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #383838;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: -15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LoadingSpinner = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    color: white;
  }
`;

const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000];
const MIN_AMOUNT = 100;
const MAX_AMOUNT = 50000;

const AddMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setError('');
    setSelectedQuickAmount(null);
    setAmount(value);
  };

  const handleQuickAmount = (value) => {
    setError('');
    setSelectedQuickAmount(value);
    setAmount(value.toString());
  };

  const validateAmount = () => {
    const numAmount = Number(amount);
    if (!amount) {
      setError('Please enter an amount');
      return false;
    }
    if (isNaN(numAmount)) {
      setError('Please enter a valid amount');
      return false;
    }
    if (numAmount < MIN_AMOUNT) {
      setError(`Minimum amount is ₹${MIN_AMOUNT}`);
      return false;
    }
    if (numAmount > MAX_AMOUNT) {
      setError(`Maximum amount is ₹${MAX_AMOUNT}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAmount()) return;

    try {
      setLoading(true);
      setError('');

      // Create order
      const orderResponse = await createCashfreeOrder({ amount: Number(amount) });
      const order = orderResponse.data;

      // Initialize Cashfree
      const cashfree = new window.Cashfree({
        mode: 'sandbox', // or 'production'
        orderToken: order.order_token,
        onSuccess: async (data) => {
          try {
            await verifyCashfreePayment({
              orderId: data.orderId,
              orderAmount: order.order_amount,
              referenceId: data.referenceId,
              txStatus: data.txStatus
            });
            toast.success('Payment successful!');
            navigate('/wallet');
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        onFailure: (data) => {
          console.error('Payment failed:', data);
          toast.error('Payment failed. Please try again.');
        },
        onClose: () => {
          toast.info('Payment window closed');
        }
      });

      cashfree.redirect();
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError(error.response?.data?.message || 'Invalid Api Key or Secret Key');
      toast.error('Failed to initiate payment process (Invalid Api Key or Secret Key). Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <ImageSection>
          <Image src={addMoneyImage} alt="Add Money" />
        </ImageSection>
        <FormSection>
          <BackButton onClick={() => navigate('/wallet')}>← Back to Wallet</BackButton>
          <FormContent>
            <Logo src={chiragLogo} alt="CHIRAG Logo" />
            <Title>Add money to your wallet</Title>
            
            <form onSubmit={handleSubmit}>
              <Input
                type="number"
                value={amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                disabled={loading}
              />
              
              {error && (
                <ErrorMessage>
                  <WarningIcon fontSize="small" />
                  {error}
                </ErrorMessage>
              )}

              <QuickAmountContainer>
                {QUICK_AMOUNTS.map((value) => (
                  <QuickAmountButton
                    key={value}
                    type="button"
                    onClick={() => handleQuickAmount(value)}
                    selected={selectedQuickAmount === value}
                    disabled={loading}
                  >
                    ₹{value}
                  </QuickAmountButton>
                ))}
              </QuickAmountContainer>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoadingSpinner size={20} />
                    Processing...
                  </>
                ) : (
                  `Add ₹${amount || '0'}`
                )}
              </Button>
            </form>

            <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
              <p>• Minimum amount: ₹{MIN_AMOUNT}</p>
              <p>• Maximum amount: ₹{MAX_AMOUNT}</p>
              <p>• Transaction charges: 0%</p>
            </div>
          </FormContent>
        </FormSection>
        </ContentWrapper>


</Container>
);
};

export default AddMoney;