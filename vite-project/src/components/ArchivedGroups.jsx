import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useEffect } from 'react'
import GroupTile from './GroupTile'
import { getDocs,collection } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import notfound from '../assets/notfound.png'
const ArchivedGroups = ({archiveActive,setArchiveActive,change,setChange}) => {
 
  
  let userGroups = [];
  const [archivedGroupsList,setarchivedGroupsList ]=useState([])

  const getArchives = async ()=>{
    const collref = collection(db,'Groups');
    await getDocs(collref).then(snapshot=>{
    userGroups = snapshot?.docs.filter((item)=>{
    const reducedList = item?._document?.data?.value?.mapValue?.fields?.participantList?.arrayValue?.values?.map(mitem=>mitem?.stringValue?.toLowerCase());
    const reducedAddress = window?.ethereum?.selectedAddress?.toLowerCase();      
     return reducedList?.includes(reducedAddress);
    })
    })
    setarchivedGroupsList(userGroups.filter((item)=>item?._document?.data?.value?.mapValue?.fields?.isArchived?.booleanValue))
    
  }
 
  
  useEffect(()=>{
   getArchives()
  },[change])
  return (
    <div className={`archive-overlay ${!archiveActive && 'displayNone'}`}>
        <div className='archive-modal'>
          <header className='archive-modal-header'>
            <h1>Archive <FontAwesomeIcon icon='box-archive' color='grey'/></h1>
            <FontAwesomeIcon icon='x' color='red' className='close-archive-btn' onClick={()=>setArchiveActive(false)}/>
          </header>
          <section className='archive-modal-body'>
            
            {
             archivedGroupsList.length ?archivedGroupsList.map((item,index)=><GroupTile isArchived={item?._document?.data?.value?.mapValue?.fields?.isArchived?.booleanValue} groupAdmin={item?._document?.data?.value?.mapValue?.fields?.groupAdministrator?.stringValue} change={change} setChange={setChange} groupID={item?._document?.data?.value?.mapValue?.fields?.groupID?.stringValue}  groupName={item?._document?.data?.value?.mapValue?.fields?.groupName?.stringValue}   key={index} choices={item?._document?.data?.value?.mapValue?.fields?.choices?.arrayValue?.values} duration={item?._document?.data?.value?.mapValue?.fields?.duration?.stringValue}/>):<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img style={{height:100}} src={notfound} alt="No items found" /></div>
            }
            
          </section>
        </div>
    </div>
  )
}

export default ArchivedGroups