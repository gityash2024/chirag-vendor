import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import OpacityIcon from '@mui/icons-material/Opacity';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import successWithdrawalCheck from '../../assets/check-wallet.svg';
import { getAllBookingsList, assignBookingToRunner, getAllRunnersList } from '../../services/commonService';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BookingTitle = styled.h3`
  font-family: Public Sans;
  font-size: 24px;
  font-weight: 600;
  line-height: 37.6px;
  text-align: left;
  color: rgba(18, 18, 18, 1);
  margin-bottom: 10px;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: rgba(35, 33, 42, 1);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Public Sans';
  line-height: 32.9px;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

const ChevronRightIcon = styled.span`
  margin-left: 5px;
  display: inline-block;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const BookingId = styled.h3`
  font-size: 18px;
  color: rgba(18, 18, 18, 1);
  margin-bottom: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const BookingDetailsContainer = styled.div`
  flex: 7;
`;

const BookingDetailsCard = styled.div`
  background: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PaymentSummary = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  height: 220px;
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  flex: 3;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DetailLabel = styled.span`
  font-weight: 500;
  color: #666;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const DetailValue = styled.span`
  color: #333;
`;

const HorizontalLine = styled.hr`
  border: none;
  border-top: 1px dotted #E0E0E0;
  margin: 15px 0;
`;

const ActionButton = styled.button`
  width: 200px;
  padding: 10px;
  background-color: #000000;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin: 15px auto;
  display: block;
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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const RunnerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #E0E0E0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #F9F9F9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #E0E0E0;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
  width: 300px;
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;

const PaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AssignRunnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRunnerModal, setShowRunnerModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRunner, setSelectedRunner] = useState(null);
  const [booking, setBooking] = useState(null);
  const [runners, setRunners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookingDetails();
    fetchRunners();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const response = await getAllBookingsList();
      const foundBooking = response.data.find(b => b._id === id);
      if (foundBooking) {
        setBooking(foundBooking);
      } else {
        toast.error('Booking not found');
      }
    } catch (error) {
      toast.error('Failed to fetch booking details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRunners = async () => {
    try {
      const response = await getAllRunnersList();
      setRunners(response.data);
    } catch (error) {
      toast.error('Failed to fetch runners');
    }
  };

  const handleAssignRunner = () => {
    setShowRunnerModal(true);
  };

  const handleRunnerSelect = async (runner) => {
    setSelectedRunner(runner);
    try {
      await assignBookingToRunner({ bookingId: booking._id, runnerId: runner._id });
      setShowRunnerModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/bookings');
      }, 2000);
    } catch (error) {
      toast.error('Failed to assign runner');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!booking) {
    return <p>Booking not found</p>;
  }

  return (
    <Container>
      <Header>
        <TitleContainer>
          <BackButton onClick={() => navigate('/bookings')}>
            <ArrowBackIcon />
          </BackButton>
          <Title>Assign Runner</Title>
        </TitleContainer>
        <ViewAllButton onClick={() => navigate('/bookings')}>
          View all <ChevronRightIcon />
        </ViewAllButton>
      </Header>
      <BookingTitle>Bookings</BookingTitle>
      <FlexContainer>
        <BookingDetailsContainer>
          <BookingDetailsCard>
            <BookingId>#{booking._id}</BookingId>
            <DetailRow>
              <DetailLabel><LocationOnIcon /></DetailLabel>
              <DetailValue>{booking.farmLocation}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel><CalendarTodayIcon /></DetailLabel>
              <DetailValue>{new Date(booking.date).toLocaleDateString()}</DetailValue>
              <DetailLabel style={{ marginLeft: '20px' }}><AccessTimeIcon /></DetailLabel>
              <DetailValue>{booking.time}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Booking Name:</DetailLabel>
              <DetailValue>{booking.farmerName}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Contact number:</DetailLabel>
              <DetailValue>{booking.contactNumber}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Farm Area:</DetailLabel>
              <DetailValue>{booking.farmArea} Acres</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>Crop:</DetailLabel>
              <DetailValue>{booking.cropName}</DetailValue>
            </DetailRow>
            <HorizontalLine />
            <DetailRow>
              <DetailLabel>{booking.weather}</DetailLabel>
            </DetailRow>
            <DetailRow>
              <DetailLabel><OpacityIcon /> {booking.weather}</DetailLabel>
            </DetailRow>
            <ActionButton onClick={handleAssignRunner}>Assign Runner</ActionButton>
          </BookingDetailsCard>
        </BookingDetailsContainer>
        <PaymentSummary>
          <h3>Payment Summary</h3>
          <DetailRow>
            <DetailLabel>Estimated Total:</DetailLabel>
            <DetailValue>₹{booking.quotePrice || 0}</DetailValue>
          </DetailRow>
          <HorizontalLine />
          <PaymentRow>
            <DetailLabel>Estimated Total</DetailLabel>
            <DetailValue>₹{booking.quotePrice || 0}</DetailValue>
          </PaymentRow>
          <PaymentRow>
            <DetailLabel>Taxes and fee</DetailLabel>
            <DetailValue>₹{0}</DetailValue>
            {/* <DetailValue>₹{Math.round(booking.quotePrice * 0.1) || 0}</DetailValue> */}
          </PaymentRow>
          <HorizontalLine />
          <PaymentRow>
            <DetailLabel>Total</DetailLabel>
            <DetailValue>₹{Math.round(booking.quotePrice) || 0}</DetailValue>
            {/* <DetailValue>₹{Math.round(booking.quotePrice * 1.1) || 0}</DetailValue> */}
          </PaymentRow>
        </PaymentSummary>
      </FlexContainer>
      {showRunnerModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowRunnerModal(false)}><CloseIcon /></CloseButton>
            <Title>Select a Runner</Title>
            <RunnerTable>
              <thead>
                <tr>
                  <TableHeader>Runner Name</TableHeader>
                  <TableHeader>Runner Contact</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Action</TableHeader>
                </tr>
              </thead>
              <tbody>
                {runners.map(runner => (
                  <TableRow key={runner._id}>
                    <TableCell>{runner.name}</TableCell>
                    <TableCell>{runner.mobileNumber}</TableCell>
                    <TableCell>{runner.isBlocked ? 'Inactive' : 'Active'}</TableCell>
                    <TableCell>
                      <ActionButton onClick={() => handleRunnerSelect(runner)} disabled={runner.isBlocked}>Select</ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </RunnerTable>
          </ModalContent>
        </Modal>
      )}
      {showSuccessModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowSuccessModal(false)}><CloseIcon /></CloseButton>
            <SuccessIcon src={successWithdrawalCheck} alt="Success" />
            <Title>Request sent to runner</Title>
            <p>You will get an update soon</p>
          </SuccessModal>
        </Modal>
      )}
    </Container>
  );
};

export default AssignRunnerDetails;