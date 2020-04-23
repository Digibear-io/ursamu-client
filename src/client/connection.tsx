import io from "socket.io-client";

export type Payload = {
  command: string;
  message: string;
  data: { [key: string]: any };
};

type ConnectArgs = {
  user?: string;
  password?: string;
  token?: string;
};

/**
 * Connect to the Socket.io Server
 */
export default ({
  user,
  password,
  token,
}: ConnectArgs): SocketIOClient.Socket => {
  const socket = io("http://localhost:8090");
  console.log(user, password);
  // On connect, send the connect command.  Verifies if
  // player is already authenticated, or needs the login
  // screen.
  socket.on("connect", () =>
    socket.send(
      JSON.stringify({
        command: "connect",
        message: "",
        data: { user, password, token },
      })
    )
  );

  return socket;
};
