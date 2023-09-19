import { getRoutes } from "@/services/MapDataService";
import { Header } from "./components/Header";

export interface IHome {
  routes: string[][];
}
export default function Home({ routes }: IHome) {
  return (
    <>
      <Header routes={routes} />
    </>
  );
}

export const getServerSideProps = async () => {
  const routes = await getRoutes();
  return { props: { routes } };
};
