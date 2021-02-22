import { useState } from 'react'
import { LogInOutline } from 'react-ionicons'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { AlertDialog } from '../components/AlertDialog'
import { Modal } from '../components/Modal'
import { useRouter } from 'next/router'

type LoginPerson = 'student' | 'teacher'

const Index = () => {
  const [loginId, setLogin] = useState<string>('')
  const [placeholder, setPlaceholder] = useState<LoginPerson>('student')
  const [open, setOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      {/* <AlertDialog
        isOpen={open}
        title="Alert"
        content="Hello world"
        onCancel={() => setOpen(false)}
        type="danger"
      /> */}

      {/* <Modal isOpen={open} onCancel={() => setOpen(false)}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta id
          repellendus aperiam incidunt vel, consequatur sunt sed ullam quis,
          perspiciatis facilis ea autem illo illum magni earum aliquam explicabo
          quia! Fugiat, dolore! Aperiam, repellendus? Tempora vitae alias
          accusamus cupiditate rem libero. Mollitia dicta rem porro impedit
          laboriosam nostrum, adipisci doloribus asperiores, illo voluptatibus
          ea molestias doloremque, quod maiores. Tempore commodi dolores
          repudiandae error, cum soluta quis, obcaecati, repellat id laborum
          corrupti eos inventore ea cupiditate expedita quisquam minima
          repellendus consequuntur alias deserunt aliquid ut. Impedit cupiditate
          excepturi, neque recusandae distinctio, veniam placeat inventore
          fugit, voluptatum quod quidem reprehenderit fugiat amet.
        </p>
      </Modal> */}
      <img src="/logo.png" alt="" />
      <h1 className="text-2xl">I'm a</h1>
      <div className="flex my-4">
        <Button onClick={() => setOpen(!open)} mx={2} bg="#4BABDC">
          Student
        </Button>
        <Button onClick={() => setPlaceholder('teacher')} mx={2} bg="#9ABF53">
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
