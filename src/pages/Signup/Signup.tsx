import Form from "./Form";
import Image from "./Image";

export default function Signup() {
  return (
    <section className="overflow-hidden bg-[--color-secondary]">
      <div className=" min-h-screen min-[500px]:grid min-[500px]:grid-cols-1 min-[500px]:grid-rows-[20vh_minmax(70vh,_1fr)] md:grid-rows-[30vh_minmax(70vh,_1fr)] lg:h-screen xl:grid-cols-12 xl:grid-rows-1">
        <Image />
        <Form></Form>
      </div>
    </section>
  );
}
