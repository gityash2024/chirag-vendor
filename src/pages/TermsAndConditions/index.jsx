import React from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../TranslationContext.jsx';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const CardContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 15px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const SubSection = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #444;
`;

const ContactInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const TermsAndConditions = () => {
  const { translate } = useTranslation();

  return (
    <Container>
      <Title>{translate('termsAndConditions.title')}</Title>
      <CardContainer>
        <Card>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.intro')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section1.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.section1.para1')}
            </Paragraph>
            <Paragraph>
              {translate('termsAndConditions.section1.para2')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section2.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>{translate('termsAndConditions.section2.item1.title')}</strong> {translate('termsAndConditions.section2.item1.content')}</ListItem>
              <ListItem><strong>{translate('termsAndConditions.section2.item2.title')}</strong> {translate('termsAndConditions.section2.item2.content')}</ListItem>
              <ListItem><strong>{translate('termsAndConditions.section2.item3.title')}</strong> {translate('termsAndConditions.section2.item3.content')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section3.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>{translate('termsAndConditions.section3.item1.title')}</strong> {translate('termsAndConditions.section3.item1.content')}</ListItem>
              <ListItem><strong>{translate('termsAndConditions.section3.item2.title')}</strong> {translate('termsAndConditions.section3.item2.content')}</ListItem>
              <ListItem><strong>{translate('termsAndConditions.section3.item3.title')}</strong> {translate('termsAndConditions.section3.item3.content')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section4.title')}</CardTitle>
          <CardContent>
            <SubSection>
              <SubTitle>{translate('termsAndConditions.section4.pricing.title')}</SubTitle>
              <Paragraph>
                {translate('termsAndConditions.section4.pricing.content')}
              </Paragraph>
            </SubSection>
            <SubSection>
              <SubTitle>{translate('termsAndConditions.section4.wallet.title')}</SubTitle>
              <List>
                <ListItem>{translate('termsAndConditions.section4.wallet.item1')}</ListItem>
                <ListItem>{translate('termsAndConditions.section4.wallet.item2')}</ListItem>
              </List>
            </SubSection>
            <SubSection>
              <SubTitle>{translate('termsAndConditions.section4.promo.title')}</SubTitle>
              <Paragraph>
                {translate('termsAndConditions.section4.promo.content')}
              </Paragraph>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section5.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.section5.para1')}
            </Paragraph>
            <Paragraph>
              {translate('termsAndConditions.section5.para2')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section6.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.section6.para1')}
            </Paragraph>
            <Paragraph>
              {translate('termsAndConditions.section6.para2')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section7.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>{translate('termsAndConditions.section7.item1.title')}</strong> {translate('termsAndConditions.section7.item1.content')}</ListItem>
              <ListItem><strong>{translate('termsAndConditions.section7.item2.title')}</strong> {translate('termsAndConditions.section7.item2.content')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section8.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.section8.content')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section9.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.section9.content')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section10.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.section10.content')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('termsAndConditions.section11.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('termsAndConditions.section11.contact')}
            </Paragraph>
            <ContactInfo>
              <Paragraph>{translate('termsAndConditions.section11.email')}</Paragraph>
              <Paragraph>{translate('termsAndConditions.section11.phone')}</Paragraph>
            </ContactInfo>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default TermsAndConditions;