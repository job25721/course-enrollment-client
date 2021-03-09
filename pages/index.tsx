import { Dispatch, useState } from 'react'
import { LogInOutline } from 'react-ionicons'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, StoreEvent } from '../store'

type LoginPerson = 'student' | 'teacher'

const Index = () => {
  const [loginId, setLogin] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<LoginPerson>('student')
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch<Dispatch<StoreEvent>>()

  const router = useRouter()
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <img src="/logo.png" alt="" />
      <div className="flex my-4">
        <Button
          onClick={() => setOpen(!open)}
          mx={2}
          style={{ backgroundColor: '#4BABDC' }}
        >
          Student
        </Button>
        <Button
          onClick={() => setPlaceholder('teacher')}
          mx={2}
          style={{ backgroundColor: '#9ABF53' }}
        >
          Teacher
        </Button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          router.push('/course')
        }}
        className="flex"
      >
        <Input
          type="text"
          className="rounded-3xl w-auto"
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
