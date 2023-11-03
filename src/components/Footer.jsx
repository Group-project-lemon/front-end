import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <Section>
        <SectionTitle>S E R V I C E S</SectionTitle>
        <StyledButton>customer service</StyledButton>
      </Section>
      <Section>
        <SectionTitle>S T I C K Y L E M O N</SectionTitle>
        <StyledButton>ABOUT</StyledButton>
      </Section>
      <Section>
        <SectionTitle>N E W S L E T T E R</SectionTitle>
        <NewsletterContainer>
          <NewsletterInput placeholder="Enter your email" />
          <StyledButton>GO!</StyledButton>
        </NewsletterContainer>
      </Section>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 80px 20px;
  background-color: #84693e;
  color: white;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;
`;

const StyledButton = styled.button`
  --accent-color: white;

  background: transparent;
  border-radius: 3px;
  border: 1px solid var(--accent-color);
  color: var(--accent-color);
  display: inline-block;
  margin: 0.25rem 0;
  padding: 0.25rem 0.5rem;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    filter: brightness(0.85);
  }
`;

const NewsletterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NewsletterInput = styled.input`
  padding: 0.25rem 0.5rem;
  margin-right: 5px;
  border-radius: 3px;
  border: 1px solid var(--accent-color);
  outline: none;
  font-size: 12px;
`;
