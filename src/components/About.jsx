import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm md:text-[10px]">
          Welcome to Solo Leveling
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> h<b>a</b>rdest <b>Du</b>ngeons"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Dungeon opens—your destiny, now an epic adventure</p>
          <p className="text-gray-500">
            Solo Leveling unites every hunter from countless dungeons and gates, both
            awakened and ordinary, into a unified Hunter Society
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
