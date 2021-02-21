import { useState } from 'react'
import { LogInOutline } from 'react-ionicons'
import { Button } from '../components/Button'
const Index = () => {
  const [loginId, setLogin] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<string>('student')
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <img src="/logo.png" alt="" />
      <h1 className="text-2xl">I'm a</h1>

      <div className="flex my-4">
        <Button
          onClick={(e) =>
            setPlaceholder(e.currentTarget.innerHTML.toLowerCase())
          }
          mx={2}
          bg="#4BABDC"
        >
          Student
        </Button>
        <Button
          onClick={(e) =>
            setPlaceholder(e.currentTarget.innerHTML.toLowerCase())
          }
          mx={2}
          bg="#9ABF53"
        >
          Teacher
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          alert(loginId)
        }}
        className="flex"
      >
        <input
          type="text"
          className="rounded-md border-2 border-transparent focus:border-blue-300 focus:outline-none shadow-md px-4 py-1"
          placeholder={`type a ${placeholder} id...`}
          value={loginId}
          onChange={(e) => setLogin(e.currentTarget.value)}
        />
        <button type="submit" className="p-2 focus:outline-none">
          <LogInOutline height="30px" width="30px" color="#9ABF53" />
        </button>
      </form>
    </div>
  )
}

export default Index
