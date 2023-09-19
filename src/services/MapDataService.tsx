import { IMapData } from "@/Type/MapData";
import MapData from "../mock/frontend_data_gps.json";

export async function getCoordinates(route: number) {
  try {
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

export async function getRoutes() {
  try {
    const [selectRoutes] = await Promise.all([formatSelect(MapData)]);
    return selectRoutes;
  } catch (error) {
    // handle error
    return null;
  }
}

const formatSelect = (data: IMapData) => {
  return data.courses.map((course) => {
    return [course.gps[0].address, course.gps[course.gps.length - 1].address];
  });
};
