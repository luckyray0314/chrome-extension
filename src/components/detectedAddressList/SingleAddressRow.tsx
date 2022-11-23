import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import styled from "styled-components";
import message from "../../assets/message.svg";
import walletAddressShow from "../../functions/walletAddressShow";

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

interface TypeProps {
  address: string,
}

const SingleAddressRow: FC<TypeProps> = (props) => {
  const navigate = useNavigate();

  const onMessage = () => {
    navigate(`/messageTo/${props.address}`);
  };

  return (
    <Container>
      <Jazzicon diameter={50} seed={jsNumberForAddress(props.address)} />
      <WalletAddress>{walletAddressShow(props.address)}</WalletAddress>
      <img
        style={{ cursor: "pointer" }}
        src={message}
        alt=""
        onClick={() => onMessage()}
      />
    </Container>
  );
};

export default SingleAddressRow;
