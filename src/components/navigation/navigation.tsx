import React from "react";
import styled from "styled-components";
import MenuIcon from "./menu.svg";
import DotsIcon from "./dots.svg";
import PeopleIcon from "./people.svg";

export const Navigaiton = styled.div`
  background-color: #383063;
  box-sizing: border-box;
  padding: 0 16px 0 16px;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  z-index: 100;
`;

export const Menu = styled.img`
  padding-right: 16px;
`;

export const Title = styled.h1`
  font-weight: lighter;
  font-size: 20px;
  color: #f0f0f3;
  margin-right: auto;
`;

type NavProps = {
  title: string;
};

export default ({ title }: NavProps) => (
  <Navigaiton>
    <Menu src={MenuIcon} alt="menu" />
    <Title>{title}</Title>
    <img src={PeopleIcon} alt="people" />
    <img src={DotsIcon} alt="more" />
  </Navigaiton>
);
