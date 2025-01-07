import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/icons-material/AccountCircle';
import Phone from '@mui/icons-material/Phone';
import { getAllBookingsList } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/index';
import noBookingsImage from "../../assets/no-booking.png";
import locationIcon from '../../assets/location-icon.svg';
import calendarIcon from '../../assets/calendar.svg';
import timeIcon from '../../assets/clock.svg';
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

const Card = styled(Link)`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

const BookingDetails = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #121212CC;
  margin-bottom: 5px;
  line-height: 20px;
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: 15px;
  }
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
    if (props.status === "requested") return "#FEB89C";
    if (props.status === "quote_received") return "#FDF0CC";
    if (props.status === "confirmed") return "#BEF991";
    if (props.status === "closed") return "#DAB4FF";
    return "#E0E0E0";
  }};
`;

const DateTimeRow = styled.div`
  display: flex;
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
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  &:after {
    content: '°';
  }
`;

const Humidity = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
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

const RunnnerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 10px;
`;

const RunnerName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RunnerContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #000000;
  color: #ffffff;
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

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const EmptyStateImage = styled.img`
  width: 380px;
  height: 400px;
  margin-bottom: 20px;
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
`;

const FilterContainer = styled.div`
  position: absolute;
  top: 120px;
  right: 50px;
`;

const StatusFilter = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
  font-family: "Public Sans", sans-serif;
  cursor: pointer;
`;

const ServiceHistory = () => {
  const {translate} = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const bookingsPerPage = 6;
  const user = JSON.parse(localStorage.getItem("user"))?._id;
  const [statusFilter, setStatusFilter] = useState('all');

  const filterBookingsByStatus = (bookings) => {
    if (statusFilter === 'all') return bookings;
    return bookings.filter(booking => booking.status === statusFilter);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllBookingsList();
      setBookings(response.data?.filter((booking) => booking.vendor?._id === user));
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const filteredBookings = filterBookingsByStatus(currentBookings);

  if (bookings.length === 0 || filteredBookings.length === 0) {
    return (
      <ServiceHistoryContainer>
        <Title>{translate('serviceHistory.title')}</Title>
        <FilterContainer>
          <StatusFilter 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="requested">Requested</option>
            <option value="quote_received">Quote Received</option>
            <option value="confirmed">Confirmed</option>
            {/* <option value="completed">Completed</option> */}
            <option value="closed">Closed</option>
            <option value="cancelled">Cancelled</option>
          </StatusFilter>
        </FilterContainer>
        <EmptyStateContainer>
          <EmptyStateImage src={noBookingsImage} alt="No bookings" />
          <EmptyStateText>
            {bookings.length === 0 
              ? translate('bookings.emptyState.noBookings2')
              : `No bookings found with status: ${statusFilter}`
            }
          </EmptyStateText>
        </EmptyStateContainer>
      </ServiceHistoryContainer>
    );
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ServiceHistoryContainer>
      <Title>{translate('serviceHistory.title')}</Title>
      <FilterContainer>
        <StatusFilter 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="requested">Requested</option>
          <option value="quote_received">Quote Received</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="closed">Closed</option>
          <option value="cancelled">Cancelled</option>
        </StatusFilter>
      </FilterContainer>
      <CardContainer>
        {filteredBookings.map((booking) => (
          <Card 
            to={`/booking-details/${booking._id}`} 
            key={booking._id}
          >
            <CardHeader>
              <BookingId>#{booking._id}</BookingId>
              <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
            </CardHeader>
            <BookingDetails>
              <img src={locationIcon} alt="Location" />
              {booking.farmLocation}
              <a 
                href={`https://maps.google.com/?q=${booking?.location?.coordinates[0]},${booking?.location?.coordinates[1]}`}
                title="Open in Google Maps"
                style={{marginLeft: "15px", textDecoration: "none"}}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗
              </a>
            </BookingDetails>
            <DateTimeRow>
              <BookingDetails>
                <img src={calendarIcon} alt="Calendar" />
                {new Date(booking.date).toLocaleDateString()}
              </BookingDetails>
              <BookingDetails>
                <img 
                  src={timeIcon} 
                  alt="Time"
                  style={{marginLeft: "15px"}}
                />
                {booking.time}
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
                <Humidity>{booking.farmLocation || 'N/A'}</Humidity>
              </TempHumidity>
              <Crop>
                {translate('serviceHistory.bookingDetails.crop')}: {booking.cropName}
              </Crop>
            </TempHumidityCropRow>
            {booking.quotePrice && (
              <PriceSummary>
                {translate('serviceHistory.bookingDetails.priceSummary')}: ₹{booking.quotePrice}
              </PriceSummary>
            )}
            {booking.runner && (
              <RunnnerDetails>
                <RunnerName>
                  <Avatar sx={{ width: 40, height: 40 }} />
                  <span>{booking.runner.name}</span>
                </RunnerName>
                <RunnerContactButton
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(booking.runner.mobileNumber);
                    toast.info(`Copied number: ${booking.runner.mobileNumber}`);
                  }}
                >
                  <Phone /> {translate('serviceHistory.bookingDetails.callNow')}
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