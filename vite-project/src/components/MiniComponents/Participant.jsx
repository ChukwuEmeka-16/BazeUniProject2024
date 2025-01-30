import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// This function renders the list tile which is used to display each participant on the list
const Participant = ({index, address, participants,setParticipants}) =>{

    const deleteParticipant = () =>{
      const users = [...participants];
      users.splice(index,1);
      
      setParticipants(users);
     
    }
    return(
     <div className='participant-container'>
      <p className='participant-index'>{index.toString() +'.'}</p>
      <p className='participant-address'>{address}</p>
      <FontAwesomeIcon onClick={deleteParticipant} className='participant-delete' icon='trash-can'  />
     </div>
    )
  }
  

export default Participant