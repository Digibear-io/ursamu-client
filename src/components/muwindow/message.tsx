import React from "react";
import styled from "styled-components";
import { Payload } from "../../client/connection";

type Props = {
  req: Payload;
  visible?: Boolean;
  alt?: Boolean;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  align-items: top;
  color: #f0f0f3;
  padding-top: 4px;
  padding-bottom: 4px;

  pre {
    padding: 16px;
    white-space: pre-wrap;
    overflow: overlay;
    border: 1px solid black;
    background-color: rgba(0, 0, 0, 0.2);
    code {
      font-family: "Roboto Mono", monospace;
      font-size: 14px;
    }
  }
`;

const Message = (props: Props) => (
  <div
    style={{ paddingRight: "16px" }}
    dangerouslySetInnerHTML={{ __html: props.req.message }}
  ></div>
);

const GMContainer = styled.div`
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border: 1px solid black;
  margin-right: 16px;
  margin-top: 4px;
  margin-bottom: 4px;

  p {
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
  }
`;

const GameMessage = (props: Props) => (
  <GMContainer
    dangerouslySetInnerHTML={{ __html: props.req.message }}
  ></GMContainer>
);

const Blank = styled.div`
  width: 45px;
  margin-left: 16px;
  margin-right: 16px;
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  object-fit: cover;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  border-radius: 75px;
  height: 40px;
  width: 40px;
  margin-left: 16px;
  margin-right: 16px;
  background-color: #989ebb;

  p {
    width: 40px;
    color: #10083b;
    text-align: center;
    font-weight: bold;
  }
`;

type AvatarProps = { target: any; visible?: Boolean };

export const Avatar = (props: AvatarProps) => {
  if (props.visible) {
    if (props.target.avatar) {
      return (
        <div style={{ paddingLeft: 16, paddingRight: 16 }}>
          <AvatarImage src={props.target.avatar} alt="avatar" />
        </div>
      );
    } else {
      return (
        <Circle>
          <p>{props.target.name[0]}</p>
        </Circle>
      );
    }
  } else {
    return <Blank />;
  }
};

const MsgBlock = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
`;

const Name = styled.p`
  font-weight: bold;
`;

const Caption = ({ req }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <p
        style={{
          color: "rgba(255,255,255,.6)",
          fontSize: 14,
          fontWeight: "lighter",
          paddingTop: "4px",
          paddingBottom: "4px",
        }}
      >
        {req.data.en.caption}
      </p>
    </div>
  );
};

export default ({ req, visible = true, alt = false }: Props) => {
  return (
    <>
      {visible && <br />}
      <Container>
        <Avatar target={req.data.en} visible={visible} />
        <MsgBlock>
          {visible && <Name>{req.data.en.name}</Name>}
          {visible && <Caption req={req} />}
          {!alt ? (
            <Message req={req}></Message>
          ) : (
            <GameMessage req={req} alt={alt}></GameMessage>
          )}
        </MsgBlock>
      </Container>
    </>
  );
};
