import { NextButton, PreviewButton, StyleAppBar, StyleToolbar } from "./styles";
import BarContainer from "@material-ui/core/Container";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export interface INavigationBar {
  routeId: number;
}
export const NavigationBar = ({ routeId }: INavigationBar) => {
  const getRoute = (type: string) => {
    if (type === "next") {
      return routeId + 1;
    } else {
      return routeId - 1;
    }
  };

  return (
    <StyleAppBar position="static">
      <BarContainer maxWidth="xl">
        <StyleToolbar disableGutters>
          {routeId > 0 && (
            <PreviewButton href={"/map?routeId=" + getRoute("preview")}>
              <NavigateBeforeIcon /> Rota anterior
            </PreviewButton>
          )}
          <NextButton href={"/map?routeId=" + getRoute("next")}>
            Proxima rota <NavigateNextIcon />
          </NextButton>
        </StyleToolbar>
      </BarContainer>
    </StyleAppBar>
  );
};
