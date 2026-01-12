"use client"

import { useMutation } from "@tanstack/react-query"
import { modelData } from "@/api/flights"
import type { Model } from "../../domain/Model"
import { useEffect, useState } from 'react';


export function ModelComparison({ setPage }: { setPage: (index: number) => void }) {

    const [selectedModel, setSelectedModel] = useState<Model | null>(null);


    const mutation = useMutation<Model[], Error>({
        mutationFn: modelData,
        onSuccess: (e)=>{
            setSelectedModel(e[0])
        }
    })

    // Will call the API only once (or twice?)
    useEffect(() => {
        mutation.mutate()
    }, []);

    const swapModel = (model : Model | undefined) => {

        if (model !== undefined) {
            setSelectedModel(model)
        }
        
    }

    const LoadingScreen = (
        <div className="text-4xl italic animate-pulse flex-1 text-center pt-2">
            Loading models ...
        </div>
    )

    const ConfusionMatrix = (model: Model) => {

        return (
            <div className="flex-1 p-5 m-2 bg-gray-300 rounded-sm">
                <h2 className="text-gray-600 font-bold italic">Confusion Matrix</h2>
                <table className="table-auto w-full p-5">
                    <thead className="sticky top-0">
                        <tr className="bg-gray-400">
                            <th className="p-0.5 w-15"> </th>
                            <th className="p-0.5">On-Time</th>
                            <th className="p-0.5">Late</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td className="p-0.5 pl-3 bg-gray-400 font-bold ">OT</td>
                            <td className="p-0.5 pl-3 border-r-2 border-gray-400 bg-green-200 text-right pr-3 text-xl">{model.tp}</td>
                            <td className="p-0.5 pl-3 bg-red-200 text-right pr-3 text-xl">{model.fp}</td>
                        </tr>
                        <tr className="">
                            <td className="p-0.5 pl-3 bg-gray-400 font-bold">Late</td>
                            <td className="p-0.5 pl-3 border-r-2 border-gray-400 bg-red-200 text-right pr-3 text-xl">{model.fn}</td>
                            <td className="p-0.5 pl-3 bg-green-200 text-right pr-3 text-xl">{model.tn}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }

    const Stats = (model: Model) => {
        return (
            <div className="bg-gray-300 p-5 m-2 flex-1 rounded-sm">
                <h2 className="text-gray-600 font-bold italic">Results</h2>
                <table className="table-fixed w-full p-5">
                    <thead className="sticky top-0">
                        <tr className="bg-gray-400">
                            <th className="p-0.5">Statistic</th>
                            <th className="p-0.5">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white even:bg-gray-200">
                            <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">Accuracy</td>
                            <td className="p-0.5 pl-3 text-right pr-3">{model.accuracy}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-200">
                            <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">Precision</td>
                            <td className="p-0.5 pl-3 text-right pr-3 ">{model.precision}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-200">
                            <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">Recall</td>
                            <td className="p-0.5 pl-3 text-right pr-3 ">{model.recall}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-200">
                            <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">F1 Score</td>
                            <td className="p-0.5 pl-3 text-right pr-3">{model.f1_score}</td>
                        </tr>
                        <tr className="odd:bg-white even:bg-gray-200">
                            <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">AUC</td>
                            <td className="p-0.5 pl-3 text-right pr-3">{model.auc}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    const Features = (model: Model) => { 
        return (
            <div className="bg-gray-300 p-5 m-2 flex-1 rounded-sm">
                <h2 className="text-gray-600 font-bold italic">Feature Importance</h2>
                <div className=" flex-1 h-45 overflow-y-auto">
                    <table className="table-auto w-full p-5">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-400">
                                <th className="p-0.5">Feature</th>
                                <th className="p-0.5">Importance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                model.features?.map((feature)=>{return (
                                <tr className="odd:bg-white even:bg-gray-200" key={feature.feature_name}>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">{feature.feature_name}</td>
                                    <td className="p-0.5 pl-3 text-right pr-3">{feature.feature_importance}</td>
                                </tr>
                                )})
                            
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const ComparisonTable = (models: Model[]) => {
        return (
            <div className="bg-gray-300 p-5 m-2 flex-1 rounded-sm">
                <h2 className="text-gray-600 font-bold italic" >All Model Comparison</h2>
                <div className=" flex-1 h-45 overflow-y-auto">
                    <table className="table-fixed w-full p-5">
                        <thead className="sticky top-0">
                            <tr className="bg-gray-400">
                                <th className="p-0.5">Name</th>
                                <th className="p-0.5">Accuracy</th>
                                <th className="p-0.5">Precision</th>
                                <th className="p-0.5">Recall</th>
                                <th className="p-0.5">F1 Score</th>
                                <th className="p-0.5">AUC</th>
                                <th className="p-0.5">TP Count</th>
                                <th className="p-0.5">FP Count</th>
                                <th className="p-0.5">FN Count</th>
                                <th className="p-0.5">TN Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                models.map((model)=>{return (
                                <tr className="odd:bg-white even:bg-gray-200" key={model.model_name}>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400">{model.model_name}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.accuracy}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.precision}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.recall}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.f1_score}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.auc}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.tp}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.fp}</td>
                                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{model.fn}</td>
                                    <td className="p-0.5 pl-3 text-right pr-3">{model.tn}</td>
                                </tr>
                                )})
                            
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const ModelScreen = (models: Model[]) => {
        return (    
            <div className="flex-1">
                <div className=" p-3 m-2 bg-gray-300 rounded-md">
                    <p className="text-md font-bold italic text-gray-600 pl-1" >
                        Model
                    </p>
                    <select 
                        id="model" 
                        className="bg-gray-500 text-gray-100 text-3xl w-50 rounded-sm pl-1" 
                        onChange={(e)=>swapModel(models.find(m=>m.model_name == e.target.value))}
                    >
                        { /* List of models to select from */ }
                        { models.map((model: Model)=>(
                        <option 
                            id={model.model_name} 
                            key={model.model_name}
                            className="text-left"
                        >
                            {model.model_name}
                        </option>
                        )) }
                    </select>
                    
                </div>
                { selectedModel !== null &&
                <>
                    <div className="flex flex-row h-65" >
                        {ConfusionMatrix(selectedModel)}
                        {Stats(selectedModel)}
                        {selectedModel.features !== null && Features(selectedModel)}
                    </div> 
                    <div className="flex flex-row">
                        {ComparisonTable(models)}
                    </div>
                </>
                }
            </div>

        )
    }

    const NoModels = (
        <div className="text-4xl italic flex-1 text-center pt-2">
            Sorry, no models were found, try reloading this page
        </div>
    )

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto border-4 border-black">
        {/* Header */}
        <div className="p-8 pb-0">
          <h1 className="text-5xl font-bold mb-6">U.S. Domestic Flights On-Time Analysis</h1>

          {/* Tab Navigation */}
          <div className="flex gap-12 border-b-4 border-black pb-4">
            <button className="text-xl font-bold italic text-gray-600 hover:text-black cursor-pointer" onClick={()=>{setPage(1)}}>On-Time Predictor</button>
            <button className="text-xl font-bold italic border-b-4 border-black pb-1 hover:text-black cursor-pointer" onClick={()=>{setPage(2)}} >Model Comparison</button>
            <button className="text-xl font-bold italic text-gray-600 hover:text-black cursor-pointer" onClick={()=>{setPage(3)}}>Data Analysis</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 p-8 h-175 flex">

            {mutation.isPending && LoadingScreen }

            {mutation.data && mutation.data.length == 0 && NoModels}

            {mutation.data && mutation.data.length != 0 && ModelScreen(mutation.data) }

            {mutation.error && <div className="text-3xl italic flex-1 text-center text-red-600 pt-2">Error: {(mutation.error as any).status == 404 ? "Models stats could not be loaded" : mutation.error.message}</div>}

        </div>
      </div>
    </div>
  )
}
