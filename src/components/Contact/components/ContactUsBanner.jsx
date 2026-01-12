import React, { useRef } from "react";
import { FaLinkedin, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import emailjs from "@emailjs/browser";

const ContactUsBanner = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6junq1p",      // ✅ Service ID
        "template_57bye08",     // ✅ Template ID
        form.current,
        "pA0i5E39NRJLfMBZ8"     // ✅ Public Key
      )
      .then(
        () => {
          alert("✅ Message Sent Successfully!");
          e.target.reset();
        },
        (error) => {
          alert("❌ Message Failed to Send");
          console.error(error.text);
        }
      );
  };

  return (
    <section className="bg-[#faf5fa] py-24 px-5">
      {/* Title */}
      <section className="flex items-center flex-col gap-5 mb-10">
        <h1 className="text-[#48A77E] text-center font-bold text-5xl">
          Let’s Create Something Extraordinary Together!
        </h1>
        <div className="bg-[#800080] h-1 w-20"></div>
      </section>

      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Info */}
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold text-gray-800">
            Contact Information
          </h2>

          <p className="text-lg text-gray-600">
            For collaborations or inquiries, please reach out:
          </p>

          <div className="flex items-center gap-3 text-lg text-gray-700">
            <MdEmail className="text-[#48A77E] text-2xl" />

            <span> info@chethancinimas.com</span>
          </div>

          <div className="flex items-center gap-3 text-lg text-gray-700">
            <MdPhone className="text-[#48A77E] text-2xl" />
            <span>+91 8971976109</span>
          </div>

          <div className="flex gap-5 mt-5">
            <FaLinkedin className="text-[#0077b5] text-3xl" />
            <FaInstagram className="text-[#C13584] text-3xl" />
            <FaTwitter className="text-[#1DA1F2] text-3xl" />
            <FaYoutube className="text-[#FF0000] text-3xl" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-5">
            Send a Message
          </h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-5">

            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full border p-3 rounded"
              />
            </div>

            <div>
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full border p-3 rounded"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#48A77E] text-white px-6 py-3 rounded"
            >
              Send Message
            </button>

          </form>
        </div>
      </section>
    </section>
  );
};

export default ContactUsBanner;
