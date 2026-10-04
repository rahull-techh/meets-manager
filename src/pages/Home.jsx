import { Link } from "react-router-dom";
import Features from "../components/Features";
import About from "../components/About";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F5F8FC] text-[#24354D]">
      //navbar still in progress

      
      <section className="grid items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-16 md:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#E3ECFA] px-4 py-2 text-sm font-medium text-[#5279B8]">
            <span className="h-2 w-2 rounded-full bg-[#5279B8]"></span>
            The future of teamwork
          </div>

          <h1 className="max-w-xl text-4xl leading-tight font-bold tracking-tight md:text-6xl">
            Your team's
            <span className="text-[#5279B8]"> world, </span>
            all in one place.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-[#66768C] md:text-lg">
            A virtual workspace designed to bring your team closer.
            Collaborate, communicate and get things done, wherever you are.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/register" element='registration'
              className="rounded-xl bg-[#5279B8] px-7 py-3.5 font-medium text-white shadow-md shadow-blue-200 transition hover:bg-[#3F659F]"
            >
              Create Your Workspace
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-[#D5DFEC] bg-white px-7 py-3.5 font-medium transition hover:bg-[#EAF1FB]"
            >
              Explore Features
            </a>
          </div>

          <p className="mt-6 text-sm text-[#66768C]">
            One workspace. Better teamwork.
          </p>
        </div>



        
        <div className="mx-auto w-full max-w-lg rounded-3xl border border-[#E2EAF4] bg-white p-6 shadow-xl shadow-blue-100/60">
          <div className="flex items-center justify-between border-b border-[#EDF1F7] pb-5">
            <div>
              <p className="text-sm text-[#66768C]">Your workspace</p>
              <h2 className="mt-1 text-lg font-semibold">
                Creative Team
                </h2>
            </div>

            <span className="rounded-full bg-[#E5F5EC] px-3 py-1.5 text-xs font-medium text-[#39845A]">
              ● Online
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#F1F5FC] p-4">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCE8F8] text-xl">
                💬
              </div>
              <p className="text-sm text-[#66768C]">Team chat</p>
              <p className="mt-1 font-semibold">12 Messages</p>
            </div>
             <div className="rounded-2xl bg-[#F1F5FC] p-4">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCE8F8] text-xl">
                🎥
              </div>
              <p className="text-sm text-[#66768C]">Meetings</p>
              <p className="mt-1 font-semibold">Daily Standup</p>
            </div>

            <div className="col-span-2 rounded-2xl border border-[#E5ECF5] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-semibold">Team members</p>
                <p className="text-sm text-[#66768C]">4 active</p>
              </div>

              <div className="flex items-center">
                {["VA", "RK", "AS", "PM"].map((member, index) => (
                  <div
                    key={member}
                    className={`-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white first:ml-0 ${
                      [
                        "bg-[#5279B8]",
                        "bg-[#7E9BC8]",
                        "bg-[#A0B6D8]",
                        "bg-[#536B5A]",
                      ][index]
                    }`}
                  >
                    {member}
                  </div>
                ))}
                <span className="ml-3 text-sm text-[#66768C]">
                  Working together
                </span>
              </div>
            </div>
          </div>

           <div className="mt-5 rounded-2xl bg-[#5279B8] p-5 text-white">
            <p className="text-sm text-blue-100">Today's progress</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold">78%</p>
              <p className="text-sm text-blue-100">Tasks completed</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-[78%] rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <About />
      <Contact />
    </div>
  )
}

export default Home