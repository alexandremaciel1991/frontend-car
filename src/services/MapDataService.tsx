import { IMapData } from "@/Type/MapData";
import MapData from "../mock/frontend_data_gps.json";

export async function getCoordinates(route: number) {
  try {
    //return await formatCoordinates(MapData);

    const [stops] = await Promise.all([formatCoordinates(MapData, route)]);
    return stops;
  } catch (error) {
    // handle error
    return null;
  }
}

const formatCoordinates = (data: IMapData, route: number): any => {
  const course = data.courses[route];
  const stopsCoordinates = course.stop_points.coordinates.map((c, i) => {
    return { lat: c[1], lng: c[0] };
  });
  const path = course.gps.map((g, i) => {
    return { lat: g.latitude, lng: g.longitude };
  });

  return { stopsCoordinates, path };
};
