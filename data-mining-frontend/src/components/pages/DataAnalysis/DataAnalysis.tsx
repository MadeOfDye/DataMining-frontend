import { Header } from "./Header";
import { Datasets } from "./Datasets";
import { Analysis } from "./Analysis";
import { Map } from "./Map";

export function DataAnalysis({ setPage }: { setPage: (index: number) => void }) {
  return (
    <>
      <Header setPage={setPage}/>
      <Datasets />
      <Analysis />
      <Map />
    </>
  );
}
