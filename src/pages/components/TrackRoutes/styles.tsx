import { Card, ListItem, Typography } from "@material-ui/core";
import styled from "styled-components";

export const TrackRouteContainer = styled.div`
  margin: auto;
  display: block;
  width: 450px;
  position: relative;

  @media (max-width: 700px) {
    width: 300px;
  }
`;

export const RoutesStyle = styled(Card)`
  border-top: 5px;
  margin: 15px 0;
  box-shadow: 0.1rem 0.1rem 1.5rem rgba(0, 0, 0, 0.3) !important;
  max-height: 200px;
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    max-width: 450px;
    background: linear-gradient(to right, red, orange);
  }

  @media (max-width: 700px) {
    max-height: 300px;
  }
`;

export const Title = styled(Typography)`
  margin-bottom: 0;
`;

export const Address = styled(ListItem)`
  padding: 0 !important;
`;
