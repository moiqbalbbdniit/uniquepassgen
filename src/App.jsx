import { useState,useCallback ,useEffect ,useRef} from "react"
function App() {
  const [length,setLength] = useState(8)
  const [numallow,setNumallow] = useState(false)
  const [charallow,setCharallow] = useState(false)
  const [password,setPassword] = useState("")
  // function for password generator and useCallback function
  const passGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallow) str += "0123456789"
    if(charallow) str += "{}!@#$%^&*()[]"
    for(let i =1 ; i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numallow,charallow,setPassword])
  useEffect(()=>{
    passGen()
  },[length,numallow,charallow,passGen])

  // useref for password cpy 
  const passwordRef = useRef(null)
  const copyPass = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  return (
    <>
     
     <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
     <h1 className="text-xl text-center text-white ">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password}
        className="outline-none w-full py-1 px-3 font-semibold" readOnly
        ref={passwordRef}
        />
        <button onClick={copyPass} className="text-blue-600 bg-white pr-4 pb-2 text-xl font-semibold">copy</button> <br />
      </div>
      <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
              <input 
              type="range"
              min={6}
              max={100}
              value={length} className="cursor-pointer"
              onChange={(e)=>{setLength(e.target.value)}}
               />
              <label >Length: {length}</label>
              
          </div>
          <div className="flex item-center gap-x-1 ml-5">
          <input 
          type="checkbox"
          defaultChecked={numallow}
          onChange={()=>{
            setNumallow((prev)=>!prev)
          }}

          />
              <label >Number</label>
          </div>
          <div className="flex item-center gap-x-1 ml-5">
          <input type="checkbox" 
          defaultChecked={charallow}
          onChange={()=>{
            setCharallow((prev)=>!prev)
          }}/>
              <label >Character</label>
          </div>
      </div>
     </div>
    </>
  )
}

export default App
