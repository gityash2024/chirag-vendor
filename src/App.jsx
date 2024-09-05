import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Loader from './components/Loader';

import LanguageSelection from './pages/auth/LanguageSelection';
import Login from './pages/auth/Login';
import OTP from './pages/auth/OTP';
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
import ClosedBookingDetails from './pages/ServiceHistory/ClosedBookingDetails';
import RunnerCanceledBookingDetail from './pages/Calendar/RunnerCanceledBookingDetail';
import RunnerReachedBookingDetail from './pages/Calendar/RunnerReachedBookingDetail';
import Register from './pages/auth/register';
import AssignRunnerDetails from './pages/Bookings/AssignRunnerDetails';
import GlobalStyle from './GlobalStyle';
import AddMoney from './pages/Wallet/AddMoney';
import Recommedations from './pages/Recomendations';

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

function App() {
  return (
    <Router>
            <GlobalStyle /> 

      <AppContainer>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-money" element={<AddMoney />} />

          <Route
            path="*"
            element={
              <>
                <Sidebar />
                <MainContent>
                  <Topbar />
                  <PageContent>
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/assign-runner/:id" element={<AssignRunnerDetails />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/bookings" element={<Bookings />} />
                      <Route path="/recommendation" element={<Recommedations />} />
                      <Route path="/service-history" element={<ServiceHistory />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/manage-runner" element={<ManageRunner />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/contact-us" element={<ContactUs />} />
                      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/notification" element={<Notifications />} />
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/edit-runner/:id/:isView?" element={<EditRunner />} />
                      <Route path="/closed-booking/:id" element={<ClosedBookingDetails />} />
                      <Route path="/confirm-booking/:id" element={<ConfirmedBookingDetails />} />
                      <Route path="/completed-booking/:id" element={<ConfirmedBookingDetails />} />
                      <Route path="/calendar-confirm-booking-details/:id" element={<RunnerReachedBookingDetail />} />
                      <Route path="/calendar-cancelled-booking-details/:id" element={<RunnerCanceledBookingDetail />} />
                    </Routes>
                  </PageContent>
                </MainContent>
              </>
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
        <Loader />
      </AppContainer>
    </Router>
  );
}

export default App;
// import { toast } from 'react-toastify';

// // In your component
// const handleSomeAction = () => {
//   // ... your logic
//   toast.success("Action completed successfully!");
//   // or
//   toast.error("An error occurred");
//   // or
//   toast.info("Some information");
// };