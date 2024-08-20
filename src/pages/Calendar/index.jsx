import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import Avatar from '@mui/icons-material/AccountCircle';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import Opacity from '@mui/icons-material/Opacity';
import Phone from '@mui/icons-material/Phone';

const CalendarContainer = styled.div`
  display: flex;
  font-family: 'Public Sans', sans-serif;
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
  background-color: ${props => props.status === 'Completed' ? '#B1FF8C' : '#DAB4FF'};
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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const bookings = [
    { id: 'AB123456', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sachin Doe', date: '2025-07-08', time: '02:00 PM - 04:00 PM', farmArea: '21 Acres', crop: 'Crop name', temperature: '24°', location: 'Pratapgarh, Uttarpradesh', humidity: '2%', price: '₹ 20,000', runnerName: 'Runner name', runnerContact: '0987654321' },
    { id: 'AB123457', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'John Doe', date: '2025-07-08', time: '03:00 PM - 05:00 PM', farmArea: '22 Acres', crop: 'Crop name', temperature: '25°', location: 'Pratapgarh, Uttarpradesh', humidity: '3%', price: '₹ 22,000', runnerName: 'Runner name', runnerContact: '0987654321' },
    { id: 'AB123458', status: 'Confirmed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Doe', date: '2025-07-09', time: '01:00 PM - 03:00 PM', farmArea: '23 Acres', crop: 'Crop name', temperature: '26°', location: 'Pratapgarh, Uttarpradesh', humidity: '4%', price: '₹ 24,000', runnerName: 'Runner name', runnerContact: '0987654321' },
    { id: 'AB123453', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Doe', date: '2025-07-09', time: '01:00 PM - 03:00 PM', farmArea: '23 Acres', crop: 'Crop name', temperature: '26°', location: 'Pratapgarh, Uttarpradesh', humidity: '4%', price: '₹ 24,000', runnerName: 'Runner name', runnerContact: '0987654321' },
    { id: 'AB123423', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Doe', date: '2025-07-09', time: '01:00 PM - 03:00 PM', farmArea: '23 Acres', crop: 'Crop name', temperature: '26°', location: 'Pratapgarh, Uttarpradesh', humidity: '4%', price: '₹ 24,000', runnerName: 'Runner name', runnerContact: '0987654321' },
    { id: 'AB1234343', status: 'Completed', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Doe', date: '2025-07-09', time: '01:00 PM - 03:00 PM', farmArea: '23 Acres', crop: 'Crop name', temperature: '26°', location: 'Pratapgarh, Uttarpradesh', humidity: '4%', price: '₹ 24,000', runnerName: 'Runner name', runnerContact: '0987654321' },
  ];

  const filteredBookings = bookings.filter(booking =>  booking.status === 'Completed');
  // const filteredBookings = bookings.filter(booking => isSameDay(new Date(booking.date), selectedDate) && booking.status === 'Completed');
  const upcomingBookings = bookings.filter(booking => new Date(booking.date) > new Date() && booking.status === 'Confirmed');

  const renderBookingCard = (booking) => (
    <Card to={booking.status === 'Completed' ? `/completed-booking/${booking.id}` : `/calendar-confirm-booking-details/${booking.id}`} key={booking.id}>
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
          </RunnerInfo>
          <RunnerContactButton onClick={(e) => { e.preventDefault(); alert(`Calling ${booking.runnerContact}`); }}>
            <Phone /> Call Now
          </RunnerContactButton>
        </RunnerName>
      </RunnerDetails>
    </Card>
  );

  return (
    <CalendarContainer>
      <CalendarColumn>
        <CalendarHeader>
          <CalendarNavButton onClick={prevMonth}>&lt;</CalendarNavButton>
          <CalendarTitle>{format(currentDate, 'MMMM yyyy')}</CalendarTitle>
          <CalendarNavButton onClick={nextMonth}>&gt;</CalendarNavButton>
        </CalendarHeader>
        <CalendarGrid>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
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
        <h3>Bookings for {format(selectedDate, 'MMMM d, yyyy')}</h3>
        {filteredBookings.length > 0 ? (
          filteredBookings.map(renderBookingCard)
        ) : (
          <Card as="div">No completed bookings available for this date.</Card>
        )}
      </BookingColumn>
      <BookingColumn>
        <h3>Upcoming Bookings</h3>
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map(renderBookingCard)
        ) : (
          <Card as="div">No upcoming confirmed bookings available.</Card>
        )}
      </BookingColumn>
    </CalendarContainer>
  );
};

export default Calendar;