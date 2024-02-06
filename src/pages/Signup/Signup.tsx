import { useState } from "react";
import AnimatedPage from "../../components/animations/AnimatedPage";
import Form from "./Form";
import Image from "./Image";
import Loader from "../../components/Loaders/Loader";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(true);

  // console.log("render");

  return (
    <>
      {isLoading && <Loader />}

      <AnimatedPage>
        <section
          className={`overflow-hidden bg-[--color-secondary] ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          <div className=" min-h-screen min-[500px]:grid min-[500px]:grid-cols-1 min-[500px]:grid-rows-[20vh_minmax(70vh,_1fr)] md:grid-rows-[30vh_minmax(70vh,_1fr)] xl:h-screen xl:grid-cols-12 xl:grid-rows-1">
            <Image
              onLoad={() => {
                // console.log("onload");
                setIsLoading(false);
              }}
            />
            <Form></Form>
          </div>
        </section>
      </AnimatedPage>
    </>
  );
}
