import { gsap } from "gsap";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

export const VideoPreview = ({ children }) => {
  const root = useRef(null); 
  const glare = useRef(null); 

  const quickTo = useRef({
    x: null,
    y: null,
    rotateX: null,
    rotateY: null,
  });

  
  useLayoutEffect(() => {
    quickTo.current.x = gsap.quickTo(root.current, "x", { duration: 0.6, ease: "power3" });
    quickTo.current.y = gsap.quickTo(root.current, "y", { duration: 0.6, ease: "power3" });
    quickTo.current.rotateX = gsap.quickTo(root.current, "rotationX", { duration: 0.6, ease: "power3" });
    quickTo.current.rotateY = gsap.quickTo(root.current, "rotationY", { duration: 0.6, ease: "power3" });

    return () => {
        gsap.killTweensOf(root.current);
    };
  }, []);


  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    // Calculate mouse position as a value between -1 and 1
    const xPercent = (x / width - 0.5) * 2;
    const yPercent = (y / height - 0.5) * 2;
    
    // --- Core Animation ---
    // These values control the intensity of the effect. Zentry's is subtle.
    const ROTATION_STRENGTH = 10; // degrees
    const TRANSLATION_STRENGTH = 12; // pixels

    // Update animations using the highly-optimized quickTo functions
    quickTo.current.x(xPercent * TRANSLATION_STRENGTH);
    quickTo.current.y(yPercent * TRANSLATION_STRENGTH);
    quickTo.current.rotateX(-yPercent * ROTATION_STRENGTH);
    quickTo.current.rotateY(xPercent * ROTATION_STRENGTH);

    // --- Glare Effect ---
    // We update the glare position using GSAP for smoothness
    gsap.to(glare.current, {
        x: clientX - left,
        y: clientY - top,
        duration: 0.2, // Quick duration for the glare to follow closely
        ease: "power2.out",
    });
  };
  
  const handleMouseEnter = () => {
    gsap.to(root.current, { scale: 1.05, duration: 0.5, ease: "power3.out" });
    gsap.to(glare.current, { opacity: 1, duration: 0.4, ease: "power3.out" });
  };
  
  const handleMouseLeave = () => {
    gsap.to(root.current, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.75)",
    });
    gsap.to(glare.current, { opacity: 0, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={root}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative size-full rounded-lg will-change-transform flex items-center justify-center" // Added flex centering
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="size-full overflow-hidden rounded-lg flex items-center justify-center">
          {children}
        </div>

        {/* The Glare Element */}
        <div
          ref={glare}
          className="pointer-events-none absolute left-0 top-0 size-[250px] rounded-full opacity-0"
          style={{
            transform: "translate(-50%, -50%)", // Center the gradient on the cursor
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%)",
          }}
        />
      </div>
    </div>
  );
};

export default VideoPreview;