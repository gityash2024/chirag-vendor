import React, { useState } from "react";
import styled from "styled-components";
import image1 from "../../assets/recommendation-1.png";
import image2 from "../../assets/recommendation-2.png";
import image3 from "../../assets/recommendation-3.png";
import image4 from "../../assets/recommendation-4.png";
import image5 from "../../assets/recommendation-5.png";
import image6 from "../../assets/recommendation-6.png";
import image7 from "../../assets/recommendation-7.png";
import image8 from "../../assets/recommendation-8.png";
import { FaCheck } from 'react-icons/fa';
import riceImage from "../../assets/rice.png";
import maizeImage from "../../assets/maize.png";
import groundnutImage from "../../assets/groundnut.png";
import pigeonPeasImage from "../../assets/pigeon-peas.png";
import soybeanImage from "../../assets/soybean.png";
import sugarcaneImage from "../../assets/sugarcane.png";
import wheatImage from "../../assets/wheat.png";
import sesameImage from "../../assets/sesame.png";
import safflowerImage from "../../assets/safflower.png";
import cottonImage from "../../assets/cotton.png";
import tomatoImage from "../../assets/tomato.png";
import onionImage from "../../assets/onion.png";
import potatoImage from "../../assets/potato.png";
import brinjalImage from "../../assets/brinjal.png";
import mustardImage from "../../assets/mustard.png";
import moongDalImage from "../../assets/moong-dal.png";
import arharDalImage from "../../assets/arhar-dal.png";
import chilliImage from "../../assets/chilli.png";
import mangoImage from "../../assets/mango.png";
import papayaImage from "../../assets/papaya.png";
import appleImage from "../../assets/apple.png";
import litchiImage from "../../assets/litchi.png";
import { useTranslation } from '../../TranslationContext';

const Container = styled.div`
  padding: 20px;
  font-family: "Public Sans", sans-serif;
  position: relative;
  z-index: 1;
`;

const CropCard = styled.div`
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  ${props => props.selected && `
    border-color: #000000;
  `}
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000000;
  display: ${props => props.visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardImageContainer = styled.div`
  width: 100px;
  background: linear-gradient(160.06deg, #34C487 1.81%, #083C88 98.19%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
`;

const CardContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #333;

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }
`;

const WarningContainer = styled.div`
  margin-top: 20px;
  color: #DE0000;
  
  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 8px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const DoneButton = styled(Button)`
  margin-top: 20px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const CropGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;

const CropImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const CropName = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
`;

const Recommendations = () => {
  const { translate } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleViewRecommendations = () => {
    if (!selectedCrop) {
      return;
    }
    setShowRecommendations(true);
  };

  const handleDone = () => {
    setShowRecommendations(false);
    setIsChecked(false);
  };

  const cropList = [
    { name: translate('recommendations.crops.rice'), image: riceImage },
    { name: translate('recommendations.crops.maize'), image: maizeImage },
    { name: translate('recommendations.crops.groundnut'), image: groundnutImage },
    { name: translate('recommendations.crops.pigeonPea'), image: pigeonPeasImage },
    { name: translate('recommendations.crops.soybean'), image: soybeanImage },
    { name: translate('recommendations.crops.sugarcane'), image: sugarcaneImage },
    { name: translate('recommendations.crops.wheat'), image: wheatImage },
    { name: translate('recommendations.crops.sesame'), image: sesameImage },
    { name: translate('recommendations.crops.safflower'), image: safflowerImage },
    { name: translate('recommendations.crops.cotton'), image: cottonImage },
    { name: translate('recommendations.crops.tomato'), image: tomatoImage },
    { name: translate('recommendations.crops.onion'), image: onionImage },
    { name: translate('recommendations.crops.potato'), image: potatoImage },
    { name: translate('recommendations.crops.brinjal'), image: brinjalImage },
    { name: translate('recommendations.crops.mustard'), image: mustardImage },
    { name: translate('recommendations.crops.moongDal'), image: moongDalImage },
    { name: translate('recommendations.crops.arharDal'), image: arharDalImage },
    { name: translate('recommendations.crops.chilli'), image: chilliImage },
    { name: translate('recommendations.crops.mango'), image: mangoImage },
    { name: translate('recommendations.crops.papaya'), image: papayaImage },
    { name: translate('recommendations.crops.apple'), image: appleImage },
    { name: translate('recommendations.crops.litchi'), image: litchiImage }
  ];

  const recommendationData = [
    {
      title: translate('recommendations.flyingSpeed.title'),
      points: [
        "During Spraying: (4.5-5.0)",
        "During Turning RTL etc: <5.5"
      ],
      image: image1
    },
    {
      title: translate('recommendations.height.title'),
      points: [
        "During Spraying: (4.5-5.0)",
        "During Turning RTL etc: <5.5"
      ],
      image: image2
    },
    {
      title: translate('recommendations.waterVolume.title'),
      points: [
        "Stage 1: Early stage: 20 L/HA",
        "Full canopy stage: 25 L/HA"
      ],
      image: image3
    },
    {
      title: translate('recommendations.nozzle.title'),
      points: [
        "Type of nozzle: Anti Drift fan",
        "Droplet size (μm) Insecticide: 250-350",
        "Droplet size (μm) Fungicide: 250-350",
        "Nozzle discharge rate (l/min): 0.8-1.0",
        "Mesh: 50-100",
        "Swath (m): 3-4",
        "Number of Nozzles: 4-8",
        "Pressure (bar): 2-3"
      ],
      image: image4
    },
    {
      title: translate('recommendations.sprayTime.title'),
      points: [
        "Summer & rainy season: 6am-10am & 3pm-6pm",
        "Winter season: 8am-11am & 2pm-5pm",
        "Strictly avoid spraying during flowering season (8am - 5pm)"
      ],
      image: image5
    },
    {
      title: translate('recommendations.environmentalConditions.title'),
      points: [
        "Temperature: <35°C",
        "Humidity: >60%",
        "Wind Speed: <10km/h",
        "During Rain: Do not Spray",
        "Do not operate if visibility during mist/fog is not good"
      ],
      image: image6
    },
    {
      title: translate('recommendations.siteSpecific.title'),
      points: [
        "Plain land: take care of obstacles present in field: Yes",
        "Sloppy terrain: Use terrain following sensors: Yes",
        "Do not operate if visibility during mist/fog is not good"
      ],
      image: image7
    },
    {
      title: translate('recommendations.bufferZone.title'),
      points: [
        "Non-targeted Crops: 5 meters",
        "Water bodies etc: 100 meters"
      ],
      image: image8
    }
  ];

  const warnings = [
    translate('recommendations.warnings.nightSpray'),
    translate('recommendations.warnings.earlySpray'),
    translate('recommendations.warnings.precautions')
  ];

  const renderInitialScreen = () => (
    <>
      <Title>{translate('recommendations.title')}</Title>
      <p style={{ marginBottom: "20px" }}>{translate('recommendations.selectCrop')}</p>
      <CropGrid>
        {cropList.map((crop, index) => (
          <CropCard
            key={index}
            selected={selectedCrop === crop.name}
            onClick={() => setSelectedCrop(crop.name)}
          >
            <CheckIcon visible={selectedCrop === crop.name}>
              <FaCheck />
            </CheckIcon>
            <CropImage src={crop.image} alt={crop.name} />
            <CropName>{crop.name}</CropName>
          </CropCard>
        ))}
      </CropGrid>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>
        <Button 
          style={{
            opacity: !selectedCrop ? 0.5 : 1,
            cursor: !selectedCrop ? "not-allowed" : "pointer",
            width: "200px"
          }} 
          onClick={handleViewRecommendations}
          disabled={!selectedCrop}
        >
          {translate('recommendations.nextButton')}
        </Button>
      </div>
    </>
  );

  const renderRecommendations = () => (
    <>
      <Title>{translate('recommendations.recommendationFor')} "{selectedCrop}"</Title>
      <p>{translate('recommendations.readCarefully')}</p>
      <CardContainer>
        {recommendationData.map((item, index) => (
          <Card key={index}>
            <CardImageContainer>
              <CardImage src={item.image} alt={item.title} />
            </CardImageContainer>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardText>
                <ul>
                  {item.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </CardText>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
      <WarningContainer>
        <ul>
          {warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </WarningContainer>
      <CheckboxContainer>
        <Checkbox 
          type="checkbox" 
          checked={isChecked} 
          onChange={() => setIsChecked(!isChecked)} 
        />
        <label>{translate('recommendations.checkboxLabel')}</label>
      </CheckboxContainer>
      <DoneButton 
        onClick={handleDone} 
        disabled={!isChecked}
      >
        {translate('recommendations.doneButton')}
      </DoneButton>
    </>
  );

  return (
    <Container>
      {showRecommendations ? renderRecommendations() : renderInitialScreen()}
    </Container>
  );
};

export default Recommendations;