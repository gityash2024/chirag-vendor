import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { getVendorByMobileNumber, updateVendorprofile, uploadTos3 } from '../../services/commonService';
import { useTranslation } from '../../TranslationContext';

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
  color: #121212;
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
  overflow: hidden;
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
  const { translate } = useTranslation();

  const [activeTab, setActiveTab] = useState('basicDetails');
  const [isLoading, setIsLoading] = useState(false);
  const [vendorData, setVendorData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    address1: '',
    address2: '',
    state: '',
    city: '',
    droneLicense: '',
    uinNumber: '',
    aadhaarFront: null,
    aadhaarBack: null,
    experience: '',
    pricing: '',
    serviceState: '',
    serviceCity: '',
    village: '',
    drones: [],
    batteries: [],
    profilePic: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.mobileNumber) {
        const response = await getVendorByMobileNumber({ mobileNumber: user.mobileNumber });
        setVendorData(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch vendor data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field) {
      const newArray = [...vendorData[field]];
      newArray[index] = { ...newArray[index], [name]: value };
      setVendorData({ ...vendorData, [field]: newArray });
    } else {
      setVendorData({ ...vendorData, [name]: value });
    }
  };

  const handleImageUpload = async (event, field) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await uploadTos3(formData);
        setVendorData({ ...vendorData, [field]: response.data.fileUrl });
      } catch (error) {
        toast.error('Failed to upload image');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddDrone = () => {
    setVendorData({
      ...vendorData,
      drones: [
        ...vendorData.drones,
        { model: '', speed: '', flowRate: '', payload: '', image: null, manufacturer: '', purchaseYear: '' },
      ],
    });
  };

  const handleAddBattery = () => {
    setVendorData({
      ...vendorData,
      batteries: [
        ...vendorData.batteries,
        { capacity: '', lifeCycles: '', voltage: '', ampere: '', manufacturer: '', purchaseYear: '' },
      ],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateVendorprofile(vendorData);
      toast.success('Profile updated successfully');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Title>{translate('profile.title')}</Title>
      <TabContainer>
        <Tab active={activeTab === 'basicDetails'} onClick={() => setActiveTab('basicDetails')}>
          {translate('profile.tabs.basicDetails')}
        </Tab>
        <Tab active={activeTab === 'droneSpecs'} onClick={() => setActiveTab('droneSpecs')}>
          {translate('profile.tabs.droneSpecs')}
        </Tab>
        <Tab active={activeTab === 'serviceDetails'} onClick={() => setActiveTab('serviceDetails')}>
          {translate('profile.tabs.serviceDetails')}
        </Tab>
        <Tab active={activeTab === 'batterySpecs'} onClick={() => setActiveTab('batterySpecs')}>
          {translate('profile.tabs.batterySpecs')}
        </Tab>
      </TabContainer>
      <Content>
        <Form onSubmit={handleSubmit}>
          {activeTab === 'basicDetails' && (
            <>
              <ImageUploadContainer>
                <ImagePreview onClick={() => document.getElementById('profilePic').click()}>
                  {vendorData.profilePic ? (
                    <img src={vendorData.profilePic} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <AddIcon style={{fontSize: 40, color: '#333'}} />
                  )}
                </ImagePreview>
                <input
                  id="profilePic"
                  type="file"
                  hidden
                  onChange={(e) => handleImageUpload(e, 'profilePic')}
                  accept="image/*"
                />
                <UploadButton onClick={() => document.getElementById('profilePic').click()}>
                  {translate('profile.basicDetails.uploadPhoto')}
                </UploadButton>
                <ResetButton onClick={() => setVendorData({ ...vendorData, profilePic: null })}>
                  {translate('profile.basicDetails.reset')}
                </ResetButton>
              </ImageUploadContainer>
              <InputGroup>
                <Label>{translate('profile.basicDetails.fullName')}</Label>
                <Input
                  type="text"
                  name="name"
                  value={vendorData.name}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.fullNamePlaceholder')}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.mobileNumber')}</Label>
                <Input
                  type="tel"
                  name="mobileNumber"
                  value={vendorData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.mobileNumberPlaceholder')}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.email')}</Label>
                <Input
                  type="email"
                  name="email"
                  value={vendorData.email}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.emailPlaceholder')}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.address1')}</Label>
                <Input
                  type="text"
                  name="address1"
                  value={vendorData.address1}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.address1Placeholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.address2')}</Label>
                <Input
                  type="text"
                  name="address2"
                  value={vendorData.address2}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.address2Placeholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.city')}</Label>
                <Input
                  type="text"
                  name="city"
                  value={vendorData.city}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.cityPlaceholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.state')}</Label>
                <Select
                  name="state"
                  value={vendorData.state}
                  onChange={handleInputChange}
                >
                  <option value="">{translate('profile.basicDetails.stateSelect')}</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Karnataka">Karnataka</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.droneLicense')}</Label>
                <Input
                  type="text"
                  name="droneLicense"
                  value={vendorData.droneLicense}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.droneLicensePlaceholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.basicDetails.uinNumber')}</Label>
                <Input
                  type="text"
                  name="uinNumber"
                  value={vendorData.uinNumber}
                  onChange={handleInputChange}
                  placeholder={translate('profile.basicDetails.uinNumberPlaceholder')}
                />
              </InputGroup>
            </>
          )}
          {activeTab === 'droneSpecs' && (
            <>
              {vendorData.drones.map((drone, index) => (
                <Accordion key={index}>
                  <AccordionHeader>{translate('profile.droneSpecs.drone')} {index + 1}</AccordionHeader>
                  <AccordionContent>
                    <InputGroup2>
                      <Label>{translate('profile.droneSpecs.model')}</Label>
                      <Input
                        type="text"
                        name="model"
                        value={drone.model}
                        onChange={(e) => handleInputChange(e, index, 'drones')}
                        placeholder={translate('profile.droneSpecs.modelPlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.droneSpecs.speed')}</Label>
                      <Input
                        type="number"
                        name="speed"
                        value={drone.speed}
                        onChange={(e) => handleInputChange(e, index, 'drones')}
                        placeholder={translate('profile.droneSpecs.speedPlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.droneSpecs.flowRate')}</Label>
                      <Input
                        type="number"
                        name="flowRate"
                        value={drone.flowRate}
                        onChange={(e) => handleInputChange(e, index, 'drones')}
                        placeholder={translate('profile.droneSpecs.flowRatePlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.droneSpecs.payload')}</Label>
                      <Input
                        type="number"
                        name="payload"
                        value={drone.payload}
                        onChange={(e) => handleInputChange(e, index, 'drones')}
                        placeholder={translate('profile.droneSpecs.payloadPlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.droneSpecs.images')}</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, `drones[${index}].image`)}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.droneSpecs.manufacturer')}</Label>
                      <Input
                        type="text"
                        name="manufacturer"
                        value={drone.manufacturer}
                        onChange={(e) => handleInputChange(e, index, 'drones')}
                        placeholder={translate('profile.droneSpecs.manufacturerPlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.droneSpecs.purchaseYear')}</Label>
                      <Input
                        type="number"
                        name="purchaseYear"
                        value={drone.purchaseYear}
                        onChange={(e) => handleInputChange(e, index, 'drones')}
                        placeholder={translate('profile.droneSpecs.purchaseYearPlaceholder')}
                      />
                    </InputGroup2>
                  </AccordionContent>
                </Accordion>
              ))}
              <ButtonContainer>
                <AddMoreButton type="button" onClick={handleAddDrone}>
                  {translate('profile.droneSpecs.addMore')}
                </AddMoreButton>
              </ButtonContainer>
            </>
          )}
          {activeTab === 'serviceDetails' && (
            <>
              <InputGroup>
                <Label>{translate('profile.serviceDetails.experience')}</Label>
                <Input
                  type="number"
                  name="experience"
                  value={vendorData.experience}
                  onChange={handleInputChange}
                  placeholder={translate('profile.serviceDetails.experiencePlaceholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.serviceDetails.pricing')}</Label>
                <Input
                  type="number"
                  name="pricing"
                  value={vendorData.pricing}
                  onChange={handleInputChange}
                  placeholder={translate('profile.serviceDetails.pricingPlaceholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.serviceDetails.serviceState')}</Label>
                <Input
                  type="text"
                  name="serviceState"
                  value={vendorData.serviceState}
                  onChange={handleInputChange}
                  placeholder={translate('profile.serviceDetails.serviceStatePlaceholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.serviceDetails.serviceCity')}</Label>
                <Input
                  type="text"
                  name="serviceCity"
                  value={vendorData.serviceCity}
                  onChange={handleInputChange}
                  placeholder={translate('profile.serviceDetails.serviceCityPlaceholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>{translate('profile.serviceDetails.village')}</Label>
                <Input
                  type="text"
                  name="village"
                  value={vendorData.village}
                  onChange={handleInputChange}
                  placeholder={translate('profile.serviceDetails.villagePlaceholder')}
                />
              </InputGroup>
            </>
          )}
          {activeTab === 'batterySpecs' && (
            <>
              {vendorData.batteries.map((battery, index) => (
                <Accordion key={index}>
                  <AccordionHeader>{translate('profile.batterySpecs.battery')} {index + 1}</AccordionHeader>
                  <AccordionContent>
                    <InputGroup2>
                      <Label>{translate('profile.batterySpecs.capacity')}</Label>
                      <Input
                        type="text"
                        name="capacity"
                        value={battery.capacity}
                        onChange={(e) => handleInputChange(e, index, 'batteries')}
                        placeholder={translate('profile.batterySpecs.capacityPlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.batterySpecs.lifeCycles')}</Label>
                      <Input
                        type="number"
                        name="lifeCycles"
                        value={battery.lifeCycles}
                        onChange={(e) => handleInputChange(e, index, 'batteries')}
                        placeholder={translate('profile.batterySpecs.lifeCyclesPlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.batterySpecs.voltage')}</Label>
                      <Input
                        type="number"
                        name="voltage"
                        value={battery.voltage}
                        onChange={(e) => handleInputChange(e, index, 'batteries')}
                        placeholder={translate('profile.batterySpecs.voltagePlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.batterySpecs.ampere')}</Label>
                      <Input
                        type="number"
                        name="ampere"
                        value={battery.ampere}
                        onChange={(e) => handleInputChange(e, index, 'batteries')}
                        placeholder={translate('profile.batterySpecs.amperePlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.batterySpecs.manufacturer')}</Label>
                      <Input
                        type="text"
                        name="manufacturer"
                        value={battery.manufacturer}
                        onChange={(e) => handleInputChange(e, index, 'batteries')}
                        placeholder={translate('profile.batterySpecs.manufacturerPlaceholder')}
                      />
                    </InputGroup2>
                    <InputGroup2>
                      <Label>{translate('profile.batterySpecs.purchaseYear')}</Label>
                      <Input
                        type="number"
                        name="purchaseYear"
                        value={battery.purchaseYear}
                        onChange={(e) => handleInputChange(e, index, 'batteries')}
                        placeholder={translate('profile.batterySpecs.purchaseYearPlaceholder')}
                      />
                    </InputGroup2>
                  </AccordionContent>
                </Accordion>
              ))}
              <ButtonContainer>
                <AddMoreButton type="button" onClick={handleAddBattery}>
                  {translate('profile.batterySpecs.addMore')}
                </AddMoreButton>
              </ButtonContainer>
            </>
          )}
          <SubmitButton type="submit">{translate('profile.saveChanges')}</SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;