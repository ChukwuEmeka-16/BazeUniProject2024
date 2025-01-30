import React from 'react'
import ethereumWorld from '../assets/Blockchain-Ethereum.jpeg'



const Learn = () => {


  return (
  <div className='learn-more-container'>
    <img className='learn-more-image' src={ethereumWorld} alt="" />

    <div className='learn-more-body'>
      <h1 className='learn-more-header'>VoteEli: Empowering Transparent Democracy on the Ethereum Blockchain.</h1>
      <article className='learn-more-introduction'>
        Welcome to VoteEli, where we revolutionize the way you participate in the democratic process. Our platform harnesses the power of blockchain technology to ensure secure, transparent, and tamper-proof voting.
      </article>

      <section className='learn-more-history'>
       <h2 className='learn-more-historic-overview-heading'>Historic Overview</h2>
       <article className='learn-more-historic-overview-article'>
        <p>Numerous issues with traditional voting methods necessitate creative fixes. Long-standing worries about fraud, manipulation, and a lack of transparency has dented the integrity and the confidence in democratic processes by a large portion of society. Increased accessibility, efficiency and reduced costs is promised with the development of electronic voting (e-voting) systems, nevertheless cyber vulnerabilities coupled with the opaque counting procedures and the overall centralized nature of the initial iterations of e-voting systems frequently cast further doubt or suspicion on the validity of the results of a poll because with those versions of e-voting systems data manipulation is possible.</p>
        <p>The pressing need for innovative solutions led to the exploration of new technologies such as blockchain. A Blockchain is a distributed and decentralized digital ledger that records transactions across a network of computers called nodes, which contain a copy of all data on the blockchain. It is designed to be secure, transparent, and resistant to modification of the data(transactions) it contains. The fundamental concept of a blockchain involves a chain of blocks, where each block contains a list of transactions. These transactions are secured using cryptographic principles and are linked together in a chronological & linear order meaning, Future blocks contain the hash of the previous block hence the name blockchain.</p>
       </article>
      </section>

      <section className='learn-more-why'>

       <h3 className='learn-more-why-heading'>Why use blockchain technology for E-voting?</h3>

       <article className='learn-more-why-article'>

         <p className='learn-more-why-para1'>New technologies such as blockchain technology  have the potential to revolutionize the voting process by improving its:</p>
         
         <ul className='learn-more-why-list1'>
           <li>Security: Blockchain's cryptographic protocols make it virtually impossible for malicious actors to alter or manipulate voting data.</li>
           <li>Transparency: Every transaction on the blockchain is publicly recorded, allowing voters to verify the integrity of the electoral process.</li>
           <li>Accountability: By removing the need for intermediaries and central authorities, Allowing voters to independently verify the results blockchain instills confidence in the democratic process, fostering trust among voters.</li>
           <li>Efficiency: Blockchain streamlines the voting process, reducing the time and resources required for ballot counting and verification.</li>
         </ul>

         <p className='learn-more-why-para2'>The fundamental characteristics of blockchain, such as data immutability, decentralization, and cryptographic security, offer exciting opportunities to solve problems present in conventional and electronic voting systems that have been present for a long time and renew trust in the democratic process by members of the society, Some of such problems include:</p>
         
         <ul className='learn-more-why-list2'>
            <li>Costs</li>
            <li>Logistical Complexity</li>
            <li>Ease of accessibility by potential participants and people with disabilities.</li>
         </ul>

       </article>
      </section>
      
      <section className='learn-more-infrastructure'>
       <h3>How does VoteEli work?</h3>
       <article className='learn-more-infrastructure-article'>
        <p>The user interface(frontend) uses the request method from the JavaScript Ethereum object to enable users sign-in using any of the popular wallets that support the ethereum network. This allows the user have access to the application, then the frontEnd uses the ethers.js module, the ERC20 ABI(Application binary interface) which is just an object that defines the implementation of all the functions to be accessed in the smart contract, the smart contracts contract address, and the infura provider(ethereum node) to create an instance of the smart contract. With this instance the system can make function calls directly to the target smart contract on the blockchain.</p>
        <p>In order  to protect the privacy of users who are part of a poll a hashtable (Mapping) data-structure whose visibility is marked as private is used on the smart contract to store the list of registered voters for each poll, and no functionality is implemented to read from the mapping on the smart contract, so no actor can actually know what users are registered once the list of registered voters has been saved. It is mandatory for the group/poll administrator to specify the wallet addresses of each of the participants of the poll, so only people who are registered will be able to participate, to ensure privacy of the poll from people who have no business with it, the polls themselves will be displayed in groups, similar to how apps like google classroom work, where each lecture (poll in this case) is stored in a group (classroom in this case). The firebase DB is used to store the metadata of the group, to ensure efficient loading of content for the user and to reduce cost, this is because writing the metadata to the smart contract will cost money, slow down the smart contract, and result is slow loading of content, especially when the blockchain network is congested.</p>
        <p> Given that, the process of voting entails the administrator of the poll initiating the creation of a group by specifying the event and the people who will participate in the poll by providing the list of wallet addresses of all participants. Next, the administrator has to start the poll in the created group, this prompts them to specify the candidates/options to be voted for, and a termination time for the poll, then the poll commences.</p>
       </article>
      </section>

      <section className='learn-more-advantages'>

       <h3 className='learn-more-advantages-heading'>Advantages of this voting system</h3>

       <article className='learn-more-advantages-article'>
          <ul>
            <li>Privacy: With the use of a CryptoCurrency wallet address as identification for each user, this makes it hard to unmask a voter or who exactly a specific person voted for.</li>
            <li>Immutability: In the implementation of the smart contract, there is no functionality to delete data or update an existing field <b> <u> NOTE: Smart contract code cannot be updated once deployed.</u></b> This makes it impossible to delete stored data.</li>
            <li>Cost Effectiveness: The use of a Firebase Firestore Database to store the metadata of a poll makes this system cheaper to use than most other systems because, if this metadata is stored on the blockchain it will cost fees to write in each piece of data and additional fees to update it. </li>
            <li>Easy Result Verification: The smart contract contains a function whose sole purpose is to get all the votes related to a poll, this allows for independent verification of a result. </li>
           
          </ul>
       </article>

      </section>

      <section className='learn-more-summary'>
       <h2>Summary</h2>
       <article className='learn-more-summary-article'>
          VoteEli is not just a platform, it is a commitment to democracy. By embracing blockchain technology, we empower individuals to exercise their fundamental right to vote with confidence and integrity. Join us in shaping the future of democracy, one secure ballot at a time.
       </article>
      </section>

    </div>
   </div>
  )
}

export default Learn