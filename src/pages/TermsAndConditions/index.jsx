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

const TermsAndConditions = () => {
  const { translate } = useTranslation();

  return (
    <Container>
      <Title>{translate("termsAndConditions.Terms and Conditions")}</Title>
      <CardContainer>
        <Card>
          <CardTitle>{translate("termsAndConditions.COMMENTS")}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate("termsAndConditions.commentCollection")}
            </Paragraph>
            <Paragraph>
              {translate("termsAndConditions.gravatarInfo")}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate("termsAndConditions.MEDIA")}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate("termsAndConditions.mediaWarning")}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate("termsAndConditions.CONTACT FORMS")}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate("termsAndConditions.commentOptIn")}
            </Paragraph>
            <Paragraph>
              {translate("termsAndConditions.temporaryCookie")}
            </Paragraph>
            <Paragraph>
              {translate("termsAndConditions.loginCookies")}
            </Paragraph>
            <Paragraph>
              {translate("termsAndConditions.editCookie")}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate("termsAndConditions.EMBEDDED CONTENT FROM OTHER WEBSITES")}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate("termsAndConditions.embeddedContent")}
            </Paragraph>
            <Paragraph>
              {translate("termsAndConditions.dataCollection")}
            </Paragraph>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default TermsAndConditions;