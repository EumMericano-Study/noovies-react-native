import styled from "../styled-components";
import Poster from "./Poster";
import Votes from "./Votes";

interface Props {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
  voteAverage,
}: Props) => {
  return (
    <Container>
      <Poster path={posterPath} />
      <HorizontalColumn>
        <Title>{originalTitle}</Title>
        {releaseDate && (
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Release>
        )}
        {voteAverage && <Votes voteAverage={voteAverage} />}
        <Overview>
          {overview !== "" && overview.length > 100
            ? overview.slice(0, 100).trim() + "..."
            : overview}
        </Overview>
      </HorizontalColumn>
    </Container>
  );
};

export default HMedia;

const Container = styled.View`
  flex-direction: row;
  padding: 0px 39px;
`;

const HorizontalColumn = styled.View`
  width: 80%;
  margin-left: 20px;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Overview = styled.Text`
  width: 80%;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;
