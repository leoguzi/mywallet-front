import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { colors } from "../globalStyles";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { activeLogout, fetchEntries } from "../services/api.service";
import dayjs from "dayjs";

export default function Main() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const firstName = user?.name.split(" ")[0];
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user) {
      const authUser = JSON.parse(localStorage.getItem("authUser"));
      authUser ? setUser(authUser) : history.push("/");
    }
    if (user) {
      fetchEntries(user.token)
        .then((r) => {
          setEntries(r.data.entries);
          setBalance(r.data.balance);
        })
        .catch((e) => console.log(e.response.status));
    }
  }, [user, setUser, history]);

  function logout() {
    localStorage.removeItem("authUser");
    activeLogout({ token: user.token }).then(history.push("/"));
  }

  return (
    <>
      <Container>
        <StyledTitle>{`Olá, ${firstName}`}</StyledTitle>
        <LogoutIcon onClick={() => logout()} />
      </Container>
      <div>
        <DataList>
          {entries.length === 0 ? (
            <NoEntries>Não há registros de entrada ou saída</NoEntries>
          ) : (
            entries.map((entrie, index) => (
              <StyledLi key={index}>
                <StyledDate>{dayjs(entrie.date).format("DD/MM")}</StyledDate>{" "}
                <Description>{entrie.description}</Description>{" "}
                <Value negative={entrie.value < 0 ? true : false}>
                  {(Number(entrie.value) / 100)
                    .toFixed(2)
                    .replace(".", ",")
                    .replace("-", "")}
                </Value>
              </StyledLi>
            ))
          )}
        </DataList>
        <Balance>
          <span>Saldo</span>
          <Value negative={balance < 0 ? true : false}>
            {(Number(balance) / 100)
              .toFixed(2)
              .replace(".", ",")
              .replace("-", "")}
          </Value>
        </Balance>
      </div>
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
  padding-top: 5px;
  height: 65vh;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow: hidden;
  overflow-y: scroll;
`;
const StyledLi = styled.li`
  margin: 10px;
  position: relative;
  width: inherit;
  height: 20px;
  display: flex;
  span {
    font-size: 16px;
  }
`;
const StyledDate = styled.span`
  color: ${colors.grey};
  margin-right: 10px;
`;

const Description = styled.span`
  width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.span`
  color: ${(props) => (props.negative ? colors.red : colors.green)};
  position: absolute;
  right: 8px;
`;

const Balance = styled.div`
  display: flex;
  position: relative;
  margin: 0 25px;
  padding-left: 10px;
  height: 35px;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${colors.white};
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
