import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  
  let [counter,setCounter]=useState(15);

  const addValue=()=>{
        setCounter(counter+1);
  }

  const removeValue=()=>{
    if(counter==0){
      setCounter(0);
    }else{
    setCounter(counter-1);
    }
  }

  return (
    <>
       <h1>chai aur react</h1>
       <h2>counter value:{counter}</h2>

       <button onClick={addValue}>Add value:{counter}</button>
       <br />
       <button onClick={removeValue}>Remove value:{counter}</button>
    </>
  )
}

export default App
