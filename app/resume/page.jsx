"use client";

import {
  FaJs,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaDocker,
  FaAws,
} from "react-icons/fa";

import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";

import { HiMiniAcademicCap, HiBriefcase } from "react-icons/hi2";

import {
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiApachekafka,
  SiRedis,
  SiSupabase,
  SiLaravel,
  SiExpress,
} from "react-icons/si";

// about data
const about = {
  title: "About me",
  description:
    "Senior Software Engineer with 6+ years of experience designing and delivering fintech platforms, transaction-driven systems, and enterprise-grade applications. I specialize in building high-reliability financial workflows, event-driven architectures, and scalable backend services. I've led engineering teams, driven technical decisions across multiple products, and consistently delivered systems that reduce processing times and improve operational efficiency.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Babatunde Oladejo",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+234) 810 299 2169",
    },
    {
      fieldName: "Experience",
      fieldValue: "6+ Years",
    },
    {
      fieldName: "Location",
      fieldValue: "Nigeria (Open to Relocation)",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Nigerian",
    },
    {
      fieldName: "Email",
      fieldValue: "babatundeoladejo16@gmail.com",
    },
    {
      fieldName: "Availability",
      fieldValue: "Open to Opportunities",
    },
    {
      fieldName: "Languages",
      fieldValue: "English",
    },
  ],
};

//experience data
const experience = {
  icon: <HiBriefcase />,
  title: "My Experience",
  description:
    "Over 6 years of professional experience building fintech platforms, enterprise systems, and scalable web applications across banking, startups, and agency environments.",
  items: [
    {
      company: "Sterling Bank Ltd.",
      position: "Full Stack Engineer (Contract)",
      duration: "Sept 2024 - Present",
    },
    {
      company: "Dufuna Technologies",
      position: "Senior Software Engineer",
      duration: "Oct 2019 - Dec 2024",
    },
    {
      company: "Cotta & Cush Ltd.",
      position: "Software Engineer",
      duration: "Sept 2018 - Oct 2019",
    },
  ],
};

//education data
const education = {
  icon: <HiMiniAcademicCap />,
  title: "Education & Certifications",
  description:
    "Combining formal education with continuous professional development through industry-recognized certifications and self-directed learning.",
  items: [
    {
      institution: "Udacity",
      degree: "Mobile Web Specialist Nanodegree",
      duration: "2023",
    },
    {
      institution: "Udacity",
      degree: "Web Architecture Certification",
      duration: "2023",
    },
    {
      institution: "McKinsey & Company",
      degree: "Forward Core Skills Program",
      duration: "2024",
    },
    {
      institution: "Osun State University",
      degree: "Bachelor of Science",
      duration: "Graduated",
    },
  ],
};

const skills = {
  title: "My Skills",
  description:
    "Full-stack expertise spanning frontend frameworks, backend services, databases, event-driven systems, and cloud infrastructure. Focused on fintech, distributed systems, and performance optimization.",
  skillList: [
    {
      icon: <BiLogoTypescript />,
      name: "TypeScript",
    },
    {
      icon: <FaJs />,
      name: "JavaScript",
    },
    {
      icon: <FaReact />,
      name: "React",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <SiExpress />,
      name: "Express.js",
    },
    {
      icon: <SiLaravel />,
      name: "Laravel",
    },
    {
      icon: <FaPhp />,
      name: "PHP",
    },
    {
      icon: <BiLogoPostgresql />,
      name: "PostgreSQL",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <SiRedis />,
      name: "Redis",
    },
    {
      icon: <SiApachekafka />,
      name: "Apache Kafka",
    },
    {
      icon: <SiSupabase />,
      name: "Supabase",
    },
    {
      icon: <FaDocker />,
      name: "Docker",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind CSS",
    },
    {
      icon: <FaAws />,
      name: "AWS",
    },
  ],
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  return (
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
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {skills.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                    {skills.skillList.map((skill, index) => {
                      return (
                        <li key={index}>
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                  {skill.icon}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="capitalize">{skill.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full h-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">
                            {item.institution}
                          </span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.duration}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent value="about" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[640px] mx-auto xl:mx-0">
                    {about.info.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-center xl:justify-start gap-4"
                        >
                          <span className="text-white/60">
                            {item.fieldName}
                          </span>
                          <span className="text-xl">{item.fieldValue}</span>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
