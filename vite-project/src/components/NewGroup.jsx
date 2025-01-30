import {useState} from 'react'
import {v4 as uuid} from 'uuid' 
import { doc, setDoc } from 'firebase/firestore'
import Participant from './MiniComponents/Participant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { db } from '../firebaseConfig'
import notfound from '../assets/notfound.png'
import { ethers} from 'ethers';
// This component returns the new group modal which is in the home page, it is used to create a new group so a poll can be held.

const NewGroup = ({isActive, setActive, setChange,change}) =>{
    // group name
    const[groupName,setGroupName] = useState('')
  
    // group admins address
    const[adminAddress,setAdminAddress] = useState('');
    
    // This create a unique identifier for each group incase two groups have the same name.
    const[id,setID] = useState(uuid());
    
    // This state stores the list of participants
    const[participants,setParticipant] = useState([]);
    
  
    // This function is used to close the modal and generate a new ID incase the user opens the modal again.
    const handleClose = () =>{
      setActive(false);
      setGroupName('')
      setAdminAddress('')
      setID(uuid());
      setParticipant([])
    }
    
    
    const ERC20_ABI = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "groupID",
            "type": "string"
          },
          {
            "internalType": "address[]",
            "name": "participants",
            "type": "address[]"
          }
        ],
        "name": "addParticipants",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "choice",
            "type": "string"
          }
        ],
        "name": "castVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "groupID",
            "type": "string"
          }
        ],
        "name": "getVotes",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "groupID",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "choice",
                "type": "string"
              }
            ],
            "internalType": "struct VoteEli.Vote[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    
    const contractAddress = '0xBC3C14E845E8758577547eeaBeBd9CFa40FD139D';
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

   
  
    
    // Function to get an address then add to the list and update the state
    const addParticipant = () =>{
      let address = prompt('Enter An Address:');
      if (address?.length > 2) {
        setParticipant([...participants,address]);
      }
    }
    
    // create the group in the firebase DB and stores the participant list in the smart contract
    const createGroup = async () =>{

    const docref = doc(db,'Groups',id);
    if (groupName.length > 3 && adminAddress.length > 25 && participants.length >= 1) {
    await setDoc(docref,{groupID:id,groupName:groupName,groupAdministrator:adminAddress,participantList:participants,choices:[],duration:'2040-02-13 10:53:00',isArchived:false}).then(async ()=>{
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const signer = provider.getSigner(accounts[0]);
          const contractWithSigner = contract.connect(signer);
          const tx = await contractWithSigner.addParticipants(id,participants)
          await tx.wait()

          setActive(false);
          setChange(!change);
          alert('Group created');
        }).catch((err)=>{
          const error = err.toString()
          error.includes('user rejected transaction') && alert('user rejected transaction.')
          error.includes('You have already casted your vote') && alert('You have already casted your vote.')
          error.includes('You are not a participant of this poll') && alert('You are not a participant of this poll.')
        });
      }
      else{
        alert('A group name (atleast 4 characters), group administrator and a list of participants must be specified.')
      }
      
    }
    
    return(
      // This gives the transparent black  background when the modal is activated
     
      <div className={`new-group-overlay ${!isActive && 'displayNone'}`}>
      {/* This is the container for the modal */}
  
       <div className='new-group-modal'>
         {/* This is the header of the modal */}
  
         <header className='new-group-header'>
           <p className='heading-text'>New Group</p>
           <FontAwesomeIcon icon='x' onClick={handleClose} className='heading-x-icon'/>
         </header>
         {/* The body of the modal */}
  
         <section className='new-group-body'>
          <p className='group-id'>Group ID: {id}</p> 
  
          <div className='groupInput'>
            <input value={groupName} onChange={(e)=>setGroupName(e.target.value)} type="text" placeholder='Group name....' />
          </div>
  
          <div className='groupInput'>
            <input value={adminAddress} onChange={(e)=>setAdminAddress(e.target.value)} type="text" placeholder='Group administrator....'/>
          </div>
  
          <p className='participants-heading'>Voters</p>
  
          <div className='participants-list'>
          {
           participants.length > 0?participants.map((item,index)=><Participant key={index} index={index} address={item} participants={participants} setParticipants={setParticipant}/>):<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img style={{height:100}} src={notfound} alt="No items found" /></div>
          }
          </div>
          {/* button to add a new voter */}
          <div className='add-participant'>
            <button onClick={addParticipant} className='add-participant-btn'>Add Voter +</button>
          </div>
  
         </section>
  
         {/* This button is used to submit the information and create the group */}
         <div className='create-group'>
          <button className='create-group-btn' onClick={createGroup}>Create Group +</button>
         </div>
  
        </div>
      </div>
    )
  }
  
  

export default NewGroup