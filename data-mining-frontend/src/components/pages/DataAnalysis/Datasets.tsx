import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Datasets_Data } from "../../../data/datasets_data";

export function Datasets() {


  const render_source_table = (item: any) => {
    return (<><h3 className="text-2xl font-bold py-2">{item.fullName}</h3>
            <p className="mb-2">{item.description}</p>
            <p className="mb-2">{item.rows_info}</p>
            <p className="mb-2">{item.columns_info}</p>
            <div className="h-90 overflow-y-auto center w-[65vw] mb-2">
              <table className="table-fixed w-full ">
                <thead className="sticky top-0">
                  <tr className="bg-gray-400">
                    <th className="p-0.5">Name</th>
                    <th className="p-0.5">Description</th>
                    <th className="p-0.5">Example</th>
                  </tr>
                </thead>
                <tbody>
                {item.columns?.map((row: any)=>{
                  return  (<tr className="odd:bg-white even:bg-gray-200" key={row.name}>
                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">{row.name}</td>
                    <td className="p-0.5 pl-3 border-r-2 border-gray-400">{row.desc}</td>
                    <td className="p-0.5 pl-3">{row.example}</td>
                  </tr>)
                })}
                </tbody>
              </table>
              
            </div>
            <i>
              <a href={item.source} target="_blank" className="font-medium text-fg-brand text-blue-600 hover:underline visited:text-purple-600" >Click here to view source</a>
            </i></>);
  };

  const render_final_table = (item: any) => {
    return (<><h3 className="text-2xl font-bold py-2">{item.fullName}</h3>
            <p className="mb-2">{item.description}</p>
            <p className="mb-2">{item.rows_info}</p>
            <p className="mb-2">{item.columns_info}</p>
            <div className="h-90 overflow-y-auto center w-[90vw] mb-2">
              <table className="table-fixed w-full ">
                <thead className="sticky top-0">
                  <tr className="bg-gray-400">
                    <th className="p-0.5">Name</th>
                    <th className="p-0.5">Description</th>
                    <th className="p-0.5">Example</th>
                    <th className="p-0.5">Missing Count</th>
                    <th className="p-0.5">Source</th>
                  </tr>
                </thead>
                <tbody>
                {item.columns?.map((row: any)=>{
                  return  (<tr className="odd:bg-white even:bg-gray-200" key={row.name} >
                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 ">{row.name}</td>
                    <td className="p-0.5 pl-3 border-r-2 border-gray-400">{row.desc}</td>
                    <td className="p-0.5 pl-3 border-r-2 border-gray-400">{row.example}</td>
                    <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-2">{row.missing_count.toLocaleString()}</td>
                    <td className="p-0.5 pl-3">{row.source}</td>
                  </tr>)
                })}
                </tbody>
              </table>
              
            </div>
            <p>
              <i>
                <a href={item.source} target="_blank" className="font-medium text-fg-brand text-blue-600 hover:underline visited:text-purple-600" >Click here download our datasets</a>
              </i>
            </p>
            </>);
  };

  return (
    <div className="pl-10 border-b-2 border-black">
      <h2 className="text-2xl font-bold text-center py-2">Our Datasets</h2>
      <Tabs>
        <TabList>
          {Datasets_Data.map((item) => (
            <Tab key={item.tabName}>{item.tabName}</Tab>
          ))}
        </TabList>

        {Datasets_Data.map((item) => (
          <TabPanel key={item.tabName}>

            { item.type == "Source" ? render_source_table(item) : render_final_table(item)}

          </TabPanel>
        ))}
      </Tabs>
      <br></br>

    </div>
  );
}
