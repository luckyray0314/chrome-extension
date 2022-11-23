import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleAddressRow from "../components/detectedAddressList/SingleAddressRow";
import styled from "styled-components";
import refresh from "../assets/refresh.svg";
import home from "../assets/home.svg";
import greyScanning from "../assets/grey-scanning.svg";
import walletAddressShow from "../functions/walletAddressShow";

const Wrapper = styled.div`
  width: 550px;
  height: 358px;
  display: flex;
  flex-direction: column;
  background: #f5fdff;
`;

const HeaderContainer = styled.div`
  padding: 21px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
`;

const Title = styled.div`
  width: 202px;
  height: 24px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #0d0502;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 76px;
  height: 28px;
  display: flex;
  flex-direction: row;
  padding: 0px;
  gap: 20px;
  position: relative;
  cursor: pointer;
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 19px;
  height: 19px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border-radius: 1000px;
`;

const BodyContainer = styled.div`
  height: 288px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Divider = styled.hr`
  margin: 14px 0;
  height: 0px;
  border-color: #828282;
  border-width: 1px;
  opacity: 0.2;
`;

const LoadingContainer = styled.div`
  width: 500px;
  height: 248px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
`;

const ScanText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #9ba0a5;
`;

const DetectedAddressList: FC = () => {
  const [scanning, setScanning] = useState<boolean>(true);
  const [wallets, setWallets] = useState<string[]>([]);
  const navigate = useNavigate();

  const detectWalletAddress = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs);
      const tab = tabs[0];
      if (tab && tab.id) {
        chrome.tabs.sendMessage(tab.id, { url: "123" }, function handler(res) {
          console.log(res);
          setWallets(res);
          setTimeout(() => {
            setScanning(false);
          }, 200);
        });
      }
    });
  };
  useEffect(() => {
    detectWalletAddress();
  }, []);

  const onRefresh = () => {
    setScanning(true);
    detectWalletAddress();
  };

  return (
    <Wrapper>
      <HeaderContainer>
        <Title>{wallets ? wallets.length : 0} Addresses Detected</Title>
        <ButtonContainer>
          <img onClick={() => onRefresh()} src={refresh} alt="Refresh" />
          <img src={home} alt="Home" />
          <BadgeContainer>
            <div
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "1000px",
                background: "#FF5050",
                color: "white",
                lineHeight: 1,
              }}
            >
              3
            </div>
          </BadgeContainer>
        </ButtonContainer>
      </HeaderContainer>
      <BodyContainer>
        {scanning ? (
          <LoadingContainer>
            <img
              className="loader"
              style={{ width: "90px", height: "90px" }}
              src={greyScanning}
              alt="Scanning"
            />
            <ScanText>Scanning</ScanText>
          </LoadingContainer>
        ) : wallets.length > 0 ? (
          wallets.map((wallet, id) => {
            return (
              <div key={id}>
                {id !== 0 && <Divider />}
                <SingleAddressRow address={wallet}></SingleAddressRow>
              </div>
            );
          })
        ) : (
          <p>Not found Wallet Address</p>
        )}
      </BodyContainer>
    </Wrapper>
  );
};

export default DetectedAddressList;
