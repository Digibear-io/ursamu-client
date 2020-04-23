import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalState } from "../../store/context";

type WrapperProps = {
  visible: Boolean;
};

const Wrapper = styled.div`
  display: ${(props: WrapperProps) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  overflow-anchor: none;
  justify-content: flex-end;
  margin-top: 48px;
  width: 100%;
  height: 91vh;
`;

const Output = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-anchor: none;
  padding: 0;
  margin: 0;
`;

const Scroller = styled.div`
  height: 94vh;
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 75px;
  }
`;

const TextArea = styled.div`
  width: 90vw;
  padding: 12px 16px 12px 16px;
  border-radius: 10px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 24px;
  color: white;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.4);
  outline-color: rgba(0, 0, 0, 0);
`;

export default () => {
  const [muwindow, setMuWindow] = useGlobalState("muWindow");
  const [socket] = useGlobalState("socket");

  useEffect(() => {
    const out = document.getElementById("Output");
    if (out) {
      console.log(out.scrollTop === out.scrollHeight - out.offsetHeight);
    }
  }, [muwindow.output]);
  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {};
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = document.getElementById("input") as HTMLElement;
    setMuWindow((v) => ({
      ...v,
      input: input.innerText,
    }));
    if (e.charCode === 13 && socket && !e.shiftKey) {
      e.preventDefault();
      socket.send(
        JSON.stringify({
          command: "message",
          message: input.innerText,
          data: {},
        })
      );
      input.innerText = "";
    }
  };

  return (
    <Wrapper visible={muwindow.visible}>
      <Scroller>
        <Output>
          {muwindow.output.map((line) => (
            <li key={muwindow.output.indexOf(line)}>{line}</li>
          ))}
        </Output>
        <div
          id="Anchor"
          style={{ height: "1px", overflowAnchor: "auto" }}
        ></div>
      </Scroller>
      <TextArea
        id="input"
        contentEditable
        onKeyPress={(e) => handleKeyPress(e)}
        onInput={(e) => handleInputChange(e)}
      />
    </Wrapper>
  );
};
