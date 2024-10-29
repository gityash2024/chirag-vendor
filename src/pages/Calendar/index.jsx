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
import Loader from '../../components/Loader';
import {useTranslation} from '../../TranslationContext';
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
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const BookingId = styled.h3`
  font-size: 18px;
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
  background-color: ${props => props.status === 'completed' ? '#B1FF8C' : '#DAB4FF'};
`;

const BookingDetails = styled.p`
  font-size: 14px;
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
  justify-content: start;
  width: 100%;
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

const PriceSummary = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-top: 15px;
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

const RunnerContactButton = styled.button`
  display: flex;
  align-items: center;
  background: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  svg {
    margin-right: 5px;
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
          <CalendarToday /> {format(parseISO(booking.date), 'yyyy-MM-dd')}
        </BookingDetails>
        <BookingDetails>
          <AccessTime /> {booking.time}
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
          <Humidity>
            <Opacity /> {booking.weather}
          </Humidity>
        </TempHumidity>
        <Crop>
          {translate('calendar.bookings.crop')}: {booking.cropName}
        </Crop>
      </TempHumidityCropRow>
      <PriceSummary>
        {booking.quotePrice 
          ? `${translate('calendar.bookings.priceSummary')}${booking.quotePrice}`
          : translate('calendar.bookings.priceNotQuoted')
        }
      </PriceSummary>
      {booking.runner && (
        <RunnerDetails>
          <strong>{translate('calendar.bookings.assignedRunner')}:</strong>
          <RunnerName>
            <RunnerInfo>
              <AvatarIcon />
              <span>{booking.runner.name}</span>
            </RunnerInfo>
            <RunnerContactButton 
              onClick={(e) => { 
                e.preventDefault(); 
                toast.info(`Calling ${booking.runner.mobileNumber}`); 
              }}
            >
              <Phone /> {translate('calendar.bookings.callNow')}
            </RunnerContactButton>
          </RunnerName>
        </RunnerDetails>
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
        <h3 style={{marginBottom:"5px"}}>
          {translate('calendar.bookings.forDate')} {format(selectedDate, 'MMMM d, yyyy')}
        </h3>
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <Card to={`/booking-details/${booking._id}`} key={booking._id}>
              <CardHeader>
                <BookingId>#{booking._id}</BookingId>
                <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
              </CardHeader>
              <BookingDetails><LocationOn /> {booking.farmLocation}</BookingDetails>
              <DateTimeRow>
                <BookingDetails><CalendarToday /> {format(parseISO(booking.date), 'yyyy-MM-dd')}</BookingDetails>
                <BookingDetails><AccessTime /> {booking.time}</BookingDetails>
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
                  <Humidity><Opacity /> {booking.weather}</Humidity>
                </TempHumidity>
                <Crop>{translate('calendar.bookings.crop')}: {booking.cropName}</Crop>
              </TempHumidityCropRow>
              <PriceSummary>
                {booking.quotePrice 
                  ? `${translate('calendar.bookings.priceSummary')}${booking.quotePrice}`
                  : translate('calendar.bookings.priceNotQuoted')
                }
              </PriceSummary>
              {booking.runner && (
                <RunnerDetails>
                  <strong>{translate('calendar.bookings.assignedRunner')}:</strong>
                  <RunnerName>
                    <RunnerInfo>
                      <AvatarIcon />
                      <span>{booking.runner.name}</span>
                    </RunnerInfo>
                    <RunnerContactButton onClick={(e) => { e.preventDefault(); toast.info(`Calling ${booking.runner.mobileNumber}`); }}>
                      <Phone /> {translate('calendar.bookings.callNow')}
                    </RunnerContactButton>
                  </RunnerName>
                </RunnerDetails>
              )}
            </Card>
          ))
        ) : (
          <Card as="div">{translate('calendar.bookings.noBookings')}</Card>
        )}
      </BookingColumn>
      <BookingColumn>
        <h3 style={{marginBottom:"5px"}}>{translate('calendar.bookings.upcoming')}</h3>
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