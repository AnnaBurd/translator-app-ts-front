import OAuth from "../components/OAuth";

export default function Signup() {
  return (
    <section
      style={{ overflow: "hidden", backgroundColor: "var(--color-secondary)" }}
    >
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside
          className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <img
            alt="Pattern"
            src="/hero.svg"
            className="absolute inset-0 h-full w-full object-cover object-left"
            style={{
              width: "125%",
              maxWidth: "170%",
              height: "112%",
              marginLeft: "-22%",
              marginTop: "-13%",
            }}
          />
        </aside>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
              Welcome to Translator App ✍🏻
            </h1>
            <p className="mt-4 leading-relaxed text-slate-500">
              We fine-tuned AI model with field-related terminology and included
              advanced editing features to ease your translation workflow.
            </p>
            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-sm"
                />
              </div>

              <div
                className="col-span-6 sm:col-span-3"
                style={{ zIndex: "10" }}
              >
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-slate-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-sm"
                />
              </div>

              <div className="col-span-6" style={{ zIndex: "10" }}>
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 h-10 w-full rounded-md border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-slate-500">
                  By creating an account, you agree to our&nbsp;
                  <a href="#" className="text-slate-700 underline">
                    terms and conditions
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-indigo-400 bg-indigo-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-indigo-400 focus:outline-none focus:ring active:text-indigo-300">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-slate-500 sm:mt-0">
                  Already have an account?&nbsp;
                  <a href="#" className="text-slate-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
            <OAuth></OAuth>
          </div>
        </main>
      </div>
    </section>
  );
}
