import React, { useState } from 'react';
import styled from 'styled-components';
import waterIcon from '../../assets/water-icon.png';
import pesticideIcon from '../../assets/pesticide-icon.png';
import carbonFootprintIcon from '../../assets/carbon-footprint-icon.png';
import droneSprayingIcon from '../../assets/drone-spraying.png';
import batteryEfficiencyIcon from '../../assets/battery-efficiency.png';
import droneRoiIcon from '../../assets/drone-roi.png';
import cropYieldIcon from '../../assets/crop-yield.png';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const ReportSection = styled.div`
  margin-bottom: 40px;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
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
  const [envFilterType, setEnvFilterType] = useState('weekly');
  const [ecoFilterType, setEcoFilterType] = useState('weekly');
  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleEnvFilterChange = (event) => {
    setEnvFilterType(event.target.value);
  };

  const handleEcoFilterChange = (event) => {
    setEcoFilterType(event.target.value);
  };

  const handleWeekChange = (week) => {
    setSelectedWeek(week);
  };

  return (
    <Container>
      <Title>Reports</Title>
      
      <ReportSection>
        <ReportHeader>
          <ReportTitle>Environmental Report</ReportTitle>
          <Select value={envFilterType} onChange={handleEnvFilterChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </ReportHeader>
        {/* {envFilterType === 'monthly' && (
          <Select>
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Select>
        )} */}
        <ReportGrid columns={4}>
          <ReportCard>
            <ReportLabel>Water saved till now</ReportLabel>
            <ReportIcon src={waterIcon} alt="Water saved" />
            <ReportValue color="#5CBEFF">400</ReportValue>
            <ReportLabel>litres</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Pesticide till now</ReportLabel>
            <ReportIcon src={pesticideIcon} alt="Pesticide saved" />
            <ReportValue color="#FF826E">40%</ReportValue>
            <ReportLabel>decrease</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Carbon footprint</ReportLabel>
            <ReportIcon src={carbonFootprintIcon} alt="Carbon footprint" />
            <ReportValue color="#6AD34D">40%</ReportValue>
            <ReportLabel>Less</ReportLabel>
          </ReportCard>
          
        </ReportGrid>
      </ReportSection>

      <ReportSection>
        <ReportHeader>
          <ReportTitle>Economic Report</ReportTitle>
          <Select value={ecoFilterType} onChange={handleEcoFilterChange}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </ReportHeader>
        {/* {ecoFilterType === 'monthly' && (
          <Select>
            <option value="">Select Month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Select>
        )} */}
        <ReportGrid columns={4}>
          <ReportCard>
            <ReportLabel>ROI for Drone spraying</ReportLabel>
            <ReportIcon src={droneSprayingIcon} alt="ROI for Drone spraying" />
            <ReportValue color="#5CBEFF">40%</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Battery efficiency</ReportLabel>
            <ReportIcon src={batteryEfficiencyIcon} alt="Battery efficiency" />
            <ReportValue color="#FF826E">8.5</ReportValue>
            <ReportLabel>Hours</ReportLabel>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Drone ROI/ Drone life</ReportLabel>
            <ReportIcon src={droneRoiIcon} alt="Drone ROI/Drone life" />
            <ReportValue color="#6AD34D">65%</ReportValue>
          </ReportCard>
          <ReportCard>
            <ReportLabel>Crop yield comparison</ReportLabel>
            <ReportIcon src={cropYieldIcon} alt="Crop yield comparison" />
            <ReportValue color="#FFC107">40%</ReportValue>
            <ReportLabel>increased</ReportLabel>
          </ReportCard>
        </ReportGrid>
      </ReportSection>
    </Container>
  );
};

export default Reports;
