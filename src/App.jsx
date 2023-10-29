import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  
  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (numberAllowed) str += "0123456789"
      if (charAllowed) str += "!@#$%^&*()-_+=[]{}`~"

      for(let i = 1; i <= length; i++){
        let char = Math.floor(Math.random() * str.length + 1) 
        pass += str.charAt(char)
      }
      setPassword(pass)
    },
     [length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },
  [password])

  useEffect(() => {
    generatePassword()
  },
  [length, numberAllowed, charAllowed, generatePassword])

  return (
    <>
      <h1
      className='text-4xl text-center text-white my-4'
      >Password Generator</h1>

      <div className='w-full max-w-md mx-auto rounded-lg p-4 my-8 text-orange-600 bg-gray-700'>
        <div className=' flex mx-auto rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          value={password}
          placeholder='password'
          className='outline-none w-full py-1 px-3' 
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPassword} 
          className='bg-blue-600 px-3 py-1 text-white outline-none'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex justify-center items-center gap-x-1'>
            <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>length: {length}</label>
          </div>
          <div className='flex gap-x-1'>
            <input type="checkbox" name="" id="numberInput" 
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charInput">Numbers</label>
            <input type="checkbox" name="" id="charInput" 
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
