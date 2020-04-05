import React from "react";
import styled from "styled-components";

const lvl = {
  success: "#82FC5E",
  warning: "#FCCD31",
  error: "#E32B27",
};

type Props = {
  level?: "success" | "warning" | "error";
  visible?: Boolean;
};

type CompProps = Props & {
  children?: any;
};

const BannerBox = styled.div`
  background-color: ${(props: Props) =>
    props.level ? lvl[props.level] : lvl.warning};
  width: 100%;
  margin-top: 48px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: absolute;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  color: ${(props: Props) => (props.level === "error" ? "#F0F0F3" : "#383063")};

  img {
    margin-left: auto;
  }
`;

export default ({
  level = "warning",
  visible = false,
  children,
}: CompProps) => (
  <BannerBox level={level} visible={visible}>
    {children}
  </BannerBox>
);
