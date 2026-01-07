export function Header( { setPage }: { setPage: (index: number) => void }) {

  const container = {
    borderStyle: "solid",
    borderWidth: "0px 0px 1px 0px",
    borderBottom: "2px solid black",
    fontFamily: "Inter",
    paddingLeft: "50px",
  };

  const title = {
    fontSize: "40px",
    fontWeight:"bold",
    marginBottom: "10px"
  };

  const links = {
    fontSize: "20px",
    paddingRight: "30px",
    fontStyle: "italic",
    fontWeight:"bold",
    color:"#434D5C"
  };

  return (
    <div style={container}>
      <h1 style={title} >U.S Domestic Flight On Time Analysis</h1>
      <span style={links} onClick={()=>setPage(1)}>On-Time Predictor</span>
      <span style={links} >Model Comparison</span>
      <span style={links} onClick={()=>setPage(3)}>
        <u>Data Analysis</u>
      </span>
      <br />
      <br />
    </div>
  );
}