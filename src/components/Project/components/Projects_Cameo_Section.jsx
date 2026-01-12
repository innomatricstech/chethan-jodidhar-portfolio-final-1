import React from "react";
import cameo from "../../../assets/Projects/ChethanJodidharProjects/chethanjodidharprojects.webp";

const Projects_Cameo_Section = () => {
  return (
    <section className="py-12 md:py-24 bg-[#faf5fa] px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Image Column */}
          <div className="flex justify-center md:justify-start items-center md:w-1/2">
            <img
              className="w-full max-w-[550px] rounded-2xl shadow-2xl"
              src={cameo}
              alt="chethan_jodidhar_portfolio"
            />
          </div>

          {/* Content Column */}
          <div className="flex flex-col items-center lg:items-start gap-4 md:gap-5 justify-center md:w-1/2">
            <h1 className="font-bold uppercase text-xl md:text-2xl text-center">
              Personal Cameos and Appearances
            </h1>
            <div className="bg-[#eb2beb] h-[2px] w-16 md:w-20"></div>
            <p className="text-center lg:text-justify leading-6 md:leading-7 ">
              A filmmaker with a deep appreciation for cinematic tradition,
              Chethan often makes cameo appearances in his films as a nod to
              legendary filmmakers like Alfred Hitchcock. These brief
              appearances add an extra layer of intrigue for his audience and
              give them an additional connection to his work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects_Cameo_Section;
