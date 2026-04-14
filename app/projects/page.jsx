"use client";

import React, { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "fullstack",
    title: "project 1",
    description:
      "Grievance System Web Application I developed a responsive web application for a grievance system using Next.js, Tailwind CSS, Firebase, and Express as the internship project for the company Niveus Solution, Mangalore. The project aimed to provide a seamless user experience across all devices. By optimizing the interface. Initial designs were planned using Balsamiq Wireframes, ensuring a clear and user-friendly layout.",
    stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Express" }, { name: "Firebase" }],
    image: "/assets/projects/home1.jpg",
    live: "",
    github: "https://github.com/NITHIN3387/grievance-management-system",
  },
  {
    num: "02",
    category: "fullstack",
    title: " KULKUNDA TEMPLE WEBSITE",
    description:
      "As the Frontend Lead for the Kulkunda Basaveshwara temple website project from January to March 2024, I led the development using Next.js and Tailwind CSS to create a user-friendly interface. The project significantly improved the website's user experience, leading to increased online engagement and virtual donations. I integrated Firebase for real-time data and utilized Google Cloud for scalable infrastructure, which resulted in greatly reduced load times. The successful completion of the project earned me ₹25,000.",
    stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Node.js" }],
    image: "/assets/projects/temple2.png",
    live: "",
    github: "https://github.com/isecoder/Kulkunda_frontend",
  },
  {
    num: "03",
    category: "Network",
    title: "Intrusion Detection System",
    description:
      "I deployed Kali Linux VM, Ubuntu VM, and VirtualBox to establish secure testing environments. I upgraded intrusion detection capabilities with Snort, reducing false positives by 25% and improving threat response time by 40%. Additionally, I designed and deployed an Intrusion Detection System with custom malware detection rules, which alerted users with detailed attack logs and timestamps, resulting in a 40% reduction in security incidents during the first quarter. I also created a website that allows users to upload log files for automated safety status assessment.",
    stack: [{ name: "Snort" }, { name: "Linux" }, { name: "Ubuntu" }, { name: "Virtual Box" }],
    image: "/assets/projects/ids.png",
    live: "",
    github: "https://github.com/ChandanB17/Intrusion-Detection-System/tree/main",
  },
];

const Projects = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slide index
    setProject(projects[currentIndex]);
  };

  return (
    <motion.div
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* project category */}
              <h2 className="text-[42px] font-bold leading-none transition-all duration-500 capitalize">
                {project.category} project
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
              <div className="border border-white/20"></div>
              {/* buttons */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                {/* <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link> */}
                {/* github button */}
                <Link href={project.github}>
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
              </div>
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
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
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
    </motion.div>
  );
};

export default Projects;
