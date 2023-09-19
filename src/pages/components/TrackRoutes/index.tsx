import {
  CardActionArea,
  CardContent,
  Divider,
  List,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Address, RoutesStyle, Title, TrackRouteContainer } from "./styles";
import { useRouter } from "next/navigation";

export interface ITrackRoutes {
  routeId: string;
  routeStart: string;
  routeFinish: string;
}
export const TrackRoutes = ({
  routeId,
  routeStart,
  routeFinish,
}: ITrackRoutes) => {
  const router = useRouter();
  const handleClick = () => {
    const id = parseInt(routeId) - 1;
    router.push("/map?routeId=" + id);
  };
  return (
    <TrackRouteContainer>
      <RoutesStyle onClick={handleClick}>
        <CardActionArea>
          <CardContent>
            <Title variant="h5" component="div">
              Rota {routeId}
            </Title>
            <List>
              <Address alignItems="flex-start">
                <ListItemText
                  primary="Saída"
                  secondary={
                    <Typography variant="body2">{routeStart}</Typography>
                  }
                />
              </Address>
              <Divider variant="fullWidth" component="li" />
              <Address alignItems="flex-start">
                <ListItemText
                  primary="Chegada"
                  secondary={
                    <Typography variant="body2">{routeFinish}</Typography>
                  }
                />
              </Address>
            </List>
          </CardContent>
        </CardActionArea>
      </RoutesStyle>
    </TrackRouteContainer>
  );
};
