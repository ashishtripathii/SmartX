import React, { useState } from "react";
import {
  FaLifeRing,
  FaUserCheck,
  FaAd,
  FaComments,
  FaShieldAlt,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";

const faqData = [
  {
    question: "What is SmartXchange?",
    answer:
      "SmartXchange is a local online marketplace where users can buy and sell products within their community quickly and safely.",
  },
  {
    question: "Is SmartXchange free to use?",
    answer:
      "Yes, SmartXchange is completely free for browsing and posting ads. There are no hidden charges for basic usage.",
  },
  {
    question: "How do I post an ad?",
    answer:
      "Log in to your account, click on 'Post Ad', fill in the product details, add images, and publish your listing.",
  },
  {
    question: "How can I contact a seller or buyer?",
    answer:
      "You can use SmartXchange's built-in chat system to communicate directly with buyers or sellers securely.",
  },
  {
    question: "Is SmartXchange safe?",
    answer:
      "SmartXchange promotes safe transactions by encouraging local meetups, transparent listings, and secure communication.",
  },
];

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen px-6 md:px-16 pb-24 pt-12 space-y-28">

      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <div className="flex justify-center text-indigo-500 text-6xl">
          <FaLifeRing />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          SmartXchange <span className="text-indigo-500">Help Center</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          Find answers, learn how SmartXchange works, and get tips to buy and sell
          safely in your local community.
        </p>
        <img
          src="/help.jpg"
          alt="SmartXchange help and guidance"
          className="w-full max-h-[500px] rounded-2xl  object-contain shadow-[0_16px_45px_rgba(2,6,23,0.55)]"
        />
      </section>

      {/* GETTING STARTED */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <FaUserCheck className="text-indigo-500 text-7xl mx-auto md:mx-0" />
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Getting Started
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Create an account, complete your profile, and start browsing or
            posting ads. SmartXchange is designed to be simple and beginner-friendly.
          </p>
        </div>
      </section>

      {/* POSTING ADS */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start md:flex-row-reverse">
        <FaAd className="text-indigo-500 text-7xl mx-auto md:mx-0" />
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Posting an Ad
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Use clear titles, honest descriptions, and fair pricing. Quality
            ads attract more genuine buyers and close deals faster.
          </p>
        </div>
      </section>

      {/* CHAT */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <FaComments className="text-indigo-500 text-7xl mx-auto md:mx-0" />
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Chat & Communication
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Communicate securely using SmartXchange chat. Avoid sharing personal
            information and always stay respectful.
          </p>
        </div>
      </section>

      {/* SAFETY */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start md:flex-row-reverse">
        <FaShieldAlt className="text-indigo-500 text-7xl mx-auto md:mx-0" />
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Safety Tips
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Meet in public places, inspect items before payment, and trust your
            instincts when making transactions.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <FaQuestionCircle className="text-indigo-500 text-6xl mx-auto" />
          <h2 className="text-4xl font-semibold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-6 py-5 bg-[#12121A] hover:bg-[#181824] transition"
              >
                <span className="text-left text-white font-medium">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-indigo-500 transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="px-6 py-4 text-slate-400 bg-slate-950">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Help;
