import React from "react"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <section id='about' className='bg-white px-6 py-20 md:px-16'>
      <div className='mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2'>
        <div>
          <p className='mb-3 font-semibold text-[#5279B8]'>
            ABOUT VOXE
          </p>

          <h2 className='text-3xl font-bold leading-tight text-[#24354D] md:text-4xl'>
            A new way to work together
          </h2>
          <p className='mt-6 leading-7 text-[#66768C]'>
            VOW (Virtual Organized World) is a virtual office
            designed to bring teams together in one digital
            workspace.
          </p>

          <p className='mt-4 leading-7 text-[#66768C]'>
            Whether your team is working remotely or from
            different locations, VOW helps you communicate,
            collaborate and organize your work in one place.
          </p>

          <Link
            to='/register'
            className='mt-8 inline-block rounded-lg bg-[#5279B8] px-6 py-3 font-medium text-white transition hover:bg-[#3F659F]'
          >
            Join VOXE
          </Link>
        </div>
         <div className='flex min-h-72 items-center justify-center rounded-3xl bg-[#E3ECFA] p-8'>
          <div className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg'>

            <div className='mb-6 flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#DCE8F8] text-xl'>
                👥
              </div>

              <div>
                <h3 className='font-semibold text-[#24354D]'>
                  Your Team
                </h3>
                <p className='text-sm text-[#66768C]'>
                  Working together
                </p>
              </div>
            </div>

            <div className='space-y-3'>
              <div className='h-3 w-full rounded-full bg-[#E3ECFA]'></div>
              <div className='h-3 w-4/5 rounded-full bg-[#E3ECFA]'></div>
              <div className='h-3 w-3/5 rounded-full bg-[#E3ECFA]'></div>
            </div>
             <div className='mt-6 flex -space-x-2'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#DCE8F8]'>
                👩
              </div>

              <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#E3ECFA]'>
                👨
              </div>

              <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#DCE8F8]'>
                👩‍💻
              </div>

              <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#5279B8] text-sm text-white'>
                +
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default About