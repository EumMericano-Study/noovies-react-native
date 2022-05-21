import styled from "../styled-components";

interface Props {
  voteAverage: number;
}

const Votes = ({ voteAverage }: Props) => {
  return (
    <Container>
      {voteAverage > 0 ? `⭐️ ${voteAverage} / 10` : "Coming soon"}
    </Container>
  );
};

export default Votes;

const Container = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;
