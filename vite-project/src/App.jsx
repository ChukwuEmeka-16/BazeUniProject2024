import './App.scss';
import {Routes,Route} from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import Learn from './components/Learn';

// This component is the backbone of the website, it defines navigation between pages and what page to display at each route

const App = () => {
  
  return (
    <Routes >
      <Route path='/' element={<Auth/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/learn' element={<Learn/>}/>
    </Routes>
  );
}


export default App;

