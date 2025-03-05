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
  margin: 15px 0;
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

const PrivacyPolicy = () => {
  const { translate } = useTranslation();

  return (
    <Container>
      <Title>{translate('privacyPolicy.title')}</Title>
      <CardContainer>
        <Card>
          <CardContent>
            <Paragraph>
              {translate('privacyPolicy.intro')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section1.title')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('privacyPolicy.section1.intro')}</Paragraph>
            
            <SubSection>
              <SubTitle>{translate('privacyPolicy.section1.personal.title')}</SubTitle>
              <List>
                <ListItem>{translate('privacyPolicy.section1.personal.item1')}</ListItem>
                <ListItem>{translate('privacyPolicy.section1.personal.item2')}</ListItem>
              </List>
            </SubSection>

            <SubSection>
              <SubTitle>{translate('privacyPolicy.section1.service.title')}</SubTitle>
              <List>
                <ListItem>{translate('privacyPolicy.section1.service.item1')}</ListItem>
                <ListItem>{translate('privacyPolicy.section1.service.item2')}</ListItem>
              </List>
            </SubSection>

            <SubSection>
              <SubTitle>{translate('privacyPolicy.section1.usage.title')}</SubTitle>
              <List>
                <ListItem>{translate('privacyPolicy.section1.usage.item1')}</ListItem>
                <ListItem>{translate('privacyPolicy.section1.usage.item2')}</ListItem>
              </List>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section2.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>{translate('privacyPolicy.section2.item1.title')}</strong> {translate('privacyPolicy.section2.item1.content')}</ListItem>
              <ListItem><strong>{translate('privacyPolicy.section2.item2.title')}</strong> {translate('privacyPolicy.section2.item2.content')}</ListItem>
              <ListItem><strong>{translate('privacyPolicy.section2.item3.title')}</strong> {translate('privacyPolicy.section2.item3.content')}</ListItem>
              <ListItem><strong>{translate('privacyPolicy.section2.item4.title')}</strong> {translate('privacyPolicy.section2.item4.content')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section3.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('privacyPolicy.section3.intro')}
            </Paragraph>
            <List>
              <ListItem><strong>{translate('privacyPolicy.section3.item1.title')}</strong> {translate('privacyPolicy.section3.item1.content')}</ListItem>
              <ListItem><strong>{translate('privacyPolicy.section3.item2.title')}</strong> {translate('privacyPolicy.section3.item2.content')}</ListItem>
              <ListItem><strong>{translate('privacyPolicy.section3.item3.title')}</strong> {translate('privacyPolicy.section3.item3.content')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section4.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem>{translate('privacyPolicy.section4.item1')}</ListItem>
              <ListItem>{translate('privacyPolicy.section4.item2')}</ListItem>
              <ListItem>{translate('privacyPolicy.section4.item3')}</ListItem>
              <ListItem>{translate('privacyPolicy.section4.item4')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section5.title')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('privacyPolicy.section5.intro')}</Paragraph>
            <List>
              <ListItem>{translate('privacyPolicy.section5.item1')}</ListItem>
              <ListItem>{translate('privacyPolicy.section5.item2')}</ListItem>
              <ListItem>{translate('privacyPolicy.section5.item3')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section6.title')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('privacyPolicy.section6.intro')}</Paragraph>
            <List>
              <ListItem>{translate('privacyPolicy.section6.item1')}</ListItem>
              <ListItem>{translate('privacyPolicy.section6.item2')}</ListItem>
              <ListItem>{translate('privacyPolicy.section6.item3')}</ListItem>
            </List>
            <Paragraph>{translate('privacyPolicy.section6.outro')}</Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section7.title')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('privacyPolicy.section7.intro')}</Paragraph>
            <List>
              <ListItem>{translate('privacyPolicy.section7.item1')}</ListItem>
              <ListItem>{translate('privacyPolicy.section7.item2')}</ListItem>
              <ListItem>{translate('privacyPolicy.section7.item3')}</ListItem>
            </List>
            <Paragraph>{translate('privacyPolicy.section7.contact')}</Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section8.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('privacyPolicy.section8.content')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section9.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('privacyPolicy.section9.content')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section10.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('privacyPolicy.section10.content')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('privacyPolicy.section11.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('privacyPolicy.section11.intro')}
            </Paragraph>
            <ContactInfo>
              <Paragraph>{translate('privacyPolicy.section11.email')}</Paragraph>
              <Paragraph>{translate('privacyPolicy.section11.phone')}</Paragraph>
            </ContactInfo>
            <Paragraph>
              {translate('privacyPolicy.section11.consent')}
            </Paragraph>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default PrivacyPolicy;