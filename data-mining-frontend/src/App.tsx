import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { OnTimePredictor } from "./components/pages/OnTImePredictor"
import { ModelComparison } from "./components/pages/ModelComparison"
import { DataAnalysis } from "./components/pages/DataAnalysis/DataAnalysis"
import "./globals.css"

const queryClient = new QueryClient()

export default function App() {

  //let currentPageIndex = 1; // Default page 1 - On-Time Predictor, 2 - Model Comparison, 3 - Data Analysis

  let currentPage;

  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  if (currentPageIndex == 1) {
    currentPage = <OnTimePredictor setPage={setCurrentPageIndex}/>
  } else if (currentPageIndex == 2) {
    currentPage = <ModelComparison setPage={setCurrentPageIndex}/>
  }
    else if (currentPageIndex == 3) {
    currentPage = <DataAnalysis setPage={setCurrentPageIndex}/>
  }

  return (
    <QueryClientProvider client={queryClient}>
      { currentPage }
    </QueryClientProvider>
  )
}
