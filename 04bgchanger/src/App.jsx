import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState('olive')
  const colors = ['red', 'blue', 'green', 'yellow', 'purple']

  return (
    <div style={{ backgroundColor: color, minHeight: '100vh' }}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
          {colors.map((buttonColor) => (
            <button
              key={buttonColor}
              onClick={() => setColor(buttonColor)}
              className='outline-none px-4'
              style={{ backgroundColor: buttonColor }}
            >
              {buttonColor}
            </button>
          ))}
        </div>
        </div>
      </div>
  )
}

export default App
