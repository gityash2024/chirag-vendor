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
      <Title>Terms and Conditions</Title>
      <CardContainer>
        <Card>
          <CardContent>
            <Paragraph>
              Welcome to the CHIRAG CONNECT™ Vendor Web App. By accessing or using this platform, 
              you agree to comply with and be bound by the following terms and conditions. 
              Please read them carefully before proceeding.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>1. Introduction</CardTitle>
          <CardContent>
            <Paragraph>
              CHIRAG CONNECT™ Vendor Web App ("Platform") is an online platform developed by 
              CHIRAG TECHNOLOGIES™ for vendors/service providers (hereafter referred to as "you" or "Vendor") 
              to connect with farmers and other stakeholders in the agriculture ecosystem.
            </Paragraph>
            <Paragraph>
              By registering on this platform, you accept these terms and conditions, as well as our Privacy Policy.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>2. Vendor Account</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>Eligibility:</strong> Vendors must be legally authorized to operate and provide services/products in their respective jurisdictions.</ListItem>
              <ListItem><strong>Registration:</strong> You agree to provide accurate, complete, and up-to-date information during the registration process.</ListItem>
              <ListItem><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account will be considered your responsibility.</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>3. Vendor Responsibilities</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>Service Standards:</strong> Vendors are required to provide accurate information about their products or services, maintain transparency, and deliver high-quality services/products as promised.</ListItem>
              <ListItem><strong>Compliance:</strong> Vendors must adhere to all applicable laws, including agricultural, trade, and taxation laws.</ListItem>
              <ListItem><strong>Prohibited Activities:</strong> Misrepresentation, fraud, or unauthorized use of the Platform is strictly prohibited.</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>4. Transactions and Payments</CardTitle>
          <CardContent>
            <SubSection>
              <SubTitle>Pricing</SubTitle>
              <Paragraph>
                Vendors must ensure the pricing of their services or products is accurate and displayed transparently.
              </Paragraph>
            </SubSection>
            <SubSection>
              <SubTitle>Wallet System</SubTitle>
              <List>
                <ListItem>CHIRAG TECHNOLOGIES™ deducts a commission for every service completed through the Platform from the Vendor's Wallet.</ListItem>
                <ListItem>Vendors need to top up or recharge their Wallets for new service bookings.</ListItem>
              </List>
            </SubSection>
            <SubSection>
              <SubTitle>Promotional Offer</SubTitle>
              <Paragraph>
                As a promotional benefit for new onboarding vendors and service providers, no commission is currently being charged. 
                CHIRAG TECHNOLOGIES™ will inform vendors when commissions become chargeable.
              </Paragraph>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>5. Data Collection and Use</CardTitle>
          <CardContent>
            <Paragraph>
              Vendors agree that CHIRAG CONNECT™ may collect and use certain data for operational purposes, 
              including analytics, recommendations, and service improvement.
            </Paragraph>
            <Paragraph>
              Data collected from the Vendor will be handled as per the Privacy Policy.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>6. Intellectual Property</CardTitle>
          <CardContent>
            <Paragraph>
              All intellectual property rights related to the Platform, including but not limited to logos, 
              designs, and technology, belong to CHIRAG TECHNOLOGIES™.
            </Paragraph>
            <Paragraph>
              Vendors may not reproduce, distribute, or create derivative works from the Platform without prior written consent.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>7. Termination</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>Voluntary Termination:</strong> Vendors can discontinue using the platform by deactivating their accounts.</ListItem>
              <ListItem><strong>Breach of Terms:</strong> CHIRAG CONNECT™ reserves the right to suspend or terminate accounts found violating these terms without prior notice.</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>8. Limitation of Liability</CardTitle>
          <CardContent>
            <Paragraph>
              CHIRAG CONNECT™ is a facilitator and does not guarantee the accuracy, reliability, or quality of 
              services/products offered by vendors. We are not liable for any direct, indirect, or consequential 
              damages arising from your use of the platform.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>9. Amendments</CardTitle>
          <CardContent>
            <Paragraph>
              CHIRAG CONNECT™ reserves the right to amend these terms and conditions at any time. 
              Changes will be notified via the Platform or registered email.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>10. Governing Law</CardTitle>
          <CardContent>
            <Paragraph>
              These terms are governed by and construed in accordance with the laws of India. 
              Any disputes arising out of or related to the use of the Platform will be subject to 
              the exclusive jurisdiction of the courts in Prayagraj, Uttar Pradesh.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>11. Contact Us</CardTitle>
          <CardContent>
            <Paragraph>
              If you have any questions about these terms, please contact us at:
            </Paragraph>
            <ContactInfo>
              <Paragraph>Email: contact@chiragtechnologies.com</Paragraph>
              <Paragraph>Phone: +91-7838750472</Paragraph>
            </ContactInfo>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default TermsAndConditions;