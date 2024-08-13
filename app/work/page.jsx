"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "LMS",
    title: "Dufuna",
    description:
      "Dufuna Learning is an online platform that equips aspiring software developers with the skills and experience needed to succeed in the tech industry. With a structured curriculum and hands-on projects, Dufuna Learning helps you become a job-ready developer",
    stack: [{ name: "Vue.js" }, { name: "Laravel" }, { name: "MySQL" }, { name: "Bootstrap" }],
    image: "/dufuna-src.png",
    live: "https://learning.dufuna.com/",
    hasGithub: false,
    github: "https://learning.dufuna.com/",
  },
  {
    num: "02",
    category: "service",
    title: "Property Service",
    description:
      "Property Service API provides a comprehensive suite of endpoints for managing real estate data. It enables users to perform operations such as property listing, searching, and management with ease. The API is designed for developers who need to integrate real estate functionalities into their applications, offering robust and flexible solutions for property-related services",
    stack: [{ name: "Ruby" }, { name: "Swagger" }],
    image: "/property-src.png",
    live: "https://property-service.onrender.com/api-docs/index.html",
    github: "https://github.com/TundeOladejo/property-service/tree/main",
  },
  {
    num: "03",
    category: "CMS",
    title: "Clucknest",
    description:
      "CluckNest is a vibrant platform designed for poultry farmers to manage their farms more efficiently. It provides tools for tracking flock health, managing feed schedules, and optimizing production. Whether you're running a small backyard operation or a large commercial farm, CluckNest simplifies farm management, helping you focus on growing your business",
      stack: [{ name: "Vue.js" }, { name: "NodeJs" }, { name: "MongoDB" }, { name: "Bootstrap" }],
    image: "/clucknest-src.png",
    live: "https://clucknest.onrender.com/",
    github: "https://github.com/TundeOladejo/clucknest/tree/master",
  },
  {
    num: "04",
    category: "Portfolio",
    title: "My Portfolio Website",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur omnis corporis laboriosam beatae dicta! Ipsum magnam blanditiis, explicabo rerum ducimus qui nemo ipsam voluptates placeat amet illum doloribus, provident assumenda?",
    stack: [{ name: "Next.js" }, { name: "Tailwind.css" }, { name: "Shadcn/Ui" }],
    image: "/portfolio-src.png",
    live: "",
    github: "",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex])
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2  xl:order-none">
            {/* outline num */}
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline ">
              {project.num}
            </div>
            {/* project title */}
            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
              {project.title}
            </h2>
            {/* project description */}
            <p className="text-white/60">{project.description}</p>
            {/* stack */}
            <ul className="flex gap-4">
              {project.stack.map((item, index) => {
                return (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {/* remove the last comma */}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                );
              })}
            </ul>
            {/* border */}
            <div className="border boredr-white/20"></div>
            {/* buttons */}
            <div className="flex items-center gap-4">
              {/* Live project button */}
              <Link href={project.live} target="_blank">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live Project </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
              {/* Github project button */}
              {project.hasGithub != false ? <Link href={project.github}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsGithub className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github repository </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>: null}

            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-[520px] mb-12" onSlideChange={handleSlideChange}>
              {projects.map((project, index) => {
                return <SwiperSlide key={index} className="w-full ">
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                    {/* overlay */}
                    <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image src={project.image} fill className="object-cover" alt="screenshot of projecr site"></Image>
                    </div>
                  </div>
                </SwiperSlide>
              })}
              {/* slider buttons */}
               <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)]  xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none" btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all "/>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
