import { useState } from "react";
import { HeaderContainer, HeaderStyle } from "./styles";
import { TrackRoutes } from "../TrackRoutes";

export interface IHeader {
  routes: string[][];
}
export const Header = ({ routes }: IHeader) => {
  return (
    <HeaderStyle>
      <HeaderContainer>
        {routes.map((r: string[], i: number) => {
          return (
            <TrackRoutes
              key={i}
              routeId={`${i + 1}`}
              routeStart={r[0]}
              routeFinish={r[1]}
            />
          );
        })}
      </HeaderContainer>
    </HeaderStyle>
  );
};
