import React from 'react';
import styled from 'styled-components';

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

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const PrivacyPolicy = () => {
  return (
    <Container>
      <Title>Privacy policy</Title>
      <CardContainer>
        <Card>
          <CardTitle>COMMENTS</CardTitle>
          <CardContent>
            <Paragraph>
              When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection.
            </Paragraph>
            <Paragraph>
              An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: After approval of your comment, your profile picture is visible to the public in the context of your comment.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>MEDIA</CardTitle>
          <CardContent>
            <Paragraph>
              If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>CONTACT FORMS</CardTitle>
          <CardContent>
            <Paragraph>
              If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
            </Paragraph>
            <Paragraph>
              If you have an account and you log in to this site, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
            </Paragraph>
            <Paragraph>
              When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
            </Paragraph>
            <Paragraph>
              If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>EMBEDDED CONTENT FROM OTHER WEBSITES</CardTitle>
          <CardContent>
            <Paragraph>
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
            </Paragraph>
            <Paragraph>
              These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracing your interaction with the embedded content if you have an account and are logged in to that website.
            </Paragraph>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default PrivacyPolicy;