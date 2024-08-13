"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaVuejs,
  FaFigma,
  FaNodeJs,
  FaPhp,
  FaBitbucket,
  FaJira,
  FaJenkins,
  FaDocker
} from "react-icons/fa";

import { BiLogoPostgresql } from "react-icons/bi";

import { HiMiniAcademicCap, HiBriefcase } from "react-icons/hi2";

import { SiTailwindcss, SiNextdotjs, SiJest, SiMongodb } from "react-icons/si";

// about data
const about = {
  title: "About me",
  description:
    "Experienced software engineer building web applications. Proficient in API development, MySQL databases, and troubleshooting. Strong team player with excellent communication skills.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Babatunde Oladejo",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+2348102992169)",
    },
    {
      fieldName: "Experience",
      fieldValue: "5+ Years",
    },
    {
      fieldName: "Skype",
      fieldValue: "https://join.skype.com/invite/pa5VqaIwyNac",
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
      fieldName: "Freelance",
      fieldValue: "available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, German",
    },
  ],
};

//experience data
const experience = {
  icon: <HiBriefcase />,
  title: "My Experience",
  description:
    "Experienced software engineer building web applications. Proficient in API development, MySQL databases, and troubleshooting. Strong team player with excellent communication skills.",
  items: [
    {
      company: "Dufuna Technologies",
      position: "Software Engineer (Frontend)",
      duration: "2019 - Present",
    },
    {
      company: "Cotta & Cush Ltd.",
      position: "Software Engineer",
      duration: "2018 - 2019",
    },
  ],
};

//education data
const education = {
  icon: <HiMiniAcademicCap />,
  title: "My Education",
  description: "An overview of my academic background, including the degrees and certifications that have equipped me with a solid foundation in software engineering and related fields. This section reflects my commitment to continuous learning and staying at the forefront of industry advancements.",
  items: [
    {
      institution: "McKinsey",
      degree: "Forward Core Skills",
      duration: "2024",
    },
    {
      institution: "Udacity",
      degree: "Web Architecture",
      duration: "2023",
    },
    {
      institution: "Udacity",
      degree: "Mobile Web Specialist Nano degree",
      duration: "2023",
    },
    {
      institution: "Web Architecture",
      degree: "Udacity",
      duration: "2023",
    },
  ],
};

const skills = {
  title: "My Skills",
  description:
    "A summary of the technical and soft skills that I bring to the table. From programming languages and frameworks to problem-solving and teamwork, this section highlights the competencies that enable me to tackle challenges and deliver effective solutions.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "HTML",
    },
    {
      icon: <FaCss3 />,
      name: "CSS 3",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <FaReact />,
      name: "React",
    },
    {
      icon: <FaVuejs />,
      name: "VueJs",
    },
    {
      icon: <FaFigma />,
      name: "Figma",
    },
    {
      icon: <FaNodeJs />,
      name: "Node",
    },
    {
      icon: <FaPhp />,
      name: "PHP",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind",
    },
    {
      icon: <SiNextdotjs />,
      name: "NextJs",
    },
    {
      icon: <FaBitbucket />,
      name: "Bitbucket"
    },
    {
      icon: <FaJira />,
      name: "Jira"
    },
    {
      icon: <FaJenkins />,
      name: "Jenkins"
    },
    {
      icon: <SiJest />,
      name: "Jest"
    },
    {
      icon: <FaDocker />,
      name: "Docker"
    },
    {
      icon: <BiLogoPostgresql />,
      name: "Postgresql"
    },
    {
      icon: <SiMongodb />,
      name: "MongoDb"
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
import { animate, motion } from "framer-motion";

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
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
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
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left ">
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
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left ">
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

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {skills.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px]">
                    {skills.skillList.map((skill, index) => {
                      return (
                        <li key={index}>
                          <TooltipProvider>
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
                          className="flex items-center justify-center xl:justify-start gap-4 "
                        >
                          <span className="text-white/60">
                            {item.fieldName}
                          </span>
                          <span className="text-xl ">{item.fieldValue}</span>
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
