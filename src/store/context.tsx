import React, { createContext, useState } from "react";

export type message = {
  sender: string;
  channel: string;
  message: string;
};

export type ContextData = {
  messages: message[];
  setMessage: any;
  history: string[];
  setHistory: any;
  authed: Boolean;
};

export const Context = createContext({});

export default ({ children }: { children: any }) => {
  const [messages, setMessage] = useState([]);
  const [history, setHistory] = useState([]);

  const contextData: ContextData = {
    messages,
    setMessage,
    history,
    setHistory,
    authed: false,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};
