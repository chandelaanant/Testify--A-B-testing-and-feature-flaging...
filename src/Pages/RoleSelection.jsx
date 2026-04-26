import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { setRoleUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

const roles = [
    {
        id: 'admin', title: 'Admin', icon: '🛡️',
        desc: 'Full access to everything. Manage team members, billing, projects, and all feature flags.',
        perms: ['Manage team & billing', 'Create & delete projects', 'Full flag & experiment control', 'View all analytics'],
        color: 'rgba(255,79,106,0.1)', border: 'rgba(255,79,106,0.25)', accent: '#ff4f6a',
    },
    {
        id: 'developer', title: 'Developer', icon: '⚡',
        desc: 'Create and manage feature flags, run A/B experiments, and integrate the SDK.',
        perms: ['Create & toggle flags', 'Run A/B experiments', 'Manage targeting rules', 'View project analytics'],
        color: 'rgba(58,240,122,0.1)', border: 'rgba(58,240,122,0.25)', accent: '#3af07a',
    },
    {
        id: 'viewer', title: 'Viewer', icon: '👁️',
        desc: 'Read-only access to analytics, flag states, and experiment results. No editing allowed.',
        perms: ['View all flags', 'View experiment results', 'View analytics dashboard', 'No edit permissions'],
        color: 'rgba(27,229,255,0.1)', border: 'rgba(27,229,255,0.25)', accent: '#1be5ff',
    },
]

export default function RoleSelection() {
    const navigate = useNavigate()
    const { user } = useAuth()          // ✅ inside the component
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)

    async function handleContinue() {
        if (!selected) return           // ✅ guard first
        setLoading(true)
        try {
            await setRoleUser(user.id, selected)  // ✅ single call, correct args
            navigate('/dashboard')
        } catch (err) {
            console.error('Failed to set role:', err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="grid-bg" style={{ minHeight: '100vh' }}>
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            <Navbar />

            <section style={{
                position: 'relative', zIndex: 1,
                maxWidth: 900, margin: '0 auto',
                padding: '140px 48px 80px',
                display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>

                {/* Header */}
                <div className="fade-up-1" style={{ textAlign: 'center', marginBottom: 56 }}>
                    <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)',
                        letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16
                    }}>
            // step 2 of 2
                    </div>
                    <h1 style={{
                        fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)',
                        fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: 16
                    }}>
                        What's your role?
                    </h1>
                    <p style={{
                        color: 'var(--muted)', fontSize: 16, fontWeight: 300,
                        lineHeight: 1.7, maxWidth: 480
                    }}>
                        Choose how you'll be using Testify. You can change this later from your account settings.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="fade-up-2" style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 16, width: '100%', marginBottom: 40
                }}>
                    {roles.map(role => (
                        <div key={role.id} onClick={() => setSelected(role.id)} style={{
                            background: selected === role.id ? role.color : 'var(--bg2)',
                            border: `1px solid ${selected === role.id ? role.border : 'var(--border2)'}`,
                            borderRadius: 16, padding: '28px 24px',
                            cursor: 'pointer', transition: 'all 0.2s',
                            position: 'relative', overflow: 'hidden',
                            transform: selected === role.id ? 'translateY(-4px)' : 'none',
                            boxShadow: selected === role.id ? `0 8px 32px ${role.color}` : 'none',
                        }}>

                            {/* Selected checkmark */}
                            {selected === role.id && (
                                <div style={{
                                    position: 'absolute', top: 16, right: 16,
                                    width: 22, height: 22, borderRadius: '50%',
                                    background: role.accent, display: 'grid', placeItems: 'center'
                                }}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6l3 3 5-5" stroke="#080c10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}

                            {/* Icon */}
                            <div style={{
                                width: 52, height: 52, borderRadius: 12, fontSize: 24,
                                display: 'grid', placeItems: 'center', marginBottom: 20,
                                background: role.color, border: `1px solid ${role.border}`
                            }}>{role.icon}</div>

                            {/* Title */}
                            <h3 style={{
                                fontFamily: 'var(--font-display)', fontSize: 20,
                                fontWeight: 700, marginBottom: 10, letterSpacing: '-0.3px',
                                color: selected === role.id ? role.accent : 'var(--text)'
                            }}>{role.title}</h3>

                            {/* Description */}
                            <p style={{
                                fontSize: 13, color: 'var(--muted)', lineHeight: 1.65,
                                fontWeight: 300, marginBottom: 20
                            }}>{role.desc}</p>

                            {/* Permissions list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {role.perms.map(perm => (
                                    <div key={perm} style={{
                                        display: 'flex', alignItems: 'center', gap: 8, fontSize: 12
                                    }}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <circle cx="6" cy="6" r="5" stroke={role.accent} strokeWidth="1" />
                                            <path d="M3.5 6l2 2 3-3" stroke={role.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span style={{ color: 'var(--muted)' }}>{perm}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Continue button */}
                <div className="fade-up-3" style={{ width: '100%', maxWidth: 360 }}>
                    <button onClick={handleContinue} disabled={!selected} style={{
                        width: '100%', padding: '14px',
                        background: selected ? 'var(--accent)' : 'var(--bg3)',
                        color: selected ? '#080c10' : 'var(--muted)',
                        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border2)'}`,
                        borderRadius: 10, fontSize: 15, fontWeight: 500,
                        cursor: selected ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                    }}>
                        {loading ? (
                            <>Setting up your workspace...</>
                        ) : (
                            <>
                                Continue to Dashboard
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                    <path d="M2 7.5h11M8.5 3l4.5 4.5L8.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        )}
                    </button>
                    {!selected && (
                        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
                            Select a role to continue
                        </p>
                    )}
                </div>

            </section>
        </div>
    )
}