import React from "react";
import styled from "styled-components";
import { Button } from "../forms/forms";
import { useGlobalState } from "../../store/context";
import { motion } from "framer-motion";

type Lvl = {
  [index: string]: any;
  success: string;
  warning: string;
  error: string;
};

const lvl: Lvl = {
  success: "#82FC5E",
  warning: "#FCCD31",
  error: "#E32B27",
};

type Props = {
  [index: string]: any;
  level?: string;
  visible: Boolean;
};

const BannerBox = styled(motion.div)`
  background-color: ${(props: Props) =>
    props.level ? lvl[props.level] : lvl.warning};
  width: 100%;
  z-index: 20;
  margin-top: 48px;
  display: flex;
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

export const Action = styled(Button)`
  font-size: 16px;
  color: #383063;
  border-color: #383063;
  border-width: 1px;
  border-style: solid;
  background-color: rgba(0, 0, 0, 0);
  padding: 8px 0 8px 0;
  margin-left: 8px;
`;

const variants = {
  open: { y: 0 },
  closed: { y: -100 },
};

export default () => {
  const [banner] = useGlobalState("banner");

  return (
    <BannerBox
      level={banner.level}
      visible={banner.visible}
      initial={{ y: -100 }}
      variants={variants}
      animate={banner.visible ? "open" : "closed"}
      transition={{ ease: "linear" }}
    >
      <p>{banner.message}</p>
    </BannerBox>
  );
};
