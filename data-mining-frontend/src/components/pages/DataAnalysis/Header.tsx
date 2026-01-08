
export function Header( { setPage }: { setPage: (index: number) => void }) {

  return (
    <div className="pl-10 border-b-2 border-black">
      <h1 className="text-4xl font-bold py-4">U.S Domestic Flight On Time Analysis</h1>
      <span className="text-lg italic font-bold text-gray-600">
        <span className="pr-3 hover:text-black cursor-pointer" onClick={()=>setPage(1)}>On-Time Predictor</span>
        <span className="pr-3 hover:text-black cursor-pointer">Model Comparison</span>
        <span className="underline pr-3 cursor-pointer" onClick={()=>setPage(3)}>Data Analysis</span>
      </span>
      <br />
      <br />
    </div>
  );
}