import { useEffect, useState } from 'react'
import ethwallet from '../assets/ethwallet.png'
import ethereum from '../assets/ethereum.png'
//import ConnectButton from './ConnTest'


const Auth = () => {

  const[isConn,setConn]=useState(false);

  const connectWallet = async () =>{

    await window.ethereum.request({ method: 'eth_requestAccounts', }).then((accounts)=>{
     setConn(true)
     console.log(accounts);
    }).catch(err=>alert(err.message));
  }  
    
  useEffect(()=>{
    
    window?.ethereum?.selectedAddress? window.location = '/home':setConn(false)
  },[isConn])

  return (
   
    <div className='auth-container'>

    <div  className='centerIconContainer' >
    <div className='iconContainer'>
      <img src={ethereum} alt="Ethereum logo" className='icon'  />
      <p className='plus-icon'>+</p>
      <img src={ethwallet} style={{marginLeft:15}} alt="Ethereum wallet" className='icon' />
    </div>
    </div>


    <div className='connectContainer'>
    {!window?.ethereum?.selectedAddress?<button className='wallet-connect' onClick={connectWallet} >Connect Wallet</button>:<button className='wallet-connect' style={{overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{window?.ethereum?.selectedAddress}</button>}
    {/* <ConnectButton /> */}
    </div>

    <div className='centerOrText'>
     <p style={{letterSpacing:-2,display:'flex',textAlign:'center'}}>--------------------------------------------------<p style={{border:'1px solid black',marginTop:-3,borderRadius:15,width:15,height:15,textAlign:'center',padding:5,letterSpacing:0.5,display:'flex',alignItems:'center'}}>or</p>--------------------------------------------------</p>
    </div>

    <div className='learnContainer'>
    <button className='learnbtn' onClick={()=>window.location.href = '/learn'}>Learn More About E-Voting</button>
    </div>

    <p className='tncFooter'>Terms And Conditions | Copyright &copy; 2024, Eli Asikaro </p> 
    </div>
  
  )
}

export default Auth