import { useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import styleApp from './styles/App.scss'
import Header from './component/header/header'
import Footer from './component/footer/footer'
import Home from './pages/home/home'
import Introduct from './pages/introduction/introduction'

function App() {
  const [counter, setCount] = useState(1);

  function oke(){
      setCount(counter => counter + 1)
      setCount(counter => counter + 1)
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/intro' element={<Introduct/>} />
      </Routes>
      <Footer />
    </div>
    
  );
  
}

export default App;
