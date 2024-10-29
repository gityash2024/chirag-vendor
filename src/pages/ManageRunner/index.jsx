import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import viewIcon from '../../assets/view-icon.png';
import editIcon from '../../assets/edit-icon.png';
import deleteIcon from '../../assets/delete-icon.png';
import { getAllRunnersList, blockRunner } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import {useTranslation} from '../../TranslationContext';

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

const ActionIcon2 = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  
  svg {
    width: 100%;
    height: 100%;
  }
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${props => props.confirm ? '#28C76F' : '#EA5455'};
  color: white;
`;

const UnblockIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
  </svg>
);

const ManageRunner = () => {
  const {translate} = useTranslation();
  const [runners, setRunners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRunner, setSelectedRunner] = useState(null);

  useEffect(() => {
    fetchRunners();
  }, []);

  const fetchRunners = async () => {
    setLoading(true);
    try {
      const response = await getAllRunnersList();
      setRunners(response.data);
    } catch (error) {
      toast.error('Failed to fetch runners');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleBlockRunner = (runner) => {
    setSelectedRunner(runner);
    setShowModal(true);
  };

  const confirmBlockRunner = async () => {
    if (!selectedRunner) return;

    const dts = {
      runnerId: selectedRunner._id,
      isBlocked: !selectedRunner.isBlocked
    };

    try {
      await blockRunner(dts);
      toast.success(selectedRunner.isBlocked ? 'Runner unblocked successfully' : 'Runner blocked successfully');
      fetchRunners();
    } catch (error) {
      toast.error('Failed to block runner');
    } finally {
      setShowModal(false);
      setSelectedRunner(null);
    }
  };

  const handleEntriesChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredRunners = runners.filter(runner =>
    runner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    runner.mobileNumber.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRunners.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

return (
    <Container>
      <Header>
        <Title>{translate('manageRunner.title')}</Title>
      </Header>
      <TopControls>
        <EntriesDropdown onChange={handleEntriesChange} value={itemsPerPage}>
          <option value={7}>07</option>
          <option value={14}>14</option>
          <option value={21}>21</option>
        </EntriesDropdown>
        <SearchInput 
          placeholder={translate('manageRunner.search')} 
          value={searchTerm} 
          onChange={handleSearch} 
        />
      </TopControls>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{translate('manageRunner.table.headers.runnerName')}</TableHeader>
                <TableHeader>{translate('manageRunner.table.headers.runnerContact')}</TableHeader>
                <TableHeader>{translate('manageRunner.table.headers.status')}</TableHeader>
                <TableHeader>{translate('manageRunner.table.headers.actions')}</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {currentItems.map(runner => (
                <TableRow key={runner._id}>
                  <TableCell>
                    <RunnerCell>
                      <RunnerAvatar>{runner.name[0]}</RunnerAvatar>
                      {runner.name}
                    </RunnerCell>
                  </TableCell>
                  <TableCell>{runner.mobileNumber}</TableCell>
                  <TableCell>
                    <StatusBadge active={!runner.isBlocked}>
                      {runner.isBlocked 
                        ? translate('manageRunner.table.status.inactive')
                        : translate('manageRunner.table.status.active')}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Link to={`/edit-runner/${runner._id}/${true}`}>
                      <ActionIcon src={viewIcon} alt="View" />
                    </Link>
                    <Link to={`/edit-runner/${runner._id}`}>
                      <ActionIcon src={editIcon} alt="Edit" />
                    </Link>
                    {runner.isBlocked ? (
                      <ActionIcon2 onClick={() => handleBlockRunner(runner)}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
                        </svg>
                      </ActionIcon2>
                    ) : (
                      <ActionIcon onClick={() => handleBlockRunner(runner)} src={deleteIcon} alt="Block" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <PageButton 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              {translate('manageRunner.pagination.previous')}
            </PageButton>
            {Array.from({ length: Math.ceil(filteredRunners.length / itemsPerPage) }, (_, i) => (
              <PageButton 
                key={i} 
                active={currentPage === i + 1} 
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </PageButton>
            ))}
            <PageButton 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === Math.ceil(filteredRunners.length / itemsPerPage)}
            >
              {translate('manageRunner.pagination.next')}
            </PageButton>
          </Pagination>
        </>
      )}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>
              {selectedRunner?.isBlocked 
                ? translate('manageRunner.modal.unblock.title')
                : translate('manageRunner.modal.block.title')}
            </h2>
            <p>
              {selectedRunner?.isBlocked 
                ? translate('manageRunner.modal.unblock.message')
                : translate('manageRunner.modal.block.message')}
            </p>
            <ModalButtons>
              <ModalButton onClick={() => setShowModal(false)}>
                {translate('manageRunner.modal.buttons.cancel')}
              </ModalButton>
              <ModalButton confirm onClick={confirmBlockRunner}>
                {translate('manageRunner.modal.buttons.confirm')}
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default ManageRunner;