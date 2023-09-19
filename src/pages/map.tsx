import { ViewMap } from "./components/Map";
import { getCoordinates } from "@/services/MapDataService";
import { GetServerSideProps } from "next";
import { NavigationBar } from "./components/NavigationBar";

export interface ICoordinates {
  stopsCoordinates: { lat: number; lng: number }[];
  path: { lat: number; lng: number }[];
  routeId: number;
}
export default function Map({ stopsCoordinates, path, routeId }: ICoordinates) {
  console.log(routeId);
  return (
    <>
      {stopsCoordinates && path && (
        <>
          <NavigationBar routeId={routeId} />
          <ViewMap
            stopsCoordinates={stopsCoordinates}
            path={path}
            routeId={routeId}
          />
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.routeId) {
    const routeId = parseInt(context.query.routeId as string);
    const data = await getCoordinates(routeId);
    if (data) {
      return { props: { ...data, routeId } };
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
