import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import waterIcon from '../../assets/water-icon.png';
import pesticideIcon from '../../assets/pesticide-icon.png';
import carbonFootprintIcon from '../../assets/carbon-footprint-icon.png';
import deleteIcon from '../../assets/delete-icon.png';
import editIcon from '../../assets/edit-icon.png';
import viewIcon from '../../assets/view-icon.png';
import { getAllBookingsList, updateBooking, getAllRunnersList } from '../../services/commonService';
import { useTranslation } from '../../TranslationContext';
import noBookingsImage from "../../assets/no-booking.png";
import Loader from '../../components/loader/index';
const HomeContainer = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const Environmental_wraper = styled.div`
  max-width:fit-content;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: rgba(18, 18, 18, 1);
  line-height: 37.6px;
  font-family: 'Public Sans';
`;

const ViewAllLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-family: 'Public Sans';
  line-height: 32.9px;
  font-weight: 400;
  color: rgba(35, 33, 42, 1);
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
  border: 1px solid rgba(245, 246, 247, 1);
`;

const TableHead = styled.thead`
  background-color: rgba(245, 246, 247, 1);
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
  color:rgba(91, 101, 114, 1);
  border-bottom: 1px solid rgba(245, 246, 247, 1);

  &:last-child {
    text-align: right;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(245, 246, 247, 1);

  &:last-child {
    text-align: right;
  }
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
  min-width:296px;
  max-width:300px;
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

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

const EmptyStateMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 20px;
`;

const EmptyStateImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;



const Home = () => {
  const { translate } = useTranslation();
  const [bookingRequests, setBookingRequests] = useState([]);
  const [runners, setRunners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('yearly');
  const [environmentalStats, setEnvironmentalStats] = useState({
    waterSaved: 0,
    pesticideReduction: 0,
    carbonFootprint: 0
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (bookingRequests.length > 0) {
      calculateEnvironmentalStats();
    }
  }, [bookingRequests, dateFilter]);

  const filterBookingsByDate = (bookings) => {
    const now = new Date();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      switch (dateFilter) {
        case 'weekly':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return bookingDate >= weekAgo;
        case 'monthly':
          const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          return bookingDate >= monthAgo;
        case 'yearly':
          const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          return bookingDate >= yearAgo;
        default:
          return true;
      }
    });
  };

  const calculateEnvironmentalStats = () => {
    const vendorBookings = bookingRequests.filter(booking => 
      booking?.vendor?._id === user?._id
    );

    const completedBookings = filterBookingsByDate(vendorBookings).filter(booking => 
      booking.status === "completed" || booking.status === "closed"
    );

    if (completedBookings.length === 0) {
      setEnvironmentalStats({
        waterSaved: 0,
        pesticideReduction: 0,
        carbonFootprint: 0
      });
      return;
    }

    const totalWaterSaved = completedBookings.reduce((sum, booking) => 
      sum + (booking.droneWaterUsage || 0), 0
    );

    const totalPesticide = completedBookings.reduce((sum, booking) => 
      sum + (booking.dronePesticideUsage || 0), 0
    );

    const totalEmissions = completedBookings.reduce((sum, booking) => 
      sum + (booking.emissionSavedPerHectare || 0), 0
    );

    setEnvironmentalStats({
      waterSaved: totalWaterSaved,
      pesticideReduction: totalPesticide / completedBookings.length,
      carbonFootprint: totalEmissions / completedBookings.length
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const bookingsResponse = await getAllBookingsList();
      const runnersResponse = await getAllRunnersList();
      
      const vendorBookings = bookingsResponse.data.filter(booking => 
        booking?.vendor?._id === user?._id
      );
      
      const vendorRunners = runnersResponse.data.filter(runner => 
        runner?.vendor === user?._id
      );

      const requestedBookings = vendorBookings.filter(booking => 
        booking.status === 'requested'
      );

      setBookingRequests(vendorBookings);
      setRunners(vendorRunners.slice(0, 6));
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (booking) => {
    setLoading(true);
    try {
      const reason = prompt("Please enter a reason for rejection:");
      if (reason) {
        await updateBooking({ id: booking._id, status: "cancelled", reason });
        toast.success("Booking rejected successfully");
        await fetchData();
      }
    } catch (error) {
      toast.error("Failed to reject booking");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (booking) => {
    setLoading(true);
    try {
      const price = prompt("Please enter a price for this booking:");
      if (price) {
        await updateBooking({
          id: booking._id,
          status: "quote_received",
          quotePrice: price,
        });
        toast.success("Quote sent successfully");
        await fetchData();
      }
    } catch (error) {
      toast.error("Failed to accept booking");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const requestedBookings = bookingRequests.filter(booking => booking.status === 'requested');

  return (
    <HomeContainer>
      <Section>
        <SectionHeader>
          <SectionTitle>{translate('home.bookingRequests')}</SectionTitle>
          <ViewAllLink to="/bookings">{translate('home.viewAll')}</ViewAllLink>
        </SectionHeader>
        <BookingRequestsContainer>
          {requestedBookings.length > 0 ? (
            requestedBookings.slice(0, 3).map((booking) => (
              <BookingCard key={booking._id}>
                <BookingId>#{booking._id}</BookingId>
                <BookingDetails>{booking.farmLocation}</BookingDetails>
                <BookingDetails>{translate('home.bookingName')}: {booking.farmerName}</BookingDetails>
                <BookingDetails>{new Date(booking.date).toLocaleDateString()} | {booking.time}</BookingDetails>
                <BookingActions>
                  <DeclineButton onClick={() => handleDecline(booking)}>{translate('home.decline')}</DeclineButton>
                  <AcceptButton onClick={() => handleAccept(booking)}>{translate('home.accept')}</AcceptButton>
                </BookingActions>
              </BookingCard>
            ))
          ) : (
            <EmptyStateContainer>
              <EmptyStateImage src={noBookingsImage} alt="No bookings" />
              <EmptyStateMessage>{translate('home.noBookings')}</EmptyStateMessage>
            </EmptyStateContainer>
          )}
        </BookingRequestsContainer>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>{translate('home.myRunners')}</SectionTitle>
          <ViewAllLink to="/manage-runner">{translate('home.viewAll')}</ViewAllLink>
        </SectionHeader>
        <RunnersTable>
          <TableHead>
            <TableRow>
              <TableHeader>{translate('home.runnerName')}</TableHeader>
              <TableHeader>{translate('home.runnerContact')}</TableHeader>
              <TableHeader>{translate('home.status')}</TableHeader>
              <TableHeader>{translate('home.action')}</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {runners.map((runner) => (
              <TableRow key={runner._id}>
                <TableCell>
                  <RunnerCell>
                    <RunnerAvatar>
                      {runner.name && runner.name.charAt(0)}
                    </RunnerAvatar>
                    <RunnerName>{runner.name}</RunnerName>
                  </RunnerCell>
                </TableCell>
                <TableCell>{runner.mobileNumber}</TableCell>
                <TableCell>{runner.isBlocked ? translate('home.inactive') : translate('home.active')}</TableCell>
                <TableCell>
                  <ActionIcon onClick={() => navigate(`/edit-runner/${runner._id}/${true}`)}><img src={viewIcon} alt="View" /></ActionIcon>
                  <ActionIcon onClick={() => navigate(`/edit-runner/${runner._id}`)}><img src={editIcon} alt="Edit" /></ActionIcon>
                  <ActionIcon onClick={() => toast.info('Block/Unblock functionality to be implemented')}><img src={deleteIcon} alt="Delete" /></ActionIcon>
                </TableCell>
              </TableRow>
            ))}
            {!runners.length && <TableRow><TableCell style={{ textAlign: 'center' }} colSpan={4}>{translate('home.noData')}</TableCell></TableRow>}
          </tbody>
        </RunnersTable>
      </Section>

      {bookingRequests.some(booking => booking.status === "completed" || booking.status === "closed") && (
        <Environmental_wraper className='Environmental_wraper'> 
          <SectionHeader>
            <SectionTitle>{translate('home.environmentalReport')}</SectionTitle>
            <select 
              className='weekly' 
              value={dateFilter} 
              style={{float: 'right', marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc'}}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </SectionHeader>
          <EnvironmentalReportContainer>
            <ReportCard>
              <ReportIcon src={waterIcon} alt="Water saved" />
              <ReportValue color="#5CB1FF">
                {environmentalStats.waterSaved.toFixed(2)}
              </ReportValue>
              <ReportLabel>{translate('home.waterSaved')}</ReportLabel>
            </ReportCard>
            <ReportCard>
              <ReportIcon src={pesticideIcon} alt="Pesticide usage" />
              <ReportValue color="#F1614B">
                {environmentalStats.pesticideReduction.toFixed(1)}%
              </ReportValue>
              <ReportLabel>{translate('home.pesticideReduction')}</ReportLabel>
            </ReportCard>
            <ReportCard>
              <ReportIcon src={carbonFootprintIcon} alt="Carbon footprint" />
              <ReportValue color="#41B079">
                {environmentalStats.carbonFootprint.toFixed(1)}%
              </ReportValue>
              <ReportLabel>{translate('home.carbonFootprint')}</ReportLabel>
            </ReportCard>
          </EnvironmentalReportContainer>
        </Environmental_wraper>
      )}
    </HomeContainer>
  );
};

export default Home;