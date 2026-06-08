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
    category: "Fintech",
    title: "Distributed Wallet Engine",
    description:
      "An event-driven wallet infrastructure system supporting credit, debit, and balance management operations. Built with Apache Kafka for reliable transaction processing, idempotent handling to prevent duplicate operations, and ledger-style data models for full auditability. Designed for scalability and future payment provider integrations.",
    stack: [
      { name: "Node.js" },
      { name: "Kafka" },
      { name: "PostgreSQL" },
      { name: "Next.js" },
    ],
    image: "/dufuna-src.png",
    live: "",
    hasGithub: true,
    github: "https://github.com/TundeOladejo",
  },
  {
    num: "02",
    category: "Enterprise",
    title: "Facility Management Platform",
    description:
      "A multi-module internal enterprise platform for Sterling Bank, featuring role-based access control (RBAC), normalized relational schemas, and secure departmental workflows. Built a reusable component system that reduced feature delivery time by 30% and achieved 40% reduction in page load times through performance optimization.",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Supabase" },
      { name: "Tailwind" },
    ],
    image: "/portfolio-src.png",
    live: "",
    hasGithub: false,
    github: "",
  },
  {
    num: "03",
    category: "Fintech",
    title: "Travel Loan Platform",
    description:
      "A fintech product enabling travel financing with integrated third-party flight APIs, automated PDF document generation, and end-to-end loan processing workflows. Delivered within a 2-week sprint, reducing manual loan processing time by 40% through workflow automation.",
    stack: [
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "PostgreSQL" },
      { name: "APIs" },
    ],
    image: "/portfolio-src.png",
    live: "",
    hasGithub: false,
    github: "",
  },
  {
    num: "04",
    category: "Real Estate",
    title: "Opulence Realty",
    description:
      "A real estate platform featuring property listings, advanced search functionality, lead capture, and optimized SEO for organic traffic growth. Built with modern frontend technologies and focused on performance and user experience.",
    stack: [
      { name: "Next.js" },
      { name: "React" },
      { name: "Tailwind" },
    ],
    image: "/portfolio-src.png",
    live: "https://opulencerealty.co/",
    hasGithub: false,
    github: "",
  },
  {
    num: "05",
    category: "LMS",
    title: "Dufuna Learning",
    description:
      "An online learning platform that equips aspiring software developers with skills through a structured curriculum and hands-on projects. Features course management, progress tracking, and interactive learning modules.",
    stack: [
      { name: "Vue.js" },
      { name: "Laravel" },
      { name: "MySQL" },
      { name: "Bootstrap" },
    ],
    image: "/dufuna-src.png",
    live: "https://learning.dufuna.com/",
    hasGithub: false,
    github: "",
  },
  {
    num: "06",
    category: "API",
    title: "Property Service API",
    description:
      "A RESTful API providing comprehensive endpoints for managing real estate data including property listing, searching, and management operations. Documented with Swagger for developer-friendly integration.",
    stack: [{ name: "Ruby" }, { name: "Swagger" }],
    image: "/property-src.png",
    live: "https://property-service.onrender.com/api-docs/index.html",
    hasGithub: true,
    github: "https://github.com/TundeOladejo/property-service/tree/main",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            {/* outline num */}
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
              {project.num}
            </div>
            {/* project category */}
            <span className="text-sm uppercase tracking-wider text-accent font-medium">
              {project.category}
            </span>
            {/* project title */}
            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
              {project.title}
            </h2>
            {/* project description */}
            <p className="text-white/60">{project.description}</p>
            {/* stack */}
            <ul className="flex gap-4 flex-wrap">
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
            <div className="border border-white/20"></div>
            {/* buttons */}
            <div className="flex items-center gap-4">
              {/* Live project button */}
              {project.live && (
                <Link href={project.live} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              )}
              {/* Github project button */}
              {project.hasGithub && project.github && (
                <Link href={project.github} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              )}
              {/* No links available indicator */}
              {!project.live && !project.hasGithub && (
                <span className="text-white/40 text-sm italic">
                  Private / Enterprise project
                </span>
              )}
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* Image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt={`Screenshot of ${project.title}`}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
