import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Import images
import waterIcon from '../../assets/water-icon.png';
import pesticideIcon from '../../assets/pesticide-icon.png';
import carbonFootprintIcon from '../../assets/carbon-footprint-icon.png';
import deleteIcon from '../../assets/delete-icon.png';
import editIcon from '../../assets/edit-icon.png';
import viewIcon from '../../assets/view-icon.png';

const HomeContainer = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const ViewAllLink = styled(Link)`
  color: #5CB1FF;
  text-decoration: none;
  font-size: 14px;
`;

const BookingRequestsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const BookingCard = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 15px;
  width: calc(33.333% - 60px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: calc(50% - 10px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BookingId = styled.h3`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const BookingDetails = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;



const ActionButton = styled.button`
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const BookingActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const DeclineButton = styled(ActionButton)`
  background-color: white;
  color: #333;
  border: 1px solid #E0E0E0;
  width: 48%;
`;

const AcceptButton = styled(ActionButton)`
  background-color: #000;
  color: white;
  width: 48%;
`;


const RunnersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Montserrat', sans-serif;
`;

const TableHead = styled.thead`
  background-color: #E3E6E8;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  font-weight: 600;
  color: #333;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #E0E0E0;
`;
const RunnerCell = styled.div`
  display: flex;
  align-items: center;
`;

const RunnerAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #121212;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const RunnerName = styled.span`
  vertical-align: middle;
  font-size: 14px;
  font-weight: 500;
`;


const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  padding: 5px;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ViewIcon = styled(ActionIcon)`
  color: #5CB1FF;
`;

const EditIcon = styled(ActionIcon)`
  color: #41B079;
`;

const DeleteIcon = styled(ActionIcon)`
  color: #F1614B;
`;

const EnvironmentalReportContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ReportCard = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 15px;
  flex: 1;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReportIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const ReportValue = styled.h3`
  font-size: 24px;
  color: ${props => props.color || '#333'};
  margin: 5px 0;
`;

const ReportLabel = styled.p`
  font-size: 14px;
  color: #666;
`;

const Home = () => {
  // Mock data
  const bookingRequests = [
    { id: 'AB123456', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Sachin Doe', date: '12 June, 2023', time: '02:00 PM - 04:00 PM' },
    { id: 'AB123457', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'John Doe', date: '13 June, 2023', time: '03:00 PM - 05:00 PM' },
    { id: 'AB123458', address: 'Lorem ipsum dolor sit amet, street, Area, City, 560066', name: 'Jane Doe', date: '14 June, 2023', time: '01:00 PM - 03:00 PM' },
  ];

  const runners = [
    { id: 1, name: 'Jacob Jones', contact: '+91 123 456 7890', status: 'Active' },
    { id: 2, name: 'Darrell Steward', contact: '+91 123 456 7890', status: 'Inactive' },
    { id: 3, name: 'Esther Howard', contact: '+91 123 456 7890', status: 'Active' },
    { id: 4, name: 'Arlene McCoy', contact: '+91 123 456 7890', status: 'Active' },
    { id: 5, name: 'Jane Cooper', contact: '+91 123 456 7890', status: 'Active'},
    { id: 6, name: 'Ralph Edwards', contact: '+91 123 456 7890', status: 'Active' },
  ];

  return (
    <HomeContainer>
      <Section>
        <SectionHeader>
          <SectionTitle>Booking Requests</SectionTitle>
          <ViewAllLink to="/bookings">View all »</ViewAllLink>
        </SectionHeader>
        <BookingRequestsContainer>
          {bookingRequests.map((booking) => (
            <BookingCard key={booking.id}>
              <BookingId>{booking.id}</BookingId>
              <BookingDetails>{booking.address}</BookingDetails>
              <BookingDetails>Booking Name: {booking.name}</BookingDetails>
              <BookingDetails>{booking.date} | {booking.time}</BookingDetails>
              <BookingActions>
                <DeclineButton>Decline</DeclineButton>
                <AcceptButton>Accept</AcceptButton>
              </BookingActions>
            </BookingCard>
          ))}
        </BookingRequestsContainer>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>My Runners</SectionTitle>
          <ViewAllLink to="/manage-runner">View all »</ViewAllLink>
        </SectionHeader>
        <RunnersTable>
          <TableHead>
            <TableRow>
              <TableHeader>Runner Name</TableHeader>
              <TableHeader>Runner Contact</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>View</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {runners.map((runner) => (
              <TableRow key={runner.id}>
                <TableCell>
                <RunnerCell>
    <RunnerAvatar src={runner.avatar}>
      {runner.name && runner.name.charAt(0)}
    </RunnerAvatar>
    <RunnerName>{runner.name}</RunnerName>
  </RunnerCell>
                </TableCell>
                <TableCell>{runner.contact}</TableCell>
                <TableCell>{runner.status}</TableCell>
                <TableCell>
                  <ViewIcon><img src={viewIcon} alt="View" /></ViewIcon>
                  <EditIcon><img src={editIcon} alt="Edit" /></EditIcon>
                  <DeleteIcon><img src={deleteIcon} alt="Delete" /></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </RunnersTable>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Environmental Report</SectionTitle>
          <select>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </SectionHeader>
        <EnvironmentalReportContainer>
          <ReportCard>
            <ReportIcon src={waterIcon} alt="Water saved" />
            <ReportValue color="#5CB1FF">400</ReportValue>
            <ReportLabel>Water saved till now</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportIcon src={pesticideIcon} alt="Pesticide usage" />
            <ReportValue color="#F1614B">40%</ReportValue>
            <ReportLabel>Pesticide till now</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportIcon src={carbonFootprintIcon} alt="Carbon footprint" />
            <ReportValue color="#41B079">40%</ReportValue>
            <ReportLabel>Carbon footprint</ReportLabel>
          </ReportCard>
        </EnvironmentalReportContainer>
      </Section>
    </HomeContainer>
  );
};

export default Home;