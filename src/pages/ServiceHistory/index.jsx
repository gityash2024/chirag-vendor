import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/icons-material/AccountCircle';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import Opacity from '@mui/icons-material/Opacity';
import Phone from '@mui/icons-material/Phone';
import { getAllBookingsList } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import {useTranslation} from '../../TranslationContext';
const ServiceHistoryContainer = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Title = styled.h2`
   font-size: 24px;
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


const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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


const AvatarIcon = styled(Avatar)`
  margin-right: 10px;
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
  min-height: 300px;
  padding-bottom: 70px;
`;

const BookingId = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #121212;
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
    switch(props.status) {
      case 'requested': return '#FDF0CC';
      case 'quote_received': return '#CDCCFD';
      case 'confirmed': return '#E8FFF3';
      case 'completed': return '#B1FF8C';
      case 'closed': return '#E0E0E0';
      case 'cancelled': return '#FFF0F1';
      default: return '#E0E0E0';
    }
  }};
`;

const RunnnerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F8F9FA;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 15px;
`;

const RunnerName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    font-weight: 500;
    color: #121212;
  }
`;

const RunnerContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FFFFFF;
  color: #000000;
  border: 1px solid #000000;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background: #F8F9FA;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;




const ServiceHistory = () => {
  const {translate} = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const bookingsPerPage = 6;
  const user = JSON.parse(localStorage.getItem("user"))?._id;


  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllBookingsList();
      setBookings(response.data?.filter((booking) =>  booking.vendor?._id === user));
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loader />;
  }

  return (
    <ServiceHistoryContainer>
      <Title>{translate('serviceHistory.title')}</Title>
      <CardContainer>
        {currentBookings.map((booking) => (
          <Card to={`/booking-details/${booking._id}`} key={booking._id}>
            <CardHeader>
              <BookingId>#{booking._id}</BookingId>
              <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
            </CardHeader>
            <BookingDetails>
              <LocationOn /> {booking.farmLocation}
            </BookingDetails>
            <DateTimeRow>
              <BookingDetails>
                <CalendarToday /> {new Date(booking.date).toLocaleDateString()}
              </BookingDetails>
              <BookingDetails>
                <AccessTime /> {booking.time}
              </BookingDetails>
            </DateTimeRow>
            <BookingDetails>
              {translate('serviceHistory.bookingDetails.bookingName')}: {booking.farmerName}
            </BookingDetails>
            <BookingDetails>
              {translate('serviceHistory.bookingDetails.farmArea')}: {booking.farmArea} {translate('serviceHistory.bookingDetails.acres')}
            </BookingDetails>
            <TempHumidityCropRow>
              <TempHumidity>
                <Temperature>{booking.weather}</Temperature>
                <Humidity>
                  <Opacity /> {booking.weather}
                </Humidity>
              </TempHumidity>
              <Crop>
                {translate('serviceHistory.bookingDetails.crop')}: {booking.cropName}
              </Crop>
            </TempHumidityCropRow>
            <BookingDetails>{booking.farmLocation}</BookingDetails>
            {booking.quotePrice && (
              <PriceSummary>
                {translate('serviceHistory.bookingDetails.priceSummary')}{booking.quotePrice}
              </PriceSummary>
            )}
{booking.runner && (
  <RunnnerDetails>
    <RunnerName>
      <RunnerInfo>
        <Avatar sx={{ width: 40, height: 40 }} />
        <span>{booking?.runner?.name}</span>
      </RunnerInfo>
    </RunnerName>
    <RunnerContactButton onClick={(e) => {
      e.preventDefault();
      toast.info(`Calling ${booking.runner.mobileNumber}`);
    }}>
      <Phone /> Call Now
    </RunnerContactButton>
  </RunnnerDetails>
)}
          </Card>
        ))}
      </CardContainer>
      <Pagination>
        {Array.from({ length: Math.ceil(bookings.length / bookingsPerPage) }, (_, i) => (
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