import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useWeb3React } from "@web3-react/core";
import walletAddressShow from "../functions/walletAddressShow";
// import { injected } from "../wallet/Connectors";
// import { connectMetaMask } from "../contentScript";

const Wrapper = styled.div`
  width: 320px;
  max-height: 328px;
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

const PasswordInput = styled.input`
  padding: 10px;
  background: #f2f2f2;
  border-radius: 10px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
`;

const ErrorSpan = styled.p`
  color: red;
  margin: 0px;
`;

const Connect: FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>(
    "0xA37f49E7B0fb28923515eE6a5D8B5a4fC2f2Cd1B"
  );
  const [password, setPassword] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  async function connect() {
    navigate("/addresslist");
    // setIsConnected(true);
    // if (isConnected === true) {
    //   const data = {
    //     wallet: walletAddress,
    //     password: password,
    //   };
    //   axios
    //     .post(
    //       `http://sirklserver-env.eba-advpp2ip.eu-west-1.elasticbeanstalk.com/auth/signIn`,
    //       data
    //     )
    //     .then((response) => {
    //       navigate("/addresslist");
    //     })
    //     .catch((err) => {
    //       setError(err.response.data.message)
    //       console.log(err.response.data);
    //     });
    //   } else {
    // }
  }

  const onClose = () => {
    window.close();
  };

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
      {isConnected ? (
        <div>
          <label style={{ fontSize: "16px" }}>password</label>
          <br></br>
          <PasswordInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></PasswordInput>
          <ErrorSpan>{error}</ErrorSpan>
        </div>
      ) : (
        ""
      )}
      <CenterDiv>
        <ConnectWalletButton onClick={connect}>
          {isConnected
            ? `Sign in with ${walletAddressShow(walletAddress)}`
            : "Connect Wallet"}
        </ConnectWalletButton>
      </CenterDiv>
      <NotNowButton onClick={onClose}>Not Now</NotNowButton>
    </Wrapper>
  );
};

export default Connect;
