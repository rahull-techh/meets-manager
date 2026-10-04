import React from 'react'

const Features = () => {
  return (
    <section id='features' className='px-6 py-20 md:px-16'>
      <div className='mx-auto max-w-6xl'>

        <div className='mb-12 text-center'>
          <p className='mb-3 font-semibold text-[#5279B8]'>
            OUR FEATURES
          </p>

          <h2 className='text-3xl font-bold text-[#24354D] md:text-4xl'>
            Everything your team needs
          </h2>

          <p className='mx-auto mt-4 max-w-2xl text-[#66768C]'>
            A virtual workspace designed to make teamwork easier,
            faster and more connected.
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-2xl'>
              🎥
            </div>
            <h3 className='mb-3 text-xl font-semibold'>
              Virtual Meetings
            </h3>
            <p className='text-sm leading-6 text-[#66768C]'>
              Connect with your team through virtual meetings
              and communicate from anywhere.
            </p>
          </div>

          <div className='rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-2xl'>
              💬
            </div>
            <h3 className='mb-3 text-xl font-semibold'>
              Team Chat
            </h3>
            <p className='text-sm leading-6 text-[#66768C]'>
              Share ideas, discuss tasks and stay connected
              with your teammates.
            </p>
          </div>


          <div className='rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-2xl'>
              📁
            </div>
            <h3 className='mb-3 text-xl font-semibold'>
              File Sharing
            </h3>
            <p className='text-sm leading-6 text-[#66768C]'>
              Share important documents and resources
              with your team in one workspace.
            </p>
          </div>



          <div className='rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-2xl'>
              📅
            </div>
            <h3 className='mb-3 text-xl font-semibold'>
              Task Management
            </h3>
            <p className='text-sm leading-6 text-[#66768C]'>
              Organize your work, manage tasks and keep
              track of your team's progress.
            </p>
          </div>


          <div className='rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-2xl'>
              🏢
            </div>
            <h3 className='mb-3 text-xl font-semibold'>
              Virtual Workspace
            </h3>
            <p className='text-sm leading-6 text-[#66768C]'>
              Bring your team together in a shared
              virtual office environment.
            </p>
            </div>


            <div className='rounded-2xl bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'>
            <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-2xl'>
              🔒
            </div>
            <h3 className='mb-3 text-xl font-semibold'>
              Secure Access
            </h3>
            <p className='text-sm leading-6 text-[#66768C]'>
              Access your workspace through a dedicated
              account for your team.
            </p>
          </div>


           </div>
      </div>
    </section>
  )
}

export default Features