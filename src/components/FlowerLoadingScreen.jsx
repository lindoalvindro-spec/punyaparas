import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* ─── Flower asset paths ─── */
const FLOWER_IMAGES = [
  '/bunga 1 no bg.png',
  '/bunga 2 no bg.png',
  '/bunga 3 no bg.png',
];

/* ─── Generate flower data for the tapestry ─── */
function generateFlowerLayout() {
  const flowers = [];
  const count = 36;

  for (let i = 0; i < count; i++) {
    const col = i % 6;
    const row = Math.floor(i / 6);
    /* Offset every other row for organic feel */
    const xOffset = row % 2 === 0 ? 0 : 8;

    flowers.push({
      id: i,
      src: FLOWER_IMAGES[i % FLOWER_IMAGES.length],
      /* Grid-based positioning with slight randomness */
      left: `${col * 16.6 + xOffset + (Math.random() * 4 - 2)}%`,
      top: `${row * 16.6 + (Math.random() * 4 - 2)}%`,
      size: 100 + Math.random() * 70, // 100px – 170px
      rotation: Math.random() * 80 - 40, // -40° to 40°
      delay: i * 0.04, // stagger entrance
    });
  }
  return flowers;
}

const FLOWERS = generateFlowerLayout();

export default function FlowerLoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const flowersRef = useRef([]);
  const progressRef = useRef(null);
  const badgeRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Bloom-in entrance: flowers scale from 0 ── */
      gsap.fromTo(
        flowersRef.current,
        { scale: 0, opacity: 0, rotation: (i) => FLOWERS[i]?.rotation - 30 || 0 },
        {
          scale: 1,
          opacity: 1,
          rotation: (i) => FLOWERS[i]?.rotation || 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
          stagger: {
            each: 0.04,
            from: 'center',
          },
        }
      );

      /* ── 2. Idle breathing float for all flowers ── */
      flowersRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: `+=${6 + Math.random() * 6}`,
          rotation: `+=${3 + Math.random() * 4}`,
          duration: 2 + Math.random() * 1.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.06,
        });
      });

      /* ── 3. Badge entrance ── */
      gsap.fromTo(
        badgeRef.current,
        { scale: 0.6, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)', delay: 0.6 }
      );

      /* ── 4. Progress bar fill ── */
      const progressTween = { val: 0 };
      gsap.to(progressTween, {
        val: 100,
        duration: 3.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          const v = Math.round(progressTween.val);
          setProgress(v);
          if (progressRef.current) {
            progressRef.current.style.width = `${v}%`;
          }
        },
        onComplete: () => {
          /* ── 5. Exit animation: zoom-out & fade ── */
          gsap.to(containerRef.current, {
            scale: 1.15,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => onComplete?.(),
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #0a1e3f 0%, #030c1b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Ambient glow circles ── */}
      <div
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,102,255,0.10) 0%, transparent 70%)',
          bottom: '5%',
          right: '-5%',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Dense Flower Tapestry ── */}
      {FLOWERS.map((f, i) => (
        <img
          key={f.id}
          ref={(el) => (flowersRef.current[i] = el)}
          src={f.src}
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            left: f.left,
            top: f.top,
            width: `${f.size}px`,
            height: `${f.size}px`,
            objectFit: 'contain',
            transform: `rotate(${f.rotation}deg) scale(0)`,
            opacity: 0,
            filter: 'drop-shadow(0 0 12px rgba(0,210,255,0.35))',
            pointerEvents: 'none',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      {/* ── Soft petal particles ── */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            width: 4 + Math.random() * 6,
            height: 4 + Math.random() * 6,
            borderRadius: '50%',
            background: `rgba(${56 + Math.random() * 100}, ${189 + Math.random() * 60}, 248, ${0.3 + Math.random() * 0.4})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatParticle ${3 + Math.random() * 3}s ease-in-out infinite alternate`,
            animationDelay: `${Math.random() * 2}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Center Glassmorphic Progress Badge ── */}
      <div
        ref={badgeRef}
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'rgba(10, 30, 63, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,210,255,0.3)',
          borderRadius: '24px',
          padding: '28px 36px',
          textAlign: 'center',
          boxShadow: '0 0 40px rgba(0,210,255,0.15), inset 0 0 30px rgba(0,210,255,0.05)',
          minWidth: '260px',
          maxWidth: '320px',
        }}
      >
        {/* Emoji line */}
        <div style={{ fontSize: '28px', marginBottom: '10px', letterSpacing: '4px' }}>
          🌸✨💙✨🌸
        </div>

        {/* Title text */}
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '15px',
            fontWeight: 600,
            color: '#c8e6ff',
            margin: '0 0 4px 0',
            letterSpacing: '0.5px',
          }}
        >
          Tunggu sebentar ya...
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'rgba(125,211,252,0.7)',
            margin: '0 0 18px 0',
            fontStyle: 'italic',
          }}
        >
          Bunga-bunga sedang bermekaran untukmu 🌷
        </p>

        {/* Progress bar container */}
        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: 'rgba(0,210,255,0.12)',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: '0%',
              height: '100%',
              borderRadius: '3px',
              background: 'linear-gradient(90deg, #38bdf8, #00d2ff, #0066ff)',
              boxShadow: '0 0 12px rgba(0,210,255,0.5)',
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Percentage number */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #7dd3fc, #00d2ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
          }}
        >
          {progress}%
        </span>
      </div>

      {/* Inline keyframe for floating particles */}
      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-20px) translateX(10px) scale(1.3); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
