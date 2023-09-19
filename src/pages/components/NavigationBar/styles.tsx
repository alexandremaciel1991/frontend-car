import { AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";

export const StyleAppBar = styled(AppBar)`
  margin: auto;
  background-color: #fff !important;
  margin-bottom: 40px;
`;

export const StyleToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-around;
`;
export const PreviewButton = styled.a`
  color: #4535aa;
  border: solid 2px #4534aa;
  display: flex;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  width: 130px;
  height: 20px;
  align-items: center;
  justify-content: space-evenly;
`;
export const NextButton = styled.a`
  color: #4535aa;
  border: solid 2px #4534aa;
  display: flex;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  width: 130px;
  height: 20px;
  align-items: center;
  justify-content: space-evenly;
  float: right;
`;
