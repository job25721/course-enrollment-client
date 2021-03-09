import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  HomeOutline,
  PersonOutline,
  PersonCircleOutline,
  LogOutOutline,
  AddOutline,
} from 'react-ionicons'

const Navbar: React.FC = ({ children }) => {
  const router = useRouter()
  const [activeNav, setActiveNav] = useState<string>('')
  useEffect(() => {
    console.log(router.pathname)
    setActiveNav(router.pathname)
  }, [router.pathname])
  return (
    <div
      className="flex flex-col-reverse h-screen bg-blue- w-full sm:flex-row"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      <div className="bg-white justify-around rounded-2xl items-center flex flex-row shadow-md w-full h-20 sm:flex-col sm:w-20 sm:h-full sm:justify-center sm:shadow-md">
        <button
          onClick={() => router.push('/course')}
          className="my-4 focus:outline-none"
        >
          <HomeOutline
            {...(activeNav === '/course'
              ? { height: '30px', width: '30px' }
              : { color: 'rgb(200,200,200)' })}
          />
        </button>
        <button
          onClick={() => router.push('/add')}
          className="my-4 focus:outline-none"
        >
          <AddOutline
            {...(activeNav === '/add'
              ? { height: '30px', width: '30px' }
              : { color: 'rgb(200,200,200)' })}
          />
        </button>
        <button
          onClick={() => router.push('/user')}
          className="my-4 focus:outline-none"
        >
          <PersonOutline
            {...(activeNav === '/user'
              ? { height: '30px', width: '30px' }
              : { color: 'rgb(200,200,200)' })}
          />
        </button>
      </div>
      <div className="w-full h-full p-4 overflow-auto">
        <div className="flex sm:mb-0 mb-4 items-center relative sm:absolute sm:right-5">
          <div>
            <PersonCircleOutline width="50px" height="50px" />
          </div>
          <div className="px-2 flex-1 sm:flex-initial">
            <p>Pathomporn Pankaew</p>
            <p>Student</p>
          </div>
          <div className="px-2">
            <button
              className="focus:outline-none"
              onClick={() => router.push('/')}
            >
              <LogOutOutline width="30px" height="30px" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Navbar
