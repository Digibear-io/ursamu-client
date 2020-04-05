import styled from "styled-components";
import React from "react";
import bg from "./cyberpunk-bg.jpg";

const Background = styled.div`
  width: 100%;
  height: 100vh;
  z-index: -1;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const BgGradient = styled.div`
  background-color: #161328;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 90%;
`;

export default () => (
  <Background>
    <img src={bg} alt="background" />
    <BgGradient></BgGradient>
  </Background>
);
