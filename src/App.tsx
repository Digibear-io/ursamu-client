import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Navigation from "./components/navigation/navigation";
import { useGlobalState } from "./store/context";
import Login from "./components/login/login";
import Banner from "./components/banner/banner";
import MuWindow from "./components/muwindow/muwindow";
import { Payload } from "./client/connection";
import io from "socket.io-client";
import Message from "./components/muwindow/message";
import Desc from "./components/muwindow/desc";

/**
 * Generate Global CSS Styles
 */
const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
  };

  body {
    background-color: #10083B;
  }

  blockquote {
    border-left: 3px solid #989ebb;
    padding-left: 8px;
  }

`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export default () => {
  const [, setSocket] = useGlobalState("socket");
  const [, setBanner] = useGlobalState("banner");
  const [user, setUser] = useGlobalState("user");
  const [password, setPassword] = useGlobalState("password");
  const [title] = useGlobalState("title");
  const [, setPlayer] = useGlobalState("player");
  const [, setLogin] = useGlobalState("login");
  const [, setMuWindow] = useGlobalState("muWindow");

  const handleMessage = (req: Payload, socket: SocketIOClient.Socket) => {
    switch (req.command) {
      case "connected":
        // Set global state.
        setPlayer(() => req.data.player);
        setLogin(() => false);
        setUser(() => "");
        setPassword(() => "");
        setBanner((v) => ({ ...v, visible: false }));
        setMuWindow((v) => ({ ...v, visible: true }));
        socket.send(
          JSON.stringify({
            command: "message",
            message: "look here",
            data: { en: req.data.player },
          })
        );
        break;
      case "reconnect":
        break;
      case "error":
        setBanner((v) => ({
          ...v,
          visible: true,
          message: req.message,
          level: "error",
        }));
        break;
      case "message":
        setMuWindow((v) => ({
          ...v,
          output: [
            ...v.output,
            <Message
              req={req}
              visible={v.last !== req.data.en._id}
              alt={false}
            />,
          ],
        }));
        setMuWindow((v) => ({ ...v, last: req.data.en._id }));
        break;
      case "desc":
        setMuWindow((v) => ({
          ...v,
          output: [
            ...v.output,
            <Desc req={req} buffer={v.output.length > 0} />,
          ],
          last: "",
        }));
        break;
      default:
        setMuWindow((v) => ({
          ...v,
          output: [
            ...v.output,
            <Message
              req={req}
              visible={v.last !== req.data.en._id}
              alt={true}
            />,
          ],
        }));
        setMuWindow((v) => ({ ...v, last: req.data.en._id }));
    }
  };

  /**
   * Connect to the game.
   * @param create Is this creating a new character?
   */
  const handleConn = (create?: Boolean) => {
    const socket = io("http://localhost:8090");

    // On connect, send the connect command.  Verifies if
    // player is already authenticated, or needs the login
    // screen.

    socket.on("connect", () =>
      socket.send(
        JSON.stringify({
          command: `${create ? "create" : "connect"}`,
          message: "",
          data: { user, password },
        })
      )
    );

    socket.on("reconnecting", () =>
      setBanner((v) => ({
        ...v,
        visible: true,
        message: "Reconnecting...",
        level: "warning",
      }))
    );

    socket.on("reconnect", () => {
      console.log("made it!");
      setBanner((v) => ({ ...v, visible: false, message: "" }));
      setLogin(() => false);
      setMuWindow((v) => ({ ...v, visible: true }));
    });

    socket.on("message", (req: Payload) => {
      handleMessage(req, socket);
    });

    setSocket((v) => socket);
  };

  return (
    <Wrapper>
      <Global />
      <Navigation title={title} />
      <Banner />
      <Login onConnect={() => handleConn()} onCreate={() => handleConn(true)} />
      <MuWindow />
    </Wrapper>
  );
};
