import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import registerImage from '../../assets/register-image.png';
import chiragLogo from '../../assets/chirag-logo-dark.png';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img`
  width: 50vw;
  height: 80vh;
  object-fit: contain;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  overflow-y: auto;
`;

const FormContent = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 40px;
`;


const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(100% + 10px);
    width: calc(100% - 40px);
    height: 2px;
    background-color: ${props => props.active ? '#000' : '#ccc'};
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#000' : '#ccc'};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const StepText = styled.div`
  font-size: 12px;
  color: ${props => props.active ? '#000' : '#ccc'};
`;

const Title = styled.h2`
  font-size: 24px;
  color: #23212A;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #383838;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const UploadButton = styled.button`
  width: 48%;
  height: 100px;
  border: 1px dashed #DBDADE;
  background-color: transparent;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
`;

const AddMoreButton = styled.button`
  background-color: transparent;
  color: #383838;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
`;

const FormArrayContainer = styled.div`
  border-bottom: 1px solid #DBDADE;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

const FormArrayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const FormArrayTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: red;
  border: none;
  cursor: pointer;
`;

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
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
    drones: [{ model: '', speed: '', flowRate: '', payload: '', image: null, manufacturer: '', purchaseYear: '' }],
    batteries: [{ capacity: '', lifeCycles: '', voltage: '', ampere: '', manufacturer: '', purchaseYear: '' }]
  });

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    if (field) {
      const newArray = [...formData[field]];
      newArray[index] = { ...newArray[index], [name]: value };
      setFormData({ ...formData, [field]: newArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileUpload = (e, index, field) => {
    if (field) {
      const newArray = [...formData[field]];
      newArray[index] = { ...newArray[index], image: e.target.files[0] };
      setFormData({ ...formData, [field]: newArray });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const addMore = (field) => {
    if (field === 'drones') {
      setFormData({
        ...formData,
        drones: [...formData.drones, { model: '', speed: '', flowRate: '', payload: '', image: null, manufacturer: '', purchaseYear: '' }]
      });
    } else if (field === 'batteries') {
      setFormData({
        ...formData,
        batteries: [...formData.batteries, { capacity: '', lifeCycles: '', voltage: '', ampere: '', manufacturer: '', purchaseYear: '' }]
      });
    }
  };

  const removeItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log(formData);
      navigate('/login');
    }
  };

  const stateOptions = ['State 1', 'State 2', 'State 3', 'State 4', 'State 5'];
  const cityOptions = ['City 1', 'City 2', 'City 3', 'City 4', 'City 5'];

  return (
    <Container>
      <ImageSection>
        <Image src={registerImage} alt="Register" />
      </ImageSection>
      <FormSection>
        <FormContent>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
          <StepIndicator>
            {[1, 2, 3, 4].map((num) => (
              <Step key={num} active={step >= num}>
                <StepNumber active={step >= num}>{num}</StepNumber>
                <StepText active={step >= num}>Step {num}</StepText>
              </Step>
            ))}
          </StepIndicator>
          <Title>{step === 1 ? 'Basic Details' : step === 2 ? 'Service Details' : step === 3 ? 'Drone Specs' : 'Battery Specs'}</Title>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Full Name" required />
                <Input name="address1" value={formData.address1} onChange={handleInputChange} placeholder="Address line 1" required />
                <Input name="address2" value={formData.address2} onChange={handleInputChange} placeholder="Address line 2" />
                <Select name="state" value={formData.state} onChange={handleInputChange} required>
                  <option value="">Select State</option>
                  {stateOptions.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </Select>
                <Select name="city" value={formData.city} onChange={handleInputChange} required>
                  <option value="">Select City</option>
                  {cityOptions.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </Select>
                <Input name="droneLicense" value={formData.droneLicense} onChange={handleInputChange} placeholder="Drone Pilot License" required />
                <Input name="uinNumber" value={formData.uinNumber} onChange={handleInputChange} placeholder="UIN Number" required />
                <UploadContainer>
                  <UploadButton onClick={() => document.getElementById('aadhaarFront').click()}>
                    + Front side of Aadhaar card
                  </UploadButton>
                  <UploadButton onClick={() => document.getElementById('aadhaarBack').click()}>
                    + Back side of Aadhaar card
                  </UploadButton>
                </UploadContainer>
                <input id="aadhaarFront" type="file" hidden onChange={(e) => handleFileUpload(e)} name="aadhaarFront" />
                <input id="aadhaarBack" type="file" hidden onChange={(e) => handleFileUpload(e)} name="aadhaarBack" />
              </>
            )}
            {step === 2 && (
              <>
                <Input name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Experience in years" type="number" required />
                <Input name="pricing" value={formData.pricing} onChange={handleInputChange} placeholder="Approx Pricing for 1 acre of land service" type="number" required />
                <Select name="serviceState" value={formData.serviceState} onChange={handleInputChange} required>
                  <option value="">Select State</option>
                  {stateOptions.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </Select>
                <Select name="serviceCity" value={formData.serviceCity} onChange={handleInputChange} required>
                  <option value="">Select City</option>
                  {cityOptions.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </Select>
                <Input name="village" value={formData.village} onChange={handleInputChange} placeholder="Village" />
              </>
            )}
            {step === 3 && (
              <>
                {formData.drones.map((drone, index) => (
                  <FormArrayContainer key={index}>
                    <FormArrayHeader>
                        {formData.drones.length > 1?<FormArrayTitle>Drone {index + 1}</FormArrayTitle>:null}
                      {formData.drones.length > 1 ?
                        <RemoveButton onClick={() => removeItem(index, 'drones')}>✕</RemoveButton>:null}
                    </FormArrayHeader>
                    <Input name="model" value={drone.model} onChange={(e) => handleInputChange(e, index, 'drones')} placeholder="Drone Model" required />
                    <Input name="speed" value={drone.speed} onChange={(e) => handleInputChange(e, index, 'drones')} placeholder="Speed of the Drone" required />
                    <Input name="flowRate" value={drone.flowRate} onChange={(e) => handleInputChange(e, index, 'drones')} placeholder="Flow Rate of the Drone" required />
                    <Input name="payload" value={drone.payload} onChange={(e) => handleInputChange(e, index, 'drones')} placeholder="Payload Capacity in kgs" required />
                    <UploadButton  onClick={() => document.getElementById(`droneImage${index}`).click()}>
                      + Drone Image
                    </UploadButton>
                    <input id={`droneImage${index}`} type="file" hidden onChange={(e) => handleFileUpload(e, index, 'drones')} />
                    <Input name="manufacturer" value={drone.manufacturer} onChange={(e) => handleInputChange(e, index, 'drones')} placeholder="Manufacturer Name" required />
                    <Input name="purchaseYear" value={drone.purchaseYear} onChange={(e) => handleInputChange(e, index, 'drones')} placeholder="Year of Purchase" required />
                  </FormArrayContainer>
                ))}
                <AddMoreButton type="button" onClick={() => addMore('drones')}>Add more Drone</AddMoreButton>
              </>
            )}
            {step === 4 && (
              <>
                {formData.batteries.map((battery, index) => (
                  <FormArrayContainer key={index}>
                    <FormArrayHeader>
                      {formData.batteries.length > 1 ?<FormArrayTitle>Battery {index + 1}</FormArrayTitle>:null}
                      {formData.batteries.length > 1 ?
                        <RemoveButton onClick={() => removeItem(index, 'batteries')}>✕</RemoveButton>:null}
                    </FormArrayHeader>
                    <Input name="capacity" value={battery.capacity} onChange={(e) => handleInputChange(e, index, 'batteries')} placeholder="Capacity" required />
                    <Input name="lifeCycles" value={battery.lifeCycles} onChange={(e) => handleInputChange(e, index, 'batteries')} placeholder="Life Cycles" required />
                    <Input name="voltage" value={battery.voltage} onChange={(e) => handleInputChange(e, index, 'batteries')} placeholder="Voltage" required />
                    <Input name="ampere" value={battery.ampere} onChange={(e) => handleInputChange(e, index, 'batteries')} placeholder="Ampere" required />
                    <Input name="manufacturer" value={battery.manufacturer} onChange={(e) => handleInputChange(e, index, 'batteries')} placeholder="Manufacturer" required />
                    <Input name="purchaseYear" value={battery.purchaseYear} onChange={(e) => handleInputChange(e, index, 'batteries')} placeholder="Year of Purchase" required />
                  </FormArrayContainer>
                ))}
                <AddMoreButton type="button" onClick={() => addMore('batteries')}>Add New Battery</AddMoreButton>
              </>
            )}
            <Button type="submit">{step === 4 ? 'Save and Proceed' : 'Next Step'}</Button>
          </form>
        </FormContent>
      </FormSection>
    </Container>
  );
};

export default Register;