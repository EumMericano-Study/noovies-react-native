import styled from "../styled-components";

interface Props {
  title: string;
  children: React.ReactNode;
}

const HList = ({ title, children }: Props) => (
  <ListContianer>
    <ListTitle>{title}</ListTitle>
    {children}
  </ListContianer>
);

export default HList;

export const ListContianer = styled.View`
  margin-bottom: 40px;
`;

export const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;

  margin-left: 30px;
  margin-bottom: 30px;
`;
