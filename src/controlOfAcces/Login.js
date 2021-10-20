import styled from "styled-components";
import { colors } from "../globalStyles";

export default function Login() {
  return <MainTitle>MyWallet</MainTitle>;
}

const MainTitle = styled.h1`
  text-align: center;
  margin-top: 150px;
  font-family: "Saira Stencil One", cursive;
  font-size: 32px;
  color: ${colors.white};
`;
