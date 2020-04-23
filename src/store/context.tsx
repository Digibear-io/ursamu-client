import { createGlobalState } from "react-hooks-global-state";

export type State = {
  socket: SocketIOClient.Socket | undefined;
  banner: {
    visible: Boolean;
    level?: string;
    message: string;
    ok: Boolean;
    okAction?: () => {};
    cancel: Boolean;
    cancelAction?: () => {};
  };
  muWindow: {
    history: string[];
    input: string;
    output: JSX.Element[];
    visible: Boolean;
    last?: string;
  };
  login: Boolean;
  token: string;
  player: {};
  user: string;
  password: string;
  title: string;
};

export const { useGlobalState } = createGlobalState({
  socket: undefined,
  banner: {
    level: "warning",
    visible: false,
    message: "",
    ok: false,
    cancel: false,
  },
  muWindow: {
    history: [],
    input: "",
    output: [],
    visible: false,
  },
  login: true,
  token: "",
  player: {},
  user: "",
  password: "",
  title: "Welcome to UrsaMU",
} as State);
