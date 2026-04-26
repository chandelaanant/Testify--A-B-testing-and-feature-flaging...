import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { loginUser, registerUser } from '../services/api'


export default function Auth() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [tab, setTab] = useState('signin')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPwd, setShowPwd] = useState(false)
    const [strength, setStrength] = useState(0)
    const { login } = useAuth()

    useEffect(() => {
        const t = searchParams.get('tab')
        if (t === 'signup') setTab('signup')
    }, [searchParams])

    function checkStrength(val) {
        let score = 0
        if (val.length >= 8) score++
        if (val.length >= 12) score++
        if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++
        if (/[^A-Za-z0-9]/.test(val)) score++
        setStrength(score)
    }

    async function handleSignin(e) {
        e.preventDefault()
        const email = e.target.email.value
        const pwd = e.target.password.value
        if (!email || !pwd) { setError('Please fill in all fields.'); return }
        setError('')
        setLoading(true)
        try {
            const userData = await loginUser(email, pwd)
            login(userData)
            navigate('/role-selection') // or '/dashboard' depending on your flow
        } catch (err) {
            setError('Invalid email or password.')
        } finally {
            setLoading(false)
        }
    }
    async function handleSignup(e) {
        e.preventDefault()
        const name = `${e.target.first.value} ${e.target.last.value}`
        const email = e.target.email.value
        const pwd = e.target.password.value
        const terms = e.target.terms.checked
        if (!terms) { setError('Please accept the Terms of Service.'); return }
        if (!name || !email || !pwd) { setError('Please fill in all fields.'); return }
        setError('')
        setLoading(true)
        try {
            const userData = await registerUser(name, email, pwd)
            login(userData)
            navigate('/role-selection')
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }    /*function handleSignup(e) {
        e.preventDefault()
        const terms = e.target.terms.checked
        if (!terms) { setError('Please accept the Terms of Service.'); return }
        setError('')
        // TODO: POST /api/auth/register
        alert('Connect to your Node.js /api/auth/register endpoint!')
    }*/

    const strengthColors = ['', '#ff4f6a', '#ff4f6a', '#f7c948', '#3af07a']
    const strengthLabels = ['', 'Weak', 'Weak', 'Good', 'Strong']

    return (
        <div className="grid-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            <Navbar />

            <div style={{
                flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr',
                minHeight: 'calc(100vh - 61px)', marginTop: 61
            }}>

                {/* ── Left: Form ── */}
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '64px 72px', borderRight: '1px solid var(--border)'
                }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: 2, marginBottom: 12 }}>
            // authentication
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800,
                        letterSpacing: '-1px', marginBottom: 8
                    }}>
                        {tab === 'signin' ? 'Welcome back.' : 'Create your account.'}
                    </h1>
                    <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32, fontWeight: 300 }}>
                        {tab === 'signin' ? (
                            <>New to Testify?{' '}
                                <span onClick={() => { setTab('signup'); setError('') }}
                                    style={{ color: 'var(--accent)', cursor: 'pointer' }}>
                                    Create a free account
                                </span>
                            </>
                        ) : (
                            <>Already have an account?{' '}
                                <span onClick={() => { setTab('signin'); setError('') }}
                                    style={{ color: 'var(--accent)', cursor: 'pointer' }}>
                                    Sign in
                                </span>
                            </>
                        )}
                    </p>

                    {/* Tabs */}
                    <div style={{
                        display: 'flex', background: 'var(--bg2)',
                        border: '1px solid var(--border2)', borderRadius: 10,
                        padding: 4, marginBottom: 24
                    }}>
                        {['signin', 'signup'].map(t => (
                            <button key={t} onClick={() => { setTab(t); setError('') }} style={{
                                flex: 1, padding: '9px', border: tab === t ? '1px solid var(--border2)' : 'none',
                                background: tab === t ? 'var(--bg3)' : 'none',
                                color: tab === t ? 'var(--text)' : 'var(--muted)',
                                borderRadius: 7, fontSize: 14, fontWeight: 500,
                                transition: 'all 0.2s', cursor: 'pointer'
                            }}>
                                {t === 'signin' ? 'Sign in' : 'Sign up'}
                            </button>
                        ))}
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: 'rgba(255,79,106,0.08)', border: '1px solid rgba(255,79,106,0.2)',
                            borderRadius: 8, padding: '10px 14px', fontSize: 13,
                            color: 'var(--red)', marginBottom: 16
                        }}>{error}</div>
                    )}

                    {/* ── Sign In Form ── */}
                    {tab === 'signin' && (
                        <form onSubmit={handleSignin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 500 }}>Work email</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" /><path d="M1 5l6.5 4L14 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                                    </span>
                                    <input name="email" type="email" placeholder="you@company.com" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 500 }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="5.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M5 5.5V4a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.2" /></svg>
                                    </span>
                                    <input name="password" type={showPwd ? 'text' : 'password'} placeholder="Your password" style={inputStyle} />
                                    <button type="button" onClick={() => setShowPwd(p => !p)} style={{
                                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', color: showPwd ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer'
                                    }}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 7.5C1 7.5 3.5 3 7.5 3s6.5 4.5 6.5 4.5-2.5 4.5-6.5 4.5S1 7.5 1 7.5z" stroke="currentColor" strokeWidth="1.2" /><circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>
                                    </button>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: 12, color: 'var(--muted)', cursor: 'pointer' }}>Forgot password?</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
                                <input name="remember" type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)', width: 15, height: 15 }} />
                                Keep me signed in for 30 days
                            </div>

                            <button type="submit" style={submitStyle} disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign in →'}
                            </button>

                            <Divider />
                            <SocialBtns />
                        </form>
                    )}

                    {/* ── Sign Up Form ── */}
                    {tab === 'signup' && (
                        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <label style={{ fontSize: 13, fontWeight: 500 }}>First name</label>
                                    <input name="first" type="text" placeholder="Ada" style={inputStyle} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <label style={{ fontSize: 13, fontWeight: 500 }}>Last name</label>
                                    <input name="last" type="text" placeholder="Lovelace" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 500 }}>Work email</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" /><path d="M1 5l6.5 4L14 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                                    </span>
                                    <input name="email" type="email" placeholder="ada@company.com" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 500 }}>Company name</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M5 13V9h4v4M1.5 6h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                                    </span>
                                    <input name="company" type="text" placeholder="Acme Corp" style={inputStyle} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <label style={{ fontSize: 13, fontWeight: 500 }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="5.5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M5 5.5V4a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.2" /></svg>
                                    </span>
                                    <input name="password" type={showPwd ? 'text' : 'password'}
                                        placeholder="Min. 8 characters" style={inputStyle}
                                        onChange={e => checkStrength(e.target.value)} />
                                    <button type="button" onClick={() => setShowPwd(p => !p)} style={{
                                        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', color: showPwd ? 'var(--accent)' : 'var(--muted)', cursor: 'pointer'
                                    }}>
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 7.5C1 7.5 3.5 3 7.5 3s6.5 4.5 6.5 4.5-2.5 4.5-6.5 4.5S1 7.5 1 7.5z" stroke="currentColor" strokeWidth="1.2" /><circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>
                                    </button>
                                </div>
                                {/* Strength bar */}
                                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} style={{
                                            flex: 1, height: 3, borderRadius: 2,
                                            background: i <= strength ? strengthColors[strength] : 'var(--border2)',
                                            transition: 'background 0.3s'
                                        }} />
                                    ))}
                                </div>
                                {strength > 0 && (
                                    <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: strengthColors[strength] }}>
                                        {strengthLabels[strength]}
                                    </span>
                                )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--muted)' }}>
                                <input name="terms" type="checkbox" style={{ accentColor: 'var(--accent)', width: 15, height: 15, marginTop: 2 }} />
                                <span>I agree to the <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>Privacy Policy</span></span>
                            </div>

                            <button type="submit" style={submitStyle}>
                                Create account
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>

                            <Divider />
                            <SocialBtns />
                        </form>
                    )}
                </div>

                {/* ── Right: Preview ── */}
                <div style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    padding: '64px 72px', background: 'var(--bg2)', position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            background: 'rgba(58,240,122,0.08)', border: '1px solid rgba(58,240,122,0.18)',
                            borderRadius: 100, padding: '4px 12px',
                            fontFamily: 'var(--font-mono)', fontSize: 11,
                            color: 'var(--accent)', marginBottom: 28
                        }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
                            Live platform preview
                        </div>

                        <h2 style={{
                            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
                            letterSpacing: '-0.8px', lineHeight: 1.2, marginBottom: 12
                        }}>
                            Control your features.<br />Own your experiments.
                        </h2>
                        <p style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300, lineHeight: 1.7, marginBottom: 40, maxWidth: 360 }}>
                            Manage every flag and test from one dashboard. Real-time changes, zero deploys.
                        </p>

                        {/* Mini dashboard */}
                        <div style={{
                            background: 'var(--bg)', border: '1px solid var(--border2)',
                            borderRadius: 14, overflow: 'hidden', marginBottom: 24
                        }}>
                            <div style={{
                                background: 'var(--bg3)', borderBottom: '1px solid var(--border)',
                                padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                            }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                                    feature-flags / production
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)' }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
                                    live
                                </span>
                            </div>
                            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[
                                    { name: 'new-onboarding-v3', sub: '25% rollout · new users', on: true },
                                    { name: 'ai-assistant-beta', sub: 'pro plan · all regions', on: true },
                                    { name: 'legacy-payment-flow', sub: 'deprecated · 0% rollout', on: false },
                                ].map(({ name, sub, on }) => (
                                    <div key={name} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '10px 14px', background: 'var(--bg2)',
                                        border: '1px solid var(--border)', borderRadius: 8
                                    }}>
                                        <div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{name}</div>
                                            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{sub}</div>
                                        </div>
                                        <div style={{
                                            width: 32, height: 18, borderRadius: 9, position: 'relative',
                                            background: on ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                            transition: 'background 0.2s', flexShrink: 0
                                        }}>
                                            <div style={{
                                                position: 'absolute', width: 12, height: 12,
                                                borderRadius: '50%', background: 'white',
                                                top: 3, left: on ? 17 : 3, transition: 'left 0.2s'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial */}
                        <div style={{
                            background: 'var(--bg3)', border: '1px solid var(--border)',
                            borderRadius: 12, padding: '20px 22px'
                        }}>
                            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65, fontWeight: 300, marginBottom: 14 }}>
                                "Testify cut our release risk to nearly zero. We went from 2-week deploy cycles to shipping 10x a day."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{
                                    width: 30, height: 30, borderRadius: '50%',
                                    background: 'rgba(58,240,122,0.2)', color: 'var(--accent)',
                                    display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 600
                                }}>SR</div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 500 }}>Sarah R.</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>VP Engineering · Fintech startup</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

// ── Shared sub-components ──

const inputStyle = {
    width: '100%', background: 'var(--bg2)',
    border: '1px solid var(--border2)', color: 'var(--text)',
    fontFamily: 'var(--font-body)', fontSize: 14,
    padding: '11px 14px 11px 40px', borderRadius: 8, outline: 'none',
}

const submitStyle = {
    width: '100%', background: 'var(--accent)', color: '#080c10',
    border: 'none', padding: 13, borderRadius: 8,
    fontSize: 15, fontWeight: 500, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 4
}

function Divider() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--muted)', fontSize: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border2)' }} />
            or continue with
            <div style={{ flex: 1, height: 1, background: 'var(--border2)' }} />
        </div>
    )
}

function SocialBtns() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
                { label: 'Google', icon: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="#7d8590" /></svg> },
                { label: 'GitHub', icon: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" fill="#7d8590" /></svg> },
            ].map(({ label, icon }) => (
                <button key={label} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: 10, background: 'var(--bg2)', border: '1px solid var(--border2)',
                    borderRadius: 8, color: 'var(--text)', fontSize: 13, cursor: 'pointer'
                }}>
                    {icon} {label}
                </button>
            ))}
        </div>
    )
}