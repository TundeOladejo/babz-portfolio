"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "I build responsive, high-performance web applications tailored to your needs. From front-end interfaces to robust back-end systems, I ensure your site is scalable, secure, and easy to maintain.",
    href: "#",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description: "I craft intuitive and visually appealing user experiences that align with your brand’s identity. By focusing on usability and design principles, I create interfaces that engage and delight your users.",
    href: "#",
  },
  {
    num: "03",
    title: "DevOps",
    description: "I streamline your development processes with efficient CI/CD pipelines, automated testing, and cloud deployment strategies. My goal is to improve collaboration, reduce downtime, and accelerate your delivery timelines.",
    href: "#",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2.4,
              duration: 0.4,
              ease: "easeIn",
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div key={index} className="flex flex-1 flex-col justify-center gap-6 group">
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</div>
                  <Link className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45" href={service.href}>
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* heading */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{service.title}</h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full">

                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
