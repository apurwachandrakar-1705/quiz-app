import { BrowserRouter as Router } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import AllRouting from './components/Routing/AllRouting';


function App() {
  

  return (
 <Router>
  <AllRouting></AllRouting>
 </Router>
  )
}

export default App
