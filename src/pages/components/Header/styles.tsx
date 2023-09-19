import styled from "styled-components";

export const HeaderStyle = styled.div`
  width: 80%;
  height: 100%;
  border-bottom: 1px solid #dddddd;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 80px;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    margin: auto;
    flex-direction: column;
    justify-content: space-around;
  }
`;
