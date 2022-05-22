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

export const renderVMedia = ({ item }) => (
  <VMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    voteAverage={item.vote_average}
  />
);

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
