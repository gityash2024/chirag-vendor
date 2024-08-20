import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #DBDADE;
`;

const Tab = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: transparent;
  color: #5B6572;
  border: none;
  cursor: pointer;
  border-bottom: ${props => props.active ? '2px solid #000' : 'none'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const Content = styled.div`
  background-color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const InputGroup2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #5B6572;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #EEF0F3;
  border-radius: 4px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #EEF0F3;
  border-radius: 4px;
  font-size: 14px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UploadButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const ResetButton = styled.button`
  background-color: transparent;
  border: 1px solid #EEF0F3;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #41B079;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  align-self: flex-start;
`;

const Accordion = styled.div`
  border: 1px solid #DBDADE;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 50%;
`;

const AccordionHeader = styled.div`
  padding: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  padding: 15px;
`;

const AddMoreButton = styled.button`
  background-color: transparent;
  border: 1px solid #41B079;
  color: #41B079;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
`;

const Profile = () => {
  const [activeTab, setActiveTab] = useState('basicDetails');
  const [profileImage, setProfileImage] = useState(null);
  const [droneSpecs, setDroneSpecs] = useState([{}]);
  const [batterySpecs, setBatterySpecs] = useState([{}]);
  const navigate = useNavigate();

  const tabs = ['basicDetails', 'droneSpecs', 'serviceDetails', 'batterySpecs'];

  const handleNext = (event) => {
    event.preventDefault();
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/home');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddDrone = () => {
    setDroneSpecs([...droneSpecs, {}]);
  };

  const handleAddBattery = () => {
    setBatterySpecs([...batterySpecs, {}]);
  };

  return (
    <Container>
      <Title>My Profile</Title>
      <TabContainer>
        <Tab active={activeTab === 'basicDetails'} onClick={() => setActiveTab('basicDetails')}>Basic Details</Tab>
        <Tab active={activeTab === 'droneSpecs'} onClick={() => setActiveTab('droneSpecs')}>Drone Specs</Tab>
        <Tab active={activeTab === 'serviceDetails'} onClick={() => setActiveTab('serviceDetails')}>Service Details</Tab>
        <Tab active={activeTab === 'batterySpecs'} onClick={() => setActiveTab('batterySpecs')}>Battery Specs</Tab>
      </TabContainer>
      <Content>
        {activeTab === 'basicDetails' && (
          <Form onSubmit={handleNext}>
            <ImageUploadContainer>
              <ImagePreview onClick={() => document.getElementById('fileInput').click()}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                ) : (
                  <AddIcon style={{fontSize: 40, color: '#333'}} />
                )}
              </ImagePreview>
              <input id="fileInput" type="file" hidden onChange={handleImageUpload} accept="image/*" />
              <UploadButton onClick={() => document.getElementById('fileInput').click()}>
                Upload new photo
              </UploadButton>
              <ResetButton onClick={() => setProfileImage(null)}>Reset</ResetButton>
            </ImageUploadContainer>
            <InputGroup>
              <Label>Full Name *</Label>
              <Input type="text" placeholder="Enter your full name" />
            </InputGroup>
            <InputGroup>
              <Label>Mobile Number *</Label>
              <Input type="tel" placeholder="Enter your mobile number" />
            </InputGroup>
            <InputGroup>
              <Label>Address</Label>
              <Input type="text" placeholder="Enter your address" />
            </InputGroup>
            <InputGroup>
              <Label>City</Label>
              <Input type="text" placeholder="Enter your city" />
            </InputGroup>
            <InputGroup>
              <Label>State</Label>
              <Select>
                <option value="">Select your state</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Karnataka">Karnataka</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>Aadhaar Card</Label>
              <Input type="file" accept="image/*" />
            </InputGroup>
            <InputGroup>
              <Label>Drone pilot license</Label>
              <Input type="text" placeholder="Enter your drone pilot license number" />
            </InputGroup>
            <InputGroup>
              <Label>UIN number</Label>
              <Input type="text" placeholder="Enter your UIN number" />
            </InputGroup>
            <SubmitButton type="submit">Next</SubmitButton>
          </Form>
        )}
        {activeTab === 'droneSpecs' && (
          <Form onSubmit={handleNext}>
            {droneSpecs.map((drone, index) => (
              <Accordion key={index}>
                <AccordionHeader>Drone {index + 1}</AccordionHeader>
                <AccordionContent>
                  <InputGroup2>
                    <Label>Drone Model</Label>
                    <Input type="text" placeholder="Enter drone model" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Speed of Drone</Label>
                    <Input type="number" placeholder="Enter speed in km/h" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Flow Rate of the Drone</Label>
                    <Input type="number" placeholder="Enter flow rate" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Payload Capacity (in kgs)</Label>
                    <Input type="number" placeholder="Enter payload capacity" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Drone Images</Label>
                    <Input type="file" accept="image/*" multiple />
                  </InputGroup2>
                </AccordionContent>
              </Accordion>
            ))}
            <ButtonContainer>
              <SubmitButton type="submit">Next</SubmitButton>
              <AddMoreButton type="button" onClick={handleAddDrone}>Add More</AddMoreButton>
            </ButtonContainer>
          </Form>
        )}
        {activeTab === 'serviceDetails' && (
          <Form onSubmit={handleNext}>
            <InputGroup>
              <Label>Experience of providing this service</Label>
              <Input type="number" placeholder="Enter years of experience" />
            </InputGroup>
            <InputGroup>
              <Label>Approx Pricing for 1 acre of land service for general crop</Label>
              <Input type="number" placeholder="Enter price in INR" />
            </InputGroup>
            <InputGroup>
              <Label>Location you are providing service for</Label>
              <Select>
                <option value="">Select location</option>
                <option value="Village">Village</option>
                <option value="City">City</option>
                <option value="District">District</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <Label>City</Label>
              <Input type="text" placeholder="Enter city name" />
            </InputGroup>
            <InputGroup>
              <Label>State</Label>
              <Select>
                <option value="">Select state</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Karnataka">Karnataka</option>
              </Select>
            </InputGroup>
            <SubmitButton type="submit">Next</SubmitButton>
          </Form>
        )}
        {activeTab === 'batterySpecs' && (
          <Form onSubmit={handleSubmit}>
            {batterySpecs.map((battery, index) => (
              <Accordion key={index}>
                <AccordionHeader>Battery {index + 1}</AccordionHeader>
                <AccordionContent>
                  <InputGroup2>
                    <Label>Battery Model</Label>
                    <Input type="text" placeholder="Enter battery model" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Capacity</Label>
                    <Input type="text" placeholder="Enter battery capacity" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Life Cycle</Label>
                    <Input type="number" placeholder="Enter life cycle" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Voltage</Label>
                    <Input type="number" placeholder="Enter voltage" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Ampere</Label>
                    <Input type="number" placeholder="Enter ampere" />
                  </InputGroup2>
                  <InputGroup2>
                    <Label>Manufacturer</Label>
                    <Input type="text" placeholder="Enter manufacturer name" />
                  </InputGroup2>
                </AccordionContent>
              </Accordion>
            ))}
            <ButtonContainer>
              <SubmitButton type="submit">Submit</SubmitButton>
              <AddMoreButton type="button" onClick={handleAddBattery}>Add More</AddMoreButton>
            </ButtonContainer>
          </Form>
        )}
      </Content>
    </Container>
  );
};

export default Profile;