import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { StyledTitle } from "../CommonStyles";
import { colors } from "../globalStyles";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { activeLogout } from "../services/api.service";

export default function Main() {
  const { user } = useContext(UserContext);
  const firstName = user.name.split(" ")[0];
  const history = useHistory();

  function logout() {
    activeLogout({ token: user.token }).then(history.push("/"));
  }

  return (
    <Container>
      <StyledTitle>{`Olá, ${firstName}`}</StyledTitle>
      <LogoutIcon onClick={() => logout()} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 25px 0 25px;
`;
const LogoutIcon = styled(RiLogoutBoxRLine)`
  font-size: 26px;
  color: ${colors.white};
`;
