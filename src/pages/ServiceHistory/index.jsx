import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/icons-material/AccountCircle';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import Opacity from '@mui/icons-material/Opacity';
import Phone from '@mui/icons-material/Phone';

const ServiceHistoryContainer = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Title = styled.h2`
   font-size: 32px;
   font-weight: 600;
   margin-bottom: 20px;
   color: rgba(18, 18, 18, 1);
    font-family: 'Public Sans';
    line-height: 32px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;


const BookingDetails = styled.p`
  font-size: 14px;

  color: #666;
  margin-bottom: 5px;
  margin-left: 5px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;
const BookingDetails2 = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: flex;
 justify-content: end;
  svg {
    margin-right: 5px;
  }
`;

const DateTimeRow = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`;

const TempHumidityRow = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;



const PriceSummary = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-top: 15px;
`;


const RunnerContactButton = styled.button`
  display: flex;
  align-items: center;
  background: #ffffff;
  color: #000000;
  border: none;
  border: 1px solid #000000;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  svg {
    margin-right: 5px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
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
const Card = styled(Link)`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BookingId = styled.h3`
  font-size: 20px;
  color:rgba(18, 18, 18, 1);
  margin: 0;
  font-weight: 500;
  font-family: 'Public Sans';
  line-height: 23.5px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 22px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color:#000000;
  background-color: ${props => props.status === 'Completed' ? '#B1FF8C' : '#DAB4FF'};
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
  color: #666;
`;

const Crop = styled.span`
  font-size: 14px;
  color: #666;
`;

const RunnerDetails = styled.div`
  margin-top: 15px;
`;

const RunnerName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarIcon = styled(Avatar)`
  margin-right: 10px;
`;
const ServiceHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 6;

  const bookings = [
    { id: 'AB123456', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sachin Doe', date: '13 June, 2023', time: '02:00 PM - 04:00 PM', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', location: 'Pratapgarh, Uttarpradesh', humidity: '2%', price: '₹ 20,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '24/08/2024 2:00 PM' },
    { id: 'AB123457', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'John Doe', date: '14 June, 2023', time: '03:00 PM - 05:00 PM', farmArea: '22 Acres', crop: 'Crop name', temperature: '25°', location: 'Pratapgarh, Uttarpradesh', humidity: '3%', price: '₹ 22,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '25/08/2024 3:00 PM' },
    { id: 'AB123458', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Smith', date: '15 June, 2023', time: '04:00 PM - 06:00 PM', farmArea: '23 Acres', crop: 'Crop name', temperature: '26°', location: 'Pratapgarh, Uttarpradesh', humidity: '4%', price: '₹ 24,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '26/08/2024 4:00 PM' },
    { id: 'AB123459', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Michael Johnson', date: '16 June, 2023', time: '05:00 PM - 07:00 PM', farmArea: '24 Acres', crop: 'Crop name', temperature: '27°', location: 'Pratapgarh, Uttarpradesh', humidity: '5%', price: '₹ 26,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '27/08/2024 5:00 PM' },
    { id: 'AB123460', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Emily Davis', date: '17 June, 2023', time: '06:00 PM - 08:00 PM', farmArea: '25 Acres', crop: 'Crop name', temperature: '28°', location: 'Pratapgarh, Uttarpradesh', humidity: '6%', price: '₹ 28,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '28/08/2024 6:00 PM' },
    { id: 'AB123461', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Chris Brown', date: '18 June, 2023', time: '07:00 PM - 09:00 PM', farmArea: '26 Acres', crop: 'Crop name', temperature: '29°', location: 'Pratapgarh, Uttarpradesh', humidity: '7%', price: '₹ 30,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '29/08/2024 7:00 PM' },
    { id: 'AB123462', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jessica Wilson', date: '19 June, 2023', time: '08:00 PM - 10:00 PM', farmArea: '27 Acres', crop: 'Crop name', temperature: '30°', location: 'Pratapgarh, Uttarpradesh', humidity: '8%', price: '₹ 32,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '30/08/2024 8:00 PM' },
    { id: 'AB123463', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'David White', date: '20 June, 2023', time: '09:00 PM - 11:00 PM', farmArea: '28 Acres', crop: 'Crop name', temperature: '31°', location: 'Pratapgarh, Uttarpradesh', humidity: '9%', price: '₹ 34,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '31/08/2024 9:00 PM' },
    { id: 'AB123464', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sarah Johnson', date: '21 June, 2023', time: '10:00 PM - 12:00 AM', farmArea: '29 Acres', crop: 'Crop name', temperature: '32°', location: 'Pratapgarh, Uttarpradesh', humidity: '10%', price: '₹ 36,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '01/09/2024 10:00 PM' },
    { id: 'AB123465', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Daniel Martinez', date: '22 June, 2023', time: '11:00 PM - 01:00 AM', farmArea: '30 Acres', crop: 'Crop name', temperature: '33°', location: 'Pratapgarh, Uttarpradesh', humidity: '11%', price: '₹ 38,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '02/09/2024 11:00 PM' },
    { id: 'AB123466', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Lisa Anderson', date: '23 June, 2023', time: '12:00 AM - 02:00 AM', farmArea: '31 Acres', crop: 'Crop name', temperature: '34°', location: 'Pratapgarh, Uttarpradesh', humidity: '12%', price: '₹ 40,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '03/09/2024 12:00 AM' },
    { id: 'AB123467', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'James Taylor', date: '24 June, 2023', time: '01:00 AM - 03:00 AM', farmArea: '32 Acres', crop: 'Crop name', temperature: '35°', location: 'Pratapgarh, Uttarpradesh', humidity: '13%', price: '₹ 42,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '04/09/2024 1:00 AM' },
    { id: 'AB123468', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sophia Thomas', date: '25 June, 2023', time: '02:00 AM - 04:00 AM', farmArea: '33 Acres', crop: 'Crop name', temperature: '36°', location: 'Pratapgarh, Uttarpradesh', humidity: '14%', price: '₹ 44,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '05/09/2024 2:00 AM' },
    { id: 'AB123469', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Christopher Moore', date: '26 June, 2023', time: '03:00 AM - 05:00 AM', farmArea: '34 Acres', crop: 'Crop name', temperature: '37°', location: 'Pratapgarh, Uttarpradesh', humidity: '15%', price: '₹ 46,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '06/09/2024 3:00 AM' },
    { id: 'AB123470', status: 'Closed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'George Miller', date: '27 June, 2023', time: '04:00 AM - 06:00 AM', farmArea: '35 Acres', crop: 'Crop name', temperature: '38°', location: 'Pratapgarh, Uttarpradesh', humidity: '16%', price: '₹ 48,000', runnerName: 'Runner name', runnerContact: '0987654321', dateTime: '07/09/2024 4:00 AM' }
  ];

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const getLinkPath = (status, id) => {
    if (status === 'Closed') {
      return `/closed-booking/${id}`;
    } else if (status === 'Completed') {
      return `/confirm-booking/${id}`;
    }
    return '#';
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderBookings = () => {
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    return bookings.slice(indexOfFirstBooking, indexOfLastBooking).map((booking, index) => (
      <Card to={getLinkPath(booking.status, booking.id)} key={booking.id}>
      <CardHeader>
        <BookingId>#{booking.id}</BookingId>
        <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
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
      <PriceSummary>Price Summary: {booking.price}</PriceSummary>
      <RunnerDetails>
        <strong>Assigned Runner:</strong>
        <RunnerName>
          <RunnerInfo>
            <AvatarIcon />
            <span>{booking.runnerName}</span>
            <AvatarIcon />

            <span>{booking.runnerContact}</span>

          </RunnerInfo>
          <RunnerContactButton onClick={() => alert(`Calling ${booking.runnerContact}`)}>
            <Phone /> Call Now
          </RunnerContactButton>
        </RunnerName>
      </RunnerDetails>
    </Card>
    ));
  };

  return (
    <ServiceHistoryContainer>
      <Title>Service History</Title>
      <CardContainer>
        {renderBookings()}
      </CardContainer>
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            onClick={() => paginate(i + 1)}
            active={i + 1 === currentPage}
          >
            {i + 1}
          </PageButton>
        ))}
      </Pagination>
    </ServiceHistoryContainer>
  );
};

export default ServiceHistory;
