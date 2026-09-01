"use client";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdEmail, MdPerson, MdSubject, MdChat } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";;

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formData,
        "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12 bg-black">
      <h2 className="text-4xl md:text-5xl font-playfair text-white mb-16 text-center">
        GET IN TOUCH
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <MdEmail className="text-accent-cyan text-2xl" />
            <a href="mailto:Ahmadobalubaid@gmail.com" className="font-space text-gray-300 hover:text-accent-cyan">
               Ahmadobalubaid@gmail.com
             </a>
          </div>
          <div className="flex items-center gap-4">
            <FaLinkedin className="text-accent-cyan text-2xl" />
<a href="https://linkedin.com/in/ahmad-balubaid/" target="_blank" rel="noopener noreferrer" className="font-space text-gray-300 hover:text-accent-cyan">
               linkedin.com/in/ahmad-balubaid/
             </a>
          </div>
          <div className="flex items-center gap-4">
            <SiGithub className="text-accent-cyan text-2xl" />
<a href="https://github.com/AhmadBalu" target="_blank" rel="noopener noreferrer" className="font-space text-gray-300 hover:text-accent-cyan">
               github.com/AhmadBalu
             </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border-b border-gray-700 text-white font-space text-sm focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border-b border-gray-700 text-white font-space text-sm focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
          </div>

          <div className="relative">
            <MdSubject className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border-b border-gray-700 text-white font-space text-sm focus:outline-none focus:border-accent-cyan transition-colors"
            />
          </div>

          <div className="relative">
            <MdChat className="absolute left-3 top-3 text-gray-500" />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border-b border-gray-700 text-white font-space text-sm focus:outline-none focus:border-accent-cyan transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-accent-cyan text-black font-space text-xs uppercase tracking-wider hover:bg-accent-gold transition-colors"
          >
            Send Message
          </button>

          {status === "success" && (
            <div className="text-accent-cyan font-space text-sm">Message sent successfully!</div>
          )}
          {status === "error" && (
            <div className="text-red-400 font-space text-sm">Failed to send message. Try again.</div>
          )}
        </form>
      </div>
    </section>
  );
}




