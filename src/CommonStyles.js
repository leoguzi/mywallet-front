import styled from "styled-components";
import { colors } from "./globalStyles";

const MainTitle = styled.h1`
  font-family: "Saira Stencil One", cursive;
  margin-bottom: 20px;
  font-size: 32px;
  color: ${colors.white};
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 175px auto 0 auto;
  padding: 0 20px;
  width: 100%;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 100px auto 0 auto;
  padding: 0 20px;
  width: 100%;
`;

const FormField = styled.input`
  width: 100%;
  height: 58px;
  border-radius: 6px;
  border: none;
  margin-bottom: 10px;
  padding-left: 10px;
  color: ${colors.black};
  font-size: 20px;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 6px;
  background-color: ${colors.clearPurple};
  color: ${colors.white};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
`;

const InvalidDataWarning = styled.span`
  color: ${colors.red};
  display: block;
  align-self: center;
  margin-bottom: 10px;
  font-size: 18px;
  text-decoration: underline;
  text-align: center;
`;

const StyledLink = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.white};
`;

const EntryTitle = styled.h1`
  padding: 0 25px;
  margin-bottom: 15px;
  color: ${colors.white};
  font-size: 26px;
  font-weight: bold;
  margin-top: 13px;
`;
const EntryForm = styled.form`
  padding: 0 25px;
`;

export {
  MainTitle,
  LoginContainer,
  SignUpContainer,
  FormField,
  InvalidDataWarning,
  StyledLink,
  StyledButton,
  EntryTitle,
  EntryForm,
};
