"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+2348102992169",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "babatundeoladejo16@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "No 40, Lane D, Jeje Area, Apete, Ibadan",
  },
];

import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((error) => {
        console.log("FAILED...", error);
      });

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  console.log(formData);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px] ">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
              action=""
            >
              <h3 className="text-4xl text-accent">Let us work together</h3>
              <p className="text-white/60">
                Ready to bring your ideas to life? With my expertise in software
                engineering, I create scalable, efficient solutions tailored to
                your needs. Let’s collaborate and turn your vision into reality.
                Reach out today!
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <Input
                  name="firstname"
                  type="firstname"
                  placeholder="Firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <Input
                  name="lastname"
                  type="lastname"
                  placeholder="Lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  name="phone"
                  type="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {/* select */}
              <Select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="web-development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* text-area */}
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleChange}
              />
              {/* btn */}
              <Button size="md" className="max-w-40">
                Send message
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
