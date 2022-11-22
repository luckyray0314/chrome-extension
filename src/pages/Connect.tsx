import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/Connectors";
import { connectMetaMask } from "../contentScript";

const Wrapper = styled.div`
  width: 320px;
  height: 328px;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DescriptionContainer = styled.p`
  width: 172px;
  font-family: "Gilroy-Bold";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 25px;
  text-align: center;
  color: #565251;
`;

const ConnectWalletButton = styled.button`
  margin: 25px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 54px;
  gap: 10px;
  width: 260px;
  height: 47px;
  background: linear-gradient(91.24deg, #1de99b 0.26%, #0063fb 99.58%);
  border-radius: 15px;
  border: none;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: white;
  cursor: pointer;
`;

const NotNowButton = styled.button`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  background: linear-gradient(91.24deg, #1de99b 0.26%, #0063fb 99.58%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  flex: none;
  order: 2;
  flex-grow: 0;
  border: none;
  cursor: pointer;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Connect: FC = () => {
  const navigate = useNavigate();
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    navigate("/addresslist");
    connectMetaMask();
    // try {
    //   await activate(injected);
    // } catch (ex) {
    //   console.log(ex);
    // }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const onClose = () => {
    window.close();
  }

  return (
    <Wrapper>
      <img
        style={{
          width: "60px",
          height: "60px",
        }}
        src={logo}
        alt="Logo"
      />
      <DescriptionContainer>
        Please connect to login to login Now
      </DescriptionContainer>
      <CenterDiv>
        <ConnectWalletButton onClick={connect}>Connect Wallet</ConnectWalletButton>
      </CenterDiv>
      <NotNowButton onClick={onClose}>Not Now</NotNowButton>
    </Wrapper>
  );
};

export default Connect;
