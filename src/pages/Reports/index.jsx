import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import waterIcon from '../../assets/water-icon.png';
import pesticideIcon from '../../assets/pesticide-icon.png';
import carbonFootprintIcon from '../../assets/carbon-footprint-icon.png';
import droneSprayingIcon from '../../assets/drone-spraying.png';
import batteryEfficiencyIcon from '../../assets/battery-efficiency.png';
import droneRoiIcon from '../../assets/drone-roi.png';
import cropYieldIcon from '../../assets/crop-yield.png';
import { FaDownload } from "react-icons/fa";
import { getAllBookingsList } from '../../services/commonService';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ReportSection = styled.div`
  margin-bottom: 40px;
`;

const ReportHeader = styled.div`
  margin-bottom: 20px;
`;

const ReportTitle = styled.h3`
  font-size: 20px;
  color: #333;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  min-width: 150px;
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 20px;
`;

const ReportCard = styled.div`
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ReportIcon = styled.img`
  width: 60px;
  height: 60px;
  margin: 10px;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Public Sans";
  font-size: 14px;
  svg {
    margin-left: 8px;
  }
`;

const ReportValue = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.color || '#333'};
`;

const ReportLabel = styled.span`
  font-size: 14px;
  color: #666;
`;

const Reports = () => {
  const [bookings, setBookings] = useState([]);
  const [dateFilter, setDateFilter] = useState('yearly');
  const [environmentalStats, setEnvironmentalStats] = useState({
    waterSaved: 0,
    pesticideReduction: 0,
    carbonFootprint: 0
  });
  const [economicStats, setEconomicStats] = useState({
    roiDroneSpraying: 0,
    batteryEfficiency: 0,
    droneRoi: 0,
    yieldImprovement: 0
  });

  const vendorId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [bookings, dateFilter]);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookingsList();
      console.log('Bookings:', response.data);
      console.log(vendorId,'----------------vendor booking');
      const vendorBookings = response.data.filter(booking => booking.vendor?._id === vendorId);
      console.log('Vendor bookings:', vendorBookings);
      setBookings(vendorBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

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

  const calculateStats = () => {
    const filteredBookings = filterBookingsByDate(bookings).filter(booking => 
      booking.status === "completed" || booking.status === "closed"
    );

    if (filteredBookings.length === 0) {
      setEnvironmentalStats({
        waterSaved: 0,
        pesticideReduction: 0,
        carbonFootprint: 0
      });
      setEconomicStats({
        roiDroneSpraying: 0,
        batteryEfficiency: 0,
        droneRoi: 0,
        yieldImprovement: 0
      });
      return;
    }

    const calculateEnvironmentalStats = () => {
      const totalWaterSaved = filteredBookings.reduce((sum, booking) => sum + (booking.droneWaterUsage || 0), 0);
      const totalPesticide = filteredBookings.reduce((sum, booking) => sum + (booking.dronePesticideUsage || 0), 0);
      const totalEmissions = filteredBookings.reduce((sum, booking) => sum + (booking.emissionSavedPerHectare || 0), 0);

      setEnvironmentalStats({
        waterSaved: totalWaterSaved,
        pesticideReduction: totalPesticide ? (totalPesticide / filteredBookings.length) * 100 : 0,
        carbonFootprint: totalEmissions ? (totalEmissions / filteredBookings.length) * 100 : 0
      });
    };

    const calculateEconomicStats = () => {
      const totalROI = filteredBookings.reduce((sum, booking) => {
        const revenue = booking.cropOutputPerAcre || 0;
        const cost = booking.quotePrice || 0;
        return sum + (cost ? ((revenue - cost) / cost) * 100 : 0);
      }, 0);

      const batteryEfficiency = filteredBookings.reduce((sum, booking) => {
        const flightHours = parseInt(booking.droneFlightHours || 0);
        const cycles = booking.chargeCycles || 1;
        return sum + (flightHours / cycles);
      }, 0);

      const droneROI = filteredBookings.reduce((sum, booking) => {
        const revenue = booking.cropOutputPerAcre || 0;
        const cost = booking.quotePrice || 0;
        const flightHours = parseInt(booking.droneFlightHours || 0);
        return sum + (flightHours ? (revenue - cost) / flightHours : 0);
      }, 0);

      const yieldImprovement = filteredBookings.reduce((sum, booking) => {
        const cropOutput = booking.cropOutputPerAcre || 0;
        const avgOutput = 1500;
        return sum + ((cropOutput - avgOutput) / avgOutput) * 100;
      }, 0);

      setEconomicStats({
        roiDroneSpraying: filteredBookings.length ? totalROI / filteredBookings.length : 0,
        batteryEfficiency: filteredBookings.length ? batteryEfficiency / filteredBookings.length : 0,
        droneRoi: filteredBookings.length ? droneROI / filteredBookings.length : 0,
        yieldImprovement: filteredBookings.length ? yieldImprovement / filteredBookings.length : 0
      });
    };

    calculateEnvironmentalStats();
    calculateEconomicStats();
  };

  const exportToExcel = () => {
    const filteredBookings = filterBookingsByDate(bookings)
      .filter(booking => booking.status === "completed" || booking.status === "closed");
    
    if (filteredBookings.length === 0) {
      toast.info("No KPI data available for the selected period");
      return;
    }

    const data = filteredBookings.map(booking => ({
      "Booking ID": booking._id || '',
      "Date": new Date(booking.date).toLocaleDateString(),
      "Farmer Name": booking.farmerName || '',
      "Farm Area": booking.farmArea || 0,
      "Location": booking.farmLocation || '',
      "Crop Name": booking.cropName || '',
      "Status": booking.status || '',
      
      // Environmental Metrics
      "Water Usage (L)": booking.droneWaterUsage || 0,
      "Pesticide Usage": booking.dronePesticideUsage || 0,
      "Emission Saved (kg CO2/ha)": booking.emissionSavedPerHectare || 0,
      
      // Economic Metrics
      "Quote Price": booking.quotePrice || 0,
      "Crop Output Per Acre": booking.cropOutputPerAcre || 0,
      "Flight Hours": booking.droneFlightHours || 0,
      "Charge Cycles": booking.chargeCycles || 0
    }));

    const summaryData = [{
      "Report Period": dateFilter,
      "Generated Date": new Date().toLocaleDateString(),
      "Total Bookings": filteredBookings.length,
      
      // Environmental Summary
      "Total Water Saved": environmentalStats.waterSaved,
      "Average Pesticide Reduction": environmentalStats.pesticideReduction,
      "Average Carbon Footprint": environmentalStats.carbonFootprint,
      
      // Economic Summary
      "Average ROI": economicStats.roiDroneSpraying,
      "Average Battery Efficiency": economicStats.batteryEfficiency,
      "Average Drone ROI": economicStats.droneRoi,
      "Average Yield Improvement": economicStats.yieldImprovement
    }];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    
    ws['!cols'] = Object.keys(data[0] || {}).map(() => ({ wch: 20 }));
    wsSummary['!cols'] = Object.keys(summaryData[0] || {}).map(() => ({ wch: 25 }));
    
    XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
    XLSX.utils.book_append_sheet(wb, ws, "Detailed Report");
    
    XLSX.writeFile(wb, `Complete_Report_${dateFilter}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>Reports</Title>
        <FilterGroup>
          <Select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </Select>
          <DownloadButton onClick={exportToExcel}>
            Export Complete Report <FaDownload />
          </DownloadButton>
        </FilterGroup>
      </HeaderContainer>
      
      <ReportSection>
        <ReportHeader>
          <ReportTitle>Environmental Report</ReportTitle>
        </ReportHeader>
        <ReportGrid columns={3}>
          <ReportCard>
            <ReportLabel>Water saved till now</ReportLabel>
            <ReportIcon src={waterIcon} alt="Water saved" />
            <ReportValue color="#5CBEFF">
              {environmentalStats.waterSaved.toFixed(2)}
            </ReportValue>
            <ReportLabel>litres</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Pesticide till now</ReportLabel>
            <ReportIcon src={pesticideIcon} alt="Pesticide saved" />
            <ReportValue color="#FF826E">
              {environmentalStats.pesticideReduction.toFixed(1)}%
            </ReportValue>
            <ReportLabel>decrease</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Carbon footprint</ReportLabel>
            <ReportIcon src={carbonFootprintIcon} alt="Carbon footprint" />
            <ReportValue color="#6AD34D">
              {environmentalStats.carbonFootprint.toFixed(1)}%
            </ReportValue>
            <ReportLabel>Less</ReportLabel>
          </ReportCard>
        </ReportGrid>
      </ReportSection>

      <ReportSection>
        <ReportHeader>
          <ReportTitle>Economic Report</ReportTitle>
        </ReportHeader>
        <ReportGrid columns={4}>
          <ReportCard>
            <ReportLabel>ROI for Drone spraying</ReportLabel>
            <ReportIcon src={droneSprayingIcon} alt="ROI for Drone spraying" />
            <ReportValue color="#5CBEFF">
              {economicStats.roiDroneSpraying.toFixed(1)}%
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Battery efficiency</ReportLabel>
            <ReportIcon src={batteryEfficiencyIcon} alt="Battery efficiency" />
            <ReportValue color="#FF826E">
              {economicStats.batteryEfficiency.toFixed(1)}
            </ReportValue>
            <ReportLabel>Hours</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Drone ROI/ Drone life</ReportLabel>
            <ReportIcon src={droneRoiIcon} alt="Drone ROI/Drone life" />
            <ReportValue color="#6AD34D">
              {economicStats.droneRoi.toFixed(1)}%
            </ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Crop yield comparison</ReportLabel>
            <ReportIcon src={cropYieldIcon} alt="Crop yield comparison" />
            <ReportValue color="#FFC107">
              {economicStats.yieldImprovement.toFixed(1)}%
            </ReportValue>
            <ReportLabel>increased</ReportLabel>
          </ReportCard>
          </ReportGrid>
      </ReportSection>
    </Container>
  );
};
export default Reports;