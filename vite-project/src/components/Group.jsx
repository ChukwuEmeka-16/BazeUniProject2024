import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig';
import { ethers} from 'ethers';
import { Doughnut } from 'react-chartjs-2';
import { Chart, plugins  } from 'chart.js/auto';
import notfound from '../assets/notfound.png'

const date = new Date()

// date time string to milli seconds
function dateTimeToMilliseconds(dateTimeString) {
  // Create a Date object by parsing the date time string
  const date = new Date(dateTimeString);

  // Check if the parsing was successful (returns NaN if invalid format)
  if (isNaN(date.getTime())) {
    console.log('Invalid date time string format');
  }

  // Return the milliseconds since epoch (1970-01-01 00:00:00 UTC)
  return date.getTime();
}



// conterts milliseconds to a date-time string
function millisecondsToDateTime(milliseconds) {
  // Create a new Date object from the milliseconds
  const date = new Date(milliseconds);

  // Define the format options for the date time string
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  // Use the toLocaleDateString and toLocaleTimeString methods with formatting options
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  return `${formattedDate}`;
}




// option to vote from
const Choice = ({description='this is the candidate from the Labour Party (LP)',choice='Peter Obi'}) => {
    let desc = description;
   
    return(
      <div onClick={()=>alert(desc)} className='choice-card'>
        <FontAwesomeIcon icon='anchor-circle-check' size='2x' className='choice-crown'/>
        <p className='choice-text'> {choice}</p>
      </div>
    )
} 






//
const StartChoice = ({index=1, choice='baba ahmed', description='lp vice president', choices,setChoice}) =>{
  
  const deleteChoice = () =>{
    const users = [...choices];
    users.splice(index,1);
    
    setChoice(users);
   
  }
  
  return(
   <div className='choice-container'>
    <p className='choice-index'>{index.toString() +'.'}</p>
    <p className='choice-name' onClick={()=>alert(description)}>{choice}</p>
    <FontAwesomeIcon onClick={deleteChoice} className='choice-delete' icon='trash-can'  />
   </div>
  )
}











// modal used to enter data required to start a poll
const StartPollModal = ({pollActive,setPollActive,groupID, change, setChange}) =>{
  const[choices,setChoice] = useState([]);
  const[duration,setDuration] = useState('');
  

  const addChoice = () =>{
    let choice = prompt('Enter a choice.');
    let description = prompt("Enter it's description.")
    if (choice?.length > 0 && description?.length > 0) {
      setChoice([...choices,{choice:choice,description:description}]);
      
    }
  }
  const startPoll = async () =>{
    const docRef = doc(db,'Groups',groupID);
    await updateDoc(docRef,{choices:arrayUnion(...choices),duration:duration}).then(res=>alert('The Poll Has Started Successfully!.')).catch(err=>alert(err.message))
    setChange(!change)
    setPollActive(false)
  }
  return(
    <div className={`start-poll-overlay ${!pollActive && 'displayNone'}`}>

      <div className='start-poll-modal'>

        <header className='start-poll-header'>
          <h1 className='start-poll-heading'>Start poll</h1>
          <FontAwesomeIcon onClick={()=>setPollActive(false)} icon='x' size='2x' className='start-poll-close'/>
        </header>

        <section className='start-poll-body'>

          <div className='start-poll-choice-list'>
            {
              choices.length?choices.map((item,index)=><StartChoice key={index} choices={choices} setChoice={setChoice} index={index} choice={item.choice} description={item.description}/>):<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img style={{height:100}} src={notfound} alt="No items found" /></div>
            }
            <div className='add-choice-btn-container'>
             <button className='add-choice-btn' onClick={addChoice}>Add Choice +</button>
            </div>
          </div>

          <div className='start-poll-duration'>
            <input  type="datetime-local" className='start-poll-datetime' onChange={(e)=>setDuration(e.target.value.replace('T',' ')+':00')}/>
          </div>
         { duration.length <1 ?<p className='error-text' style={{marginBottom:20,textAlign:'center'}}>Enter an end date.</p>:<p style={{marginBottom:20,textAlign:'center'}} >{duration} </p>}
          <div className='start-poll-btn'>
            <button onClick={startPoll} disabled={duration.length < 4  || choices.length <2 ? true:false} className={`start-poll-now-btn ${duration.length < 4  || choices.length <2? 'disabled-btn':''}`}>Start <FontAwesomeIcon icon='play'/></button>
          </div>
          {choices.length <2 && <p style={{marginTop:10,textAlign:'center'}} className='error-text'>Must have atleast two choices.</p>}
        </section>

      </div>
    </div>
  )
}







const ResultListTile = ({index=0, choice='John doe', votes}) =>{
  let voteCount = 0;
  for (let i = 0; i < votes.length; i++) {
    if (votes[i][1] == choice) {
      voteCount++
    }
    
  }

  return(
    <div className='result-list-tile'>
      <p>{index}</p>
      <p>{choice}</p>
      <p>{voteCount}</p>
    </div>
  )
}


const ResultPage = ({totalVotes,votes,candidates,isArchived,groupID,groupAdmin, setChange,change}) =>{
  
  let candidateList = []
  let Results = [];
  
  for (let i = 0; i < candidates.length; i++) {
    
    candidateList[i] = candidates[i]?.mapValue?.fields?.choice?.stringValue;
  }
  

  for (let i = 0; i < candidateList.length; i++) {
    Results[i] = [candidateList[i],0]
     
  }

  for(let i = 0;i<votes.length;i++){
    for (let j = 0; j < Results.length; j++) {
        if (votes[i][1] ==Results[j][0]) {
         Results[j][1] = Results[j][1] +1
        }
    }
 }
 Results.sort((a,b)=>b[1] - a[1])

  
  // choices of the poll
  const X_values =  Results.map((item)=>item[0]);
  // their total votes
  const Y_values =  Results.map((item)=>item[1]);
  
  // im putting 300 of them incase
  const barColors =[
    "#003366", "#800080","#663399","#b91d47","#00aba9","#2b5797","#e8c3b9",
    "#1e7145", "#576675", "#7e6e86", "#54478d", "#7d7b8a", "#3b5998", "#5f5b89", "#3a2e4d", "#5d478b",
    "#41464b", "#596672", "#7d5a77", "#7f8fa6", "#404e6f", "#38455f", "#455d7a", "#7a6f90", "#70648a", "#5a4f75",
    "#5f4f7a", "#475877", "#333366", "#545177", "#59546b", "#5b576b", "#49516f", "#383e56", "#3f4e5e", "#505c78",
    "#4c536b", "#2e2a4a", "#555b6e", "#32324e", "#4b4d6a", "#2b2d42", "#58527a", "#4a4567", "#595d7f", "#3d3c52",
    "#44446c", "#403f54", "#3f4047", "#524a69", "#4f5772", "#2f334e", "#6a6783", "#5c546e", "#33334c", "#444e67",
    "#353c56", "#394160", "#3c4157", "#33334b", "#4a536d", "#474f64", "#3c435c", "#4b5067", "#6d7993", "#647a9b",
    "#535e7b", "#6c6788", "#536388", "#3e455f", "#5d6582", "#4f5976", "#313a59", "#353e5c", "#4d536d", "#303d5a",
    "#3e4058", "#3e4456", "#4a4e66", "#585a72", "#49556f", "#48566e", "#35406a", "#2e3546", "#404e6c", "#4d5571",
    "#41485e", "#5b607b", "#666c84", "#4a536a", "#556481", "#525d73", "#3b4463", "#5a5f78", "#48536a", "#47526c",
    "#4d586e", "#515a71", "#3a3f5d", "#374056", "#39415c", "#54587a", "#4c516d", "#464b63", "#52566e", "#4f5570",
    "#59617d", "#2c2f4e", "#2f3352", "#313854", "#393d5a", "#3c425d"
  ]
  // archive group
  const archiveGroup = async () =>{
    if (isArchived) {
      alert('The Group is already Archived!.')
    }
    else if (groupAdmin?.toLowerCase() == window?.ethereum?.selectedAddress?.toLowerCase()) {
      const docRef = doc(db,'Groups',groupID);
      await updateDoc(docRef,{isArchived:true}).then(()=>{
        alert('Archived!')
        setChange(!change)
      }).catch((err)=>alert(err))
    }
    
    else{
      alert('Only The Administrator can Archive the Group!.')
    }
  }
  const unArchiveGroup = async () =>{
    
    if (isArchived) {
      const docRef = doc(db,'Groups',groupID);
      await updateDoc(docRef,{isArchived:false}).then(()=>{
        alert('unArchived Successfully!')
        setChange(!change)
      }).catch((err)=>alert(err))
    }
  }
  return(
    <div className='result-page'>
     <table className='results-page-results-table'>
      <thead className='results-page-results-table-head'>
        <tr>
         <th>Position</th>
         <th>Choice</th>
         <th>No. Votes</th>
        </tr>
      </thead>
      <tbody className='results-page-results-table-body'>

        {Results.length > 0 && Results.map((item,index)=><tr key={index}>
          <td>{index +1}</td>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
        </tr>)
        }
        
      </tbody>
     </table>
     
      <h3 className='result-page-statistics-heading'>Statistics</h3>
    
      <div className='result-page-statistics'>
        <Doughnut 
          options={{
            plugins:{
              tooltip:{
                callbacks:{
                  footer:(toolTipItems)=>{
                    return `Votes: ${(Number(toolTipItems[0].parsed)/totalVotes)*100}%`
                  }
                }
              }
            }
          }}

          data={{
            labels:[...X_values],
            datasets:[
              { 
                label:'Votes',
                data:[...Y_values],
                backgroundColor:barColors,
                
              }
            ],
            }}/>

      </div>

      <div className='result-page-archive'>
       { isArchived?<button style={{backgroundColor:'#169873'}} onClick={unArchiveGroup}>UnArchive Group <FontAwesomeIcon icon='box-archive' style={{marginLeft:10}}/></button>
        :<button onClick={archiveGroup}>Archive Group <FontAwesomeIcon icon='box-archive' style={{marginLeft:10}}/></button>}
      </div>
    </div>
  )
}












// where a poll is being held
const Group = ({isArchived,isActive,setActive, timeLeft='unset',groupName,choices,groupID,change, setChange,groupAdmin}) => {
  const[selected,setSelected] = useState('');
  const[pollActive,setPollActive] = useState(false);
  const [groupVotes,setGroupVotes] = useState([])
  
  // smart contract code
  
  
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

const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/161db2810a6f4c0096ef64b5fad9406e");
const contractAddress = '0xBC3C14E845E8758577547eeaBeBd9CFa40FD139D';
const contract = new ethers.Contract(contractAddress,ERC20_ABI,provider)

const getVotes = async () =>{
  const votes = await contract.getVotes(groupID)
  
  setGroupVotes(votes);
}



const castVote = async() =>{
 
  console.log(selected)
  const provider2 = new ethers.providers.Web3Provider(window.ethereum);
  const contract2 = new ethers.Contract(contractAddress, ERC20_ABI, provider2);
  try{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const signer = provider2.getSigner(accounts[0]);
    const contractWithSigner = contract2.connect(signer);
    const tx = await contractWithSigner.castVote(groupID,selected)
    await tx.wait()
    
    alert('casted successfully');
    getVotes()
  }
  catch(err){
   const error = err.toString()
   error.includes('user rejected transaction') && alert('user rejected transaction.')
   error.includes('You have already casted your vote') && alert('You have already casted your vote.')
   error.includes('You are not a participant of this poll') && alert('You are not a participant of this poll.')
  }
}

useEffect(()=>{
  groupVotes.length <1 && getVotes()
},[])




const isElapsed = dateTimeToMilliseconds(timeLeft) <date.getTime()

const isEligibleToStartPoll =()=>{
  if (groupAdmin.toLowerCase() == window?.ethereum?.selectedAddress?.toLowerCase()) {
    setPollActive(true)
  } else {
    alert('You are not permitted to start this poll!')
  }
}
  
  return (
    <>
   <StartPollModal setChange={setChange} change={change} pollActive={pollActive} setPollActive={setPollActive} groupID={groupID} />

    <div className={`group-overlay ${!isActive && 'displayNone'}`}>
      <div className='group-page'>

        <header className='group-page-header'>
          <p className='group-page-time'>{timeLeft}</p>
          <p className='group-page-name'>{groupName}</p>
          <FontAwesomeIcon icon='x' className='group-page-close' onClick={()=>setActive(false)}/>
        </header>
        {isElapsed?<ResultPage change={change} setChange={setChange} groupAdmin={groupAdmin} groupID={groupID} isArchived={isArchived} totalVotes={groupVotes.length} votes={groupVotes} candidates={choices} />
        :<>
        <section className={`group-choice-list ${!choices && 'jcenter'}`}>
          
          {
            choices?choices.map((item,index)=><Choice key={index} choice={item?.mapValue?.fields?.choice?.stringValue} description={item?.mapValue?.fields?.description?.stringValue}/>):<button onClick={isEligibleToStartPoll} className='start-btn'>Start Poll <FontAwesomeIcon icon='play'/> </button>
          }
        </section>

        <div className='group-choose'>
            <select className='group-choose-select' onChange={(e)=>setSelected(e.target.options[e.target.selectedIndex].value)}>
                <option value="">Select a candidate</option>
                {
                  choices && choices.map((item,index)=><option  key={index}>{item?.mapValue?.fields?.choice?.stringValue}</option>)
                }
            </select>
        </div>

        <div className='group-cast-vote'>
          <button  disabled={((!Boolean(choices?.length) || choices?.length <1)|| isElapsed) && true} className={`group-cast-vote-btn ${((!Boolean(choices?.length) || choices?.length <1)|| isElapsed)  && 'disabled-btn'}`} onClick={castVote}>Cast Vote <FontAwesomeIcon icon='circle-down' style={{marginLeft:5}}/></button>
        </div>
        
        <div className='group-result-preview' style={{}}>
          { 
           
           choices?.length? choices.map((item,index)=><ResultListTile key={index} votes={groupVotes} index={`${index}.`} choice={item?.mapValue?.fields?.choice?.stringValue}/>):<div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}><img style={{height:130}} src={notfound} alt="No items found" /></div>
          }
        </div>
        </>}
        
        <p className='group-admin-row'>Group Administrator: {groupAdmin}</p>
      </div>
    </div>
    </>
  )
}

export default Group