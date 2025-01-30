import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SideBar = ({sidebarActive,setGroupActive,setSidebarActive,setArchiveActive}) => {
  return (
    <div className={`sidebar-overlay ${!sidebarActive && 'displayNone' }`}>
       <div className='sidebar-container'>
          <div className='sidebar-content'>
             <header className='sidebar-header'>
                <h2><FontAwesomeIcon icon={faEthereum} color='#800080'/> VoteEli</h2>
                <FontAwesomeIcon icon='x' size='xl' color='red' onClick={()=>setSidebarActive(false)}/>
             </header>
             <section className='sidebar-body'>
                <button onClick={()=>setGroupActive(true)}><FontAwesomeIcon icon='plus' color='green' className='icon'/>Create a New Group</button>
                <button onClick={()=>setArchiveActive(true)}> <FontAwesomeIcon icon='box-archive' color='grey' style={{marginRight:10}}/> View Archived Groups</button>
                <button onClick={()=>window.location.href = '/learn'}><FontAwesomeIcon icon='bookmark' color='#003366' className='icon' />Learn more about E-voting</button>
             </section>
             <p className='sidebar-footer'><FontAwesomeIcon icon='user-shield' size='xl' /> <u>{window?.ethereum?.selectedAddress}</u></p>
          </div>
       </div>
    </div>
  )
}

export default SideBar