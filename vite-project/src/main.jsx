import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';  // this component is used to enable routing 
import {library} from '@fortawesome/fontawesome-svg-core' // this makes the font awesome icons globally available to avoid manually importing each icon everytime
import {fab,faEthereum} from '@fortawesome/free-brands-svg-icons'
import {faAnchorCircleCheck, faAngleRight, faClock, faCrown, faMagnifyingGlass, faTrashCan, faX,faBars, faPlus,faBoxArchive,faBookmark,faUserShield, faCircleDown, faPlay} from '@fortawesome/free-solid-svg-icons'
import ErrorBoundary from './components/MiniComponents/ErrorBoundary'



// making font awesome icons available
library.add(fab,faMagnifyingGlass,faAngleRight,faX,faTrashCan,faCrown,faClock,faAnchorCircleCheck,faBars,faPlus,faBoxArchive,faBookmark,faUserShield,faEthereum,faCircleDown,faPlay)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
  
     <ErrorBoundary>
       <App />
     </ErrorBoundary>
   </BrowserRouter>
  </React.StrictMode>
)
