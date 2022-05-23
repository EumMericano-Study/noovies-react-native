import { ActivityIndicator } from "react-native";
import styled from "../styled-components";

const Loader = () => (
  <Container>
    <ActivityIndicator />
  </Container>
);
export default Loader;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
