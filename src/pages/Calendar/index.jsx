import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isAfter } from 'date-fns';
import Avatar from '@mui/icons-material/AccountCircle';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import Opacity from '@mui/icons-material/Opacity';
import Phone from '@mui/icons-material/Phone';
import { getAllBookingsList } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/index';
import {useTranslation} from '../../TranslationContext';
import locationIcon from '../../assets/location-icon.svg';
import calendarIcon from '../../assets/calendar.svg';
import timeIcon from '../../assets/clock.svg';
const CalendarContainer = styled.div`
  display: flex;
  font-family: 'Public Sans', sans-serif;
  // height: 100vh;
`;

const CalendarColumn = styled.div`
  flex: 1;
  padding: 20px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CalendarTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const CalendarNavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const DayCell = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  ${({ isCurrentMonth, isSelected }) => `
    background-color: ${isSelected ? '#000' : isCurrentMonth ? '#fff' : '#f0f0f0'};
    color: ${isSelected ? '#fff' : isCurrentMonth ? '#000' : '#999'};
  `}
`;

const BookingColumn = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  max-height: 100vh;
`;
const RunnerDetails = styled.div`
  margin-top: 15px;
`;



const RunnerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarIcon = styled(Avatar)`
  margin-right: 10px;
`;



const Card = styled(Link)`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  display: block;
  position: relative;
  height: ${props => props.hasRunner ? '300px' : '300px'};
  padding-bottom: ${props => props.hasRunner ? '70px' : '20px'};
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

const Calendar = () => {
  const { translate } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllBookingsList();
      const vendorBookings = response.data.filter(booking => booking.vendor?._id === user?._id);
      console.log(vendorBookings,'----------------vendor booking')
      setBookings(vendorBookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = parseISO(booking.date);
    return isSameDay(bookingDate, selectedDate);
  });

  const upcomingBookings = bookings.filter(booking => {
    const bookingDate = parseISO(booking.date);
    return isAfter(bookingDate, new Date()) ;
  });


  const renderBookingCard = (booking) => (
    <Card 
      to={`/booking-details/${booking._id}`} 
      key={booking._id}
      hasRunner={booking.runner != null}
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
          {format(parseISO(booking.date), 'yyyy-MM-dd')}
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
        {translate('calendar.bookings.bookingName')}: {booking.farmerName}
      </BookingDetails>
      <BookingDetails>
        {translate('calendar.bookings.farmArea')}: {booking.farmArea} {translate('calendar.bookings.acres')}
      </BookingDetails>
      <TempHumidityCropRow>
        <TempHumidity>
          <Temperature>{booking.weather}</Temperature>
          <Humidity>{booking.farmLocation || 'N/A'}</Humidity>
        </TempHumidity>
        <Crop>
          {translate('calendar.bookings.crop')}: {booking.cropName}
        </Crop>
      </TempHumidityCropRow>
      {booking.quotePrice && (
        <PriceSummary>
          {translate('calendar.bookings.priceSummary')}: ₹{booking.quotePrice}
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
            <Phone /> {translate('calendar.bookings.callNow')}
          </RunnerContactButton>
        </RunnnerDetails>
      )}
    </Card>
  );


  if (loading) {
    return <Loader />;
  }

  return (
    <CalendarContainer>
      <CalendarColumn>
        <CalendarHeader>
          <CalendarNavButton onClick={prevMonth}>&lt;</CalendarNavButton>
          <CalendarTitle>{format(currentDate, translate('calendar.months.title'))}</CalendarTitle>
          <CalendarNavButton onClick={nextMonth}>&gt;</CalendarNavButton>
        </CalendarHeader>
        <CalendarGrid>
          {[
            translate('calendar.weekDays.sun'),
            translate('calendar.weekDays.mon'),
            translate('calendar.weekDays.tue'),
            translate('calendar.weekDays.wed'),
            translate('calendar.weekDays.thu'),
            translate('calendar.weekDays.fri'),
            translate('calendar.weekDays.sat')
          ].map(day => (
            <DayCell key={day}>{day}</DayCell>
          ))}
          {monthDays.map(day => (
            <DayCell
              key={day}
              isCurrentMonth={isSameMonth(day, currentDate)}
              isSelected={isSameDay(day, selectedDate)}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, 'd')}
            </DayCell>
          ))}
        </CalendarGrid>
      </CalendarColumn>
      <BookingColumn>
        <h3 style={{marginBottom: "5px"}}>
          {translate('calendar.bookings.forDate')} {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        {filteredBookings.length > 0 ? (
          filteredBookings.map(renderBookingCard)
        ) : (
          <Card as="div">{translate('calendar.bookings.noBookings')}</Card>
        )}
      </BookingColumn>
      <BookingColumn>
        <h3 style={{marginBottom: "5px"}}>{translate('calendar.bookings.upcoming')}</h3>
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map(renderBookingCard)
        ) : (
          <Card as="div">{translate('calendar.bookings.noUpcoming')}</Card>
        )}
      </BookingColumn>
    </CalendarContainer>
  );
};

export default Calendar;