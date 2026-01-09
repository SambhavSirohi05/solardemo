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
                                // We keep auto here to capture clicks for the Back button etc.
                                // BUT we need to let dragging pass? No, OrbitControls needs a target.
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
                        <div id="planet-content" style={{
                            minHeight: '100vh',
                            background: 'rgba(5, 5, 5, 0.95)',
                            backdropFilter: 'blur(20px)',
                            padding: '4rem 2rem',
                            borderTop: `2px solid ${currentFocus.color}`,
                            position: 'relative',
                            zIndex: 45
                        }}>
                            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                                <h2 style={{ fontSize: '5rem', margin: '0 0 1rem 0', color: currentFocus.color }}>{currentFocus.name}</h2>
                                <p style={{ fontSize: '1.5rem', lineHeight: '1.8', marginBottom: '6rem', color: '#eaeaea' }}>
                                    {currentFocus.description}
                                </p>

                                <h3 style={{ fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Planetary Data</h3>

                                {currentFocus.details && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Surface Temp</div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{currentFocus.details.temp}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Day Length</div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{currentFocus.details.day}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Year Length</div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{currentFocus.details.year}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Distance</div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{currentFocus.details.distance || currentFocus.distance + ' AU'}</div>
                                        </div>
                                    </div>
                                )}

                                <div style={{ height: '200px' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Interface;
