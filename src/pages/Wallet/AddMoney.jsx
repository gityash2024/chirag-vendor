import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import addMoneyImage from '../../assets/add-money-image.png';
import chiragLogo from '../../assets/chirag-logo-dark.png';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import WarningIcon from '@mui/icons-material/Warning';
import { createCashfreeOrder, verifyCashfreePayment } from '../../services/commonService';
import { useLocation } from 'react-router-dom';

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
  max-width: 800px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 150px;
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
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [error, setError] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
  
  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('URL Search Params:', window.location.search);
    
    const verifyPayment = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const transactionId = searchParams.get('transactionId') || localStorage.getItem('lastTransactionId');
      const isProcessed = localStorage.getItem('paymentProcessed');
      const storedAmount = localStorage.getItem('lastPaymentAmount');
  
      console.log('Payment verification params:', {
        transactionId,
        storedAmount,
        isProcessed,
        searchParams: Object.fromEntries(searchParams.entries()),
        fullUrl: window.location.href
      });
  
      if (transactionId && !isProcessed) {
        try {
          setVerifyingPayment(true);
          setError('');
  
          localStorage.setItem('paymentProcessed', 'true');
  
          console.log('Starting payment verification for:', { transactionId });
          
          const response = await verifyCashfreePayment({ transactionId });
          
          console.log('Verification API response:', response);
  
          if (response?.data?.success) {
            localStorage.removeItem('lastPaymentAmount');
            localStorage.removeItem('lastTransactionId');
            localStorage.removeItem('paymentProcessed');
            
            toast.success('Payment successful! Your wallet has been updated.', {
              toastId: transactionId
            });
            
            navigate('/wallet', { 
              replace: true,
              state: { 
                paymentSuccess: true,
                amount: response.data.transaction?.amount || storedAmount,
                fromPayment: true
              }
            });
          } else {
            localStorage.removeItem('paymentProcessed');
            
            setError('Payment verification failed');
            toast.error('Payment verification failed. Please contact support.', {
              toastId: 'payment-error'
            });
            console.error('Verification failed:', response?.data);
          }
        } catch (error) {
          localStorage.removeItem('paymentProcessed');
          
          console.error('Payment verification error:', {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
          });
          
          const errorMessage = error.response?.data?.message || 'Payment verification failed';
          setError(errorMessage);
          toast.error(errorMessage, {
            toastId: 'payment-error'
          });
  
          localStorage.removeItem('lastPaymentAmount');
          localStorage.removeItem('lastTransactionId');
        } finally {
          setVerifyingPayment(false);
        }
      }
    };
  
    verifyPayment();
  }, [location.pathname, location.search, navigate]);

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
      
      localStorage.removeItem('paymentProcessed');
      localStorage.removeItem('lastPaymentAmount');
      localStorage.removeItem('lastTransactionId');

      const orderResponse = await createCashfreeOrder({ amount: Number(amount) });
      
      console.log('PhonePe order created:', orderResponse.data);

      if (!orderResponse.data?.paymentUrl) {
        throw new Error('Invalid order response');
      }

      localStorage.setItem('lastPaymentAmount', amount);
      localStorage.setItem('lastTransactionId', orderResponse.data.transactionId);

      window.location.href = orderResponse.data.paymentUrl;

    } catch (error) {
      console.error('Payment Error:', error);
      
      localStorage.removeItem('lastPaymentAmount');
      localStorage.removeItem('lastTransactionId');
      localStorage.removeItem('paymentProcessed');
      
      const errorMsg = error.response?.data?.message || 'Payment initialization failed';
      setError(errorMsg);
      toast.error(errorMsg, {
        toastId: 'payment-init-error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (verifyingPayment) {
    return (
      <Container>
        <ContentWrapper>
          <FormSection>
            <FormContent>
              <Logo src={chiragLogo} alt="CHIRAG Logo" />
              <div style={{ textAlign: 'center' }}>
                <LoadingSpinner size={40} />
                <p>Verifying payment...</p>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                  Please wait while we confirm your payment
                </p>
              </div>
            </FormContent>
          </FormSection>
        </ContentWrapper>
      </Container>
    );
  }

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
              <p style={{marginTop:"6px"}}>• Minimum amount: ₹{MIN_AMOUNT}</p>
              <p style={{marginTop:"6px"}}>• Maximum amount: ₹{MAX_AMOUNT}</p>
              <p style={{marginTop:"6px"}}>• Transaction charges: 0%</p>
              <p style={{textAlign:"center", marginTop:"6px"}}> <a href='https://chiragvendor.com/pricing-policy' target="_blank">Pricing & Policy:</a></p>
            </div>
          </FormContent>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

export default AddMoney;