import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  LuHandshake,
  LuRocket,
  LuShieldCheck,
  LuSmartphone,
  LuSparkles,
} from "react-icons/lu";

const AboutUs = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionsRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
      }
    );
  }, []);

  // 🔥 ONLY ICON (no text)
  const IconShell = ({ Icon }) => (
    <div className="flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/60 p-10 
    shadow-[0_16px_45px_rgba(2,6,23,0.45)] transition duration-500 hover:scale-105 hover:border-indigo-500">
      
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-indigo-500/30 
      bg-slate-950 text-indigo-400 transition duration-500 hover:rotate-6">
        <Icon size={44} />
      </div>
    </div>
  );

  return (
    <div className="bg-slate-950 text-slate-300 min-h-screen px-6 md:px-16 pb-24 pt-12 space-y-28">

      {/* HERO */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="max-w-6xl mx-auto text-center space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          About <span className="text-indigo-500">MarketX</span>
        </h1>

        <p className="text-lg text-slate-400">
          MarketX is a modern marketplace for fast and easy local buying & selling.
        </p>

        <img
          src="/about.jpg"
          className="w-full max-h-[420px] object-cover rounded-3xl border border-slate-800 shadow-xl 
          hover:scale-105 transition duration-500"
        />
      </section>

      {/* PURPOSE */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">Our Purpose</h2>
          <p className="text-slate-400">
            We simplify local buying and selling to make it faster, easier, and more reliable.
          </p>
        </div>

        {/* ICON */}
        <IconShell Icon={LuSparkles} />
      </section>

      {/* SAFETY */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* ICON */}
        <IconShell Icon={LuShieldCheck} />

        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Safe Local Connections
          </h2>
          <p className="text-slate-400">
            Verified listings and secure communication ensure safe transactions.
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">Built on Trust</h2>
          <p className="text-slate-400">
            Transparency and honesty make every deal reliable and trustworthy.
          </p>
        </div>

        {/* ICON */}
        <IconShell Icon={LuHandshake} />
      </section>

      {/* SIMPLICITY */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* ICON */}
        <IconShell Icon={LuSmartphone} />

        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Simple by Design
          </h2>
          <p className="text-slate-400">
            Clean UI and easy navigation make the platform user-friendly.
          </p>
        </div>
      </section>

      {/* SPEED */}
      <section
        ref={(el) => (sectionsRef.current[5] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* TEXT */}
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Fast & Efficient
          </h2>
          <p className="text-slate-400">
            Discover products quickly and connect instantly with sellers.
          </p>
        </div>

        {/* ICON */}
        <IconShell Icon={LuRocket} />
      </section>

    </div>
  );
};

export default AboutUs;