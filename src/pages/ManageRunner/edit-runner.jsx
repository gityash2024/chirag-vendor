import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Block, Edit, ArrowBack } from '@material-ui/icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #4B465C;
  display: flex;
  align-items: center;
`;

const BackIcon = styled(ArrowBack)`
  cursor: pointer;
  margin-right: 10px;
`;

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  width: 30%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #4B465C;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => props.active ? '#E8FFF3' : '#FFF0F1'};
  color: ${props => props.active ? '#28C76F' : '#EA5455'};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.edit ? 'white' : 'black'};
  color: ${props => props.edit ? 'black' : 'white'};
  padding: 10px 20px;
  border: ${props => props.edit ? '1px solid black' : 'none'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const ImageUpload = styled.div`
  border: 2px dashed #E0E0E0;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

const DroneImagesContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const DroneImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 8px;
`;

const EditRunner = () => {
  const { id, isView } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: 'Edgar James',
    mobile: '+918169131642',
    email: 'khushi.doe@jethitech.com',
    city: 'Mumbai',
    state: 'Maharashtra',
    vendorId: 'AB12345647',
  });

  const handleChange = (e) => {
    if (!isView) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/manage-runner');
  };

  const handleBackClick = () => {
    navigate('/manage-runner');
  };

  return (
    <Container>
      <Header>
        <Title>
        <BackButton onClick={handleBackClick}>
            <ArrowBackIcon />
          </BackButton>
          Runner Management / {isView ? 'View' : 'Edit'}
        </Title>
        {!isView ? (
          <Button edit>
            <Edit style={{ marginRight: '5px' }} />
            Edit
          </Button>
        ) : (
          <Button edit>
            <Block style={{ marginRight: '5px' }} />
            Block Runner
          </Button>
        )}
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={isView}
            />
          </FormGroup>
          <FormGroup>
            <Label>Mobile</Label>
            <Input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              readOnly={isView}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email id</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isView}
            />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              readOnly={isView}
            />
          </FormGroup>
          <FormGroup>
            <Label>State</Label>
            <Select
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={isView}
            >
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Karnataka">Karnataka</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>Aadhar authentication</Label>
            <StatusBadge active>{'successful'}</StatusBadge>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Vendor</Label>
            <Input
              type="text"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              readOnly={isView}
            />
          </FormGroup>
        </FormRow>
        {!isView && (
          <FormGroup>
            <Label>Drone Image</Label>
            <ImageUpload>
              <p>Click or drag file to this area to upload</p>
            </ImageUpload>
          </FormGroup>
        )}
        <DroneImagesContainer>
          <DroneImage src="/path/to/drone-image-1.jpg" alt="Drone 1" />
          <DroneImage src="/path/to/drone-image-2.jpg" alt="Drone 2" />
        </DroneImagesContainer>
        <ButtonContainer>
          <Button type="submit">Done</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default EditRunner;
