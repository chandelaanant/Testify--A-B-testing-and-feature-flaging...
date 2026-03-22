import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Landing() {
    const navigate = useNavigate()

    return (
        <div className="grid-bg" style={{ minHeight: '100vh' }}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <Navbar />

            {/* Hero */}
            <section style={{
                position: 'relative', zIndex: 1,
                maxWidth: 1200, margin: '0 auto',
                minHeight: '100vh', display: 'flex',
                alignItems: 'center', padding: '120px 48px 80px'
            }}>
                <div style={{ maxWidth: 760 }}>

                    {/* Badge */}
                    <div className="fade-up-1" style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(58,240,122,0.08)',
                        border: '1px solid rgba(58,240,122,0.2)',
                        borderRadius: 100, padding: '5px 14px 5px 8px',
                        fontFamily: 'var(--font-mono)', fontSize: 12,
                        color: 'var(--accent)', marginBottom: 32
                    }}>
                        <span style={{
                            width: 6, height: 6, background: 'var(--accent)',
                            borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite'
                        }} />
                        Now in public beta — ship fearlessly
                    </div>

                    {/* Headline */}
                    <h1 className="fade-up-2" style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(44px, 6vw, 80px)',
                        fontWeight: 800, lineHeight: 1.05,
                        letterSpacing: '-2px', marginBottom: 28
                    }}>
                        Ship faster.<br />
                        <span style={{ color: 'var(--accent)' }}>Test smarter.</span><br />
                        <span style={{ color: 'var(--cyan)' }}>Scale safely.</span>
                    </h1>

                    {/* Description */}
                    <p className="fade-up-3" style={{
                        fontSize: 18, color: 'var(--muted)', maxWidth: 520,
                        lineHeight: 1.7, marginBottom: 44, fontWeight: 300
                    }}>
                        The B2B feature flagging and A/B testing platform built for engineering
                        teams who move fast. Control every feature, experiment on every user,
                        with zero deploys.
                    </p>

                    {/* Actions */}
                    <div className="fade-up-4" style={{
                        display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap'
                    }}>
                        <button onClick={() => navigate('/auth?tab=signup')} style={{
                            background: 'var(--accent)', color: '#080c10', border: 'none',
                            padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 500,
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            transition: 'opacity 0.2s, transform 0.15s', cursor: 'pointer'
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                        >
                            Start for free
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <button onClick={() => navigate('/auth?tab=signin')} style={{
                            background: 'none', border: '1px solid var(--border2)',
                            color: 'var(--text)', padding: '13px 28px', borderRadius: 10,
                            fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8,
                            transition: 'border-color 0.2s', cursor: 'pointer'
                        }}>
                            View docs
                        </button>
                    </div>

                    {/* Meta */}
                    <div className="fade-up-5" style={{
                        marginTop: 56, display: 'flex',
                        alignItems: 'center', gap: 32, flexWrap: 'wrap'
                    }}>
                        {[
                            'No credit card required',
                            'Up and running in 5 minutes',
                            'SOC 2 Type II ready'
                        ].map(item => (
                            <span key={item} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                fontSize: 13, color: 'var(--muted)'
                            }}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <circle cx="7" cy="7" r="6" stroke="var(--accent)" strokeWidth="1.3" />
                                    <path d="M4.5 7l2 2 3-3" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Floating code card */}
                <div style={{
                    position: 'absolute', right: 0, top: '50%',
                    transform: 'translateY(-50%)', width: 420
                }} className="fade-up-5">
                    <div style={{
                        background: 'var(--bg2)', border: '1px solid var(--border2)',
                        borderRadius: 14, overflow: 'hidden',
                        fontFamily: 'var(--font-mono)', fontSize: 13
                    }}>
                        <div style={{
                            background: 'var(--bg3)', borderBottom: '1px solid var(--border)',
                            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8
                        }}>
                            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                            ))}
                            <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--muted)' }}>
                                app.js — Testify SDK
                            </span>
                        </div>
                        <div style={{ padding: 20 }}>
                            {[
                                { ln: 1, code: <><span style={{ color: '#ff7b72' }}>import</span> <span style={{ color: 'var(--cyan)' }}>Testify</span> <span style={{ color: '#ff7b72' }}>from</span> <span style={{ color: '#a5d6ff' }}>'@testify/sdk'</span></> },
                                { ln: 2, code: '' },
                                { ln: 3, code: <><span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: 'var(--accent)' }}>client</span> = <span style={{ color: '#ff7b72' }}>new</span> <span style={{ color: 'var(--cyan)' }}>Testify</span>{'({ '}<span style={{ color: '#d2a8ff' }}>apiKey</span>: env.<span style={{ color: 'var(--accent)' }}>KEY</span> {'})'}</> },
                                { ln: 4, code: '' },
                                { ln: 5, code: <span style={{ color: '#8b949e' }}>// Evaluate a feature flag</span> },
                                { ln: 6, code: <><span style={{ color: '#ff7b72' }}>const</span> <span style={{ color: 'var(--accent)' }}>flag</span> = <span style={{ color: '#ff7b72' }}>await</span> client.<span style={{ color: '#d2a8ff' }}>isEnabled</span>{'('}</> },
                                { ln: 7, code: <>&nbsp;&nbsp;<span style={{ color: '#a5d6ff' }}>'new-checkout-flow'</span>,</> },
                                { ln: 8, code: <>&nbsp;&nbsp;{'{ '}<span style={{ color: '#d2a8ff' }}>userId</span>: user.<span style={{ color: 'var(--accent)' }}>id</span> {'}'}</> },
                                { ln: 9, code: ')' },
                                { ln: 10, code: '' },
                                { ln: 11, code: <><span style={{ color: '#ff7b72' }}>if</span> {'('}<span style={{ color: 'var(--accent)' }}>flag</span>.<span style={{ color: '#d2a8ff' }}>enabled</span>{')'} {'{'}</> },
                                { ln: 12, code: <>&nbsp;&nbsp;<span style={{ color: '#d2a8ff' }}>renderNewCheckout</span>{'()'}</> },
                                { ln: 13, code: '}' },
                            ].map(({ ln, code }) => (
                                <div key={ln} style={{ display: 'flex', gap: 16, lineHeight: 1.9 }}>
                                    <span style={{ color: 'rgba(125,133,144,0.4)', minWidth: 16, textAlign: 'right', userSelect: 'none' }}>{ln}</span>
                                    <span>{code}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <div style={{
                position: 'relative', zIndex: 1,
                borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
                padding: '36px 48px', display: 'flex',
                justifyContent: 'center', gap: 80, flexWrap: 'wrap'
            }}>
                {[
                    { num: '10M+', label: 'flag evaluations / day' },
                    { num: '<2ms', label: 'p99 response time' },
                    { num: '99.99%', label: 'uptime SLA' },
                    { num: '5 min', label: 'time to first flag' },
                ].map(({ num, label }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                        <div style={{
                            fontFamily: 'var(--font-display)', fontSize: 40,
                            fontWeight: 800, letterSpacing: '-1px',
                            background: 'linear-gradient(135deg, var(--accent), var(--cyan))',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>{num}</div>
                        <div style={{
                            fontSize: 13, color: 'var(--muted)',
                            marginTop: 4, fontFamily: 'var(--font-mono)'
                        }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* Features */}
            <section style={{
                position: 'relative', zIndex: 1,
                maxWidth: 1200, margin: '0 auto', padding: '100px 48px'
            }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: 2, marginBottom: 16 }}>
          // platform capabilities
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)',
                    fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16
                }}>
                    Everything you need<br />to ship with confidence.
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: 17, fontWeight: 300, marginBottom: 64, lineHeight: 1.7 }}>
                    One platform for flags, experiments, and rollouts.
                </p>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1, background: 'var(--border)',
                    border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden'
                }}>
                    {[
                        { icon: '🚩', title: 'Feature Flags', desc: 'Toggle any feature on or off in real time. No redeploy, no downtime.', color: 'rgba(58,240,122,0.1)', border: 'rgba(58,240,122,0.2)' },
                        { icon: '🧪', title: 'A/B Testing', desc: 'Run statistically significant experiments with full confidence intervals.', color: 'rgba(27,229,255,0.1)', border: 'rgba(27,229,255,0.2)' },
                        { icon: '🎯', title: 'User Targeting', desc: 'Target by attributes, cohorts, percentages — no code changes needed.', color: 'rgba(247,201,72,0.1)', border: 'rgba(247,201,72,0.2)' },
                        { icon: '📊', title: 'Analytics Pipeline', desc: 'Async event ingestion built on message queues. Never lose an event.', color: 'rgba(255,79,106,0.1)', border: 'rgba(255,79,106,0.2)' },
                        { icon: '🏢', title: 'Multi-tenant SaaS', desc: 'Full project isolation per client with role-based access control.', color: 'rgba(188,139,255,0.1)', border: 'rgba(188,139,255,0.2)' },
                        { icon: '⚡', title: 'Edge-Cached SDK', desc: 'Sub-2ms flag evaluations backed by Redis. Lightweight JS SDK.', color: 'rgba(100,160,255,0.1)', border: 'rgba(100,160,255,0.2)' },
                    ].map(({ icon, title, desc, color, border }) => (
                        <div key={title} style={{
                            background: 'var(--bg2)', padding: '36px 32px',
                            transition: 'background 0.2s'
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg2)'}
                        >
                            <div style={{
                                width: 44, height: 44, borderRadius: 10, fontSize: 20,
                                display: 'grid', placeItems: 'center', marginBottom: 20,
                                background: color, border: `1px solid ${border}`
                            }}>{icon}</div>
                            <h3 style={{
                                fontFamily: 'var(--font-display)', fontSize: 18,
                                fontWeight: 700, marginBottom: 10, letterSpacing: '-0.3px'
                            }}>{title}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{
                position: 'relative', zIndex: 1,
                textAlign: 'center', padding: '100px 48px',
                maxWidth: 700, margin: '0 auto'
            }}>
                <h2 style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,5vw,62px)',
                    fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.05, marginBottom: 20
                }}>
                    Ready to ship<br /><span style={{ color: 'var(--accent)' }}>without fear?</span>
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: 17, fontWeight: 300, marginBottom: 40, lineHeight: 1.7 }}>
                    Join engineering teams using Testify to roll out features safely and move faster than ever.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/auth?tab=signup')} style={{
                        background: 'var(--accent)', color: '#080c10', border: 'none',
                        padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 500,
                        display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer'
                    }}>
                        Start for free
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button onClick={() => navigate('/auth?tab=signin')} style={{
                        background: 'none', border: '1px solid var(--border2)',
                        color: 'var(--text)', padding: '13px 28px', borderRadius: 10,
                        fontSize: 16, cursor: 'pointer'
                    }}>
                        Talk to sales
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                position: 'relative', zIndex: 1,
                borderTop: '1px solid var(--border)', padding: '32px 48px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: 16
            }}>
                <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                    © 2025 Testify, Inc. — v1.0.0-beta
                </span>
                <div style={{ display: 'flex', gap: 24 }}>
                    {['Privacy', 'Terms', 'Status', 'Docs'].map(item => (
                        <a key={item} href="#" style={{ fontSize: 13, color: 'var(--muted)' }}
                            onMouseEnter={e => e.target.style.color = 'var(--text)'}
                            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                        >{item}</a>
                    ))}
                </div>
            </footer>
        </div>
    )
}