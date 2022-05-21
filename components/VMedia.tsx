import styled from "../styled-components";
import Poster from "./Poster";
import Votes from "./Votes";

interface Props {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia = ({ posterPath, originalTitle, voteAverage }: Props) => {
  return (
    <Container>
      <Poster path={posterPath} />
      <Title>
        {originalTitle.slice(0, 12)}
        {originalTitle.length > 12 && "..."}
      </Title>
      <Votes voteAverage={voteAverage} />
    </Container>
  );
};

export default VMedia;

const Container = styled.View`
  margin-right: 15px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
