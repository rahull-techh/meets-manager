import { Link } from "react-router-dom";

const Navbar =() => {
    return(
        <nav className=' flex items-center justify-between bg-white px-6 py-5 md:px-16'
        >
            <Link to='/' element = 'home' className=' text-2xl font-bold text-[#477568]'>
             CONVEO<span className='text-[#263A43]'>.</span>
      </Link>

      
      <div className='hidden items-center gap-8 md:flex'>
        <a
          href='#features'
          className='text-sm text-[#263A43] transition hover:text-[#477568]'
        >
          Features
        </a>

        <a
          href='#about'
          className='text-sm text-[#263A43] transition hover:text-[#477568]'
        >
          About
        </a>

        <a
          href='#contact'
          className='text-sm text-[#263A43] transition hover:text-[#477568]'
        >
          Contact
        </a>
      </div>

      <div className='flex items-center gap-3'>
        <Link
          to='/login'
          className='hidden rounded-lg px-4 py-2 text-sm font-medium text-[#24354D] transition hover:text-[#477568] sm:block'
        >
          Log in
        </Link>

        <Link
          to='/register'
          className='rounded-lg bg-[#477568] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3F685D]'
        >
          Get Started
        </Link>
      </div>
    </nav>

            
    )
}
 
export default Navbar