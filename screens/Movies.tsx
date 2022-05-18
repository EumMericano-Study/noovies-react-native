import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "../styled-components";

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => (
  <Container></Container>
);

export default Movies;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;
