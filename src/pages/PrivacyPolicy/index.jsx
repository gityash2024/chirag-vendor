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
      <Title>Privacy Policy</Title>
      <CardContainer>
        <Card>
          <CardContent>
            <Paragraph>
              Welcome to the CHIRAG CONNECT™ Vendor Web App. This Privacy Policy outlines how CHIRAG TECHNOLOGIES 
              collects, uses, shares, and protects your personal and business information when you access or use our platform. 
              By using the platform, you agree to the practices outlined in this Privacy Policy.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>1. Information We Collect</CardTitle>
          <CardContent>
            <Paragraph>When you register and use the CHIRAG CONNECT™ Vendor Web App, we collect the following types of information:</Paragraph>
            
            <SubSection>
              <SubTitle>1.1 Personal Information</SubTitle>
              <List>
                <ListItem>Name, address, email address, phone number, and other contact details.</ListItem>
                <ListItem>Business details such as GSTIN, PAN, bank account information, and operational address.</ListItem>
              </List>
            </SubSection>

            <SubSection>
              <SubTitle>1.2 Service Data</SubTitle>
              <List>
                <ListItem>Details of services you provide through the platform, including service descriptions, pricing, and availability.</ListItem>
                <ListItem>Wallet transactions, service bookings, and payment details.</ListItem>
              </List>
            </SubSection>

            <SubSection>
              <SubTitle>1.3 Usage Information</SubTitle>
              <List>
                <ListItem>Information about how you interact with the platform, such as login activity, page views, and clickstream data.</ListItem>
                <ListItem>Device information (IP address, browser type, and operating system).</ListItem>
              </List>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>2. How We Use Your Information</CardTitle>
          <CardContent>
            <List>
              <ListItem><strong>To facilitate platform operations:</strong> Ensure smooth transactions, service bookings, and Wallet management.</ListItem>
              <ListItem><strong>To improve the platform:</strong> Analyze usage patterns to enhance user experience and functionality.</ListItem>
              <ListItem><strong>To communicate with you:</strong> Share important updates, promotional offers, and service notifications.</ListItem>
              <ListItem><strong>For compliance and security:</strong> Prevent fraudulent activities and ensure compliance with legal and regulatory requirements.</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>3. Sharing of Information</CardTitle>
          <CardContent>
            <Paragraph>
              CHIRAG TECHNOLOGIES™ respects your privacy and ensures that your information is not sold, rented, 
              or shared with third parties except in the following cases:
            </Paragraph>
            <List>
              <ListItem><strong>Service Fulfillment:</strong> Information shared with farmers or other stakeholders to facilitate service bookings.</ListItem>
              <ListItem><strong>Third-Party Service Providers:</strong> Vendors assisting us with payment processing, analytics, or other operational tasks (bound by confidentiality agreements).</ListItem>
              <ListItem><strong>Legal Compliance:</strong> When required to comply with applicable laws, regulations, or legal processes.</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>4. Wallet Data Usage</CardTitle>
          <CardContent>
            <List>
              <ListItem>The Wallet feature is designed for virtual transactions related to service bookings.</ListItem>
              <ListItem>Your Wallet balance remains secure and is solely used for service-related activities.</ListItem>
              <ListItem>Withdrawal of the Wallet balance is permitted anytime without charges.</ListItem>
              <ListItem>No interest is accrued on Wallet funds.</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>5. Data Security</CardTitle>
          <CardContent>
            <Paragraph>We implement industry-standard measures to protect your information, including:</Paragraph>
            <List>
              <ListItem>Encryption of sensitive data.</ListItem>
              <ListItem>Secure access controls to prevent unauthorized access.</ListItem>
              <ListItem>Regular audits to ensure system security.</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>6. Cookies and Tracking Technologies</CardTitle>
          <CardContent>
            <Paragraph>We use cookies and similar tracking technologies to improve your experience on the platform. Cookies help us:</Paragraph>
            <List>
              <ListItem>Remember your login information.</ListItem>
              <ListItem>Provide personalized recommendations and notifications.</ListItem>
              <ListItem>Analyze platform usage for improvements.</ListItem>
            </List>
            <Paragraph>You can manage or disable cookies in your browser settings, though this may affect platform functionality.</Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>7. Your Rights</CardTitle>
          <CardContent>
            <Paragraph>As a user of the platform, you have the right to:</Paragraph>
            <List>
              <ListItem>Access and review the personal information we hold about you.</ListItem>
              <ListItem>Request corrections or updates to your information.</ListItem>
              <ListItem>Delete your account and associated data (subject to compliance with legal obligations).</ListItem>
            </List>
            <Paragraph>To exercise these rights, please contact us at contact@chiragtechnologies.com.</Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>8. Data Retention</CardTitle>
          <CardContent>
            <Paragraph>
              We retain your data for as long as it is necessary to provide our services and comply with legal obligations. 
              Once you deactivate your account, we will delete or anonymize your data, except where retention is required by law.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>9. Changes to This Privacy Policy</CardTitle>
          <CardContent>
            <Paragraph>
              CHIRAG TECHNOLOGIES reserves the right to update this Privacy Policy at any time. Any changes will be 
              communicated via the platform or registered email. Continued use of the platform constitutes your 
              agreement to the updated Privacy Policy.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>10. Governing Law</CardTitle>
          <CardContent>
            <Paragraph>
              This Privacy Policy is governed by the laws of India. Any disputes arising from it will be resolved in 
              the courts of Prayagraj, Uttar Pradesh.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>11. Contact Us</CardTitle>
          <CardContent>
            <Paragraph>
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:
            </Paragraph>
            <ContactInfo>
              <Paragraph>Email: contact@chiragtechnologies.com</Paragraph>
              <Paragraph>Phone: +91-7837750472</Paragraph>
            </ContactInfo>
            <Paragraph>
              By using the CHIRAG CONNECT™ Vendor Web App, you consent to the practices outlined in this Privacy Policy.
            </Paragraph>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default PrivacyPolicy;