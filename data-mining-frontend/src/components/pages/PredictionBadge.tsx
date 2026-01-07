interface PredictionBadgeProps {
  prediction: string
}

export function PredictionBadge({ prediction }: PredictionBadgeProps) {
  const isLate = prediction === "LATE"
  const isOnTime = prediction === "ON_TIME"

  let bgColor = "bg-gray-400"
  let textColor = "text-black"

  if (isLate) {
    bgColor = "bg-red-400"
    textColor = "text-black"
  }
  if (isOnTime) {
    bgColor = "bg-green-500"
    textColor = "text-white"
  }

  return (
    <div
      className={`px-12 py-6 border-4 border-black ${bgColor} ${textColor} font-bold text-4xl text-center rounded-lg`}
    >
      {prediction}
    </div>
  )
}
