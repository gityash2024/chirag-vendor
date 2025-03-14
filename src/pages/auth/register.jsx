import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import registerImage from "../../assets/register-2.png";
import chiragLogo from "../../assets/chirag-logo-dark.png";
import Loader from "../../components/loader/index";
import { toast } from "react-toastify";
import {
  registerVendor,
  uploadTos3,
  generateAadhaarOtp,
  submitAadhaarOtp,
} from "../../services/commonService";
import axios from "axios";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #dbdade;
  border-radius: 4px;
  background-color: white;
`;
const ImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Image = styled.img`
 width: 40vw;
  height: 80vh;
  margin-left: 100px;
  border-radius: 40px !important;
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
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #121212;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  margin-top: 20px;
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
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


const FormScrollContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  padding-right: 10px;
  margin: 20px 0;
`;
const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100vh;
  position: relative;
  align-items: center; // Add this line to center children horizontally
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
  align-self: center; // Add this line to ensure logo stays centered
`;

const FormContent = styled.div`
  width: 100%;
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; // Add this line to center its children
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
  position: sticky;
  top: 140px;
  background: white;
  z-index: 1;
`;
const ButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  background: white;
  padding: 20px 0;
  z-index: 1;
  display: flex;
  gap: 10px;
`;

const BackButton = styled(Button)`
  background-color: white;
  color: #121212;
  border: 1px solid #121212;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
  position: sticky;
  top: 70px;
  z-index: 1;
  background: white;
  padding: 10px 0;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
  justify-content: center;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 15px;
    left: 50%;
    width: 100%;
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
  z-index: 2;
`;

const StepText = styled.div`
  font-size: 12px;
  color: ${(props) => (props.active ? "#000" : "#ccc")};
  white-space: nowrap;
  position: absolute;
  bottom: -20px;
  text-align: center;
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
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [authToken, setAuthToken] = useState("");

  const [previewImages, setPreviewImages] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    drones: [],
  });

  const getAuthToken = async () => {
    try {
      const response = await axios.get(
        "https://www.universal-tutorial.com/api/getaccesstoken",
        {
          headers: {
            Accept: "application/json",
            "api-token":
              "mTbceB2yMOF70Xq1daFd23XRag1jUY3RGFTrFSlFln1I186zmU_qPKEZyQ67V__AL34",
            "user-email": "gityash2024@gmail.com",
          },
        }
      );
      setAuthToken(response.data.auth_token);
      return response.data.auth_token;
    } catch (error) {
      // toast.error("Error fetching authentication token");
      return null;
    }
  };

  // Function to fetch states
  const fetchStates = async (token) => {
    try {
      const response = await axios.get(
        "https://www.universal-tutorial.com/api/states/India",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setStates(response.data);
    } catch (error) {
      // toast.error("Error fetching states");
    }
  };

  // Function to fetch cities
  const fetchCities = async (state) => {
    try {
      const response = await axios.get(
        `https://www.universal-tutorial.com/api/cities/${state}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      setCities(response.data);
    } catch (error) {
      // toast.error("Error fetching cities");
    }
  };

  useEffect(() => {
    const initializeLocationData = async () => {
      const token = await getAuthToken();
      if (token) {
        await fetchStates(token);
      }
    };
    initializeLocationData();
  }, []);

  const validateStep1 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const aadhaarRegex = /^[0-9]{12}$/;

    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!mobileRegex.test(formData.mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.address1.trim()) {
      toast.error("Please enter address line 1");
      return false;
    }
    if (!formData.state.trim()) {
      toast.error("Please select state");
      return false;
    }
    if (!formData.city.trim()) {
      toast.error("Please select city");
      return false;
    }
    if (!formData.droneLicense.trim()) {
      toast.error("Please enter drone license number");
      return false;
    }
    if (!formData.uinNumber.trim()) {
      toast.error("Please enter UIN number");
      return false;
    }
    if (!aadhaarRegex.test(formData.aadhaarNumber)) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return false;
    }
    // if (!formData.aadhaarFront) {
    //   toast.error("Please upload front side of Aadhaar card");
    //   return false;
    // }
    // if (!formData.aadhaarBack) {
    //   toast.error("Please upload back side of Aadhaar card");
    //   return false;
    // }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.experience.trim()) {
      toast.error("Please enter your experience");
      return false;
    }
    if (!formData.pricing.trim()) {
      toast.error("Please enter your pricing");
      return false;
    }
    if (!formData.serviceState.trim()) {
      toast.error("Please enter service state");
      return false;
    }
    if (!formData.serviceCity.trim()) {
      toast.error("Please enter service city");
      return false;
    }
    if (!formData.village.trim()) {
      toast.error("Please enter village");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    for (let i = 0; i < formData.drones.length; i++) {
      const drone = formData.drones[i];
      if (!drone.model.trim()) {
        toast.error(`Please enter model for drone ${i + 1}`);
        return false;
      }
      if (!drone.speed.trim()) {
        toast.error(`Please enter speed for drone ${i + 1}`);
        return false;
      }
      if (!drone.flowRate.trim()) {
        toast.error(`Please enter flow rate for drone ${i + 1}`);
        return false;
      }
      if (!drone.payload.trim()) {
        toast.error(`Please enter payload capacity for drone ${i + 1}`);
        return false;
      }
      // if (!drone.image) {
      //   toast.error(`Please upload image for drone ${i + 1}`);
      //   return false;
      // }
      if (!drone.manufacturer.trim()) {
        toast.error(`Please enter manufacturer for drone ${i + 1}`);
        return false;
      }
      if (!drone.purchaseYear.trim()) {
        toast.error(`Please enter purchase year for drone ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  const validateStep4 = () => {
    for (let i = 0; i < formData.batteries.length; i++) {
      const battery = formData.batteries[i];
      if (!battery.capacity.trim()) {
        toast.error(`Please enter capacity for battery ${i + 1}`);
        return false;
      }
      if (!battery.lifeCycles.trim()) {
        toast.error(`Please enter life cycles for battery ${i + 1}`);
        return false;
      }
      if (!battery.voltage.trim()) {
        toast.error(`Please enter voltage for battery ${i + 1}`);
        return false;
      }
      if (!battery.ampere.trim()) {
        toast.error(`Please enter ampere for battery ${i + 1}`);
        return false;
      }
      if (!battery.manufacturer.trim()) {
        toast.error(`Please enter manufacturer for battery ${i + 1}`);
        return false;
      }
      if (!battery.purchaseYear.trim()) {
        toast.error(`Please enter purchase year for battery ${i + 1}`);
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;
    if (name === "state") {
      fetchCities(value);
      setCities([]);
    }
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
            const newDrones = [...formData.drones];
            newDrones[index] = {
              ...newDrones[index],
              image: response.data.fileUrl,
            };
            setFormData((prevState) => ({
              ...prevState,
              drones: newDrones,
            }));
          } catch (error) {
            // toast.error("Server error while upload image, please try again.");
          }
        } else {
          setPreviewImages({
            ...previewImages,
            [e.target.name]: reader.result,
          });

          const formData = new FormData();
          formData.append("file", file);
          try {
            const response = await uploadTos3(formData);
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: response.data.fileUrl,
            }));
          } catch (error) {
            // toast.error("Server error while upload image, please try again.");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = false;

    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
      default:
        isValid = false;
    }

    if (!isValid) return;

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
      {isLoading && <Loader />}
      <Container>
        <ImageSection>
          <Image src={registerImage} alt="Register" />
        </ImageSection>
        <FormSection>
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
              ? "Your Drone (or Agricultural Machinery) Specifications"
              : "Your Drone Battery Specifications"}
          </Title>
          <FormScrollContainer>
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
                  <InputLabel>Address 2</InputLabel>
                  <Input
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="Address line 2"
                  />
                  <InputLabel>State * </InputLabel>
                  {/* <Select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.state_name} value={state.state_name}>
                        {state.state_name}
                      </option>
                    ))}
                  </Select> */}
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                  />

                  <InputLabel>City * </InputLabel>
                  {/* <Select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.city_name} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </Select> */}
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                    disabled={!formData.state}
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
                      type="button"
                      onClick={() =>
                        document.getElementById("aadhaarFront").click()
                      }
                    >
                      {previewImages.aadhaarFront ? (
                        <UploadedImage
                          src={previewImages.aadhaarFront}
                          alt="Aadhaar Front"
                        />
                      ) : (
                        "+ Front side of Aadhaar card"
                      )}
                    </UploadButton>
                    <UploadButton
                      type="button"
                      onClick={() =>
                        document.getElementById("aadhaarBack").click()
                      }
                    >
                      {previewImages.aadhaarBack ? (
                        <UploadedImage
                          src={previewImages.aadhaarBack}
                          alt="Aadhaar Back"
                        />
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
                    accept="image/*"
                  />
                  <input
                    id="aadhaarBack"
                    type="file"
                    hidden
                    onChange={(e) => handleFileUpload(e)}
                    name="aadhaarBack"
                    accept="image/*"
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
                </>
              )}

              {step === 2 && (
                <>
                  <InputLabel>Experience (Agricultural Services) * </InputLabel>
                  <Input
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Experience in years"
                    type="number"
                    required
                  />
                  <InputLabel>Pricing (Per Acre) * </InputLabel>
                  <Input
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleInputChange}
                    placeholder="Approx Pricing for 1 acre of land service"
                    type="number"
                    required
                  />
                  <InputLabel>Service State * </InputLabel>
                  {/* <Select
                    name="serviceState"
                    value={formData.serviceState}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Service State</option>
                    {states.map((state) => (
                      <option key={state.state_name} value={state.state_name}>
                        {state.state_name}
                      </option>
                    ))}
                  </Select> */}

                  <Input
                    name="serviceState"
                    value={formData.serviceState}
                    onChange={handleInputChange}
                    placeholder="Service State"
                    required
                  />

                  <InputLabel>Service City * </InputLabel>
                  {/* <Select
                    name="serviceCity"
                    value={formData.serviceCity}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.serviceState}
                  >
                    <option value="">Select Service City</option>
                    {cities.map((city) => (
                      <option key={city.city_name} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </Select> */}

                  <Input
                    name="serviceCity"
                    value={formData.serviceCity}
                    onChange={handleInputChange}
                    placeholder="Service City"
                    required
                    disabled={!formData.serviceState}
                  />
                  <InputLabel>Village * </InputLabel>
                  <Input
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    placeholder="Village"
                    required
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
                            type="button"
                            onClick={() => removeItem(index, "drones")}
                          >
                            ✕
                          </RemoveButton>
                        )}
                      </FormArrayHeader>
                      <InputLabel>Drone Model * </InputLabel>
                      <Input
                        name="model"
                        value={drone.model}
                        onChange={(e) => handleInputChange(e, index, "drones")}
                        placeholder="Drone Model"
                        required
                      />
                      <InputLabel>Drone Speed (in km/h) * </InputLabel>
                      <Input
                        type="number"
                        name="speed"
                        value={drone.speed}
                        onChange={(e) => handleInputChange(e, index, "drones")}
                        placeholder="Speed of the Drone"
                        required
                      />
                      <InputLabel>Flow Rate (in L/min) * </InputLabel>
                      <Input
                        type="number"
                        name="flowRate"
                        value={drone.flowRate}
                        onChange={(e) => handleInputChange(e, index, "drones")}
                        placeholder="Flow Rate of the Drone"
                        required
                      />
                      <InputLabel>Payload Capacity (in kgs) * </InputLabel>
                      <Input
                        type="number"
                        name="payload"
                        value={drone.payload}
                        onChange={(e) => handleInputChange(e, index, "drones")}
                        placeholder="Payload Capacity in kgs"
                        required
                      />
                      <UploadButton
                        type="button"
                        onClick={() =>
                          document.getElementById(`droneImage${index}`).click()
                        }
                      >
                        {previewImages.drones[index] ? (
                          <UploadedImage
                            src={previewImages.drones[index]}
                            alt={`Drone ${index + 1}`}
                          />
                        ) : (
                          "+ Drone Image"
                        )}
                      </UploadButton>
                      <input
                        id={`droneImage${index}`}
                        type="file"
                        hidden
                        onChange={(e) => handleFileUpload(e, index, "drones")}
                        accept="image/*"
                      />
                      <InputLabel>Manufacturer * </InputLabel>
                      <Input
                        name="manufacturer"
                        value={drone.manufacturer}
                        onChange={(e) => handleInputChange(e, index, "drones")}
                        placeholder="Manufacturer Name"
                        required
                      />
                      <InputLabel>Purchase Year * </InputLabel>
                      <Input
                        type="number"
                        name="purchaseYear"
                        value={drone.purchaseYear}
                        onChange={(e) => handleInputChange(e, index, "drones")}
                        placeholder="Year of Purchase"
                        required
                      />
                    </FormArrayContainer>
                  ))}
                  <AddMoreButton
                    type="button"
                    onClick={() => addMore("drones")}
                  >
                    Add More Drone
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
                            type="button"
                            onClick={() => removeItem(index, "batteries")}
                          >
                            ✕
                          </RemoveButton>
                        )}
                      </FormArrayHeader>
                      <InputLabel>Battery Capacity (in Ah) * </InputLabel>
                      <Input
                        type="number"
                        name="capacity"
                        value={battery.capacity}
                        onChange={(e) =>
                          handleInputChange(e, index, "batteries")
                        }
                        placeholder="Capacity"
                        required
                      />
                      <InputLabel>Life Cycles (in cycles) * </InputLabel>
                      <Input
                        type="number"
                        name="lifeCycles"
                        value={battery.lifeCycles}
                        onChange={(e) =>
                          handleInputChange(e, index, "batteries")
                        }
                        placeholder="Life Cycles"
                        required
                      />
                      <InputLabel>Voltage * </InputLabel>
                      <Input
                        type="number"
                        name="voltage"
                        value={battery.voltage}
                        onChange={(e) =>
                          handleInputChange(e, index, "batteries")
                        }
                        placeholder="Voltage"
                        required
                      />
                      <InputLabel>Ampere * </InputLabel>
                      <Input
                        type="number"
                        name="ampere"
                        value={battery.ampere}
                        onChange={(e) =>
                          handleInputChange(e, index, "batteries")
                        }
                        placeholder="Ampere"
                        required
                      />
                      <InputLabel>Manufacturer * </InputLabel>
                      <Input
                        name="manufacturer"
                        value={battery.manufacturer}
                        onChange={(e) =>
                          handleInputChange(e, index, "batteries")
                        }
                        placeholder="Manufacturer"
                        required
                      />
                      <InputLabel>Purchase Year * </InputLabel>
                      <Input
                        type="number"
                        name="purchaseYear"
                        value={battery.purchaseYear}
                        onChange={(e) =>
                          handleInputChange(e, index, "batteries")
                        }
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
            </form>
          </FormScrollContainer>
          <ButtonContainer>
  {step > 1 && (
    <BackButton type="button" onClick={() => setStep(step - 1)}>
      Back
    </BackButton>
  )}
  <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
    {isLoading 
      ? "Processing..." 
      : step === 4 
      ? "Save and Proceed" 
      : "Next Step"}
  </Button>
</ButtonContainer>
        </FormSection>
      </Container>
    </>
  );
};

export default Register;
