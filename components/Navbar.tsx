import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { HomeOutline, PersonOutline } from 'react-ionicons'

const Navbar: FC = ({ children }) => {
  const router = useRouter()
  const [activeNav, setActiveNav] = useState<string>('')
  useEffect(() => {
    console.log(router.pathname)
    setActiveNav(router.pathname)
  }, [router.pathname])
  return (
    <div
      className="flex flex-col-reverse h-screen w-full sm:flex-row"
      style={{ backgroundColor: 'whitesmoke' }}
    >
      <div className="bg-white justify-around rounded-2xl items-center flex flex-row shadow-md w-full h-20 sm:flex-col sm:w-20 sm:h-full sm:justify-center sm:shadow-md">
        <button
          onClick={() => {
            setActiveNav('Home')
            router.push('/course')
          }}
          className="my-4 focus:outline-none"
        >
          <HomeOutline
            {...(activeNav === '/course'
              ? { height: '30px', width: '30px' }
              : { color: 'rgb(200,200,200)' })}
          />
        </button>
        <button
          onClick={() => {
            setActiveNav('User')
            router.push('/user')
          }}
          className="my-4 focus:outline-none"
        >
          <PersonOutline
            {...(activeNav === '/user'
              ? { height: '30px', width: '30px' }
              : { color: 'rgb(200,200,200)' })}
          />
        </button>
      </div>
      <div className="w-full h-full p-4 overflow-auto">{children}</div>
    </div>
  )
}

export default Navbar
