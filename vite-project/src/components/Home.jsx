import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GroupTile from './GroupTile'
import { collection, getDocs} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import NewGroup from './NewGroup'
import SideBar from './SideBar'
import notfound from '../assets/notfound.png'
import ArchivedGroups from './ArchivedGroups'


// This component returns the home page
const Home = () => {
  // This state controls displaying and hiding the new group modal
  const [isActive,setActive] = useState(false);

  //This state is used to show and hide the archived groups modal
  const[archiveActive,setArchiveActive] = useState(false);

  // This state stores all groups in the firestore group collection
  const[collData,setColldata] = useState([]);
  
  // This state stores the value of the search bar 
  const[searchVal,setSearchVal] = useState('');

  // This state stores all the groups the signed in user is allowed to be in 
  let userGroups = [];
   
  // reference to the lists of groups in the firestore
  const collref = collection(db,'Groups');

  // this state is used to alert the component when a new group is added so it can fetch it
  const[change,setChange] = useState(false);

  // this state is used to adtivate and deactivate the sidebar
  const[sidebarActive,setSidebarActive] = useState(false)
  
  // This groups stores the filtered groups 
  let filteredUserGroups = userGroups;

  // Archived groups
 

  // get the data all the groups in the firestore
  const getColl = async () =>{
    await getDocs(collref).then(snapshot=>setColldata(snapshot?.docs));
  }

  // this function processes the fetched data and filters it to get the groups where the current user is a participant
  const getUserGroups = () =>{
    userGroups = collData.filter((item)=>{
      const reducedList = item?._document?.data?.value?.mapValue?.fields?.participantList?.arrayValue?.values?.map(mitem=>mitem?.stringValue?.toLowerCase());
      const reducedAddress = window?.ethereum?.selectedAddress?.toLowerCase();      
      return reducedList?.includes(reducedAddress);
    })
    
    filteredUserGroups =userGroups.filter((item)=>item?._document?.data?.value?.mapValue?.fields?.groupName?.stringValue?.includes(searchVal) && !item?._document?.data?.value?.mapValue?.fields?.isArchived?.booleanValue)
    
   // archivedGroupsList = userGroups.filter((item)=>item?._document?.data?.value?.mapValue?.fields?.isArchived?.booleanValue)
    
    
  }
  

  // handles fetching of the group data on load of the page
  useEffect(()=>{
   
    getColl()
  },[change])


  // handles redirection when wallet is disconnected
  useEffect(()=>{
    const intervalId = setInterval(() => {
      if (window?.location?.pathname =='/home' && !Boolean(window?.ethereum?.selectedAddress) ) {
        window.location.href = '/'
      }
     
  }, 2000);

  // Clean up function to clear the interval when the component unmounts
  return () => clearInterval(intervalId);
  },[])
  
  useEffect(()=>{

    filteredUserGroups = userGroups.filter((item)=>item?._document?.data?.value?.mapValue?.fields?.groupName?.stringValue?.includes(searchVal) && !item?._document?.data?.value?.mapValue?.fields?.isArchived?.booleanValue)
  },[searchVal])
  return (
    <>
    <SideBar  setArchiveActive={setArchiveActive}  setGroupActive={setActive} sidebarActive={sidebarActive} setSidebarActive={setSidebarActive}/>
    <NewGroup isActive={isActive} setActive={setActive} change={change} setChange={setChange}/>
    <ArchivedGroups change={change} setChange={setChange} archiveActive={archiveActive} setArchiveActive={setArchiveActive}/>
    <div className='home-container'>
      <header className='home-header'>

        <div className='home-search-container'>
         <input value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} type="text" className='home-search' placeholder='Search for a poll....' />
         <FontAwesomeIcon  icon="magnifying-glass"  size='1x' className='home-search-icon'/>
        </div>
        <FontAwesomeIcon onClick={()=>setSidebarActive(true)} className='new-gtoup-btn' icon='bars'/>
        
      </header>
      
      <section className='group-list'>
        {
          collData.length >0 && getUserGroups()

        }
        {
         filteredUserGroups?.length >0? filteredUserGroups?.map((item,index)=><GroupTile  isArchived={item?._document?.data?.value?.mapValue?.fields?.isArchived?.booleanValue} groupAdmin={item?._document?.data?.value?.mapValue?.fields?.groupAdministrator?.stringValue} change={change} setChange={setChange} groupID={item?._document?.data?.value?.mapValue?.fields?.groupID?.stringValue}  groupName={item?._document?.data?.value?.mapValue?.fields?.groupName?.stringValue}   key={index} choices={item?._document?.data?.value?.mapValue?.fields?.choices?.arrayValue?.values} duration={item?._document?.data?.value?.mapValue?.fields?.duration?.stringValue}/>):<div className='group-list-group-not-found-container'><img src={notfound} className='group-list-group-not-found' alt='No Groups found, create one!'/></div> 
        }
      </section>
    </div>
    </>
  )
}

export default Home