import { PieDelayed } from "./Charts/PieDelayed";
import { BarDelayedDayOfWeek, BarDelayedMonthly } from "./Charts/BarDelayed";

export function Analysis() {

  return (
    <div className="pl-10 border-b-2 border-black">
      <h2 className="text-2xl font-bold text-center py-3 pb-5" >Visualisations</h2>
      
      <div className="flex gap-5 flex-wrap">
        <div className="bg-gray-300 p-2 rounded-md">
          <PieDelayed />
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <BarDelayedMonthly />
        </div>
        <div className="bg-gray-300 p-2 rounded-md">
          <BarDelayedDayOfWeek />
        </div>
      </div>
      <span className="text-xs italic" >
        <b>Note:</b> Only data for 2024 is used in this analysis.
      </span>
      <br></br>
      <br></br>
    </div>
  );
}
