import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import successIcon from "../../assets/check-wallet.png";
import { toast } from "react-toastify";
import {
  getWalletBalance,
  requestWithdrawal,
  addBankAccount,
  listCommissions,
} from "../../services/commonService";
import { useTranslation } from "../../TranslationContext";

const Container = styled.div`
  padding: 20px;
  font-family: "Public Sans";
  background-color: #f4f4f4;
  width: 90%;
  margin: 0 auto;
  border-radius: 8px;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #383838;
  margin-bottom: 20px;
`;

const EarningsOverview = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const EarningItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EarningValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #383838;
  margin-bottom: 8px;
`;

const EarningLabel = styled.div`
  font-size: 14px;
  color: #8d98a4;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.primary
      ? `
    background-color: #383838;
    color: white;
    border: none;
  `
      : `
    background-color: white;
    color: #383838;
    border: 1px solid #383838;
  `}

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: ${(props) => (props.active ? "#383838" : "#8D98A4")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  border-bottom: ${(props) => (props.active ? "2px solid #383838" : "none")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #383838;
  }
`;

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const TransactionItem = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TransactionTitle = styled.div`
  font-weight: 600;
  color: #383838;
`;

const TransactionDate = styled.div`
  font-size: 14px;
  color: #8d98a4;
`;

const TransactionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TransactionDescription = styled.div`
  font-size: 14px;
  color: #383838;
`;

const TransactionAmount = styled.div`
  font-weight: 600;
  color: ${(props) => (props.type === "credit" ? "#41B079" : "#F44336")};

  &::before {
    content: "${(props) => (props.type === "credit" ? "+" : "-")}";
  }
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #383838;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #383838;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #383838;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #383838;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 14px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const NoDataMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #8d98a4;
  font-size: 16px;
`;

const BankAccountList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const BankAccount = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.selected ? "#F5F5F5" : "white")};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const BankAccountDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BankName = styled.div`
  font-weight: 600;
  color: #383838;
`;

const AccountNumber = styled.div`
  font-size: 14px;
  color: #8d98a4;
`;

const DefaultBadge = styled.span`
  background-color: #e3f2fd;
  color: #2196f3;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
  padding: 40px;
  max-width: 400px;
`;

const SuccessIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
`;

const LoadingSpinner = styled(CircularProgress)`
  &.MuiCircularProgress-root {
    color: #383838;
  }
`;

const CommissionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommissionItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
`;

const CommissionDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommissionName = styled.div`
  font-weight: 600;
  color: #383838;
`;

const CommissionPercentage = styled.div`
  font-size: 14px;
  color: #8d98a4;
`;

const Wallet = () => {
  const { translate } = useTranslation();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("transactions");
  const [loading, setLoading] = useState(true);
  const [walletData, setWalletData] = useState({
    balance: 0,
    transactions: [],
    bankAccounts: [],
  });

  const [commissions, setCommissions] = useState([]);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [error, setError] = useState("");

  const [newBankAccount, setNewBankAccount] = useState({
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    bankName: "",
    isDefault: false,
  });

  const location = useLocation();

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      const response = await getWalletBalance();
      setWalletData(response.data);

      if (location.state?.paymentSuccess) {
        toast.success(`₹${location.state.amount} added successfully to your wallet!`);
        window.history.replaceState({}, document.title);
      }

    } catch (error) {
      toast.error('Failed to fetch wallet data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  useEffect(() => {
    const needsRefresh = localStorage.getItem('walletNeedsRefresh');
    if (needsRefresh) {
      localStorage.removeItem('walletNeedsRefresh');
      fetchWalletData();
    }
  }, []);

  useEffect(() => {
    if (activeTab === "commissions") {
      fetchCommissions();
    }
  }, [activeTab]);

  const fetchCommissions = async () => {
    try {
      const response = await listCommissions();
      setCommissions(response.data);
    } catch (error) {
      toast.error("Failed to fetch commissions");
    }
  };

  const handleAddBankAccount = async (e) => {
    e.preventDefault();

    if (newBankAccount.accountNumber !== newBankAccount.confirmAccountNumber) {
      setError("Account numbers do not match");
      return;
    }

    try {
      setLoading(true);
      await addBankAccount(newBankAccount);
      await fetchWalletData();
      setShowAddBankModal(false);
      toast.success("Bank account added successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add bank account"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (e) => {
    e.preventDefault();

    if (!selectedBankAccount) {
      setError("Please select a bank account");
      return;
    }

    if (parseFloat(withdrawalAmount) > walletData.balance) {
      setError("Insufficient balance");
      return;
    }

    try {
      setLoading(true);
      await requestWithdrawal({
        amount: parseFloat(withdrawalAmount),
        bankAccountId: selectedBankAccount,
      });

      setShowWithdrawModal(false);
      setShowSuccessModal(true);
      await fetchWalletData();

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to process withdrawal"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddMoney = () => {
    navigate("/add-money");
  };

  if (loading) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <Header>{translate('wallet.title')}</Header>
      <EarningsOverview>
        <EarningItem>
          <EarningValue>₹ {walletData.balance.toFixed(2)}</EarningValue>
          <EarningLabel>{translate('wallet.availableBalance')}</EarningLabel>
        </EarningItem>
        <EarningItem>
          <EarningValue>
            ₹ {walletData.transactions
              .filter((t) => t.type === "credit" && t.status === "completed")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}
          </EarningValue>
          <EarningLabel>{translate('wallet.totalAdded')}</EarningLabel>
        </EarningItem>
        <EarningItem>
          <EarningValue>
            ₹ {walletData.transactions
              .filter((t) => t.type === "withdrawal" && t.status === "completed")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}
          </EarningValue>
          <EarningLabel>{translate('wallet.totalWithdrawn')}</EarningLabel>
        </EarningItem>
      </EarningsOverview>
      <ButtonGroup>
        <Button primary onClick={handleAddMoney}>{translate('wallet.addMoney')}</Button>
        <Button onClick={() => setShowWithdrawModal(true)}>{translate('wallet.withdraw')}</Button>
        <Button onClick={() => setShowAddBankModal(true)}>{translate('wallet.addBankAccount')}</Button>
        <Button onClick={() => setActiveTab("commissions")}>{translate('wallet.commissions')}</Button>
      </ButtonGroup>
      <Tabs>
        <Tab active={activeTab === "transactions"} onClick={() => setActiveTab("transactions")}>
          {translate('wallet.transactions')}
        </Tab>
        <Tab active={activeTab === "bankAccounts"} onClick={() => setActiveTab("bankAccounts")}>
          {translate('wallet.bankAccounts')}
        </Tab>
        <Tab active={activeTab === "commissions"} onClick={() => setActiveTab("commissions")}>
          {translate('wallet.commissions')}
        </Tab>
      </Tabs>
      {activeTab === "transactions" ? (
        <TransactionList>
          {walletData.transactions.length > 0 ? (
            walletData.transactions.map((transaction, index) => (
              <TransactionItem key={index}>
                <TransactionHeader>
                  <TransactionTitle>
                    {transaction.type === "credit"
                      ? translate('wallet.moneyAdded')
                      : transaction.type === "withdrawal"
                      ? translate('wallet.withdrawal')
                      : transaction.type === "commission"
                      ? translate('wallet.commissionDeducted')
                      : translate('wallet.transaction')}
                  </TransactionTitle>
                  <TransactionDate>{formatDate(transaction.date)}</TransactionDate>
                </TransactionHeader>
                <TransactionDetails>
                  <TransactionDescription>{transaction.description}</TransactionDescription>
                  <TransactionAmount type={transaction.type}>₹ {transaction.amount.toFixed(2)}</TransactionAmount>
                </TransactionDetails>
                {transaction.status !== "completed" && (
                  <div style={{ marginTop: "10px", color: "#FFA000", fontSize: "14px" }}>
                    {translate('wallet.status')}: {transaction.status}
                  </div>
                )}
              </TransactionItem>
            ))
          ) : (
            <NoDataMessage>{translate('wallet.noTransactions')}</NoDataMessage>
          )}
        </TransactionList>
      ) : activeTab === "bankAccounts" ? (
        <BankAccountList>
          {walletData.bankAccounts.length > 0 ? (
            walletData.bankAccounts.map((account, index) => (
              <BankAccount key={index}>
                <BankAccountDetails>
                  <div>
                    <BankName>{account.bankName}</BankName>
                    <AccountNumber>{account.accountNumber.replace(/\d(?=\d{4})/g, "*")}</AccountNumber>
                  </div>
                  {account.isDefault && <DefaultBadge>{translate('wallet.defaultAccount')}</DefaultBadge>}
                </BankAccountDetails>
              </BankAccount>
            ))
          ) : (
            <NoDataMessage>{translate('wallet.noBankAccounts')}</NoDataMessage>
          )}
        </BankAccountList>
      ) : (
        <CommissionList>
          {commissions.map((commission, index) => (
            <CommissionItem key={index}>
              <CommissionDetails>
                <CommissionName>{commission.cropName}</CommissionName>
                <CommissionPercentage>{commission.commissionPercentage}%</CommissionPercentage>
              </CommissionDetails>
            </CommissionItem>
          ))}
          {commissions.length === 0 && (
            <NoDataMessage>{translate('wallet.noCommissions')}</NoDataMessage>
          )}
        </CommissionList>
      )}
      {showAddBankModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{translate('wallet.addBankAccountTitle')}</ModalTitle>
              <CloseButton onClick={() => setShowAddBankModal(false)}>
                <CloseIcon />
              </CloseButton>
            </ModalHeader>
            <Form onSubmit={handleAddBankAccount}>
              <FormGroup>
                <Label>{translate('wallet.accountNumber')}</Label>
                <Input
                  type="text"
                  value={newBankAccount.accountNumber}
                  onChange={(e) => setNewBankAccount({ ...newBankAccount, accountNumber: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>{translate('wallet.confirmAccountNumber')}</Label>
                <Input
                  type="text"
                  value={newBankAccount.confirmAccountNumber}
                  onChange={(e) => setNewBankAccount({ ...newBankAccount, confirmAccountNumber: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>{translate('wallet.ifscCode')}</Label>
                <Input
                  type="text"
                  value={newBankAccount.ifscCode}
                  onChange={(e) => setNewBankAccount({ ...newBankAccount, ifscCode: e.target.value.toUpperCase() })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>{translate('wallet.accountHolderName')}</Label>
                <Input
                  type="text"
                  value={newBankAccount.accountHolderName}
                  onChange={(e) => setNewBankAccount({ ...newBankAccount, accountHolderName: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>{translate('wallet.bankName')}</Label>
                <Input
                  type="text"
                  value={newBankAccount.bankName}
                  onChange={(e) => setNewBankAccount({ ...newBankAccount, bankName: e.target.value })}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    checked={newBankAccount.isDefault}
                    onChange={(e) => setNewBankAccount({ ...newBankAccount, isDefault: e.target.checked })}
                  />
                  {translate('wallet.setDefaultAccount')}
                </Label>
              </FormGroup>
              {error && (
                <ErrorMessage>
                  <WarningIcon fontSize="small" />
                  {error}
                </ErrorMessage>
              )}
              <Button primary type="submit" disabled={loading} style={{ marginTop: "20px" }}>
                {loading ? <LoadingSpinner size={20} /> : translate('wallet.addBankAccount')}
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
      {showWithdrawModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{translate('wallet.withdrawMoneyTitle')}</ModalTitle>
              <CloseButton onClick={() => setShowWithdrawModal(false)}>
                <CloseIcon />
              </CloseButton>
            </ModalHeader>
            <Form onSubmit={handleWithdrawal}>
              <FormGroup>
                <Label>{translate('wallet.amount')}</Label>
                <Input
                  type="number"
                  min="1"
                  max={walletData.balance}
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  required
                />
                <div style={{ fontSize: "12px", color: "#8D98A4", marginTop: "5px" }}>
                  {translate('wallet.availableBalanceLabel')}: ₹{walletData.balance.toFixed(2)}
                </div>
              </FormGroup>
              <FormGroup>
                <Label>{translate('wallet.selectBankAccount')}</Label>
                <Select
                  value={selectedBankAccount}
                  onChange={(e) => setSelectedBankAccount(e.target.value)}
                  required
                >
                  <option value="">{translate('wallet.selectAccount')}</option>
                  {walletData.bankAccounts.map((account, index) => (
                    <option key={index} value={account._id}>
                      {account.bankName} - {account.accountNumber.slice(-4)}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              {error && (
                <ErrorMessage>
                  <WarningIcon fontSize="small" />
                  {error}
                </ErrorMessage>
              )}
              <Button primary type="submit" disabled={loading} style={{ marginTop: "20px" }}>
                {loading ? <LoadingSpinner size={20} /> : translate('wallet.requestWithdrawal')}
              </Button>
            </Form>
          </ModalContent>
        </Modal>
      )}
      {showSuccessModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowSuccessModal(false)}>
              <CloseIcon />
            </CloseButton>
            <SuccessIcon src={successIcon} alt="Success" />
            <ModalTitle>{translate('wallet.withdrawalRequested')}</ModalTitle>
            <p style={{ color: "#8D98A4", marginTop: "10px" }}>
              {translate('wallet.withdrawalSuccess')}
            </p>
          </SuccessModal>
        </Modal>
      )}
    </Container>
  );
};

export default Wallet;