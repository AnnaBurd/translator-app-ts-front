import Form from "./Form";
import Image from "./Image";

export default function Signup() {
  return (
    <section className="overflow-hidden bg-[--color-secondary]">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <Image />
        <Form></Form>
      </div>
    </section>
  );
}
