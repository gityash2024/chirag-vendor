import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import registerImage from "../../assets/register-image.png";
import chiragLogo from "../../assets/chirag-logo-dark.png";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  registerVendor,
  uploadTos3,
  generateAadhaarOtp,
  submitAadhaarOtp,
} from "../../services/commonService";

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
  justify-content: space-between;
  padding: 40px;
  overflow-y: auto;
`;

const FormContent = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% + 10px);
    width: calc(100% - 40px);
    height: 2px;
    background-color: ${(props) => (props.active ? "#000" : "#ccc")};
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#000" : "#ccc")};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const StepText = styled.div`
  font-size: 12px;
  color: ${(props) => (props.active ? "#000" : "#ccc")};
`;

const Title = styled.h2`
  font-family: "Public Sans", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #121212;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dbdade;
  border-radius: 4px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  color: #8d98a4;
  font-family: "Public Sans", sans-serif;
  font-weight: 400;
  margin-bottom: 20px !important;
`;

const Button = styled.button`
  background-color: #121212;
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
  border: 1px dashed #dbdade;
  background-color: transparent;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
  cursor: pointer;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AddMoreButton = styled.button`
  background-color: transparent;
  color: #121212;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
`;

const FormArrayContainer = styled.div`
  border-bottom: 1px solid #dbdade;
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
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    address1: "",
    address2: "",
    state: "",
    city: "",
    droneLicense: "",
    uinNumber: "",
    aadhaarNumber: "",
    aadhaarFront: null,
    aadhaarBack: null,
    aadhaarOtp: "",
    experience: "",
    pricing: "",
    serviceState: "",
    serviceCity: "",
    village: "",
    drones: [
      {
        model: "",
        speed: "",
        flowRate: "",
        payload: "",
        image: null,
        manufacturer: "",
        purchaseYear: "",
      },
    ],
    batteries: [
      {
        capacity: "",
        lifeCycles: "",
        voltage: "",
        ampere: "",
        manufacturer: "",
        purchaseYear: "",
      },
    ],
  });

  const [previewImages, setPreviewImages] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    drones: [],
  });

  const [aadhaarOtpSent, setAadhaarOtpSent] = useState(false);
  const [clientId, setClientId] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

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
  const handleFileUpload = async (e, index, field) => {
    const file = e.target.files[0];
    setIsLoading(true);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (field === "drones") {
          const newPreviewDrones = [...previewImages.drones];
          newPreviewDrones[index] = reader.result;
          setPreviewImages({ ...previewImages, drones: newPreviewDrones });
          
          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await uploadTos3(formData);
            
            const newDrones = [...formData?.drones];
            newDrones[index] = { ...newDrones[index], image: response.data.fileUrl };
            setFormData(prevState => ({
              ...prevState,
              drones: newDrones
            }));
          } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Failed to upload file");
          }
        } else {
          setPreviewImages({ ...previewImages, [e.target.name]: reader.result });
          
          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await uploadTos3(formData);
            
            setFormData(prevState => ({
              ...prevState,
              [e.target.name]: response.data.fileUrl
            }));
          } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Failed to upload file");
          }
        }
      };
      reader.readAsDataURL(file);
    }
    setIsLoading(false);
  };

  const addMore = (field) => {
    if (field === "drones") {
      setFormData({
        ...formData,
        drones: [
          ...formData.drones,
          {
            model: "",
            speed: "",
            flowRate: "",
            payload: "",
            image: null,
            manufacturer: "",
            purchaseYear: "",
          },
        ],
      });
    } else if (field === "batteries") {
      setFormData({
        ...formData,
        batteries: [
          ...formData.batteries,
          {
            capacity: "",
            lifeCycles: "",
            voltage: "",
            ampere: "",
            manufacturer: "",
            purchaseYear: "",
          },
        ],
      });
    }
  };

  const removeItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSendAadhaarOtp = async () => {
    if (formData.aadhaarNumber.length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    setIsLoading(true);
    try {
      const response = await generateAadhaarOtp({
        aadhaarNumber: formData.aadhaarNumber,
      });
      if (response.data.success) {
        setAadhaarOtpSent(true);
        setClientId(response.data.data.client_id);
        toast.success("Aadhaar OTP sent successfully");
      }
    } catch (error) {
      toast.error("Failed to send Aadhaar OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAadhaarOtp = async () => {
    setIsLoading(true);
    try {
      const response = await submitAadhaarOtp({
        aadhaarNumber: formData.aadhaarNumber,
        otp: formData.aadhaarOtp,
        clientId: clientId,
      });
      if (response.data.success) {
        setAadhaarVerified(true);
        toast.success("Aadhaar verified successfully");
      }
    } catch (error) {
      toast.error("Failed to verify Aadhaar OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setIsLoading(true);
    try {
      if (step < 4) {
        setStep(step + 1);
      } else {
        const response = await registerVendor(formData);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
         
          toast.success("Registration successful!");
          navigate("/home");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
  <Loader isLoading={isLoading} />
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
          <Title>
            {step === 1
              ? "Basic Details"
              : step === 2
              ? "Service Details"
              : step === 3
              ? "Drone Specs"
              : "Battery Specs"}
          </Title>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <InputLabel>Full Name * </InputLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  required
                />
                <InputLabel>Mobile Number * </InputLabel>
                <Input
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  required
                />
                <InputLabel>Email * </InputLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  type="email"
                />
                <InputLabel>Address 1 * </InputLabel>
                <Input
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  placeholder="Address line 1"
                  required
                />
                <InputLabel>Address 2 * </InputLabel>
                <Input
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  placeholder="Address line 2"
                />
                <InputLabel>State * </InputLabel>
                <Input
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                />
                <InputLabel>City * </InputLabel>
                <Input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
                <InputLabel>Drone License * </InputLabel>
                <Input
                  name="droneLicense"
                  value={formData.droneLicense}
                  onChange={handleInputChange}
                  placeholder="Drone Pilot License"
                  required
                />
                <InputLabel>UIN Number * </InputLabel>
                <Input
                  name="uinNumber"
                  value={formData.uinNumber}
                  onChange={handleInputChange}
                  placeholder="UIN Number"
                  required
                />
                <UploadContainer>
                  <UploadButton
                    onClick={() =>
                      document.getElementById("aadhaarFront").click()
                    }
                  >
                    {previewImages.aadhaarFront ? (
                      <UploadedImage src={previewImages.aadhaarFront} alt="Aadhaar Front" />
                    ) : (
                      "+ Front side of Aadhaar card"
                    )}
                  </UploadButton>
                  <UploadButton
                    onClick={() =>
                      document.getElementById("aadhaarBack").click()
                    }
                  >
                    {previewImages.aadhaarBack ? (
                      <UploadedImage src={previewImages.aadhaarBack} alt="Aadhaar Back" />
                    ) : (
                      "+ Back side of Aadhaar card"
                    )}
                  </UploadButton>
                </UploadContainer>
                <input
                  id="aadhaarFront"
                  type="file"
                  hidden
                  onChange={(e) => handleFileUpload(e)}
                  name="aadhaarFront"
                />
                <input
                  id="aadhaarBack"
                  type="file"
                  hidden
                  onChange={(e) => handleFileUpload(e)}
                  name="aadhaarBack"
                />
                <InputLabel>Aadhaar Number * </InputLabel>
                <Input
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  placeholder="12-digit Aadhaar Number"
                  maxLength={12}
                  required
                />
                {formData.aadhaarNumber.length === 12 && !aadhaarVerified && (
                  <Button type="button" onClick={handleSendAadhaarOtp}>
                    Send Aadhaar OTP
                  </Button>
                )}
                {aadhaarOtpSent && !aadhaarVerified && (
                  <>
                    <InputLabel>Aadhaar OTP * </InputLabel>
                    <Input
                      name="aadhaarOtp"
                      value={formData.aadhaarOtp}
                      onChange={handleInputChange}
                      placeholder="Enter Aadhaar OTP"
                      required
                    />
                    <Button type="button" onClick={handleVerifyAadhaarOtp}>
                      Verify Aadhaar OTP
                    </Button>
                  </>
                )}
                {aadhaarVerified && (
                  <p style={{ color: 'green' }}>Aadhaar verified successfully</p>
                )}
              </>
            )}
            {step === 2 && (
              <>
                <InputLabel>Experience * </InputLabel>
                <Input
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Experience in years"
                  type="number"
                  required
                />
                <InputLabel>Pricing * </InputLabel>
                <Input
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleInputChange}
                  placeholder="Approx Pricing for 1 acre of land service"
                  type="number"
                  required
                />
                <InputLabel>Service State * </InputLabel>
                <Input
                  name="serviceState"
                  value={formData.serviceState}
                  onChange={handleInputChange}
                  placeholder="Service State"
                  required
                />
                <InputLabel>Service City * </InputLabel>
                <Input
                  name="serviceCity"
                  value={formData.serviceCity}
                  onChange={handleInputChange}
                  placeholder="Service City"
                  required
                />
                <InputLabel>Village * </InputLabel>
                <Input
                  name="village"
                  value={formData.village}
                  onChange={handleInputChange}
                  placeholder="Village"
                />
              </>
            )}
            {step === 3 && (
              <>
                {formData.drones.map((drone, index) => (
                  <FormArrayContainer key={index}>
                    <FormArrayHeader>
                      {formData.drones.length > 1 && (
                        <FormArrayTitle>Drone {index + 1}</FormArrayTitle>
                      )}
                      {formData.drones.length > 1 && (
                        <RemoveButton
                          onClick={() => removeItem(index, "drones")}
                        >
                          ✕
                        </RemoveButton>
                      )}
                    </FormArrayHeader>
                    <InputLabel>Drone Details * </InputLabel>
                    <Input
                      name="model"
                      value={drone.model}
                      onChange={(e) => handleInputChange(e, index, "drones")}
                      placeholder="Drone Model"
                      required
                    />
                    <InputLabel>Drone Specs * </InputLabel>
                    <Input
                      name="speed"
                      value={drone.speed}
                      onChange={(e) => handleInputChange(e, index, "drones")}
                      placeholder="Speed of the Drone"
                      required
                    />
                    <InputLabel>Drone Flow Rate * </InputLabel>
                    <Input
                      name="flowRate"
                      value={drone.flowRate}
                      onChange={(e) => handleInputChange(e, index, "drones")}
                      placeholder="Flow Rate of the Drone"
                      required
                    />
                    <InputLabel>Drone Capacity * </InputLabel>
                    <Input
                      name="payload"
                      value={drone.payload}
                      onChange={(e) => handleInputChange(e, index, "drones")}
                      placeholder="Payload Capacity in kgs"
                      required
                    />
                    <UploadButton
                      onClick={() =>
                        document.getElementById(`droneImage${index}`).click()
                      }
                    >
                      {previewImages.drones[index] ? (
                        <UploadedImage src={previewImages.drones[index]} alt="Drone" />
                      ) : (
                        "+ Drone Image"
                      )}
                    </UploadButton>
                    <input
                      id={`droneImage${index}`}
                      type="file"
                      hidden
                      onChange={(e) => handleFileUpload(e, index, "drones")}
                    />
                    <InputLabel>Drone Manufacturer * </InputLabel>
                    <Input
                      name="manufacturer"
                      value={drone.manufacturer}
                      onChange={(e) => handleInputChange(e, index, "drones")}
                      placeholder="Manufacturer Name"
                      required
                    />
                    <InputLabel>Drone YOP * </InputLabel>
                    <Input
                      name="purchaseYear"
                      value={drone.purchaseYear}
                      onChange={(e) => handleInputChange(e, index, "drones")}
                      placeholder="Year of Purchase"
                      required
                    />
                  </FormArrayContainer>
                ))}
                <AddMoreButton type="button" onClick={() => addMore("drones")}>
                  Add more Drone
                </AddMoreButton>
              </>
            )}
            {step === 4 && (
              <>
                {formData.batteries.map((battery, index) => (
                  <FormArrayContainer key={index}>
                    <FormArrayHeader>
                      {formData.batteries.length > 1 && (
                        <FormArrayTitle>Battery {index + 1}</FormArrayTitle>
                      )}
                      {formData.batteries.length > 1 && (
                        <RemoveButton
                          onClick={() => removeItem(index, "batteries")}
                        >
                          ✕
                        </RemoveButton>
                      )}
                    </FormArrayHeader>
                    <InputLabel>Battery Capacity * </InputLabel>
                    <Input
                      name="capacity"
                      value={battery.capacity}
                      onChange={(e) => handleInputChange(e, index, "batteries")}
                      placeholder="Capacity"
                      required
                    />
                    <InputLabel>Battery Life Cycles * </InputLabel>
                    <Input
                      name="lifeCycles"
                      value={battery.lifeCycles}
                      onChange={(e) => handleInputChange(e, index, "batteries")}
                      placeholder="Life Cycles"
                      required
                    />
                    <InputLabel>Battery Voltage * </InputLabel>
                    <Input
                      name="voltage"
                      value={battery.voltage}
                      onChange={(e) => handleInputChange(e, index, "batteries")}
                      placeholder="Voltage"
                      required
                    />
                    <InputLabel>Battery Ampere * </InputLabel>
                    <Input
                      name="ampere"
                      value={battery.ampere}
                      onChange={(e) => handleInputChange(e, index, "batteries")}
                      placeholder="Ampere"
                      required
                    />
                    <InputLabel>Battery Manufacturer * </InputLabel>
                    <Input
                      name="manufacturer"
                      value={battery.manufacturer}
                      onChange={(e) => handleInputChange(e, index, "batteries")}
                      placeholder="Manufacturer"
                      required
                    />
                    <InputLabel>Battery Purchase Year * </InputLabel>
                    <Input
                      name="purchaseYear"
                      value={battery.purchaseYear}
                      onChange={(e) => handleInputChange(e, index, "batteries")}
                      placeholder="Year of Purchase"
                      required
                    />
                  </FormArrayContainer>
                ))}
                <AddMoreButton
                  type="button"
                  onClick={() => addMore("batteries")}
                >
                  Add New Battery
                </AddMoreButton>
              </>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Processing..."
                : step === 4
                ? "Save and Proceed"
                : "Next Step"}
            </Button>
          </form>
        </FormContent>
      </FormSection>
    </Container>
    </>
  );
};

export default Register;