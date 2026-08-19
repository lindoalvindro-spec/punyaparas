import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Heart, Star } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const flowerRef = useRef(null);
  const outerRingRef = useRef(null);
  const progressBarRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Generate background neon particles
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 95}%`,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.7 + 0.3,
  }));

  useGSAP(() => {
    // 1. Continuous rotation of central neon flower
    gsap.to(flowerRef.current, {
      rotation: 360,
      duration: 8,
      ease: 'none',
      repeat: -1,
    });

    // 2. Counter rotation of outer ring
    gsap.to(outerRingRef.current, {
      rotation: -360,
      duration: 12,
      ease: 'none',
      repeat: -1,
    });

    // 3. Smooth progress bar & counter fill up to 100%
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 3.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        const val = Math.floor(progressObj.value);
        setProgress(val);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${val}%`;
        }
      },
      onComplete: () => {
        setIsFinished(true);
      },
    });
  }, { scope: containerRef });

  // GSAP Pop-Up Entrance Animation — runs AFTER React renders the button
  useEffect(() => {
    if (!isFinished) return;

    // Wait one frame so the button DOM element exists
    requestAnimationFrame(() => {
      const popTl = gsap.timeline({ defaults: { ease: 'back.out(1.7)' } });

      // 1. Flash the flower with a bright burst
      popTl.to(flowerRef.current, {
        scale: 1.4,
        filter: 'drop-shadow(0 0 30px #ff2a8d) drop-shadow(0 0 50px #ffd700)',
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(flowerRef.current, {
        scale: 1,
        filter: 'drop-shadow(0 0 12px #ff2a8d) drop-shadow(0 0 25px #e0115f)',
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })

      // 2. Pop-in title text from below with blur
      .fromTo(textRef.current,
        { opacity: 0, y: 40, scale: 0.7, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.6 },
        '-=0.3'
      )

      // 3. Pop-in the button area with bounce
      .fromTo('.ready-button-area',
        { opacity: 0, y: 30, scale: 0.5 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 },
        '-=0.2'
      )

      // 4. Add a gentle breathing pulse to title after entrance
      .to(textRef.current, {
        scale: 1.03,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });
  }, [isFinished]);

  const handleStart = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9999,
        background: 'radial-gradient(circle at 50% 45%, #0a1e3f 0%, #041026 55%, #010610 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '24px 16px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Floating Background Neon Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              bottom: '-20px',
              fontSize: `${p.size}px`,
              color: p.id % 2 === 0 ? 'var(--neon-pink)' : 'var(--neon-pink-light)',
              opacity: p.opacity,
              filter: 'drop-shadow(0 0 6px var(--neon-pink))',
              animation: `floatUp ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.id % 3 === 0 ? '💙' : p.id % 3 === 1 ? '✨' : '🔹'}
          </div>
        ))}
      </div>

      {/* Main Center Loading Element - Scaled for Mobile */}
      <div
        style={{
          position: 'relative',
          width: '180px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
        }}
      >
        {/* Glowing Ambient Backdrop Aura */}
        <div
          style={{
            position: 'absolute',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,210,255,0.55) 0%, rgba(0,102,255,0) 70%)',
            filter: 'blur(16px)',
            animation: 'pulseGlow 2.5s infinite ease-in-out',
          }}
        />

        {/* Outer Counter-Rotating Ornament Ring */}
        <div
          ref={outerRingRef}
          style={{
            position: 'absolute',
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            border: '2px dashed rgba(96, 165, 250, 0.45)',
            boxShadow: '0 0 16px rgba(0, 210, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Orbiting Sparkles */}
          {[0, 90, 180, 270].map((deg, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                transform: `rotate(${deg}deg) translate(85px) rotate(-${deg}deg)`,
              }}
            >
              <Sparkles size={14} color="var(--neon-pink-light)" style={{ filter: 'drop-shadow(0 0 6px #00d2ff)' }} />
            </div>
          ))}
        </div>

        {/* Central Rotating Flower SVG */}
        <div
          ref={flowerRef}
          style={{
            width: '115px',
            height: '115px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 0 12px #00d2ff) drop-shadow(0 0 25px #0066ff)',
          }}
        >
          <svg viewBox="0 0 200 200" width="100%" height="100%">
            <defs>
              <linearGradient id="neonPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#00d2ff" />
                <stop offset="100%" stopColor="#0052cc" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 12 Symmetrical Petals */}
            {Array.from({ length: 12 }).map((_, idx) => {
              const rotateDeg = idx * 30;
              return (
                <path
                  key={idx}
                  d="M 100 100 C 75 40, 75 15, 100 10 C 125 15, 125 40, 100 100 Z"
                  fill="url(#neonPetalGrad)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  opacity="0.95"
                  transform={`rotate(${rotateDeg} 100 100)`}
                  filter="url(#neonGlow)"
                />
              );
            })}

            {/* Center Stamen */}
            <circle cx="100" cy="100" r="22" fill="#ffffff" filter="drop-shadow(0 0 8px #00d2ff)" />
            <circle cx="100" cy="100" r="16" fill="#00d2ff" />
            <circle cx="100" cy="100" r="7" fill="#38bdf8" />
          </svg>
        </div>

        {/* Center Percentage Display */}
        <div
          style={{
            position: 'absolute',
            fontSize: '1.05rem',
            fontWeight: '700',
            fontFamily: 'var(--font-body)',
            color: '#fff',
            textShadow: '0 0 8px #00d2ff, 0 0 16px #0066ff',
            pointerEvents: 'none',
          }}
        >
          {progress}%
        </div>
      </div>

      {/* Loading Status Text - Responsive for Android Screens */}
      <div
        ref={textRef}
        style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <h2
          className="neon-text"
          style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            fontFamily: 'var(--font-display)',
            lineHeight: '1.3',
          }}
        >
          {isFinished ? 'Siap Untuk Sesuatu yang Spesial' : 'Menyiapkan sesuatu yang spesial untukmu...'}
        </h2>

        <p
          className="neon-text-subtle"
          style={{
            fontSize: '0.85rem',
            opacity: 0.85,
            letterSpacing: '0.3px',
            marginBottom: '20px',
          }}
        >
          {isFinished ? 'Klik tombol di bawah untuk mulai ✨' : 'Dibuat dengan cinta & kenangan indah 💙'}
        </p>

        {/* Neon Progress Bar Line */}
        <div
          style={{
            width: '220px',
            height: '5px',
            background: 'rgba(96, 165, 250, 0.15)',
            borderRadius: '10px',
            overflow: 'hidden',
            margin: '0 auto 24px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.2)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              width: '0%',
              height: '100%',
              background: 'linear-gradient(90deg, #00d2ff, #38bdf8, #0066ff)',
              borderRadius: '10px',
              boxShadow: '0 0 10px #00d2ff, 0 0 16px #38bdf8',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* Enter Button decorated with Sparkles & Glow */}
        {isFinished && (
          <div className="ready-button-area" style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '240px', opacity: 0 }}>
            {/* Outer Animated Sparkles floating around button */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '-10px',
                animation: 'pulseGlow 1.8s infinite ease-in-out',
                pointerEvents: 'none',
              }}
            >
              <Sparkles size={20} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #38bdf8)' }} />
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-8px',
                animation: 'pulseGlow 2.2s infinite ease-in-out',
                animationDelay: '0.4s',
                pointerEvents: 'none',
              }}
            >
              <Sparkles size={18} color="#60a5fa" style={{ filter: 'drop-shadow(0 0 8px #00d2ff)' }} />
            </div>

            <div
              style={{
                position: 'absolute',
                top: '-8px',
                right: '25px',
                animation: 'pulseGlow 1.5s infinite ease-in-out',
                animationDelay: '0.8s',
                pointerEvents: 'none',
              }}
            >
              <Star size={14} color="#ffffff" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 6px #ffffff)' }} />
            </div>

            {/* Sparkle Button */}
            <button
              ref={buttonRef}
              onClick={handleStart}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 40%, #0066ff 80%, #00d2ff 100%)',
                backgroundSize: '250% 100%',
                color: '#fff',
                border: '1.5px solid rgba(255, 255, 255, 0.7)',
                padding: '13px 28px',
                borderRadius: '30px',
                fontSize: '0.98rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.4)',
                animation: 'shimmer 4s infinite linear',
                transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), boxShadow 0.25s ease',
                width: '100%',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.06)';
                e.currentTarget.style.boxShadow = '0 0 35px var(--neon-pink-light), 0 0 60px var(--neon-pink), inset 0 0 20px #fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.4)';
              }}
            >
              {/* Shimmer Light Reflection Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  transform: 'skewX(-20deg)',
                  animation: 'shimmer 2.5s infinite ease-in-out',
                }}
              />

              <Sparkles size={16} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 4px #38bdf8)' }} />
              <span style={{ textShadow: '0 0 8px rgba(0,0,0,0.5)', letterSpacing: '0.5px' }}>Buka Kejutan</span>
              <Heart size={16} fill="#fff" style={{ filter: 'drop-shadow(0 0 6px #fff)' }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
