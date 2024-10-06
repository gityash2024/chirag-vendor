import React, { useState } from 'react';
import styled from 'styled-components';
import phoneIcon from '../../assets/phone-icon.png';
import mailIcon from '../../assets/mail-icon.png';
import addressIcon from '../../assets/address-icon.png';
import { toast } from "react-toastify";

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
  cursor: pointer;
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.firstName.length + formData.lastName.length > 100) {
      toast.error("Name should be 100 characters or less");
      setIsLoading(false);
      return;
    }

    if (formData.message.length > 500) {
      toast.error("Message should be 500 characters or less");
      setIsLoading(false);
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbyXyfdhwTFNrIxrDsmZaDY5biqot3ssgCAWwQvSKWmfwzQvo2uKZ5C9Q53ToeYfznW6/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      toast.success('Form submitted successfully, We will contact you soon!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (type) => {
    switch (type) {
      case 'phone':
        window.location.href = 'tel:+1234567890';
        break;
      case 'mail':
        window.location.href = 'mailto:info@chiragconnect.com';
        break;
      case 'address':
        window.open('https://maps.google.com?q=3474 Don Jackson Lane, Port Huron, MI 48060', '_blank');
        break;
      default:
        break;
    }
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
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Inquiry'}
          </SubmitButton>
        </Form>
      </FormContainer>
      <ContactInfoContainer>
        <ContactCard onClick={() => handleCardClick('phone')}>
          <ContactIcon src={phoneIcon} alt="Phone" />
          <ContactTitle>Phone</ContactTitle>
          <ContactText>+1 23 456 7890</ContactText>
        </ContactCard>
        <ContactCard onClick={() => handleCardClick('mail')}>
          <ContactIcon src={mailIcon} alt="Mail" />
          <ContactTitle>Mail</ContactTitle>
          <ContactText>info@chiragconnect.com</ContactText>
        </ContactCard>
        <ContactCard onClick={() => handleCardClick('address')}>
          <ContactIcon src={addressIcon} alt="Address" />
          <ContactTitle>Address</ContactTitle>
          <ContactText>3474 Don Jackson Lane,<br />Port Huron, MI 48060</ContactText>
        </ContactCard>
      </ContactInfoContainer>
    </Container>
  );
};

export default ContactUs;