import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { colors } from "../globalStyles";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { activeLogout } from "../services/api.service";

export default function Main() {
  const entries = [
    {
      date: "04/09",
      description: "Almoço mãe",
      value: 32.9,
    },
    {
      date: "04/09",
      description: "Almoço eu ",
      value: -25.9,
    },
    {
      date: "04/09",
      description: "Salario",
      value: 5300.0,
    },
  ];
  const { user } = useContext(UserContext);
  const firstName = user.name.split(" ")[0];
  const history = useHistory();

  function logout() {
    activeLogout({ token: user.token }).then(history.push("/"));
  }

  return (
    <>
      <Container>
        <StyledTitle>{`Olá, ${firstName}`}</StyledTitle>
        <LogoutIcon onClick={() => logout()} />
      </Container>
      <DataList>
        {entries.length === 0 ? (
          <NoEntries>Não há registros de entrada ou saída</NoEntries>
        ) : (
          entries.map((entrie) => (
            <StyledLi>
              <Date>{entrie.date}</Date>{" "}
              <Description>{entrie.description}</Description>{" "}
              <Value negative={entrie.value < 0 ? true : false}>
                {entrie.value}
              </Value>
            </StyledLi>
          ))
        )}
        <Balance>
          <span>Saldo</span>
          <Value>203659</Value>
        </Balance>
      </DataList>
      <Container>
        <StyledLink to="/new-entry/income">
          <SquareButton>
            <Plus />
            <ButtonText>Nova entrada</ButtonText>
          </SquareButton>
        </StyledLink>
        <StyledLink to="/new-entry/outcome">
          <SquareButton>
            <Minus />
            <ButtonText>Nova saída</ButtonText>
          </SquareButton>
        </StyledLink>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px 0 25px;
`;

const StyledTitle = styled.h1`
  color: ${colors.white};
  font-size: 26px;
  font-weight: bold;
  margin-top: 13px;
`;

const LogoutIcon = styled(RiLogoutBoxRLine)`
  margin-top: 13px;
  font-size: 26px;
  color: ${colors.white};
`;

const DataList = styled.ul`
  position: relative;
  background-color: ${colors.white};
  margin: 13px 25px 0 25px;
  padding-top: 10px;
  height: 70vh;
  border-radius: 5px;
`;
const StyledLi = styled.li`
  margin: 10px;
  position: relative;
  width: inherit;
  display: flex;
  span {
    font-size: 16px;
  }
`;
const Date = styled.span`
  color: ${colors.grey};
  margin-right: 10px;
`;

const Description = styled.span``;

const Value = styled.span`
  color: ${(props) => (props.negative ? colors.red : colors.green)};
  position: absolute;
  right: 10px;
`;

const Balance = styled.div`
  position: absolute;
  width: 95%;
  display: flex;
  bottom: 10px;
  left: 10px;
  span:first-child {
    font-size: 18px;
    font-weight: bold;
  }
`;
const NoEntries = styled.span`
  font-size: 20px;
  width: 70%;
  text-align: center;
  color: ${colors.grey};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SquareButton = styled.button`
  position: relative;
  background-color: ${colors.clearPurple};
  margin-top: 15px;
  width: 100%;
  height: 18vh;
  border: none;
  border-radius: 5px;
`;

const ButtonText = styled.span`
  width: 50px;
  font-size: 17px;
  display: block;
  text-align: left;
  font-weight: bold;
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: ${colors.white};
`;

const Minus = styled(AiOutlineMinusCircle)`
  color: ${colors.white};
  position: absolute;
  font-size: 20px;
  top: 10px;
  left: 10px;
`;

const Plus = styled(AiOutlinePlusCircle)`
  color: ${colors.white};
  position: absolute;
  font-size: 20px;
  top: 10px;
  left: 10px;
`;

const StyledLink = styled(Link)`
  width: 48%;
`;
