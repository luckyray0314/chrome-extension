import { FC } from "react";
import styled from "styled-components";
import leftArrow from "../assets/left-arrow.svg";

const Wrapper = styled.div`
  width: 550px;
  height: 300px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MessageInput = styled.input`
  margin: 30px 0;
  padding: 20px 20px 0px;
  gap: 115px;
  width: 500px;
  height: 102px;
  background: #F2F2F2;
  border-radius: 13.3333px;
`;

const FooterContainer = styled.div``;

const MessageTo: FC = () => {
  return (
    <Wrapper>
      <HeaderContainer>
        <img src={leftArrow} alt="" />
      </HeaderContainer>
      <MessageInput></MessageInput>
      <FooterContainer></FooterContainer>
    </Wrapper>
  )
}

export default MessageTo;
