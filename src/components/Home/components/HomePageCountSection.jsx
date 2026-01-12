import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CountBox = ({ end, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="text-center">
      <h3 className="text-4xl font-bold text-purple-600">
        {inView ? <CountUp end={end} duration={2} /> : 0}+
      </h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
};

const HomePageCountSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <CountBox end={120} label="Projects" />
        <CountBox end={50} label="Films" />
        <CountBox end={15} label="Awards" />
        <CountBox end={10} label="Years Experience" />
      </div>
    </section>
  );
};

export default HomePageCountSection;
