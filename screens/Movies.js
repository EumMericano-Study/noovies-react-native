import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movies</Title>
  </Btn>
);

export default Movies;

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: blue;
`;
