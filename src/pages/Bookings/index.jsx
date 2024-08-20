// Bookings.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LocationOn from '@mui/icons-material/LocationOn';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import Opacity from '@mui/icons-material/Opacity';
import CloseIcon from '@mui/icons-material/Close';
import successWithdrawalCheck from '../../assets/check-wallet.png';
import noBookingsImage from '../../assets/no-booking.png';

const BookingsContainer = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;
const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;
const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: ${props => props.active ? '#000000' : '#8D98A4'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border-bottom: ${props => props.active ? '2px solid #000000' : 'none'};
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BookingId = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  background-color: ${props => {
    if (props.status === 'Pending') return '#FDF0CC';
    if (props.status === 'Confirmed') return '#CDCCFD';
    return '#E0E0E0';
  }};
`;

const BookingDetails = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #666;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

const DateTimeRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TempHumidityCropRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const TempHumidity = styled.div`
  display: flex;
  align-items: center;
`;

const Temperature = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

const Humidity = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #666;
`;

const Crop = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #666;
`;

const PriceSummary = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  width: 48%;
  padding: 10px;
  background-color: ${props => props.primary ? '#000000' : '#FFFFFF'};
  color: ${props => props.primary ? '#FFFFFF' : '#000000'};
  border: ${props => props.primary ? 'none' : '1px solid #000000'};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background: ${props => props.active ? '#000' : 'white'};
  color: ${props => props.active ? 'white' : '#000'};
  border: 1px solid #000;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
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

const ModalTitle = styled.h3`
  margin-bottom: 15px;
`;

const PriceInput = styled.input`
  width: 90%;
  padding: 8px;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const EmptyStateImage = styled.img`
  width: 200px;
  height: 400px;
  margin-bottom: 20px;
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
`;

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Requests via Farmer');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [price, setPrice] = useState('');
  const bookingsPerPage = 9;

  const [bookings, setBookings] = useState({
    'Requests via Farmer': [
      { id: 'AB123456333', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sachin Doe', date: '13 June, 2023', time: '02:00 PM - 04:00 PM', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', location: 'Pratapgarh, Uttarpradesh', humidity: '2%', price: '₹ 20,000' },
      { id: 'AB12345783', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'John Doe', date: '14 June, 2023', time: '03:00 PM - 05:00 PM', farmArea: '22 Acres', crop: 'Crop name', temperature: '25°', location: 'Pratapgarh, Uttarpradesh', humidity: '3%', price: '₹ 22,000' },
      { id: 'AB1234589', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Smith', date: '15 June, 2023', time: '04:00 PM - 06:00 PM', farmArea: '23 Acres', crop: 'Crop name', temperature: '26°', location: 'Pratapgarh, Uttarpradesh', humidity: '4%', price: '₹ 24,000' },
      { id: 'AB1234518', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sachin Doe', date: '13 June, 2023', time: '02:00 PM - 04:00 PM', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', location: 'Pratapgarh, Uttarpradesh', humidity: '2%', price: '₹ 20,000' },
      { id: 'AB1234524', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'John Doe', date: '14 June, 2023', time: '03:00 PM - 05:00 PM', farmArea: '22 Acres', crop: 'Crop name', temperature: '25°', location: 'Pratapgarh, Uttarpradesh', humidity: '3%', price: '₹ 22,000' },
      { id: 'AB1234532', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Smith', date: '15 June, 2023', time: '04:00 PM - 06:00 PM', farmArea: '23 Acres', crop: 'Crop name', temperature: '26°', location: 'Pratapgarh, Uttarpradesh', humidity: '4%', price: '₹ 24,000' },
    ],
    'Requests via admin': [
      { id: 'AB123462827', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sarah Johnson', date: '19 June, 2023', time: '08:00 PM - 10:00 PM', farmArea: '27 Acres', crop: 'Crop name', temperature: '30°', location: 'Pratapgarh, Uttarpradesh', humidity: '8%', price: '₹ 32,000' },
      { id: 'AB123463322', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Tom Davis', date: '20 June, 2023', time: '09:00 PM - 11:00 PM', farmArea: '28 Acres', crop: 'Crop name', temperature: '31°', location: 'Pratapgarh, Uttarpradesh', humidity: '9%', price: '₹ 34,000' },
      { id: 'AB12346498493', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Emma Wilson', date: '21 June, 2023', time: '10:00 PM - 12:00 AM', farmArea: '29 Acres', crop: 'Crop name', temperature: '32°', location: 'Pratapgarh, Uttarpradesh', humidity: '10%', price: '₹ 36,000' },
      { id: 'AB13223462827', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sarah Johnson', date: '19 June, 2023', time: '08:00 PM - 10:00 PM', farmArea: '27 Acres', crop: 'Crop name', temperature: '30°', location: 'Pratapgarh, Uttarpradesh', humidity: '8%', price: '₹ 32,000' },
      { id: 'AB1323463322', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Tom Davis', date: '20 June, 2023', time: '09:00 PM - 11:00 PM', farmArea: '28 Acres', crop: 'Crop name', temperature: '31°', location: 'Pratapgarh, Uttarpradesh', humidity: '9%', price: '₹ 34,000' },
      { id: 'AB123426498493', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Emma Wilson', date: '21 June, 2023', time: '10:00 PM - 12:00 AM', farmArea: '29 Acres', crop: 'Crop name', temperature: '32°', location: 'Pratapgarh, Uttarpradesh', humidity: '10%', price: '₹ 36,000' },
    ],
    'Quote sent': [
      { id: 'AB31234368', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Ava Wilson', date: '25 June, 2023', time: '02:00 AM - 04:00 AM', farmArea: '33 Acres', crop: 'Crop name', temperature: '36°', location: 'Pratapgarh, Uttarpradesh', humidity: '14%', price: '₹ 44,000' },
      { id: 'AB812346W9', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Noah Martin', date: '26 June, 2023', time: '03:00 AM - 05:00 AM', farmArea: '34 Acres', crop: 'Crop name', temperature: '37°', location: 'Pratapgarh, Uttarpradesh', humidity: '15%', price: '₹ 46,000' },
      { id: 'AB31237470', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Isabella Thompson', date: '27 June, 2023', time: '04:00 AM - 06:00 AM', farmArea: '35 Acres', crop: 'Crop name', temperature: '38°', location: 'Pratapgarh, Uttarpradesh', humidity: '16%', price: '₹ 48,000' },
      { id: 'AB731234368', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Ava Wilson', date: '25 June, 2023', time: '02:00 AM - 04:00 AM', farmArea: '33 Acres', crop: 'Crop name', temperature: '36°', location: 'Pratapgarh, Uttarpradesh', humidity: '14%', price: '₹ 44,000' },
      { id: 'AB8123469', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Noah Martin', date: '26 June, 2023', time: '03:00 AM - 05:00 AM', farmArea: '34 Acres', crop: 'Crop name', temperature: '37°', location: 'Pratapgarh, Uttarpradesh', humidity: '15%', price: '₹ 46,000' },
      { id: 'A9B1237470', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Isabella Thompson', date: '27 June, 2023', time: '04:00 AM - 06:00 AM', farmArea: '35 Acres', crop: 'Crop name', temperature: '38°', location: 'Pratapgarh, Uttarpradesh', humidity: '16%', price: '₹ 48,000' },
    ],
    'Assign Runner': [
      { id: 'AB97123474', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Charlotte Clark', date: '1 July, 2023', time: '08:00 AM - 10:00 AM', farmArea: '39 Acres', crop: 'Crop name', temperature: '42°', location: 'Pratapgarh, Uttarpradesh', humidity: '20%', price: '₹ 56,000' },
      { id: 'AB13523475', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Mason Lewis', date: '2 July, 2023', time: '09:00 AM - 11:00 AM', farmArea: '40 Acres', crop: 'Crop name', temperature: '43°', location: 'Pratapgarh, Uttarpradesh', humidity: '21%', price: '₹ 58,000' },
      { id: 'AB12843476', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Harper Lee', date: '3 July, 2023', time: '10:00 AM - 12:00 PM', farmArea: '41 Acres', crop: 'Crop name', temperature: '44°', location: 'Pratapgarh, Uttarpradesh', humidity: '22%', price: '₹ 60,000' },
      { id: 'AB971230474', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Charlotte Clark', date: '1 July, 2023', time: '08:00 AM - 10:00 AM', farmArea: '39 Acres', crop: 'Crop name', temperature: '42°', location: 'Pratapgarh, Uttarpradesh', humidity: '20%', price: '₹ 56,000' },
      { id: 'AB013523475', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Mason Lewis', date: '2 July, 2023', time: '09:00 AM - 11:00 AM', farmArea: '40 Acres', crop: 'Crop name', temperature: '43°', location: 'Pratapgarh, Uttarpradesh', humidity: '21%', price: '₹ 58,000' },
      { id: 'AB128434076', status: 'Pending', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Harper Lee', date: '3 July, 2023', time: '10:00 AM - 12:00 PM', farmArea: '41 Acres', crop: 'Crop name', temperature: '44°', location: 'Pratapgarh, Uttarpradesh', humidity: '22%', price: '₹ 60,000' },
    ],
    'Confirmed Bookings': [
      { id: 'AB123245480', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Michael Baker', date: '7 July, 2023', time: '02:00 PM - 04:00 PM', farmArea: '45 Acres', crop: 'Crop name', temperature: '48°', location: 'Pratapgarh, Uttarpradesh', humidity: '26%', price: '₹ 68,000' },
      { id: 'AB12376481', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Ella Adams', date: '8 July, 2023', time: '03:00 PM - 05:00 PM', farmArea: '46 Acres', crop: 'Crop name', temperature: '49°', location: 'Pratapgarh, Uttarpradesh', humidity: '27%', price: '₹ 70,000' },
      { id: 'A9B123482', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Daniel Nelson', date: '9 July, 2023', time: '04:00 PM - 06:00 PM', farmArea: '47 Acres', crop: 'Crop name', temperature: '50°', location: 'Pratapgarh, Uttarpradesh', humidity: '28%', price: '₹ 72,000' },
      { id: 'AB3123245480', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Michael Baker', date: '7 July, 2023', time: '02:00 PM - 04:00 PM', farmArea: '45 Acres', crop: 'Crop name', temperature: '48°', location: 'Pratapgarh, Uttarpradesh', humidity: '26%', price: '₹ 68,000' },
      { id: 'A5B12376481', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Ella Adams', date: '8 July, 2023', time: '03:00 PM - 05:00 PM', farmArea: '46 Acres', crop: 'Crop name', temperature: '49°', location: 'Pratapgarh, Uttarpradesh', humidity: '27%', price: '₹ 70,000' },
      { id: 'A79B123482', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Daniel Nelson', date: '9 July, 2023', time: '04:00 PM - 06:00 PM', farmArea: '47 Acres', crop: 'Crop name', temperature: '50°', location: 'Pratapgarh, Uttarpradesh', humidity: '28%', price: '₹ 72,000' },
    ],
  });

  const handleDecline = (id) => {
    setBookings(prevBookings => ({
      ...prevBookings,
      [activeTab]: prevBookings[activeTab].filter(booking => booking.id !== id)
    }));
  };

  const handleAccept = (id) => {
    setShowPriceModal(true);
  };

  const handlePriceSubmit = () => {
    setShowPriceModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
  };

  const handleAssignRunner = (id) => {
    navigate(`/assign-runner/${id}`);
  };

  const renderBookings = () => {
    const currentBookings = bookings[activeTab].slice((currentPage - 1) * bookingsPerPage, currentPage * bookingsPerPage);
    if (currentBookings.length === 0) {
      return (
        <>
        <EmptyStateContainer>
          </EmptyStateContainer>
        <EmptyStateContainer>
          <EmptyStateImage src={noBookingsImage} alt="No bookings" />
          <EmptyStateText>Currently, no bookings available.</EmptyStateText>
        </EmptyStateContainer>
        </>
      );
    }
    return bookings[activeTab].slice((currentPage - 1) * bookingsPerPage, currentPage * bookingsPerPage).map((booking) => (
      <Card key={booking.id}>
        <CardHeader>
          <BookingId>#{booking.id}</BookingId>
          {(activeTab === 'Quote sent' || activeTab === 'Assign Runner' || activeTab === 'Confirmed Bookings') && 
            <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
          }
        </CardHeader>
        <BookingDetails><LocationOn /> {booking.address}</BookingDetails>
        <DateTimeRow>
          <BookingDetails><CalendarToday /> {booking.date}</BookingDetails>
          <BookingDetails><AccessTime /> {booking.time}</BookingDetails>
        </DateTimeRow>
        <BookingDetails>Booking Name: {booking.name}</BookingDetails>
        <BookingDetails>Farm Area: {booking.farmArea}</BookingDetails>
        <TempHumidityCropRow>
          <TempHumidity>
            <Temperature>{booking.temperature}</Temperature>
            <Humidity><Opacity /> {booking.humidity}</Humidity>
          </TempHumidity>
          <Crop>Crop: {booking.crop}</Crop>
        </TempHumidityCropRow>
        <BookingDetails>{booking.location}</BookingDetails>
        {(activeTab === 'Quote sent' || activeTab === 'Confirmed Bookings') && 
          <PriceSummary>{activeTab === 'Quote sent' ? 'Quoted Price: ' : 'Price Summary: '}{booking.price}</PriceSummary>
        }
        {(activeTab === 'Requests via Farmer' || activeTab === 'Requests via admin') && (
          <ButtonContainer>
            <ActionButton onClick={() => handleDecline(booking.id)}>Decline</ActionButton>
            <ActionButton primary onClick={() => handleAccept(booking.id)}>Accept</ActionButton>
          </ButtonContainer>
        )}
        {activeTab === 'Assign Runner' && <ActionButton primary onClick={() => handleAssignRunner(booking.id)}>Assign Runner</ActionButton>}
      </Card>
    ));
  };

  return (
    <BookingsContainer>
      <Title>Bookings</Title>
      <TabContainer>
        {Object.keys(bookings).map((tab) => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabContainer>
      <CardContainer>
        {renderBookings()}
      </CardContainer>
      <Pagination>
        {Array.from({ length: Math.ceil(bookings[activeTab].length / bookingsPerPage) }, (_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            active={i + 1 === currentPage}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
      {showPriceModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowPriceModal(false)}><CloseIcon /></CloseButton>
            <ModalTitle>Add a Price for this booking</ModalTitle>
            <PriceInput
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
            <SubmitButton onClick={handlePriceSubmit}>Submit</SubmitButton>
          </ModalContent>
        </Modal>
      )}
      {showSuccessModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowSuccessModal(false)}><CloseIcon /></CloseButton>
            <SuccessIcon src={successWithdrawalCheck} alt="Success" />
            <ModalTitle>Quote sent</ModalTitle>
            <p>You will get an update soon</p>
          </SuccessModal>
        </Modal>
      )}
    </BookingsContainer>
  );
};

export default Bookings;