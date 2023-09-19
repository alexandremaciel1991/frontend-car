import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { Container } from "./styles";
import { useInterval } from "@/hooks/useInterval";
import { useRouter } from "next/navigation";

interface ViewMap {
  stopsCoordinates: Coordinate[];
  path: Coordinate[];
  routeId: number;
}

interface Coordinate {
  lat: number;
  lng: number;
  distance?: number;
}
export const ViewMap = ({ stopsCoordinates, path, routeId }: ViewMap) => {
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  });
  const [center, setCenter] = useState<Coordinate>({
    lat: stopsCoordinates[0].lat,
    lng: stopsCoordinates[0].lng,
  });
  const [mark, setMark] = useState<any>();
  const [poly, setPoly] = useState<any>();
  const [progress, setProgress] = useState<Coordinate[]>([path[0]]);
  const [initialDate] = useState<Date>(new Date());
  let pathDistance: Coordinate[];
  let myInterval: number;

  const velocity = 10;

  useEffect(() => {
    setMark(undefined);
    setPoly(undefined);

    setTimeout(() => {
      createMarker();
      createPath();
      //myInterval = window.setInterval(() => getProgress(), 1000);
    }, 1000);

    return () => {
      setMark(undefined);
      setPoly(undefined);
      setProgress([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopsCoordinates]);

  const customMarker = {
    path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
    fillColor: "red",
    fillOpacity: 2,
    strokeWeight: 1,
    rotation: 0,
    scale: 0.8,
  };

  /** Cria os pontos de parada */
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

  /** Cria a rota principal */
  const createPath = () => {
    setPoly(<Polyline path={path} options={{ strokeColor: "black" }} />);
  };

  /** Chama a função de mover o carrinho */
  useInterval(() => getProgress(), 1000);

  /** Calcula a distancia que o carrinho se movimenta */
  const getDistance = () => {
    const differentInTime =
      (new Date().valueOf() - initialDate.valueOf()) / 1000; // Quantidade de tempo passados desde a saida em segundos
    return differentInTime * velocity; // calculo da distancia
  };

  /** Calcula a distancia de cada ponto da coordenada */
  const calculatePath = () => {
    if (google.maps.geometry === undefined) return;
    pathDistance = path.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 }; // it begins here!
      }
      const { lat: lat1, lng: lng1 } = coordinates;
      const latLong1 = new google.maps.LatLng(lat1, lng1);

      const { lat: lat2, lng: lng2 } = array[0];
      const latLong2 = new google.maps.LatLng(lat2, lng2);

      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        latLong1,
        latLong2
      );

      return { ...coordinates, distance };
    });
  };

  /** Move o Carrinho */
  const getProgress = () => {
    console.log("Chamou");
    const distance = getDistance(); // Distancia atual

    if (!distance) {
      return;
    }
    /** Não executa até todos os pontos que contem a distancia não esteja calculados */
    if (!pathDistance) {
      calculatePath();

      return;
    }

    let progresss = pathDistance.filter(
      (coordinates) => coordinates.distance && coordinates.distance < distance
    );

    const nextLine: Coordinate | undefined = pathDistance.find(
      (coordinates) => coordinates.distance && coordinates.distance > distance
    );

    if (!nextLine) {
      setProgress(progresss);
      const id = routeId + 1;
      window.clearInterval(myInterval);
      alert("Rota completa, carregando a proxima!");
      router.replace("/map?routeId=" + id);
    }

    /** So adiciona o progresso quando a coordenada ainda nao existir no progresso */
    const check = progress.find(
      (coordinates) => coordinates.lat === nextLine?.lat
    );

    if (!!!check && nextLine) {
      setProgress(progress.concat(nextLine));
      setCenter(nextLine);
    }
  };

  return (
    <Container>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <GoogleMap key={`${center}`} center={center} zoom={15}>
            {mark}
            {/* Cria o Trajeto dentro do mapa */}
            {poly}
            {progress.length > 0 && (
              <>
                <Polyline path={progress} options={{ strokeColor: "orange" }} />

                <Marker
                  icon={customMarker}
                  position={progress[progress.length - 1]}
                />
              </>
            )}
          </GoogleMap>
        </>
      )}
    </Container>
  );
};
