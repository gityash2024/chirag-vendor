import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from '../../TranslationContext.jsx';
import languageSelectionImage from '../../assets/language-selection-image.png';
import chiragLogo from '../../assets/logo-dark.svg';

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
  height: 100vh;
  object-fit: contain;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  width: 300px;
  margin-right: 100px;
  margin-bottom: 70px;
`;

const Title = styled.h2`
 font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: rgba(35, 33, 42, 0.6);
  margin-bottom: 10px;
  line-height: 32.9px;
`;

const Subtitle = styled.p`
  font-size: 20px;
   font-family: 'Public Sans', sans-serif;
  font-weight: 400;
  color: rgba(35, 33, 42, 0.6);
  margin-bottom: 20px;
  line-height: 24px;
`;

const Select = styled.select`
  width: 67%;
  padding: 7px;
  margin-bottom: 20px;
  border: 1px solid #DBDADE;
  border-radius: 4px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  font-family: 'Public Sans';
  color: rgba(75, 70, 92, 1);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='10' viewBox='0 0 14 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%23707070' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 14px 10px;
  padding-right: 40px; 
`;

const Button = styled.button`
  background-color: #121212;
  color: white;
  padding: 7px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 67%;
  font-size: 20px;
  font-weight: 400;
`;

const SelectLabel = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: rgba(35, 33, 42, 1);
  margin-bottom: 10px;
`;

const LanguageSelection = () => {
  const { language, setLanguagePreference, translate } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <Container>
      <ImageSection>
        <Image src={languageSelectionImage} alt="Language Selection" />
      </ImageSection>
      <FormSection>
        <LogoContainer>
          <Logo src={chiragLogo} alt="CHIRAG Logo" />
        </LogoContainer>
        <Title>{translate('languageSelection.title')}</Title>
        <Subtitle>{translate('languageSelection.subtitle')}</Subtitle>
        <SelectLabel>{translate('languageSelection.selectLabel')}</SelectLabel>
        <form onSubmit={handleSubmit}>
          <Select
            value={language}
            onChange={(e) => setLanguagePreference(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </Select>
          <Button type="submit">{translate('languageSelection.continueButton')}</Button>
        </form>
      </FormSection>
    </Container>
  );
};

export default LanguageSelection;