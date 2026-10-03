import React from "react";

const Contact = () => {
  return (
    <section id='contact' className='bg-white px-6 py-20 md:px-16'>
      <div className='mx-auto max-w-6xl'>

      
      
        <div className='mb-12 text-center'>
          <p className='mb-3 font-semibold text-[#5279B8]'>
            CONTACT US
          </p>

          <h2 className='text-3xl font-bold text-[#24354D] md:text-4xl'>
            Let's connect with each other
          </h2>

          <p className='mx-auto mt-4 max-w-2xl text-[#66768C]'>
            Have questions, suggestions or feedback? We'd love
            to hear from you. Get in touch with our team.
          </p>
        </div>

       
       

        <div className='grid gap-10 rounded-3xl bg-[#F5F8FC] p-6 md:grid-cols-2 md:p-10'>

          


          <div className='flex flex-col justify-center'>
            <h3 className='mb-4 text-2xl font-semibold text-[#24354D]'>
              Get in touch
            </h3>

            <p className='mb-8 leading-7 text-[#66768C]'>
              We're here to help you make your virtual
              workspace experience better.
            </p>

            <div className='mb-6 flex items-center gap-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-xl'>
                ✉️
              </div>

              <div>
                <h4 className='font-semibold text-[#24354D]'>
                  Email
                </h4>
                <p className='text-sm text-[#66768C]'>
                  your-email@example.com
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE8F8] text-xl'>
                🏢
              </div>

              <div>
                <h4 className='font-semibold text-[#24354D]'>
                  Workspace
                </h4>
                <p className='text-sm text-[#66768C]'>
                  Virtual Organized World
                </p>
              </div>
            </div>
          </div>

          <form
            className='rounded-2xl bg-white p-6 shadow-sm md:p-8'
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for contacting us!');
            }}  >
            <div className='mb-5'>
              <label className='mb-2 block text-sm font-medium text-[#24354D]'>
                Your Name
              </label>
              <input
                type='text'
                placeholder='Enter your name'
                required
                className='w-full rounded-lg border border-[#DCE8F8] px-4 py-3 outline-none transition focus:border-[#5279B8]'  />
            </div>

            <div className='mb-5'>
              <label className='mb-2 block text-sm font-medium text-[#24354D]'>
                Email Address
              </label>
              <input
                type='email'
                placeholder='Enter your email'
                required
                className='w-full rounded-lg border border-[#DCE8F8] px-4 py-3 outline-none transition focus:border-[#5279B8]'/>
            </div>

            <div className='mb-6'>
              <label className='mb-2 block text-sm font-medium text-[#24354D]'>
                Message
              </label>
              <textarea
                rows='4'
                placeholder='Write your message...'
                required
                className='w-full resize-none rounded-lg border border-[#DCE8F8] px-4 py-3 outline-none transition focus:border-[#5279B8]'
              ></textarea>
            </div>

            <button
              type='submit'
              className='w-full rounded-lg bg-[#5279B8] py-3 font-medium text-white transition hover:bg-[#3F659F]' >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}

export default Contact