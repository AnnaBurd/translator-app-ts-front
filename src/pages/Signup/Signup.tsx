import OAuth from "../../auth/OAuth";
import Form from "./Form";

export default function Signup() {
  return (
    <section className="overflow-hidden bg-[--color-secondary]">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 bg-[--color-primary] lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
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

            <Form></Form>

            <OAuth></OAuth>
          </div>
        </main>
      </div>
    </section>
  );
}
