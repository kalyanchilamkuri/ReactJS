import { useState, useCallback, useRef } from 'react'
import './App.css'

const createPassword = (length, numberAllowed, charAllowed) => {
  let characters = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM'
  if (numberAllowed) characters += '0123456789'
  if (charAllowed) characters += '!@#$%!@#$!@#'

  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * characters.length)
    return characters.charAt(index)
  }).join('')
}

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState(() => createPassword(8, false, false))
  const [copied, setCopied] = useState(false)
  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(() => {
    setPassword(createPassword(length, numberAllowed, charAllowed))
    passwordRef.current?.focus()
  }, [length, numberAllowed, charAllowed])

  const updateLength = (nextLength) => {
    setLength(nextLength)
    setPassword(createPassword(nextLength, numberAllowed, charAllowed))
  }

  const updateNumbers = (allowed) => {
    setNumberAllowed(allowed)
    setPassword(createPassword(length, allowed, charAllowed))
  }

  const updateCharacters = (allowed) => {
    setCharAllowed(allowed)
    setPassword(createPassword(length, numberAllowed, allowed))
  }

  const copyPassword = async () => {
    passwordRef.current?.select()
    await navigator.clipboard.writeText(password)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-white'>
      <section className='w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl sm:p-8'>
        <h1 className='text-center text-3xl font-bold tracking-tight sm:text-4xl'>
          Password Generator
        </h1>
        <p className='mt-2 text-center text-slate-400'>Create a secure password in seconds.</p>

        <div className='mt-8 flex overflow-hidden rounded-lg border border-slate-600 bg-slate-950'>
          <input
            className='min-w-0 flex-1 bg-transparent px-4 py-3 font-mono text-lg text-emerald-300 outline-none'
            type='text'
            value={password}
            readOnly
            ref={passwordRef}
            aria-label='Generated password'
          />
          <button
            className='bg-emerald-500 px-4 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50'
            type='button'
            onClick={copyPassword}
            disabled={!password}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            className='border-l border-slate-700 bg-slate-800 px-4 font-semibold text-white transition hover:bg-slate-700'
            type='button'
            onClick={passwordGenerator}
          >
            New
          </button>
        </div>

        <div className='mt-8 space-y-6'>
          <label className='block'>
            <div className='mb-2 flex items-center justify-between text-sm font-medium'>
              <span>Password length</span>
              <span className='rounded bg-slate-800 px-2 py-1 text-emerald-300'>{length}</span>
            </div>
            <input
              className='w-full accent-emerald-500'
              type='range'
              min='6'
              max='32'
              value={length}
              onChange={(event) => updateLength(Number(event.target.value))}
              aria-label='Password length'
            />
          </label>

          <div className='flex flex-wrap gap-6 text-sm'>
            <label className='flex items-center gap-2'>
              <input
                className='h-4 w-4 accent-emerald-500'
                type='checkbox'
                checked={numberAllowed}
                onChange={(event) => updateNumbers(event.target.checked)}
              />
              Include numbers
            </label>
            <label className='flex items-center gap-2'>
              <input
                className='h-4 w-4 accent-emerald-500'
                type='checkbox'
                checked={charAllowed}
                onChange={(event) => updateCharacters(event.target.checked)}
              />
              Include symbols
            </label>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
