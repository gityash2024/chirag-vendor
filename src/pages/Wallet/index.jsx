import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import successWithdrawalCheck from '../../assets/check-wallet.svg';
import CloseIcon from '@material-ui/icons/Close';
import { getWalletBalance, getTransactionHistory, requestWithdrawal } from '../../services/commonService';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  background-color: #F4F4F4;
  width: 90%;
  margin: 0 auto;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
  margin-bottom: 20px;
`;

const EarningsOverview = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const EarningItem = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;

const EarningValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #121212;
`;

const EarningLabel = styled.div`
  font-size: 14px;
  color: #8D98A4;
`;

const WithdrawButton = styled.button`
  width: 20%;
  padding: 10px;
  background-color: #121212;
  border-radius: 4px;
  color: #FFFFFF;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 20px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#121212' : 'transparent'};
  color: ${props => props.active ? '#121212' : '#8D98A4'};
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
`;

const TransactionItem = styled.div`
  background-color: #FFFFFF;
  padding: 15px;
  border-radius: 10px;
`;

const TransactionDetails = styled.div`
  font-size: 14px;
  color: #8D98A4;
  margin: 5px 0;
`;

const TransactionAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 4px;
  width: 300px;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  color: #121212;
`;

const ModalInput = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #121212;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: #8D98A4;
  margin-top: 20px;
`;

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showRequestSentModal, setShowRequestSentModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchWalletBalance();
    fetchTransactionHistory();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const response = await getWalletBalance();
      setWalletBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await getTransactionHistory();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };
  const handleAddMoney = () => {
    navigate('/add-money');
  };

  const handleWithdrawSubmit = async () => {
    try {
      await requestWithdrawal({ amount: parseFloat(withdrawAmount) });
      setShowWithdrawModal(false);
      setShowRequestSentModal(true);
      setTimeout(() => setShowRequestSentModal(false), 3000);
      fetchWalletBalance();
      fetchTransactionHistory();
    } catch (error) {
      console.error('Error requesting withdrawal:', error);
    }
  };

  return (
    <Container>
      <Header>My Earnings</Header>
      <EarningsOverview>
        <EarningItem>
          <EarningValue>Rs. {walletBalance}</EarningValue>
          <EarningLabel>Available Balance</EarningLabel>
        </EarningItem>
      </EarningsOverview>
      <WithdrawButton onClick={handleWithdraw}>Withdraw Money</WithdrawButton>
      <WithdrawButton onClick={handleAddMoney}>Add Money</WithdrawButton>
      <Tabs>
        <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>History</Tab>
        <Tab active={activeTab === 'withdrawals'} onClick={() => setActiveTab('withdrawals')}>Withdrawals</Tab>
      </Tabs>
      <TransactionList>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <TransactionItem key={index}>
              <TransactionDetails>{transaction.description}</TransactionDetails>
              <TransactionAmount>
                <div>Amount: ₹{transaction.amount}</div>
                <div>{new Date(transaction.date).toLocaleDateString()}</div>
              </TransactionAmount>
            </TransactionItem>
          ))
        ) : (
          <NoDataMessage>No {activeTab === 'history' ? 'transaction history' : 'withdrawals'} found</NoDataMessage>
        )}
      </TransactionList>
      {showWithdrawModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowWithdrawModal(false)}>
              <CloseIcon />
            </CloseButton>
            <ModalTitle>Enter Amount</ModalTitle>
            <ModalInput
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
            <ModalButton onClick={handleWithdrawSubmit}>Submit</ModalButton>
          </ModalContent>
        </Modal>
      )}
      {showRequestSentModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowRequestSentModal(false)}>
              <CloseIcon />
            </CloseButton>
            <SuccessIcon src={successWithdrawalCheck} alt="Success" />
            <ModalTitle>Request sent</ModalTitle>
            <p>Request sent to admin, you will get an update soon</p>
          </SuccessModal>
        </Modal>
      )}
    </Container>
  );
};

export default Wallet;