import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import confetti from 'canvas-confetti';
import { 
  Heart, Music, Sparkles, X, Play, Pause, SkipForward, SkipBack, 
  Calendar, MapPin, Smile, MessageCircle, Gift, Volume2, VolumeX, Cake, ChevronDown 
} from 'lucide-react';

/* ====== LETTER TYPEWRITER SUB-COMPONENT ====== */
function LetterTypewriter() {
  const letterRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  const letterLines = [
    { text: "heiii, happy brithday yaa!! 🤍", style: "greeting" },
    { text: "", style: "spacer" },
    { text: "do'a terbaik for u, maapin tida bisa merayakan langsung di depan kmu. but segenap hati aku ngucapin selamat bertambah usia semoga hal baik selalu beriringan denganmu, semoga semesta senantiasa selalu berpihak padamu, semoga jalanmu untuk mencapai masa depan yang cerah di permudahkan, teruslah melangkah & berbahagia, selamat berkelana..", style: "body" },
    { text: "", style: "spacer" },
    { text: "and last chapter, hopefully at this age you will be someone who is still good and even better, lopyu 💕", style: "ps" },
  ];

  // Trigger typewriter when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (letterRef.current) observer.observe(letterRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Typewriter engine
  useEffect(() => {
    if (!started) return;
    if (currentLine >= letterLines.length) return;

    const line = letterLines[currentLine];

    // Spacer lines — skip immediately
    if (line.style === "spacer") {
      setDisplayedLines(prev => [...prev, { text: "", style: "spacer" }]);
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 150);
      return;
    }

    if (currentChar <= line.text.length) {
      const timer = setTimeout(() => {
        const partial = line.text.slice(0, currentChar);
        
        setDisplayedLines(prev => {
          const copy = [...prev];
          // Update last non-spacer or add new
          const lastIdx = copy.length - 1;
          if (lastIdx >= 0 && copy[lastIdx].style === line.style && copy[lastIdx]._lineIdx === currentLine) {
            copy[lastIdx] = { text: partial, style: line.style, _lineIdx: currentLine };
          } else {
            copy.push({ text: partial, style: line.style, _lineIdx: currentLine });
          }
          return copy;
        });

        setCurrentChar(prev => prev + 1);
      }, 28); // typing speed

      return () => clearTimeout(timer);
    } else {
      // Line complete, move to next
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 300);
    }
  }, [started, currentLine, currentChar]);

  const isTyping = currentLine < letterLines.length;

  const getLineStyle = (style) => {
    switch (style) {
      case 'greeting':
        return { fontWeight: '600', marginBottom: '4px', fontSize: '1.08rem', color: '#38bdf8', fontFamily: 'var(--font-display)' };
      case 'ps':
        return { marginBottom: '0', fontStyle: 'italic', color: '#38bdf8', fontWeight: '500' };
      case 'spacer':
        return { height: '10px' };
      default:
        return { marginBottom: '4px' };
    }
  };

  return (
    <div
      ref={letterRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.92) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(96, 165, 250, 0.35)',
        padding: '28px 20px 24px',
        position: 'relative',
        boxShadow: '0 18px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 210, 255, 0.1)',
        marginBottom: '36px',
      }}
    >
      {/* Floating Decorative Flowers */}
      <div style={{ position: 'absolute', top: '12px', left: '16px', fontSize: '1.4rem', filter: 'drop-shadow(0 0 6px #00d2ff)' }}>💙</div>
      <div style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '1.4rem', filter: 'drop-shadow(0 0 6px #38bdf8)' }}>✨</div>
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', fontSize: '1.3rem', filter: 'drop-shadow(0 0 6px #60a5fa)' }}>🔹</div>

      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — DARI LUBUK HATIKU —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.55rem', marginBottom: '4px' }}>
          Surat Untukmu 💌
        </h3>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            background: 'rgba(0, 210, 255, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            borderRadius: '16px',
            fontSize: '0.78rem',
            color: '#e0f2fe',
            marginTop: '4px',
          }}
        >
          <span>💙</span>
          <span>Untaian Kata Tulus</span>
          <span>💙</span>
        </div>
      </div>

      {/* Typewriter Letter Content */}
      <div style={{ fontSize: '0.92rem', lineHeight: '1.65', color: '#e0f2fe', position: 'relative', zIndex: 2, minHeight: '200px' }}>
        {displayedLines.map((line, i) => (
          <div key={i} style={getLineStyle(line.style)}>
            {line.text}
            {/* Show blinking cursor on the last active line */}
            {i === displayedLines.length - 1 && isTyping && line.style !== 'spacer' && (
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '14px',
                  backgroundColor: '#00d2ff',
                  marginLeft: '3px',
                  verticalAlign: 'middle',
                  boxShadow: '0 0 8px #00d2ff',
                  animation: 'pulseGlow 0.6s infinite alternate',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====== ELEGANT FAREWELL SECTION SUB-COMPONENT ====== */
function FarewellSection({ onOpenCake }) {
  const farewellRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const tl = gsap.timeline({ defaults: { ease: 'back.out(1.5)', duration: 0.7 } });

          tl.fromTo('.farewell-eyebrow',
            { opacity: 0, y: -15, scale: 0.85 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5 }
          )
          .fromTo('.farewell-title',
            { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.9 },
            { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.8 },
            '-=0.3'
          )
          .fromTo('.farewell-message',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
          )
          .fromTo('.farewell-blossom',
            { opacity: 0, scale: 0.3, rotate: -45 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' },
            '-=0.3'
          )
          .fromTo('.farewell-closing',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.3'
          )
          .fromTo('.farewell-btn',
            { opacity: 0, scale: 0.6, y: 25 },
            { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.8)' },
            '-=0.2'
          );
        }
      },
      { threshold: 0.1 }
    );

    if (farewellRef.current) observer.observe(farewellRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <div
      ref={farewellRef}
      style={{
        textAlign: 'center',
        marginTop: '10px',
        paddingTop: '40px',
        paddingBottom: '50px',
        position: 'relative',
      }}
    >
      {/* Ambient floating petals */}
      <div style={{ position: 'absolute', top: '8%', left: '10%', fontSize: '1rem', opacity: 0.5, filter: 'drop-shadow(0 0 6px #00d2ff)' }}>💙</div>
      <div style={{ position: 'absolute', top: '5%', right: '12%', fontSize: '0.9rem', opacity: 0.4, filter: 'drop-shadow(0 0 6px #38bdf8)' }}>✨</div>
      <div style={{ position: 'absolute', bottom: '20%', left: '6%', fontSize: '0.8rem', opacity: 0.35, filter: 'drop-shadow(0 0 6px #00d2ff)' }}>🔹</div>
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', fontSize: '0.85rem', opacity: 0.4, filter: 'drop-shadow(0 0 6px #38bdf8)' }}>💙</div>

      {/* Eyebrow */}
      <p
        className="farewell-eyebrow"
        style={{
          fontSize: '0.85rem',
          color: '#38bdf8',
          marginBottom: '18px',
          letterSpacing: '0.5px',
        }}
      >
        💙 Dari Lubuk Hati Terdalam 💙
      </p>

      {/* Main Title — elegant serif with italic accent */}
      <h2
        className="farewell-title"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontSize: '2rem',
          lineHeight: '1.25',
          color: '#fff',
          textShadow: '0 0 15px rgba(0, 210, 255, 0.5), 0 0 30px rgba(0, 210, 255, 0.3)',
          marginBottom: '24px',
          fontWeight: '600',
        }}
      >
        Semoga hidupmu<br />
        <span
          style={{
            fontStyle: 'italic',
            color: '#38bdf8',
            textShadow: '0 0 20px rgba(56, 189, 248, 0.6), 0 0 40px rgba(0, 210, 255, 0.4)',
          }}
        >
          selalu dipenuhi
        </span>
        <br />
        bunga-bunga indah
      </h2>

      {/* Birthday Message Paragraph */}
      <p
        className="farewell-message"
        style={{
          fontSize: '0.88rem',
          lineHeight: '1.7',
          color: 'rgba(224, 242, 254, 0.85)',
          maxWidth: '320px',
          margin: '0 auto 24px',
          fontWeight: '400',
        }}
      >
        Selamat Ulang Tahun, Paras Rahmania ❤️<br /><br />
        Semoga di usiamu yang ke-19 ini dan tahun-tahun berikutnya selalu dipenuhi kebahagiaan tulus, kesehatan yang baik, dan kelancaran dalam segala hal. Aku sangat bersyukur bisa ikut merayakan hari spesialmu hari ini, meskipun kita terhalang jarak. Jarak mungkin memisahkan kita untuk merayakannya secara langsung, tapi tidak akan pernah mengurangi betapa berartinya hari ini untukku.
      </p>

      {/* Center Flower Bucket PNG Ornament */}
      <div
        className="farewell-blossom"
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src="/bucket bunga 2 no bg.png"
          alt="Flower Bucket"
          style={{
            width: '85px',
            height: 'auto',
            filter: 'drop-shadow(0 0 16px #00d2ff) drop-shadow(0 0 30px #38bdf8)',
          }}
        />
      </div>

      {/* Closing Love Line */}
      <p
        className="farewell-closing"
        style={{
          fontFamily: "'Playfair Display', 'Cinzel', serif",
          fontStyle: 'italic',
          fontSize: '0.92rem',
          color: 'rgba(224, 242, 254, 0.7)',
          letterSpacing: '0.3px',
          marginBottom: '28px',
        }}
      >
        — Dengan segenap kasih dan sayang 💙 —
      </p>

      {/* Happy Birthday Wish Button */}
      <button
        className="farewell-btn"
        onClick={onOpenCake}
        style={{
          background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
          color: '#fff',
          border: 'none',
          padding: '13px 30px',
          borderRadius: '30px',
          fontSize: '0.95rem',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 35px var(--neon-pink-light), 0 0 60px var(--neon-pink)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 25px var(--neon-pink), 0 0 50px rgba(0, 210, 255, 0.3)';
        }}
      >
        <Sparkles size={18} /> Doa & Harapan Ulang Tahun 💕
      </button>
    </div>
  );
}

/* ====== PERSONAL MESSAGE CARD SUB-COMPONENT ====== */
function PersonalMessageCard() {
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      style={{
        background: 'linear-gradient(165deg, rgba(10, 30, 63, 0.85) 0%, rgba(4, 16, 38, 0.92) 100%)',
        borderRadius: '28px',
        border: '1.5px solid rgba(96, 165, 250, 0.4)',
        padding: '26px 20px',
        textAlign: 'center',
        position: 'relative',
        boxShadow: '0 18px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 210, 255, 0.1)',
        marginBottom: '36px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '6px' }}>
        — CATATAN SPESIAL —
      </p>
      
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: '#ffffff', marginBottom: '16px' }}>
        Ungkapan Tulus Untukmu 🤍
      </h3>

      <div
        style={{
          padding: '20px 18px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(96, 165, 250, 0.25)',
          boxShadow: 'inset 0 0 15px rgba(0, 210, 255, 0.08)',
        }}
      >
        <p
          style={{
            fontSize: '0.94rem',
            lineHeight: '1.75',
            color: '#e0f2fe',
            fontStyle: 'italic',
            fontWeight: '400',
            margin: 0,
            fontFamily: 'var(--font-body)',
          }}
        >
          "Aku sangat bersyukur atas kehadiranmu dan segala kehangatan yang kamu bawa ke dalam hidupku. Kebaikanmu, ketulusanmu, dan senyumanmu selalu berhasil menghadirkan kebahagiaan setiap hari. Semoga kehadiranku pun bisa memberikan rasa nyaman, bahagia, dan ketenangan yang sama untukmu."
        </p>
      </div>
    </div>
  );
}

export default function MainBirthdayPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const happyRef = useRef(null);
  const birthdayRef = useRef(null);
  const eyebrowRef = useRef(null);
  const dateRef = useRef(null);
  
  // Typewriter effect state
  const fullRomanticText = "Pelan-pelan yaa scroll ke bawahnya, ada sesuatu yang spesial buat kamu 🤍";
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullRomanticText.length) {
        setTypedText(fullRomanticText.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, 60);

    // Auto-play music automatically when unlocked after opening gift box
    const autoPlayTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log('Autoplay deferred:', err));
      }
    }, 300);

    return () => {
      clearInterval(timer);
      clearTimeout(autoPlayTimer);
    };
  }, []);

  // 1. Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef(null);
  const vinylRef = useRef(null);

  const playlist = [
    { id: 1, title: 'Shape of My Heart', artist: 'Backstreet Boys', duration: '4:24', src: '/Shape of My Heart_spotdown.org.mp3' },
  ];

  // 2. Bouquet Flowers Compliment Messages State
  const [activeFlower, setActiveFlower] = useState('sakura');
  const flowerCompliments = {
    rose: {
      name: "Mawar",
      icon: "🌹",
      color: "#ff69b4",
      text: "Mawar — Anggun, abadi, dan tak tergantikan. Kamu selalu memiliki tempat yang sangat istimewa di hatiku."
    },
    tulip: {
      name: "Tulip",
      icon: "🌷",
      color: "#ff85c8",
      text: "Tulip — Tulus dan penuh kelembutan. Aku selalu mengagumi ketulusanmu dan caramu membawa kebahagiaan untuk orang-orang di sekitarmu."
    },
    sakura: {
      name: "Sakura",
      icon: "🌸",
      color: "#ff9ed8",
      text: "Sakura — Indah, lembut, dan menenangkan. Semoga setiap langkah perjalananmu selalu dipenuhi kedamaian, sukacita, dan momen-momen indah."
    },
    sunflower: {
      name: "Matahari",
      icon: "🌻",
      color: "#ffb3e0",
      text: "Bunga Matahari — Cerah dan penuh semangat. Terima kasih sudah selalu menjadi sumber kehangatan, keceriaan, dan energi positif."
    },
    daisy: {
      name: "Daisy",
      icon: "🌼",
      color: "#ffc0eb",
      text: "Daisy — Manis, ceria, dan tulus. Semoga semesta senantiasa memberimu alasan untuk tersenyum manis setiap harinya."
    }
  };

  // 3. Polaroid Lightbox Modal State - Photo for Paras Rahmania
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const photoGallery = [
    { 
      id: 1, 
      title: 'Paras Rahmania ✨', 
      date: 'Selamat Ulang Tahun ke-19 🤍', 
      location: 'Momen Berharga',
      img: '/paras 1.jpeg',
      rotation: '0deg'
    },
  ];

  // 4. Jar of Notes State
  const jarRef = useRef(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const jarNotes = [
    "Setiap kali ngobrol sama kamu selalu bikin hari-hariku jadi jauh lebih hangat dan menyenangkan. Terima kasih ya sudah menjadi orang yang luar biasa. 💙",
    "Aku selalu mengagumi kebaikan hatimu, kelembutan tutur katamu, dan caramu yang selalu tulus dalam setiap hal. 🤍",
    "Dunia rasanya jadi jauh lebih indah, tenang, dan berwarna hanya dengan kehadiran kamu di dalamnya. ✨",
    "Terima kasih sudah menjadi sosok yang begitu istimewa dan tak terlupakan. Semoga kamu selalu dipeluk kebahagiaan dan cinta yang melimpah. 🌸"
  ];

  // 5. Final Birthday Cake Modal State
  const [showCakeModal, setShowCakeModal] = useState(false);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
    .fromTo(happyRef.current,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.5'
    )
    .fromTo(birthdayRef.current,
      { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.5)' },
      '-=0.6'
    )
    .fromTo(dateRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    );

    const flowers = gsap.utils.toArray('.floating-hero-flower');
    flowers.forEach((flower, i) => {
      gsap.to(flower, {
        y: i % 2 === 0 ? -16 : 16,
        rotation: i % 2 === 0 ? 25 : -25,
        scale: 1.15,
        duration: 2.5 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      });
    });

    gsap.to(birthdayRef.current, {
      filter: 'drop-shadow(0 0 25px #00d2ff) drop-shadow(0 0 45px #38bdf8)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.hero-scroll-indicator', {
      y: 8,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    if (isPlaying) {
      gsap.to(vinylRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none',
      });
    } else {
      gsap.killTweensOf(vinylRef.current);
    }
  }, { scope: containerRef, dependencies: [isPlaying] });

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const playSpecificTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }, 50);
  };

  const nextTrack = () => {
    const nextIdx = (currentTrack + 1) % playlist.length;
    playSpecificTrack(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrack - 1 + playlist.length) % playlist.length;
    playSpecificTrack(prevIdx);
  };

  const handleFlowerSelect = (key) => {
    setActiveFlower(key);

    gsap.fromTo(`.flower-node-${key}`,
      { scale: 0.8, rotate: -15 },
      { scale: 1.25, rotate: 0, duration: 0.4, ease: 'back.out(2)' }
    );

    gsap.fromTo('.compliment-toast-box',
      { opacity: 0, y: 15, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  };

  const handleShakeJar = () => {
    if (!jarRef.current) return;

    // Reset selectedNote so animation replays fresh every shake
    setSelectedNote(null);

    const tl = gsap.timeline();

    // 1. Shaking the Jar with realistic tilt, vibration & bounce
    tl.to(jarRef.current, {
      rotation: -22,
      scale: 1.18,
      y: -10,
      duration: 0.09,
      ease: 'power1.out',
    })
    .to(jarRef.current, {
      rotation: 22,
      y: -12,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: -16,
      y: -8,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: 16,
      y: -6,
      duration: 0.09,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: -8,
      y: -3,
      duration: 0.08,
      ease: 'power1.inOut',
    })
    .to(jarRef.current, {
      rotation: 0,
      scale: 1,
      y: 0,
      duration: 0.15,
      ease: 'back.out(2)',
      onComplete: () => {
        // Pick random funny/cute note
        const randomNote = jarNotes[Math.floor(Math.random() * jarNotes.length)];
        setSelectedNote(randomNote);

        // 2. Paper Scroll Ejecting & Unfolding Animation out of Jar
        requestAnimationFrame(() => {
          gsap.fromTo('.note-popup',
            { 
              opacity: 0, 
              scale: 0.2, 
              y: 50,
              rotation: -15,
              filter: 'blur(8px)',
            },
            { 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotation: 0,
              filter: 'blur(0px)',
              duration: 0.65, 
              ease: 'back.out(1.8)',
            }
          );
        });
      }
    });
  };

  const handleOpenCakeModal = () => {
    setShowCakeModal(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#ff2a8d', '#ffd700', '#ff77bc', '#ffffff', '#e0115f'],
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        flexShrink: 0,
        padding: '24px 16px 80px',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={playlist[currentTrack].src}
        onEnded={nextTrack}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setAudioProgress(pct || 0);
          }
        }}
      />

      {/* Floating Audio Quick Toggle Button (Bottom Right) */}
      <button
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 90,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
          border: '1.5px solid rgba(255,255,255,0.7)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px #00d2ff, 0 4px 12px rgba(0,0,0,0.4)',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>

      {/* SECTION 1: HERO HEADER WITH TYPEWRITER EFFECT */}
      <div
        ref={heroRef}
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          padding: '30px 0 10px',
          marginBottom: '36px',
        }}
      >
        {/* Cute Mascot Sticker floating in Hero */}
        <img
          src="/lucu1 no bg.png"
          alt="Cute Mascot"
          style={{
            position: 'absolute',
            top: '2%',
            right: '4%',
            width: '65px',
            height: 'auto',
            filter: 'drop-shadow(0 0 12px #38bdf8)',
            animation: 'pulseGlow 2.5s infinite ease-in-out',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative Flower PNG in Hero Left */}
        <img
          src="/bunga no bg 2.png"
          alt="Decorative Flower"
          style={{
            position: 'absolute',
            top: '40%',
            left: '2%',
            width: '45px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
        {/* Animated Floating Flowers around Hero */}
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '4%', left: '8%', fontSize: '1.6rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}>💙</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '12%', right: '8%', fontSize: '1.8rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}>✨</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '45%', left: '4%', fontSize: '1.5rem', filter: 'drop-shadow(0 0 8px #00d2ff)' }}>🔹</div>
        <div className="floating-hero-flower" style={{ position: 'absolute', top: '48%', right: '6%', fontSize: '1.7rem', filter: 'drop-shadow(0 0 8px #38bdf8)' }}>💙</div>

        {/* Ambient Glowing Aura */}
        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 210, 255, 0.4) 0%, transparent 70%)',
            filter: 'blur(35px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Eyebrow Tag */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.82rem',
            color: '#7dd3fc',
            marginBottom: '20px',
            letterSpacing: '0.5px',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.6)',
            padding: '0 8px',
          }}
        >
          <span>🤍</span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}>Untuk seseorang yang sangat istimewa di hari ulang tahunnya yang ke-19</span>
          <span>🤍</span>
        </div>

        {/* Title: Selamat Ulang Tahun ke-19, Paras Rahmania */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: '1.15',
            marginBottom: '16px',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            ref={happyRef}
            style={{
              fontSize: '2.3rem',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '0.5px',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
            }}
          >
            Selamat Ulang Tahun ke-19,
          </div>
          <div
            ref={birthdayRef}
            style={{
              fontSize: '3.1rem',
              fontStyle: 'italic',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #ff9ed8 0%, #ff69b4 50%, #cc1a6e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.8))',
              margin: '6px 0',
              letterSpacing: '0.5px',
            }}
          >
            Paras Rahmania ❤️
          </div>
        </div>

        {/* Typewriter Romantic Writing Text Animation */}
        <div
          style={{
            minHeight: '28px',
            marginBottom: '20px',
            padding: '0 12px',
          }}
        >
          <p
            style={{
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: '#e0f2fe',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.5px',
              textShadow: '0 0 10px rgba(0, 210, 255, 0.8)',
            }}
          >
            {typedText}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '14px',
                backgroundColor: '#00d2ff',
                marginLeft: '3px',
                verticalAlign: 'middle',
                boxShadow: '0 0 8px #00d2ff',
                opacity: isTypingDone ? 0.3 : 1,
                animation: 'pulseGlow 0.8s infinite alternate',
              }}
            />
          </p>
        </div>

        {/* Thin Horizontal Divider */}
        <div
          style={{
            width: '140px',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.8), transparent)',
            marginBottom: '22px',
            boxShadow: '0 0 10px rgba(0, 210, 255, 0.5)',
          }}
        />

        {/* Subtitle Date */}
        <div
          ref={dateRef}
          style={{
            fontSize: '0.78rem',
            letterSpacing: '3.5px',
            color: 'rgba(224, 242, 254, 0.85)',
            fontWeight: '600',
            textTransform: 'uppercase',
            textShadow: '0 0 8px rgba(0, 210, 255, 0.4)',
            marginBottom: '28px',
          }}
        >
          SEMOGA HARI INI MENJADI HARI YANG PALING MEMBAHAGIAKAN 🤍
        </div>

        {/* Scroll Down Bounce Arrow */}
        <div className="hero-scroll-indicator" style={{ opacity: 0.8 }}>
          <ChevronDown size={22} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 8px #00d2ff)' }} />
        </div>
      </div>

      {/* SECTION 2: A DIGITAL BOUQUET WITH PERFECTLY SPACED FLOWERS & STEMS */}
      <div
        style={{
          background: 'rgba(40, 10, 30, 0.7)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          border: '1.5px solid rgba(255, 105, 180, 0.4)',
          padding: '24px 12px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 20px rgba(255,105,180,0.1)',
          marginBottom: '36px',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#ff69b4', fontWeight: '600', marginBottom: '4px' }}>
          — BUKET SPESIAL UNTUKMU —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>
          Buket Bunga Digital 💐
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Sentuh bunganya untuk melihat pesan manis khusus untukmu 🤍
        </p>

        {/* Bouquet PNG Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
          <img
            src="/bunga bucket no bg.png"
            alt="Bouquet Banner"
            style={{
              width: '80px',
              height: 'auto',
              filter: 'drop-shadow(0 0 14px #ff69b4) drop-shadow(0 0 25px #ff85c8)',
            }}
          />
        </div>

        {/* SVG Bouquet with Wide Spaced Green Stems & Leaves */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '350px',
            height: '240px',
            margin: '0 auto 20px',
          }}
        >
          <svg viewBox="0 0 350 240" width="100%" height="100%">
            <defs>
              <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff85c8" />
                <stop offset="60%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#cc1a6e" />
              </linearGradient>
            </defs>

            {/* Stems Converging into Vase Center */}
            <path d="M 175 195 Q 90 140, 30 70" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 85 130 Q 70 125, 65 140 Z" fill="#22c55e" />

            <path d="M 175 195 Q 125 110, 100 45" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 125 110 Q 140 105, 140 120 Z" fill="#22c55e" />

            <path d="M 175 195 L 175 30" fill="none" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" />
            <path d="M 175 115 Q 160 105, 160 120 Z" fill="#22c55e" />

            <path d="M 175 195 Q 225 110, 250 45" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 225 110 Q 210 105, 210 120 Z" fill="#22c55e" />

            <path d="M 175 195 Q 260 140, 320 70" fill="none" stroke="#4ade80" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 265 130 Q 280 125, 285 140 Z" fill="#22c55e" />

            {/* Bouquet Vase / Pot Base */}
            <path d="M 115 160 C 115 160, 95 215, 120 225 C 145 235, 205 235, 230 225 C 255 215, 235 160, 235 160 Z" fill="url(#potGrad)" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 8px 15px rgba(0,0,0,0.6))" />
            <circle cx="175" cy="190" r="11" fill="#ffffff" />
            <circle cx="175" cy="190" r="7" fill="#ff69b4" />
            <path d="M 175 190 C 150 175, 140 200, 175 190 Z" fill="#ffffff" />
            <path d="M 175 190 C 200 175, 210 200, 175 190 Z" fill="#ffffff" />
          </svg>

          {/* Clickable Flower Nodes Positioned on Widely Spaced Stem Tips */}
          <div
            className="flower-node-rose"
            onClick={() => handleFlowerSelect('rose')}
            style={{
              position: 'absolute',
              left: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'rose' ? 'drop-shadow(0 0 16px #ff69b4)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'rose' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌹
          </div>

          <div
            className="flower-node-tulip"
            onClick={() => handleFlowerSelect('tulip')}
            style={{
              position: 'absolute',
              left: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'tulip' ? 'drop-shadow(0 0 16px #ff85c8)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'tulip' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌷
          </div>

          <div
            className="flower-node-sakura"
            onClick={() => handleFlowerSelect('sakura')}
            style={{
              position: 'absolute',
              left: '50%',
              transform: activeFlower === 'sakura' ? 'translateX(-50%) scale(1.3)' : 'translateX(-50%) scale(1)',
              top: '-14px',
              fontSize: '2.8rem',
              cursor: 'pointer',
              filter: activeFlower === 'sakura' ? 'drop-shadow(0 0 18px #ff9ed8)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌸
          </div>

          <div
            className="flower-node-sunflower"
            onClick={() => handleFlowerSelect('sunflower')}
            style={{
              position: 'absolute',
              right: '74px',
              top: '8px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'sunflower' ? 'drop-shadow(0 0 16px #ffb3e0)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'sunflower' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌻
          </div>

          <div
            className="flower-node-daisy"
            onClick={() => handleFlowerSelect('daisy')}
            style={{
              position: 'absolute',
              right: '4px',
              top: '32px',
              fontSize: '2.4rem',
              cursor: 'pointer',
              filter: activeFlower === 'daisy' ? 'drop-shadow(0 0 16px #ffc0eb)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.5))',
              transform: activeFlower === 'daisy' ? 'scale(1.25)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease',
            }}
          >
            🌼
          </div>
        </div>

        {/* Flower Selection Badge Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '18px',
          }}
        >
          {Object.keys(flowerCompliments).map((key) => {
            const item = flowerCompliments[key];
            const isSelected = activeFlower === key;
            return (
              <button
                key={key}
                onClick={() => handleFlowerSelect(key)}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${item.color}44 0%, ${item.color}22 100%)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? `1.5px solid ${item.color}` : '1px solid rgba(255, 105, 180, 0.25)',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSelected ? `0 0 15px ${item.color}66` : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Compliment Message Box */}
        <div
          className="compliment-toast-box"
          style={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(255,105,180,0.2) 0%, rgba(40,10,30,0.85) 100%)',
            border: `1.5px solid ${flowerCompliments[activeFlower].color}`,
            borderRadius: '20px',
            boxShadow: `0 0 20px ${flowerCompliments[activeFlower].color}44`,
            transition: 'all 0.3s ease',
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: '1.5',
              color: '#ffffff',
              fontWeight: '500',
            }}
          >
            "{flowerCompliments[activeFlower].text}"
          </p>
        </div>
      </div>

      {/* SECTION 3: A LETTER FOR YOU — TYPEWRITER EFFECT */}
      <LetterTypewriter />

      {/* SECTION 3.5: PERSONAL MESSAGE CARD */}
      <PersonalMessageCard />

      {/* SECTION 4: POLAROID PHOTO GALLERY */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — KENANGAN INDAH —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '4px' }}>
          Momen Spesial 📸
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Ketuk foto untuk melihat lebih jelas ✨
        </p>

        {/* Stacked Tilted Polaroid Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
          {photoGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              style={{
                width: '100%',
                maxWidth: '280px',
                background: '#ffffff',
                padding: '12px 12px 18px',
                borderRadius: '8px',
                transform: `rotate(${item.rotation})`,
                boxShadow: '0 12px 25px rgba(0,0,0,0.7)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 210, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${item.rotation})`;
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.7)';
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '210px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              />
              <p style={{ color: '#111111', fontSize: '0.88rem', fontWeight: '600', fontFamily: 'var(--font-display)' }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: SPECIAL PLAYLIST */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.75)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1.5px solid rgba(96, 165, 250, 0.35)',
          padding: '22px 16px',
          textAlign: 'center',
          boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
          marginBottom: '36px',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — MUSIK SPESIAL —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', marginBottom: '16px' }}>
          Soundtrack Spesial 🎵
        </h3>

        {/* Spinning Vinyl Disc */}
        <div
          style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            margin: '0 auto 16px',
          }}
        >
          <div
            ref={vinylRef}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #333 15%, #111 20%, #222 35%, #050505 60%)',
              border: '3px solid rgba(0, 210, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(0,210,255,0.4)',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d2ff 0%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Music size={20} color="#fff" />
            </div>
          </div>
        </div>

        {/* Track Title */}
        <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '2px', fontFamily: 'var(--font-display)' }}>
          {playlist[currentTrack].title}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          {playlist[currentTrack].artist}
        </p>

        {/* Audio Progress Slider Line */}
        <div
          style={{
            width: '100%',
            height: '5px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '10px',
            marginBottom: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${audioProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00d2ff, #38bdf8)',
              transition: 'width 0.2s linear',
            }}
          />
        </div>

        {/* Playback Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          <button onClick={prevTrack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipBack size={24} />
          </button>

          <button
            onClick={togglePlay}
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px #00d2ff',
              cursor: 'pointer',
            }}
          >
            {isPlaying ? <Pause size={24} fill="#fff" /> : <Play size={24} fill="#fff" style={{ marginLeft: '2px' }} />}
          </button>

          <button onClick={nextTrack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <SkipForward size={24} />
          </button>
        </div>

        {/* 3 Interactive Playlist Song List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          <p style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '600', marginBottom: '2px', textAlign: 'center' }}>
            📜 Pilihan Lagu:
          </p>
          {playlist.map((song, index) => {
            const isSelected = index === currentTrack;
            return (
              <div
                key={song.id}
                onClick={() => playSpecificTrack(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '16px',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(0,210,255,0.3) 0%, rgba(0,102,255,0.15) 100%)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected
                    ? '1.5px solid var(--neon-pink)'
                    : '1px solid rgba(96, 165, 250, 0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 0 15px rgba(0,210,255,0.25)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isSelected ? '#00d2ff' : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: '#fff',
                    }}
                  >
                    {isSelected && isPlaying ? <Music size={14} className="animate-spin" /> : index + 1}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: '600', color: isSelected ? '#ffffff' : '#e0f2fe' }}>
                      {song.title}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {song.artist}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {song.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 6: JAR OF NOTES */}
      <div
        style={{
          background: 'rgba(10, 30, 63, 0.65)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(96, 165, 250, 0.3)',
          padding: '20px 16px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          marginBottom: '36px',
          position: 'relative',
        }}
      >
        {/* Cute Mascot Mascot Sticker in Jar Section */}
        <img
          src="/lucu 2 no bg.png"
          alt="Cute Mascot 2"
          style={{
            position: 'absolute',
            top: '-20px',
            right: '12px',
            width: '58px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px #00d2ff)',
            pointerEvents: 'none',
          }}
        />
        <p style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>
          — DARI HATIKU UNTUKMU —
        </p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '4px' }}>
          Alasan Kenapa Kamu Begitu Spesial ✨
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Goyang toplesnya untuk mengambil pesan manis 📜
        </p>

        <div ref={jarRef} style={{ fontSize: '3.5rem', marginBottom: '12px', cursor: 'pointer' }} onClick={handleShakeJar}>
          🫙
        </div>

        <button
          onClick={handleShakeJar}
          style={{
            background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: '20px',
            fontSize: '0.88rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(0,210,255,0.4)',
          }}
        >
          Goyang Toplesnya ✨
        </button>

        {selectedNote && (
          <div
            className="note-popup"
            style={{
              marginTop: '26px',
              padding: '26px 16px 18px',
              background: 'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%)',
              color: '#0f172a',
              borderRadius: '20px',
              border: '2.5px solid #38bdf8',
              fontSize: '0.92rem',
              fontWeight: '600',
              boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 25px rgba(0, 210, 255, 0.35)',
              lineHeight: '1.55',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* Paper Washi Tape Header Ornament */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #00d2ff 0%, #0066ff 100%)',
                color: '#ffffff',
                padding: '4px 14px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                letterSpacing: '0.8px',
                fontWeight: '700',
                boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
                whiteSpace: 'nowrap',
                zIndex: 5,
              }}
            >
              📜 PESAN SPESIAL UNTUK PARAS RAHMANIA 💙
            </div>

            <p style={{ marginTop: '4px', fontFamily: 'var(--font-body)' }}>
              "{selectedNote}"
            </p>
          </div>
        )}
      </div>

      {/* SECTION 7: ELEGANT FINAL WISHES */}
      <FarewellSection onOpenCake={handleOpenCakeModal} />

      {/* ENHANCED POLAROID LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(3, 12, 27, 0.9)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '16px 16px 20px',
              borderRadius: '16px',
              maxWidth: '340px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 30px rgba(0, 210, 255, 0.4)',
              position: 'relative',
              animation: 'pulseGlow 3s infinite ease-in-out',
            }}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '-12px',
                right: '-12px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#00d2ff',
                color: '#fff',
                border: '2px solid #fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px #00d2ff',
              }}
            >
              <X size={18} />
            </button>

            <img
              src={selectedPhoto.img}
              alt={selectedPhoto.title}
              style={{
                width: '100%',
                maxHeight: '360px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: '14px',
              }}
            />

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                background: 'rgba(0, 210, 255, 0.12)',
                borderRadius: '12px',
                fontSize: '0.78rem',
                color: '#00d2ff',
                fontWeight: '600',
                marginBottom: '8px',
              }}
            >
              <Calendar size={12} /> {selectedPhoto.location ? `${selectedPhoto.date} · ${selectedPhoto.location}` : selectedPhoto.date}
            </div>

            <h4 style={{ color: '#111111', fontSize: '1rem', fontFamily: 'var(--font-display)', lineHeight: '1.3' }}>
              {selectedPhoto.title}
            </h4>
          </div>
        </div>
      )}

      {/* BIRTHDAY CAKE MODAL */}
      {showCakeModal && (
        <div
          onClick={() => setShowCakeModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, #0a1e3f 0%, #041026 100%)',
              border: '1.5px solid var(--neon-pink)',
              padding: '24px',
              borderRadius: '24px',
              maxWidth: '320px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 0 40px var(--neon-pink)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💖</div>
            <h3 className="neon-text" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>
              Selamat Ulang Tahun ke-19, Paras!
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#e0f2fe', marginBottom: '20px' }}>
              Semoga di usia 19 tahun ini seluruh impian dan harapan indah Paras Rahmania tercapai 💗
            </p>

            <button
              onClick={() => setShowCakeModal(false)}
              style={{
                padding: '8px 24px',
                background: 'rgba(0,210,255,0.2)',
                border: '1px solid var(--neon-pink)',
                color: '#fff',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              Tutup ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
