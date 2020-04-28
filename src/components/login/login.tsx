import styled from "styled-components";
import React from "react";
import bg from "./cyberpunk-bg.jpg";
import { Input, Button } from "../forms/forms";
import logo from "./ursa-logo.svg";
import { useGlobalState } from "../../store/context";

type BgProps = {
  visible: Boolean;
};

const Background = styled.div`
  display: ${(props: BgProps) => (props.visible ? "block" : "none")};
  width: 100%;
  height: 100vh;
`;

const BgImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const BgGradient = styled.div`
  background-color: #161328;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 90%;
`;

const Title = styled.h1`
  font-weight: bold;
  width: 100%;
  font-size: 48px;
  color: #f0f0f3;
`;

const Subtitle = styled.h2`
  font-weight: lighter;
  color: #f0f0f3;
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type Props = {
  onConnect?: () => void;
  onCreate?: () => void;
};

export default ({ onConnect, onCreate }: Props) => {
  const [user, setUser] = useGlobalState("user");
  const [password, setPassword] = useGlobalState("password");
  const [visible] = useGlobalState("login");

  return (
    <Background visible={visible}>
      <BgImage src={bg} alt="background" />
      <BgGradient />
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "50%",
            minWidth: "300px",
            display: "Flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <img src={logo} alt="logo" />
          <Title>URSAMU</Title>
          <Subtitle>A Modern MUSH Server</Subtitle>
          <Input
            value={user}
            placeholder="Character"
            type="text"
            onChange={(e) => setUser((v) => e.target.value)}
          />
          <Input
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword((v) => e.target.value)}
          />
          <ButtonContainer>
            <Button onClick={onConnect}>CONNECT</Button>
            <Button onClick={onCreate}>CREATE</Button>
          </ButtonContainer>
        </div>
      </div>
    </Background>
  );
};
