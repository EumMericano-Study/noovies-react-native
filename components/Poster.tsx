import styled from "styled-components/native";

interface Props {
  path: string;
}

const Poster: React.FC<Props> = ({ path }: Props) => (
  <Image source={{ uri: path }} />
);

export default Poster;

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
