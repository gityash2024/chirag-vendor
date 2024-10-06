import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LocationOn from "@mui/icons-material/LocationOn";
import CalendarToday from "@mui/icons-material/CalendarToday";
import AccessTime from "@mui/icons-material/AccessTime";
import Opacity from "@mui/icons-material/Opacity";
import CloseIcon from "@mui/icons-material/Close";
import successWithdrawalCheck from "../../assets/check-wallet.svg";
import Avatar from '@mui/icons-material/AccountCircle';

import Phone from '@mui/icons-material/Phone';

import noBookingsImage from "../../assets/no-booking.png";
import {
  getAllBookingsList,
  acceptBooking,
  updateBooking,
  assignBookingToRunner,
} from "../../services/commonService";
import { toast } from "react-toastify";

const BookingsContainer = styled.div`
  padding: 20px;
  font-family: "Public Sans", sans-serif;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: rgba(18, 18, 18, 1);
  margin-bottom: 20px;
  line-height: 37.6px;
  font-family: "Public Sans";
`;

const SuccessIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: ${(props) => (props.active ? "#000000" : "#8D98A4")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "2px solid #000000" : "none")};
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  background-color: ${(props) => {
    if (props.status === "requested") return "#FDF0CC";
    if (props.status === "quote_received") return "#CDCCFD";
    if (props.status === "confirmed") return "#E8FFF3";
    if (props.status === "completed") return "#E0E0E0";
    return "#FFF0F1";
  }};
`;

const BookingDetails = styled.p`
  font-size: 14px;
  font-weight: 400;
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
  justify-content: space-between;
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
`;

const Humidity = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
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

const ActionButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 4px;
  background-color: ${(props) => (props.primary ? "#000000" : "#FFFFFF")};
  color: ${(props) => (props.primary ? "#FFFFFF" : "#000000")};
  border: ${(props) => (props.primary ? "none" : "1px solid #000000")};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  font-family: "Public Sans";
  font-weight: 500;
  line-height: 17.6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background: ${(props) => (props.active ? "#000" : "white")};
  color: ${(props) => (props.active ? "white" : "#000")};
  border: 1px solid #000;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 38px;
  border-radius: 8px;
  width: 478px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 28px;
  line-height: 38px;
  font-weight: 600;
  font-family: Montserrat;
`;

const PriceInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  width: 40%;
  padding: 10px;
  background-color: rgba(56, 56, 56, 1);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 16.24px;
  font-weight: 600;
  font-family: Montserrat;
`;

const SuccessModal = styled(ModalContent)`
  text-align: center;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const EmptyStateImage = styled.img`
  width: 200px;
  height: 400px;
  margin-bottom: 20px;
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
`;

const PriceLabel = styled.h3`
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: 500;
  line-height: 13.92px;
  font-family: "Public Sans";
  color: rgba(141, 152, 164, 1);
`;

const Bookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Requests via Farmer");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [price, setPrice] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState({});
  const [loading, setLoading] = useState(true);
  const bookingsPerPage = 9;
  const user = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllBookingsList();
      const filteredBookings = response.data.filter(
        (booking) => booking.vendor?._id === user
      );
      const categorizedBookings = {
        "Requests via Farmer": filteredBookings.filter(
          (b) => b.status === "requested" && b.requestToVendorVia === "farmer"
        ),
        "Requests via admin": filteredBookings.filter(
          (b) => b.status === "requested" && b.requestToVendorVia === "admin"
        ),
        "Quote sent": filteredBookings.filter(
          (b) => b.status === "quote_received"
        ),
        "Assign Runner": filteredBookings.filter(
          (b) => b.status === "confirmed" && !b.runner
        ),
        "Confirmed Bookings": filteredBookings.filter((b) =>
          ["confirmed", "completed", "closed"].includes(b.status)
        ),
      };
      setBookings(categorizedBookings);
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (booking) => {
    try {
      const reason = prompt("Please enter a reason for rejection:");
      if (reason) {
        await updateBooking({ id: booking._id, status: "cancelled", reason });
        toast.success("Booking rejected successfully");
        fetchBookings();
      }
    } catch (error) {
      toast.error("Failed to reject booking");
    }
  };

  const handleAccept = (booking) => {
    setSelectedBooking(booking);
    setShowPriceModal(true);
  };

  const handlePriceSubmit = async () => {
    try {
      await updateBooking({
        id: selectedBooking._id,
        status: "quote_received",
        quotePrice: price,
      });
      setShowPriceModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        fetchBookings();
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit quote");
    }
  };

  const handleAssignRunner = (id) => {
    navigate(`/assign-runner/${id}`);
  };

  const renderBookings = () => {
    const currentBookings = bookings[activeTab] || [];
    const indexOfLastItem = currentPage * bookingsPerPage;
    const indexOfFirstItem = indexOfLastItem - bookingsPerPage;
    const currentItems = currentBookings.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    if (currentItems.length === 0) {
      return (
        <>
        <EmptyStateContainer></EmptyStateContainer>
        <EmptyStateContainer>
          <EmptyStateImage src={noBookingsImage} alt="No bookings" />
          <EmptyStateText>Currently, no bookings available for {activeTab}.</EmptyStateText>
        </EmptyStateContainer>
        </>
      );
    }

    return currentItems.map((booking) => (
      <Card key={booking._id}>
        <CardHeader>
          <BookingId>#{booking._id}</BookingId>
          <StatusBadge status={booking.status}>{booking.status}</StatusBadge>
        </CardHeader>
        <BookingDetails>
          <LocationOn /> {booking.farmLocation}
        </BookingDetails>
        <DateTimeRow>
          <BookingDetails>
            <CalendarToday /> {new Date(booking.date).toLocaleDateString()}
          </BookingDetails>
          <BookingDetails>
            <AccessTime /> {booking.time}
          </BookingDetails>
        </DateTimeRow>
        <BookingDetails>Booking Name: {booking.farmerName}</BookingDetails>
        <BookingDetails>Farm Area: {booking.farmArea} Acres</BookingDetails>
        <TempHumidityCropRow>
          <TempHumidity>
            <Temperature>{booking.weather}</Temperature>
            <Humidity>
              <Opacity /> {booking.weather}
            </Humidity>
          </TempHumidity>
          <Crop>Crop: {booking.cropName}</Crop>
        </TempHumidityCropRow>
        {booking.quotePrice && (
          <PriceSummary>Quoted Price: ₹{booking.quotePrice}</PriceSummary>
        )}
          {booking.runner && (
        <RunnerDetails>
          <strong>Assigned Runner:</strong>
          <RunnerName>
            <RunnerInfo>
              <AvatarIcon />
              <span>{booking.runner.name}</span>
            </RunnerInfo>
            <RunnerContactButton onClick={(e) => { e.preventDefault(); toast.info(`Calling ${booking.runner.mobileNumber}`); }}>
              <Phone /> Call Now
            </RunnerContactButton>
          </RunnerName>
        </RunnerDetails>
      )}
        {(activeTab === "Requests via Farmer" ||
          activeTab === "Requests via admin") && (
          <ButtonContainer>
            <ActionButton onClick={() => handleDecline(booking)}>
              Decline
            </ActionButton>
            <ActionButton primary onClick={() => handleAccept(booking)}>
              Accept
            </ActionButton>
          </ButtonContainer>
        )}
        {activeTab === "Assign Runner" && (
          <ActionButton primary onClick={() => handleAssignRunner(booking._id)}>
            Assign Runner
          </ActionButton>
        )}
      </Card>
    ));
  };

  return (
    <BookingsContainer>
      <Title>Bookings</Title>
      <TabContainer>
        {Object.keys(bookings).map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardContainer>{renderBookings()}</CardContainer>
          <Pagination>
            {Array.from(
              {
                length: Math.ceil(
                  (bookings[activeTab] || []).length / bookingsPerPage
                ),
              },
              (_, i) => (
                <PageButton
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  active={i + 1 === currentPage}
                >
                  {i + 1}
                </PageButton>
              )
            )}
          </Pagination>
        </>
      )}
      {showPriceModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowPriceModal(false)}>
              <CloseIcon />
            </CloseButton>
            <ModalTitle>Add a Price for this booking</ModalTitle>
            <PriceLabel>Enter Price</PriceLabel>
            <PriceInput
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
            <SubmitButton onClick={handlePriceSubmit}>Submit</SubmitButton>
          </ModalContent>
        </Modal>
      )}
      {showSuccessModal && (
        <Modal>
          <SuccessModal>
            <CloseButton onClick={() => setShowSuccessModal(false)}>
              <CloseIcon />
            </CloseButton>
            <SuccessIcon src={successWithdrawalCheck} alt="Success" />
            <ModalTitle>Quote sent</ModalTitle>
            <p>You will get an update soon</p>
          </SuccessModal>
        </Modal>
      )}
    </BookingsContainer>
  );
};
export default Bookings;
