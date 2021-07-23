import styled from "styled-components";
import { Header } from "./Header";

const Content = styled.main`
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{ children }</Content>

    </>
  );
};

export default Layout;
