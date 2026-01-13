interface PredictionBadgeProps {
  prediction: string
}

interface ActualProps {
  actual_delay: boolean
}

export function PredictionBadge({ prediction, actual_delay }: PredictionBadgeProps & ActualProps) {
  const isLate = prediction === "LATE"
  const isOnTime = prediction === "ON-TIME"

  let actual;

  let bgColorPred = "bg-gray-400"
  let textColorPred = "text-black"

  let bgColorActual = "bg-gray-400"
  let textColorActual = "text-black"

  // Predictions
  if (isLate) {
    bgColorPred = "bg-red-500"
    textColorPred = "text-black"
  } else if (isOnTime ) {
    bgColorPred = "bg-green-500"
    textColorPred = "text-white"
  } 
  
  // Actual
  if (actual_delay) {
    bgColorActual = "bg-red-500"
    textColorActual = "text-black"
    actual = "LATE"

  } else if (!actual_delay) {
    bgColorActual = "bg-green-500"
    textColorActual = "text-white"  
    actual = "ON-TIME"
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <div><h4 className="font-bold text-xl mb-1 italic ml-3">Prediction</h4></div>
        <div
          className={` py-2 border-4 border-black ${bgColorPred} ${textColorPred} font-bold text-4xl text-center rounded-lg`}
        >
          {prediction} 
        </div>
      </div>
      <div className="flex-1">
        <div><h4 className="font-bold text-xl mb-1 italic ml-3">Actual</h4></div>
        <div
          className={`py-2 border-4 border-black ${bgColorActual} ${textColorActual} font-bold text-4xl text-center rounded-lg`}
        >

          {actual} 
        </div>
      </div>
    </div>
  )
}
