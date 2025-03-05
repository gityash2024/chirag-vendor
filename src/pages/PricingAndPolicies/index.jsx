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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
`;

const Th = styled.th`
  background-color: #f5f5f5;
  padding: 10px;
  text-align: left;
  border: 1px solid #e0e0e0;
  font-weight: 600;
  color: #333;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #e0e0e0;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const PricingAndPolicies = () => {
  const { translate } = useTranslation();

  return (
    <Container>
      <Title>{translate('pricingPolicy.title')}</Title>
      <CardContainer>
        <Card>
          <CardContent>
            <Paragraph>
              {translate('pricingPolicy.intro')}
            </Paragraph>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('pricingPolicy.serviceEstimates.title')}</CardTitle>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <Th>{translate('pricingPolicy.serviceEstimates.headers.serviceType')}</Th>
                  <Th>{translate('pricingPolicy.serviceEstimates.headers.crops')}</Th>
                  <Th>{translate('pricingPolicy.serviceEstimates.headers.cost')}</Th>
                  <Th>{translate('pricingPolicy.serviceEstimates.headers.aov')}</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.droneSpray.serviceType')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.droneSpray.crops')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.droneSpray.cost')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.droneSpray.aov')}</Td>
                </tr>
                <tr>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.soilTest.serviceType')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.soilTest.crops')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.soilTest.cost')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.soilTest.aov')}</Td>
                </tr>
                <tr>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.tractor.serviceType')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.tractor.crops')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.tractor.cost')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.tractor.aov')}</Td>
                </tr>
                <tr>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.harvesting.serviceType')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.harvesting.crops')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.harvesting.cost')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.harvesting.aov')}</Td>
                </tr>
                <tr>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.advisory.serviceType')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.advisory.crops')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.advisory.cost')}</Td>
                  <Td>{translate('pricingPolicy.serviceEstimates.rows.advisory.aov')}</Td>
                </tr>
              </tbody>
            </Table>
            <List>
              <ListItem><BoldText>{translate('pricingPolicy.serviceEstimates.summary.aovRange.label')}</BoldText> {translate('pricingPolicy.serviceEstimates.summary.aovRange.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.serviceEstimates.summary.avgAov.label')}</BoldText> {translate('pricingPolicy.serviceEstimates.summary.avgAov.value')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('pricingPolicy.commission.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem><BoldText>{translate('pricingPolicy.commission.walletTopUp.label')}</BoldText> {translate('pricingPolicy.commission.walletTopUp.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.commission.deduction.label')}</BoldText> {translate('pricingPolicy.commission.deduction.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.commission.farmerCosts.label')}</BoldText> {translate('pricingPolicy.commission.farmerCosts.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.commission.runnerModel.label')}</BoldText> {translate('pricingPolicy.commission.runnerModel.value')}</ListItem>
            </List>
            
            <SubSection>
              <SubTitle>{translate('pricingPolicy.commission.promo.title')}</SubTitle>
              <Paragraph>
                {translate('pricingPolicy.commission.promo.content')}
              </Paragraph>
            </SubSection>

            <SubSection>
              <SubTitle>{translate('pricingPolicy.commission.wallet.title')}</SubTitle>
              <List>
                <ListItem>{translate('pricingPolicy.commission.wallet.item1')}</ListItem>
                <ListItem>{translate('pricingPolicy.commission.wallet.item2')}</ListItem>
                <ListItem>{translate('pricingPolicy.commission.wallet.item3')}</ListItem>
                <ListItem>{translate('pricingPolicy.commission.wallet.item4')}</ListItem>
                <ListItem>{translate('pricingPolicy.commission.wallet.item5')}</ListItem>
              </List>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('pricingPolicy.refund.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem><BoldText>{translate('pricingPolicy.refund.eligibility.label')}</BoldText> {translate('pricingPolicy.refund.eligibility.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.refund.processing.label')}</BoldText> {translate('pricingPolicy.refund.processing.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.refund.nonRefundable.label')}</BoldText> {translate('pricingPolicy.refund.nonRefundable.value')}</ListItem>
            </List>
            
            <SubSection>
              <SubTitle>{translate('pricingPolicy.refund.cancellation.title')}</SubTitle>
              <Paragraph>
                {translate('pricingPolicy.refund.cancellation.content')}
              </Paragraph>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('pricingPolicy.payment.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem><BoldText>{translate('pricingPolicy.payment.solution.label')}</BoldText> {translate('pricingPolicy.payment.solution.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.payment.security.label')}</BoldText> {translate('pricingPolicy.payment.security.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.payment.methods.label')}</BoldText> {translate('pricingPolicy.payment.methods.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.payment.settlement.label')}</BoldText> {translate('pricingPolicy.payment.settlement.value')}</ListItem>
            </List>
            
            <SubSection>
              <SubTitle>{translate('pricingPolicy.payment.verification.title')}</SubTitle>
              <Paragraph>
                {translate('pricingPolicy.payment.verification.content')}
              </Paragraph>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('pricingPolicy.transparency.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('pricingPolicy.transparency.content')}
            </Paragraph>
            
            <SubSection>
              <SubTitle>{translate('pricingPolicy.transparency.vendorControl.title')}</SubTitle>
              <Paragraph>
                {translate('pricingPolicy.transparency.vendorControl.content')}
              </Paragraph>
            </SubSection>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('pricingPolicy.dispute.title')}</CardTitle>
          <CardContent>
            <Paragraph>
              {translate('pricingPolicy.dispute.content')}
            </Paragraph>
            <List>
              <ListItem><BoldText>{translate('pricingPolicy.dispute.documentation.label')}</BoldText> {translate('pricingPolicy.dispute.documentation.value')}</ListItem>
              <ListItem><BoldText>{translate('pricingPolicy.dispute.timeline.label')}</BoldText> {translate('pricingPolicy.dispute.timeline.value')}</ListItem>
            </List>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>{translate('pricingPolicy.additional.title')}</CardTitle>
          <CardContent>
            <List>
              <ListItem>{translate('pricingPolicy.additional.item1')}</ListItem>
              <ListItem>{translate('pricingPolicy.additional.item2')}</ListItem>
              <ListItem>{translate('pricingPolicy.additional.item3')}</ListItem>
            </List>
            <Paragraph>
              {translate('pricingPolicy.additional.contact')}
            </Paragraph>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default PricingAndPolicies;