import { useState, useEffect } from 'react';

const PreloadAnimation = ({ children, onAnimationComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [zScale, setZScale] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textScale, setTextScale] = useState(0.8);

  useEffect(() => {
    // Start the animation after a brief delay
    const timer = setTimeout(() => {
      // First, animate the text entrance
      const textAnimationDuration = 2000; 
      const textStartTime = Date.now();
      
      const animateText = () => {
        const elapsed = Date.now() - textStartTime;
        const progress = Math.min(elapsed / textAnimationDuration, 1);
        
        // Use ease-out function for smooth text animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setTextOpacity(easeOut);
        setTextScale(0.8 + (easeOut * 0.2)); // Scale from 0.8 to 1.0
        
        if (progress < 1) {
          requestAnimationFrame(animateText);
        } else {
          // Text animation complete, start Z animation after a pause
          setTimeout(() => {
            startZAnimation();
          }, 500); // 500ms pause before Z animation
        }
      };
      
      requestAnimationFrame(animateText);
    }, 500); // Initial delay

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  const startZAnimation = () => {
    // Animate the Z scale from 0 to 1.5 (slightly larger than screen)
    const animationDuration = 2000; // 3.5 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Use ease-out function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const scale = easeOut * 1.5;
      
      setZScale(scale);
      
      // Fade out the text as the Z expands
      if (progress > 0.3) {
        const textFadeProgress = (progress - 0.3) / 0.7;
        setTextOpacity(1 - textFadeProgress);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        setTimeout(() => {
          setIsAnimating(false);
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }, 200); // Small delay before hiding
      }
    };
    
    requestAnimationFrame(animate);
  };

  if (!isAnimating) {
    return children;
  }

  // Create Z-shaped clip-path that scales from center
  const createZClipPath = (scale) => {
    const centerX = 50;
    const centerY = 50;
    const size = scale * 30; // Base size of the Z
    
    // Calculate the Z shape points based on scale
    const topLeft = `${centerX - size}% ${centerY - size}%`;
    const topRight = `${centerX + size}% ${centerY - size}%`;
    const middleLeft = `${centerX - size}% ${centerY}%`;
    const middleRight = `${centerX + size}% ${centerY}%`;
    const bottomLeft = `${centerX - size}% ${centerY + size}%`;
    const bottomRight = `${centerX + size}% ${centerY + size}%`;
    
    return `polygon(${topLeft}, ${topRight}, ${middleRight}, ${middleLeft}, ${bottomLeft}, ${bottomRight})`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* RoyZ Gamez Text */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ 
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4">
            <span className="font-zentry">Roy</span>
            <span className="font-zentry text-yellow-300">Z</span>
            <span className="font-zentry">Gamez</span>
          </h1>
        </div>
      </div>
      
      {/* Z-shaped reveal window */}
      <div 
        className="absolute inset-0 flex items-center justify-center preload-container"
        style={{
          clipPath: createZClipPath(zScale),
        }}
      >
        {/* Content container */}
        <div className="w-full h-full">
          {children}
        </div>
      </div>
      
      {/* Subtle glow effect around the Z */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none preload-background"
        style={{
          background: `radial-gradient(ellipse ${zScale * 60}% ${zScale * 40}%, transparent 0%, rgba(0,0,0,0.2) 100%)`,
        }}
      />
      
      {/* Optional: Add a subtle border effect around the Z */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          background: `radial-gradient(ellipse ${zScale * 60}% ${zScale * 40}%, transparent 0%, transparent calc(${zScale * 60}% - 2px), rgba(255,255,255,0.1) calc(${zScale * 60}% - 2px), rgba(255,255,255,0.1) ${zScale * 60}%, transparent ${zScale * 60}%)`,
        }}
      />
    </div>
  );
};

export default PreloadAnimation; 