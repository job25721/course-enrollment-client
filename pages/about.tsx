import { useSelector } from 'react-redux'
import { InitialSate } from '../store'
import Link from 'next/link'
const About = () => {
  const count = useSelector((state: InitialSate) => state.count)
  return (
    <div>
      {count}
      <Link href="/">
        <button>Go back</button>
      </Link>
    </div>
  )
}

export default About
