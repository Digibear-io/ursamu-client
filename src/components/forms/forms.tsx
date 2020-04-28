import styled from "styled-components";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 60%;
  max-width: 640px;
  margin: 20vh auto auto auto;
  border-radius: 5px;
  background-color: rgba(125, 116, 150, 0.6);
  padding: 56px;
  align-items: center;
  text-align: center;
`;

export const Input = styled.input`
  color: #383063;
  background-color: rgba(240, 240, 243, 0.5);
  border: none;
  height: 48px;
  border-radius: 5px;
  margin-top: 24px;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
  ::placeholder {
    font-size: 1rem;
    font-weight: lighter;
  }

  width: ${(props) => props.width || "100%"};
`;

type ButtonProps = {
  width?: number | string;
};
export const Button = styled.button`
  background-color: #383063;
  padding: 16px 0 16px 0;
  color: #f0f0f3;

  border-radius: 5px;
  font-size: 18px;
  border: none;
  width: ${(props: ButtonProps) => (props.width ? props.width : "45%")};
`;
