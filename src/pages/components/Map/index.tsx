import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { Container } from "./styles";

interface ViewMap {
  stopsCoordinates: Coordinate[];
  path: Coordinate[];
}

interface Coordinate {
  lat: number;
  lng: number;
}
export const ViewMap = ({ stopsCoordinates, path }: ViewMap) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });
  const [center] = useState<Coordinate>({
    lat: stopsCoordinates[0].lat,
    lng: stopsCoordinates[0].lng,
  });
  const [mark, setMark] = useState<any>();
  const [poly, setPoly] = useState<any>();
  const mainRoute = {
    strokeColor: "blue",
  };

  const route3 = {
    strokeColor: "black",
  };
  useEffect(() => {
    setMark(undefined);
    setPoly(undefined);

    setTimeout(() => {
      createMarker();
      createPath();
    }, 1000);

    () => {
      setMark(undefined);
      setPoly(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopsCoordinates]);

  // const customMarker = {
  //   path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
  //   fillColor: "red",
  //   fillOpacity: 2,
  //   strokeWeight: 1,
  //   rotation: 0,
  //   scale: 0.8,
  // };

  const createMarker = () => {
    setMark(
      stopsCoordinates.map((s, index) => {
        return (
          <Marker
            key={s.lat + s.lng}
            position={{ lat: s.lat, lng: s.lng }}
            icon={"/img/beachflag.png"}
            title={` Lat: ${s.lat}`}
            label={`${index + 1}`}
          />
        );
      })
    );
  };

  const createPath = () => {
    setPoly(<Polyline path={path} />);
  };

  return (
    <Container>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap key={`${center}`} center={center} zoom={20}>
          {mark}
          {/* Cria o Trajeto dentro do mapa */}
          {poly}
          {/* <Polyline path={path.splice(0, 3)} options={mainRoute} /> */}
        </GoogleMap>
      )}
    </Container>
  );
};
