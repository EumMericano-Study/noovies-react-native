import styled from "../styled-components";
import Poster from "./Poster";

interface Props {
  posterPath: string;
  originalTitle: string;
  releaseDate: string;
  overview: string;
}

const HMedia = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
}: Props) => {
  return (
    <Container>
      <Poster path={posterPath} />
      <HorizontalColumn>
        <Title>{originalTitle}</Title>
        <Release>
          {new Date(releaseDate).toLocaleDateString("ko", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Release>
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
  margin-bottom: 30px;
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
