import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const [searchFilter,setSearchFilter]=useState({
    title:"",
    location:""
  })

  const [isSearched,setIsSearch]=useState(false)

  const [jobs,setJobs]=useState([])

  const [showRecruiterLogin,setShowRecruiterLogin]=useState(false)

  //function to fetch jobdata 
  const fecthJobs=async()=>{
    setJobs(jobsData)
  }

  useEffect(()=>{
    fecthJobs()
  },[])

  const value = {
    searchFilter,setSearchFilter,
    isSearched,setIsSearch,
    jobs,setJobs,
    showRecruiterLogin,setShowRecruiterLogin
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
