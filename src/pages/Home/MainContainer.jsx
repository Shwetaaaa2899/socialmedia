import Home from "./Home"
// import LeftBar from "./LeftBar"
import Header from "./Header/Header"
import Users from "./Users"
import CreatePost from "./Modal"
const MainContainer = () =>{
 return <>
  <div>
    <div className = "header" >
    <Header />
    </div>
   
    
  {/* <div className = "leftBar" style  = {{display:"flex",height:"50vh",flexBasis:"25%",flexDirection:"column" ,position:"sticky", backgroundColor:"red" }}> */}
    {/* <div className = "container" style = {{display:"flex",justifyContent:"space-between",padding:"13px 5%"}}> */}
     {/* <div className = "leftBar" style = {{backgroundColor:"pink",height:"70vh",flexBasis:"25%",top:"70px",position:"sticky" ,alignSelf:"flex-start"}}> */}
     {/* <div>     <div>   <LeftBar /></div> */}
      {/* <MainCOntent/> */}
      {/* rightsiebar */}
      </div>

  {/* </div> */}

  <CreatePost/>
 </> 

}
export default MainContainer;