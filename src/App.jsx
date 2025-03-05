import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import NotFound from './components/404';
import VerificationPending from './components/VerificationPending';
import { initializeSocket, disconnectSocket } from './services/socketService';

import LanguageSelection from './pages/auth/LanguageSelection';
import Login from './pages/auth/Login';
import OTP from './pages/auth/OTP';
import Register from './pages/auth/register';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import ServiceHistory from './pages/ServiceHistory';
import Calendar from './pages/Calendar';
import ManageRunner from './pages/ManageRunner';
import Reports from './pages/Reports';
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Profile from './pages/Profile';
import Wallet from './pages/Wallet';
import Notifications from './pages/Notifications';
import EditRunner from './pages/ManageRunner/edit-runner';
import ConfirmedBookingDetails from './pages/ServiceHistory/ConfirmedBookingDetails';
import RunnerCanceledBookingDetail from './pages/Calendar/RunnerCanceledBookingDetail';
import RunnerReachedBookingDetail from './pages/Calendar/RunnerReachedBookingDetail';
import AssignRunnerDetails from './pages/Bookings/AssignRunnerDetails';
import GlobalStyle from './GlobalStyle';
import AddMoney from './pages/Wallet/AddMoney';
import Recommedations from './pages/Recomendations';
import PricingAndPolicies from './pages/PricingAndPolicies';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const PageContent = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: #121212;
    color: white;
  }
  .Toastify__close-button {
    color: white;
  }
  .Toastify__progress-bar {
    background-color: #f0f0f0;
  }
`;

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const VerificationCheck = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isContactPage = window.location.pathname === '/contact-us';
  const isTermsPage = window.location.pathname === '/terms-and-conditions';
  const isPrivacyPage = window.location.pathname === '/privacy-policy';
  const isPricingPage = window.location.pathname === '/pricing-policy';

  if (!user?.vendorDroneVerified && !isContactPage && !isTermsPage && !isPrivacyPage && !isPricingPage) {
    return <VerificationPending />;
  }
  return children;
};

function App() {

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      // Only initialize socket if user is logged in
      const socket = initializeSocket('vendor');
      
      return () => {
        disconnectSocket();
      };
    }
  }, []); 

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/register" element={<Register />} />
          
          {/* Unprotected routes */}
          <Route path="/contact-us" element={
            <MainContent>
              <PageContent>
                <ContactUs />
              </PageContent>
            </MainContent>
          } />
          <Route path="/terms-and-conditions" element={
            <MainContent>
              <PageContent>
                <TermsAndConditions />
              </PageContent>
            </MainContent>
          } />
          <Route path="/privacy-policy" element={
            <MainContent>
              <PageContent>
                <PrivacyPolicy />
              </PageContent>
            </MainContent>
          } />
          <Route path="/pricing-policy" element={
            <MainContent>
              <PageContent>
                <PricingAndPolicies />
              </PageContent>
            </MainContent>
          } />
          
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Sidebar />
                <MainContent>
                  <Topbar />
                  <PageContent>
                    <Routes>
                      <Route path="/home" element={<VerificationCheck><Home /></VerificationCheck>} />
                      <Route path="/assign-runner/:id" element={<VerificationCheck><AssignRunnerDetails /></VerificationCheck>} />
                      <Route path="/profile" element={<VerificationCheck><Profile /></VerificationCheck>} />
                      <Route path="/bookings" element={<VerificationCheck><Bookings /></VerificationCheck>} />
                      <Route path="/recommendation" element={<VerificationCheck><Recommedations /></VerificationCheck>} />
                      <Route path="/service-history" element={<VerificationCheck><ServiceHistory /></VerificationCheck>} />
                      <Route path="/calendar" element={<VerificationCheck><Calendar /></VerificationCheck>} />
                      <Route path="/manage-runner" element={<VerificationCheck><ManageRunner /></VerificationCheck>} />
                      <Route path="/reports" element={<VerificationCheck><Reports /></VerificationCheck>} />
                      <Route path="/notification" element={<VerificationCheck><Notifications /></VerificationCheck>} />
                      <Route path="/wallet" element={<VerificationCheck><Wallet /></VerificationCheck>} />
                      <Route path="/edit-runner/:id/:isView?" element={<VerificationCheck><EditRunner /></VerificationCheck>} />
                      <Route path="/confirm-booking/:id" element={<VerificationCheck><ConfirmedBookingDetails /></VerificationCheck>} />
                      <Route path="/booking-details/:id" element={<VerificationCheck><ConfirmedBookingDetails /></VerificationCheck>} />
                      <Route path="/completed-booking/:id" element={<VerificationCheck><ConfirmedBookingDetails /></VerificationCheck>} />
                      <Route path="/calendar-confirm-booking-details/:id" element={<VerificationCheck><RunnerReachedBookingDetail /></VerificationCheck>} />
                      <Route path="/calendar-cancelled-booking-details/:id" element={<VerificationCheck><RunnerCanceledBookingDetail /></VerificationCheck>} />
                      <Route path="/add-money" element={<VerificationCheck><AddMoney /></VerificationCheck>} />
                      <Route path="/add-money/verify" element={<VerificationCheck><AddMoney /></VerificationCheck>} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </PageContent>
                </MainContent>
              </ProtectedRoute>
            }
          />
        </Routes>
        <StyledToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppContainer>
    </Router>
  );
}

export default App;