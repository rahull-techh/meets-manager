import { Link } from "react-router-dom";

const Navbar =() => {
    return(
        <nav className=' flex items-center justify-betweenbg-white px-6 py-5 md:px-16'
        >
            <Link to='/' element = 'home' className=' text-2xl font-bold text-[#5279B8]'>
             VOXA<span className='text-[#24354D]'>.</span>
      </Link>

      
      <div className='hidden items-center gap-8 md:fle'>
        <a
          href='#features'
          className='text-sm text-[#24354D] transition hover:text-[#5279B8]'
        >
          Features
        </a>

        <a
          href='#about'
          className='text-sm text-[#24354D] transition hover:text-[#5279B8]'
        >
          About
        </a>

        <a
          href='#contact'
          className='text-sm text-[#24354D] transition hover:text-[#5279B8]'
        >
          Contact
        </a>
      </div>

      <div className='flex items-center gap-3'>
        <Link
          to='/login'
          className='hidden rounded-lg px-4 py-2 text-sm font-medium text-[#24354D] transition hover:text-[#5279B8] sm:block'
        >
          Log in
        </Link>

        <Link
          to='/register'
          className='rounded-lg bg-[#5279B8] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3F659F]'
        >
          Get Started
        </Link>
      </div>
    </nav>

            
    )
}
 
export default Navbar