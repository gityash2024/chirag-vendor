import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Block, Edit } from '@material-ui/icons';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAllRunnersList, updateRunner, uploadTos3 } from '../../services/commonService';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/index';
import { useTranslation } from '../../TranslationContext';

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
  const {translate} = useTranslation();
  const { id, isView } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    city: '',
    state: '',
    vendor: '',
    droneImages: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRunnerData();
  }, [id]);

  const fetchRunnerData = async () => {
    setLoading(true);
    try {
      const response = await getAllRunnersList();
      const runner = response.data.find(r => r._id === id);
      if (runner) {
        setFormData(runner);
      }
    } catch (error) {
      toast.error('Failed to fetch runner data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (!isView) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    formData.runnerId = id;
    e.preventDefault();
    setLoading(true);
    try {
      await updateRunner(formData);
      toast.success('Runner updated successfully');
      navigate('/manage-runner');
    } catch (error) {
      toast.error('Failed to update runner');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await uploadTos3(formData);
        setFormData(prev => ({
          ...prev,
          droneImages: [...prev.droneImages, response.data.fileUrl]
        }));
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
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
          {translate('runner.management')} / {isView ? translate('runner.viewRunner') : translate('runner.editRunner')}
        </Title>
        {!isView ? (
          <Button edit onClick={handleSubmit} disabled={loading}>
            <Edit style={{ marginRight: '5px' }} />
            {loading ? translate('runner.updating') : translate('runner.update')}
          </Button>
        ) : null}
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>{translate('runner.name')}</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={isView}
              />
            </FormGroup>
            <FormGroup>
              <Label>{translate('runner.mobile')}</Label>
              <Input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                readOnly={isView}
              />
            </FormGroup>
            <FormGroup>
              <Label>{translate('runner.email')}</Label>
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
              <Label>{translate('runner.city')}</Label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                readOnly={isView}
              />
            </FormGroup>
            <FormGroup>
              <Label>{translate('runner.state')}</Label>
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
              <Label>{translate('runner.aadhaarAuth')}</Label>
              <StatusBadge active={formData.aadhaarVerified}>
                {formData.aadhaarVerified ? translate('runner.verified') : translate('runner.notVerified')}
              </StatusBadge>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>{translate('runner.vendor')}</Label>
              <Input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                readOnly={isView}
              />
            </FormGroup>
          </FormRow>
          {!isView && (
            <FormGroup>
              <Label>{translate('runner.droneImage')}</Label>
              <ImageUpload>
                <input type="file" onChange={handleImageUpload} accept="image/*" />
                <p>{translate('runner.uploadText')}</p>
              </ImageUpload>
            </FormGroup>
          )}
          <DroneImagesContainer>
            {formData.droneImages.map((image, index) => (
              <DroneImage key={index} src={image} alt={`Drone ${index + 1}`} />
            ))}
          </DroneImagesContainer>
          {!isView && (
            <ButtonContainer>
              <Button type="submit" disabled={loading}>
                {loading ? translate('runner.saving') : translate('runner.save')}
              </Button>
            </ButtonContainer>
          )}
        </Form>
      )}
    </Container>
  );

};

export default EditRunner;