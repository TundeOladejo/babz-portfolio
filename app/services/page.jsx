"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Fintech & Payment Systems",
    description:
      "I design and build financial platforms, wallet systems, and payment workflows with transactional integrity. Event-driven architectures using Kafka, idempotent processing, and ledger-style data models for auditability and reliability.",
    href: "/contact",
  },
  {
    num: "02",
    title: "Full Stack Development",
    description:
      "End-to-end web application development from database design to production deployment. React/Next.js frontends, Node.js/Laravel backends, PostgreSQL databases, and modern API design. Focused on performance and maintainability.",
    href: "/contact",
  },
  {
    num: "03",
    title: "System Architecture & Design",
    description:
      "Scalable system design for complex business requirements. Microservices, event-driven patterns, RBAC, multi-tenant architectures, and API integrations. I turn business logic into reliable, well-documented engineering systems.",
    href: "/contact",
  },
  {
    num: "04",
    title: "Technical Leadership",
    description:
      "Engineering team coordination, code reviews, mentorship, and sprint planning. I help small teams deliver faster through standardized patterns, clear technical direction, and hands-on collaboration with product and design.",
    href: "/contact",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-24">
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
              <div
                key={index}
                className="flex flex-1 flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                    href={service.href}
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* heading */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
