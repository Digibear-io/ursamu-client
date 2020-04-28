import styled from "styled-components";
import React from "react";
import { Payload } from "../../client/connection";
import { Avatar } from "./message";

type Props = {
  req: Payload;
  buffer?: boolean;
};

const Container = styled.div`
  color: #f0f0f3;
  line-height: 22px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  max-height: 91%;
`;

export const PullQuote = styled.p`
  border-left: 2px solid #989ebb;
  box-sizing: border-box;
  margin-left: 18px;
  margin-right: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Name = styled.p`
  font-size: 1.2rem;
  font-weight: normal;
  box-sizing: border-box;
`;

const Caption = ({ req }: Props) => {
  return (
    <div style={{ width: "100%" }}>
      <p
        style={{
          color: "rgba(255,255,255,.7)",
          fontSize: "1.1rem",
          fontWeight: "lighter",
          paddingTop: "4px",
        }}
      >
        {req.data.look.tar.caption}
      </p>
    </div>
  );
};

const NameBlock = ({ req }: Props) => {
  return (
    <div
      style={{
        paddingRight: "16px",
        paddingTop: "16px",
        paddingBottom: "16px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      {req.data.look.tar.type !== "room" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 0,
          }}
        >
          <Avatar target={req.data.look.tar} visible={true} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Name>{req.data.look.tar.name}</Name>
            <Caption req={req} />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "16px",
          }}
        >
          <Name>{req.data.look.tar.name}</Name>
          <Caption req={req} />
        </div>
      )}
    </div>
  );
};

const ImageFrame = ({ req }: Props) => (
  <div
    style={{
      display: "flex",
      flexGrow: 1,
      flexDirection: "column-reverse",
      width: "100%",
      height: "30vh",
      backgroundImage: `url(${req.data.look.tar.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginBottom: "16px",
    }}
  >
    <div
      style={{
        width: "100%",
        position: "relative",
        backgroundColor: "rgba(16, 8, 59,.7)",
      }}
    >
      <NameBlock req={req} />
    </div>
  </div>
);

export default ({ req, buffer = false }: Props) => (
  <>
    {buffer && <br />}
    <Container>
      {req.data.look.tar.image ? (
        <ImageFrame req={req} />
      ) : (
        <NameBlock req={req} />
      )}
      <PullQuote dangerouslySetInnerHTML={{ __html: req.message }}></PullQuote>
    </Container>
  </>
);
