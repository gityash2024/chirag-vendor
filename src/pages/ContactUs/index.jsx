import React, { useState } from 'react';
import styled from 'styled-components';

// Import icons (replace these with actual imports when you have the assets)
import phoneIcon from '../../assets/phone-icon.png';
import mailIcon from '../../assets/mail-icon.png';
import addressIcon from '../../assets/address-icon.png';

const Container = styled.div`
  padding: 20px;
  font-family: 'Public Sans', sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  grid-column: span 2;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
`;

const SubmitButton = styled.button`
width: 200px;
  grid-column: span 2;
  background-color: #333;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const ContactInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ContactCard = styled.div`
margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
`;

const ContactIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const ContactTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ContactText = styled.p`
  font-size: 14px;
  color: #666;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Container>
      <Title>Contact us</Title>
      <FormContainer>
        <FormTitle>Get in touch with us</FormTitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </InputGroup>
          <TextArea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            required
          />
          <SubmitButton type="submit">Send Inquiry</SubmitButton>
        </Form>
      </FormContainer>
      <ContactInfoContainer>
        <ContactCard>
          <ContactIcon src={phoneIcon} alt="Phone" />
          <ContactTitle>Phone</ContactTitle>
          <ContactText>+1 23 456 7890</ContactText>
        </ContactCard>
        <ContactCard>
          <ContactIcon src={mailIcon} alt="Mail" />
          <ContactTitle>Mail</ContactTitle>
          <ContactText>info@chiragconnect.com</ContactText>
        </ContactCard>
        <ContactCard>
          <ContactIcon src={addressIcon} alt="Address" />
          <ContactTitle>Address</ContactTitle>
          <ContactText>3474 Don Jackson Lane,<br />Port Huron, MI 48060</ContactText>
        </ContactCard>
      </ContactInfoContainer>
    </Container>
  );
};

export default ContactUs;