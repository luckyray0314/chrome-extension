import { FC } from "react";
import styled from "styled-components";
import demoAvatar from "../../assets/demo-avatar.svg";
import message from "../../assets/message.svg";

const Container = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const WalletAddress = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  width: 73px;
  height: 21px;
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  background: linear-gradient(180deg, #102437 0%, #13171B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  display: flex;
  justify-content: start;
`;

const SingleAddressRow: FC = () => {
  const onMessage = () => {
    console.log("onMessage");
  }

  return (
    <Container>
      <img src={demoAvatar} alt="Demo" />
      <WalletAddress>0cxf748s</WalletAddress>
      <img style={{ cursor: "pointer" }} src={message} alt="" onClick={() => onMessage()} />
    </Container>
  )
}

export default SingleAddressRow;
