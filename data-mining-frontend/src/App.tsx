import { useState, type ReactElement } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { OnTimePredictor } from "./components/pages/OnTImePredictor"
import { ModelComparison } from "./components/pages/ModelComparison"
import { DataAnalysis } from "./components/pages/DataAnalysis/DataAnalysis"
import "./globals.css"

const queryClient = new QueryClient()

export default function App() {

  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const pages: Record<number, ReactElement> = {
    1: <OnTimePredictor setPage={setCurrentPageIndex}/>,
    2: <ModelComparison setPage={setCurrentPageIndex}/>,
    3: <DataAnalysis setPage={setCurrentPageIndex}/>
  }

  return (
    <QueryClientProvider client={queryClient}>
      { pages[currentPageIndex] }
    </QueryClientProvider>
  )
}
