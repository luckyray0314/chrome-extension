import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import leftArrow from "../assets/left-arrow.svg";
import send from "../assets/send.svg";
import plusGray from "../assets/plus-gray.svg";
import received from "../assets/received.svg";

const Wrapper = styled.div`
  width: 550px;
  height: 450px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: 20px;
  background: #ffffff;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 20px;
`;

const SendButton = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 13px;
  gap: 10px;
  width: 57.44px;
  height: 55px;
  background: linear-gradient(91.24deg, #1de99b 0.26%, #0063fb 99.58%);
  border-radius: 15px;
  border: 0px;
`;

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const SpanMessageTo = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #828282;
`;

const SpanName = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #0d0502;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 20px;
  gap: 115px;
  height: 55px;
  background: #f2f2f2;
  border-radius: 13.3333px;
  width: 400.56px;
`;

const InputMessage = styled.input`
  background: #f2f2f2;
  border-radius: 13.3333px;
  width: 350px;
  height: 40px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  border: 0px solid;
  &:focus {
    outline: none;
  }
`;

const ContentDiv = styled.div`
  background: #f5fdff;
  padding: 10px;
  overflow: auto;
`;

const MessageSendContent = styled.div`
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  gap: 10px;
  max-width: 367px;
  background: #ffffff;
  border: 1px solid #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
`;

const MessageReceiveContent = styled.div`
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  gap: 10px;
  max-width: 367px;
  background: linear-gradient(180deg, #102437 0%, #13171b 100%);
  border: 1px solid #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  color: #ffffff;
`;

const SpanTime = styled.span`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: #828282;
  margin-right: 5px;
`;

const MessageList: FC = () => {
  const [messageData, setMessageData] = useState([]);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const onBack = () => {
    navigate(`/addresslist`);
  };

  useEffect(() => {
    setMessageData([
      {
        content:
          "Find out who is in charge of this portion of the process. Find out who is in chargeContent",
        type: "send",
      },
      {
        content: "hey, I want to contact you",
        type: "receive",
      },
      {
        content:
          "Find out who is in charge of this portion of the process. Find out who is in chargeContent",
        type: "send",
      },
      {
        content: "hey, I want to contact you",
        type: "receive",
      },
    ]);
  }, []);

  const onSend = () => {
    console.log(message);
  }

  return (
    <Wrapper>
      <HeaderContainer>
        <img
          onClick={() => onBack()}
          src={leftArrow}
          alt=""
          style={{ cursor: "pointer" }}
        />
        <ColDiv>
          <SpanMessageTo>Message to</SpanMessageTo>
          <SpanName>@Zain Ekstrom</SpanName>
        </ColDiv>
      </HeaderContainer>
      <ContentDiv>
        {messageData.map((value, key) => {
          if (value.type === "receive") {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginBottom: "10px",
                }}
                key={key}
              >
                <MessageReceiveContent>
                  {value.content}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "10px",
                    }}
                  >
                    <SpanTime>2:05 AM</SpanTime>
                  </div>
                </MessageReceiveContent>
              </div>
            );
          } else {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "10px",
                }}
                key={key}
              >
                <MessageSendContent>
                  {value.content}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginTop: "10px",
                    }}
                  >
                    <SpanTime>2:05 AM</SpanTime>
                    <img src={received} alt="" />
                  </div>
                </MessageSendContent>
              </div>
            );
          }
        })}
      </ContentDiv>
      <FooterContainer>
        <InputDiv>
          <InputMessage placeholder="Write here..." onChange={(e) => setMessage(e.target.value)}></InputMessage>
          <img src={plusGray} alt="" />
        </InputDiv>
        <SendButton onClick={() => onSend()}>
          <img src={send} alt="" />
        </SendButton>
      </FooterContainer>
    </Wrapper>
  );
};

export default MessageList;
