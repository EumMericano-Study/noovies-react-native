import styled from "styled-components/native";
import { makeImgPath } from "../utils";

interface Props {
  path: string;
}

const Poster: React.FC<Props> = ({ path }: Props) => (
  <Image source={{ uri: makeImgPath(path) }} />
);

export default Poster;

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;
