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
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const PrivacyPolicy = () => {
  const { translate } = useTranslation();

  return (
    <Container>
      <Title>{translate('Privacy policy')}</Title>
      <CardContainer>
        {/* COMMENTS SECTION */}
        <Card>
          <CardTitle>{translate('COMMENTS')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('commentCollection')}</Paragraph>
            <Paragraph>{translate('gravatarInfo')}</Paragraph>
          </CardContent>
        </Card>

        {/* MEDIA SECTION */}
        <Card>
          <CardTitle>{translate('MEDIA')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('mediaWarning')}</Paragraph>
          </CardContent>
        </Card>

        {/* CONTACT FORMS SECTION */}
        <Card>
          <CardTitle>{translate('CONTACT FORMS')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('commentOptIn')}</Paragraph>
            <Paragraph>{translate('temporaryCookie')}</Paragraph>
            <Paragraph>{translate('loginCookies')}</Paragraph>
            <Paragraph>{translate('editCookie')}</Paragraph>
          </CardContent>
        </Card>

        {/* EMBEDDED CONTENT SECTION */}
        <Card>
          <CardTitle>{translate('EMBEDDED CONTENT FROM OTHER WEBSITES')}</CardTitle>
          <CardContent>
            <Paragraph>{translate('embeddedContent')}</Paragraph>
            <Paragraph>{translate('dataCollection')}</Paragraph>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default PrivacyPolicy;
