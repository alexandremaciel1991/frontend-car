import { Button, TextField } from "@material-ui/core";
import { ViewMap } from "./components/Map";
import { useEffect, useState, useRef } from "react";
import { getCoordinates } from "@/services/MapDataService";

export interface ICordinates {
  stopsCoordinates: { lat: number; lng: number }[];
  path: { lat: number; lng: number }[];
}
export default function Home() {
  const [coordinates, setCoordinates] = useState<ICordinates>({
    stopsCoordinates: [{ lat: -23.963217, lng: -46.280566 }],
    path: [{ lat: -23.963217, lng: -46.280566 }],
  });
  const [show, setShow] = useState<boolean>(false);
  const valueRef = useRef<any>();

  const getInfoMap = async () => {
    const data = await getCoordinates(valueRef.current?.value);
    setCoordinates(data);
    setShow(true);
  };

  return (
    <>
      <TextField id="outlined-basic" label="Outlined" inputRef={valueRef} />
      <Button onClick={getInfoMap}> Show Map </Button>
      {show && (
        <ViewMap
          stopsCoordinates={coordinates?.stopsCoordinates}
          path={coordinates?.path}
        />
      )}
    </>
  );
}
