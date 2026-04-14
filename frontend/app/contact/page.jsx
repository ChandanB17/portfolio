"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

// components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/services/contactService";
import { toast } from "sonner";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+91 7337890720",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "chandanb200317@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "O9/8, VV Nagar, Torangallu, Bellary, Karnataka",
  },
];

const Contact = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = (data) => {
    let newErrors = {};

    // Firstname (required)
    if (!data.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    // Email validation
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }

    // Message (5–200 words)
    const charCount = data.message.trim().length;

    if (!data.message.trim()) {
      newErrors.message = "Message is required";
    } else if (charCount < 5) {
      newErrors.message = "Minimum 5 letters required";
    } else if (charCount > 200) {
      newErrors.message = "Maximum 200 letters allowed";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updatedData);

    const validationErrors = validate(updatedData);
    setErrors(validationErrors);

    setIsValid(Object.keys(validationErrors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix errors before submitting ❌");
      return;
    }

    try {
      await sendContactMessage(formData);

      toast.success("Message sent successfully 🚀");

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });

      setErrors({});
      setIsValid(false);

    } catch (error) {
      toast.error("Failed to send message ❌");
    }
  };

  return (
    <motion.div
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-10 bg-secondary rounded-xl"
            >
              <h3 className="text-4xl text-accent">Let's connect!</h3>
              <p className="text-white/60">
                Reach out to discuss opportunities, projects, or simply to start
                a conversation. Fill out the form below to get in touch.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <Input
                  name="firstname"
                  placeholder="Firstname"
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstname}
                  </p>
                )}
              </div>

                <Input
                  name="lastname"
                  placeholder="Lastname"
                  onChange={handleChange}
                />

                <div>
                  <Input
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <Input
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                />
              </div>
              {/* textarea */}
             <div>
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here."
                onChange={handleChange}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>
              {/* btn */}
              <Button
                size="md"
                className="max-w-40"
                disabled={!isValid}
              >
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
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-secondary text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-lg xl:text-xl">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
