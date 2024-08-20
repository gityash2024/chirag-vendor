import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import deleteIcon from '../../assets/delete-icon.png';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
`;

const TopControls = styled.div`
  display: flex;
  align-items: center;
`;

const EntriesDropdown = styled.select`
  padding: 8px;
  margin-right: 20px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  width: 200px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #F9FAFC;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #F9FAFC;
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  color: #4B465C;
  font-weight: 600;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #E0E0E0;
  color: #4B465C;
`;

const RunnerCell = styled.div`
  display: flex;
  align-items: center;
`;

const RunnerAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #E0E0E0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-weight: 600;
  color: #4B465C;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => props.active ? '#E8FFF3' : '#FFF0F1'};
  color: ${props => props.active ? '#28C76F' : '#EA5455'};
`;

const ActionIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #E0E0E0;
  background-color: ${props => props.active ? '#000000' : 'white'};
  color: ${props => props.active ? 'white' : '#4B465C'};
  cursor: pointer;
`;

const ManageRunner = () => {
  const [runners] = useState([
    { id: 1, name: 'Jacob Jones', contact: '+91 123 456 7890', status: 'Active' },
    { id: 2, name: 'Darrell Steward', contact: '+91 123 456 7890', status: 'Inactive' },
    { id: 3, name: 'Esther Howard', contact: '+91 123 456 7890', status: 'Active' },
    { id: 4, name: 'Arlene McCoy', contact: '+91 123 456 7890', status: 'Active' },
    { id: 5, name: 'Jane Cooper', contact: '+91 123 456 7890', status: 'Active' },
    { id: 6, name: 'Ralph Edwards', contact: '+91 123 456 7890', status: 'Active' },
    { id: 7, name: 'Eleanor Pena', contact: '+91 123 456 7890', status: 'Inactive' },
  ]);

  return (
    <Container>
      <Header>
        <Title>Manage runners</Title>
      </Header>
      <TopControls>
        <EntriesDropdown>
          <option>07</option>
          <option>14</option>
          <option>21</option>
        </EntriesDropdown>
        <SearchInput placeholder="Search..." />
      </TopControls>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Runner Name</TableHeader>
            <TableHeader>Runner Contact</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {runners.map(runner => (
            <TableRow key={runner.id}>
              <TableCell>
                <RunnerCell>
                  <RunnerAvatar>{runner.name[0]}</RunnerAvatar>
                  {runner.name}
                </RunnerCell>
              </TableCell>
              <TableCell>{runner.contact}</TableCell>
              <TableCell>
                <StatusBadge active={runner.status === 'Active'}>{runner.status}</StatusBadge>
              </TableCell>
              <TableCell>
              <Link to={`/edit-runner/${runner.id}/${true}`}>
                <ActionIcon src={viewIcon} alt="View" />
                </Link>
                <Link to={`/edit-runner/${runner.id}`}>
                  <ActionIcon src={editIcon} alt="Edit" />
                </Link>
                <ActionIcon src={deleteIcon} alt="Delete" />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageButton>Previous</PageButton>
        <PageButton active>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton>Next</PageButton>
      </Pagination>
    </Container>
  );
};

export default ManageRunner;

