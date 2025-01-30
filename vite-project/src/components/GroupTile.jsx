import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Group from './Group'




const GroupTile = ({groupName,choices,duration, groupID, change, setChange,groupAdmin,isArchived}) => {
  const[active,setActive] = useState(false);
 
  return (
   <>
    <Group isArchived={isArchived} groupAdmin={groupAdmin} change={change} setChange={setChange}  choices={choices} groupName={groupName} isActive={active} setActive={setActive} timeLeft={duration} groupID={groupID}/>
    <div className='group-tile-container' onClick={()=>setActive(true)}>
      <p className='tile-text'>{groupName}</p>
      <FontAwesomeIcon size='2x' icon='angle-right' className='right-arrow'/>
    </div>
   </>
  )
}

export default GroupTile