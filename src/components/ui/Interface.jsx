import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { planetData } from '../../data/planetData';

const Interface = ({ currentFocus, onPlanetSelect, onZoom, setInteractionDom }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        if (currentFocus && heroRef.current) {
            setInteractionDom(heroRef.current);
        } else {
            setInteractionDom(null);
        }
    }, [currentFocus, setInteractionDom]);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
            fontFamily: "'Inter', sans-serif"
        }}>

            {/* HEADER & MENU (Default View) */}
            <AnimatePresence>
                {!currentFocus && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}
                        >
                            <h1 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '4px', margin: 0, color: 'rgba(255,255,255,0.5)' }}>
                                Solar System Explorer
                            </h1>
                        </motion.div>

                        <div style={{ position: 'absolute', top: '2rem', left: '2rem', pointerEvents: 'auto', zIndex: 20 }}>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                style={{
                                    background: 'rgba(0,0,0,0.5)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                    padding: '0.8rem 1.2rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(5px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                    width: '45px',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <div style={{ width: '100%', height: '2px', background: 'white' }} />
                                <div style={{ width: '100%', height: '2px', background: 'white' }} />
                                <div style={{ width: '100%', height: '2px', background: 'white' }} />
                            </button>
                        </div>

                        {/* Zoom Controls */}
                        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', pointerEvents: 'auto', zIndex: 20 }}>
                            <button
                                onClick={() => onZoom('in')}
                                style={{
                                    width: '50px', height: '50px', borderRadius: '50%',
                                    background: 'rgba(20, 20, 20, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: 'white', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                onClick={() => onZoom('out')}
                                style={{
                                    width: '50px', height: '50px', borderRadius: '50%',
                                    background: 'rgba(20, 20, 20, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: 'white', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                    outline: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* PLANET MENU */}
            <AnimatePresence>
                {isMenuOpen && !currentFocus && (
                    <motion.nav
                        initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, height: '100%', width: '300px',
                            background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
                            borderRight: '1px solid rgba(255,255,255,0.1)',
                            padding: '6rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
                            pointerEvents: 'auto', zIndex: 30
                        }}
                    >
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'rgba(255,255,255,0.5)',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                textAlign: 'left',
                                marginBottom: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            BACK
                        </button>
                        {planetData.map((p) => (
                            <button
                                key={p.name}
                                onClick={() => { onPlanetSelect(p); setIsMenuOpen(false); }}
                                style={{
                                    background: 'transparent', color: 'white', border: 'none', textAlign: 'left',
                                    padding: '1rem', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold',
                                    display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '8px'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: p.color }} />
                                {p.name}
                            </button>
                        ))}
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* FOOTER / SCROLLABLE CONTENT */}
            <AnimatePresence>
                {currentFocus && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="scroll-container"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            overflowY: 'auto',
                            scrollBehavior: 'smooth',
                            zIndex: 40,
                            pointerEvents: 'auto', // ENABLE Native Scroll
                        }}
                    >
                        {/* HERO SPACER / INTERACTIVE ZONE */}
                        <div
                            ref={heroRef} // THIS DIV is where we drag the planet
                            style={{
                                height: '100vh',
                                width: '100%',
                                position: 'relative',
                                touchAction: 'pan-y', // CRITICAL: Allows vertical scroll on mobile while swiping!
                                // We keep auto here to capture clicks for the Back button etc.
                                // We are passing this ref AS the target.
                            }}
                        >
                            <button
                                onClick={() => onPlanetSelect(null)}
                                style={{
                                    position: 'absolute', top: '2rem', left: '2rem',
                                    background: 'white', color: 'black', border: 'none',
                                    padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 'bold',
                                    cursor: 'pointer', pointerEvents: 'auto',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    zIndex: 50 // Above the drag zone
                                }}
                            >
                                ← BACK
                            </button>

                            <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center', pointerEvents: 'none' }}>
                                <p style={{ textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7, marginBottom: '0.5rem', fontSize: '0.8rem' }}>Scroll Down</p>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ display: 'inline-block' }}
                                >
                                    <svg width="40" height="20" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 2L12 12L22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>

                        {/* CONTENT SECTION */}
                        {/* CONTENT SECTION */}
                        <div id="planet-content" style={{
                            minHeight: '100vh',
                            background: `radial-gradient(circle at 50% 20%, ${currentFocus.color}22, #050505 80%)`, // Dynamic Gradient
                            backdropFilter: 'blur(20px)', // Helps blend if overlaying anything
                            padding: '6rem 2rem',
                            borderTop: `1px solid ${currentFocus.color}44`,
                            position: 'relative',
                            zIndex: 45
                        }}>
                            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                                {/* Header */}
                                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                                    <h2 style={{
                                        fontSize: '6rem',
                                        margin: '0',
                                        color: 'white',
                                        fontWeight: '100', // Thin elegant font
                                        letterSpacing: '10px',
                                        textShadow: `0 0 30px ${currentFocus.color}66`
                                    }}>{currentFocus.name}</h2>
                                    <div style={{ width: '100px', height: '2px', background: currentFocus.color, margin: '2rem auto' }} />
                                    <p style={{
                                        fontSize: '1.2rem',
                                        lineHeight: '1.8',
                                        color: '#cccccc',
                                        maxWidth: '700px',
                                        margin: '0 auto',
                                        fontWeight: '300'
                                    }}>
                                        {currentFocus.description}
                                    </p>
                                </div>

                                {/* HEADLINE DATA */}
                                {currentFocus.details && (
                                    <>
                                        <h3 style={{
                                            fontSize: '1rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '4px',
                                            color: 'rgba(255,255,255,0.5)',
                                            marginBottom: '2rem',
                                            textAlign: 'center'
                                        }}>Planetary Data</h3>

                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                            gap: '2rem',
                                            padding: '0 1rem'
                                        }}>
                                            {/* TEMP CARD */}
                                            <div style={cardStyle}>
                                                <div style={iconContainerStyle}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                                        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                                                    </svg>
                                                </div>
                                                <div style={labelStyle}>Surface Temp</div>
                                                <div style={valueStyle}>{currentFocus.details.temp}</div>
                                            </div>

                                            {/* DAY CARD */}
                                            <div style={cardStyle}>
                                                <div style={iconContainerStyle}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                </div>
                                                <div style={labelStyle}>Day Length</div>
                                                <div style={valueStyle}>{currentFocus.details.day}</div>
                                            </div>

                                            {/* YEAR CARD */}
                                            <div style={cardStyle}>
                                                <div style={iconContainerStyle}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                                        <line x1="16" y1="2" x2="16" y2="6" />
                                                        <line x1="8" y1="2" x2="8" y2="6" />
                                                        <line x1="3" y1="10" x2="21" y2="10" />
                                                    </svg>
                                                </div>
                                                <div style={labelStyle}>Year Length</div>
                                                <div style={valueStyle}>{currentFocus.details.year}</div>
                                            </div>

                                            {/* DISTANCE CARD */}
                                            <div style={cardStyle}>
                                                <div style={iconContainerStyle}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                                        <path d="M2.5 7a4.5 4.5 0 0 0 0 9" />
                                                        <path d="M21.5 7a4.5 4.5 0 0 1 0 9" />
                                                        <path d="M12 12l9-5" />
                                                        <path d="M12 12l-9-5" />
                                                        <path d="M12 12l9 5" />
                                                        <path d="M12 12l-9 5" />
                                                    </svg>
                                                </div>
                                                <div style={labelStyle}>Distance</div>
                                                <div style={valueStyle}>{currentFocus.details.distance || currentFocus.distance + ' AU'}</div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div style={{ height: '150px' }} />

                                {/* Footer */}
                                <div style={{ textAlign: 'center', opacity: 0.3, fontSize: '0.8rem' }}>
                                    SOLAR SYSTEM EXPLORER © 2026
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- STYLES FOR CARDS ---
const cardStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s ease, border-color 0.3s ease',
    cursor: 'default'
};

const iconContainerStyle = {
    width: '50px',
    height: '50px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    color: 'white'
};

const labelStyle = {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: '0.5rem'
};

const valueStyle = {
    fontSize: '2rem',
    fontWeight: '600',
    color: 'white'
};

export default Interface;
