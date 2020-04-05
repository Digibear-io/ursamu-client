import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Navigation from "./components/navigation/navigation";
import io from "socket.io-client";
import Provider from "./store/context";
import Login from "./components/login/login";
/**
 * Generate Global CSS Styles
 */
const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
  };

  body {
    background-color: #10083B;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

type Payload = {
  command: string;
  message: string;
  data: { [key: string]: any };
};

export type MuRequest = {
  socket: any;
  payload: Payload;
};

export const payload = (
  req: MuRequest,
  { command = "", data = {}, message = "" }: Payload
) => {
  return {
    socket: req.socket,
    payload: {
      command: command ? command : req.payload.command,
      message: message ? message : req.payload.message,
      data: data ? data : req.payload.data,
    },
  };
};

const handleRequest = (req: MuRequest) => {};

/**
 * Connect to the Socket.io Server
 */
export const connect = () => {
  const socket = io("http://localhost:8090");

  // On connect, send the connect command.  Verifies if
  // player is already authenticated, or needs the login
  // screen.
  socket.on("connect", () =>
    socket.send({
      socket: socket,
      payload: {
        command: "connect",
        message: "",
        data: {},
      },
    })
  );

  socket.on("message", (req: MuRequest) => handleRequest(req));
};

export default () => {
  return (
    <Provider>
      <Wrapper>
        <Global />
        <Navigation title="Welcome To UrsaMU" />
        <Login />
      </Wrapper>
    </Provider>
  );
};
