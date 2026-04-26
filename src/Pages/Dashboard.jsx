import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllFlags, getAllExperiments, createFlag, updateFlag, deleteFlag, createExperiment, deleteExperiment } from '../services/api'

const activity = [
    { action: 'Flag enabled', target: 'new-checkout-flow', user: 'you', time: '2m ago', color: '#3af07a' },
    { action: 'Experiment started', target: 'Checkout CTA Test', user: 'you', time: '1h ago', color: '#1be5ff' },
    { action: 'Flag disabled', target: 'ai-recommendations', user: 'you', time: '3h ago', color: '#ff4f6a' },
    { action: 'Flag created', target: 'beta-analytics', user: 'you', time: '1d ago', color: '#f7c948' },
    { action: 'Experiment ended', target: 'Pricing Page Layout', user: 'you', time: '2d ago', color: '#7d8590' },
]

const navItems = [
    { id: 'overview', label: 'Overview', icon: '▦' },
    { id: 'flags', label: 'Feature Flags', icon: '⚑' },
    { id: 'experiments', label: 'Experiments', icon: '⚗' },
    { id: 'analytics', label: 'Analytics', icon: '↗' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
]

export default function Dashboard() {
    const navigate = useNavigate()
    const [activeNav, setActiveNav] = useState('overview')
    const [flags, setFlags] = useState([])
    const [experiments, setExperiments] = useState([])
    const [loading, setLoading] = useState(true)
    const [flagStates, setFlagStates] = useState([])
    const [showFlagModal, setShowFlagModal] = useState(false)
    const [newFlag, setNewFlag] = useState({ key: '', is_enabled: true, rollout_percentage: 100 })
    const [showExpModal, setShowExpModal] = useState(false)
    const [newExp, setNewExp] = useState({ name: '', is_active: true })

    useEffect(() => {
        async function fetchData() {
            try {
                const [flagsData, experimentsData] = await Promise.all([
                    getAllFlags(),
                    getAllExperiments()
                ])
                setFlags(flagsData)
                setFlagStates(flagsData.map(f => f.is_enabled))
                setExperiments(experimentsData)
            } catch (err) {
                console.error('Failed to load dashboard data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    async function toggleFlag(i) {
        const flag = flags[i]
        const newState = !flagStates[i]
        setFlagStates(prev => prev.map((s, idx) => idx === i ? newState : s))
        try {
            await updateFlag(flag.key, newState, flag.rollout_percentage)
        } catch (err) {
            console.error('Failed to persist toggle:', err)
            setFlagStates(prev => prev.map((s, idx) => idx === i ? !newState : s))
        }
    }

    async function handleCreateFlag() {
        try {
            const created = await createFlag(newFlag.key, newFlag.is_enabled, newFlag.rollout_percentage)
            setFlags(prev => [...prev, created])
            setFlagStates(prev => [...prev, created.is_enabled])
            setShowFlagModal(false)
            setNewFlag({ key: '', is_enabled: true, rollout_percentage: 100 })
        } catch (err) {
            console.error('Failed to create flag:', err)
        }
    }

    async function handleDeleteFlag(key) {
        try {
            await deleteFlag(key)
            const updated = flags.filter(f => f.key !== key)
            setFlags(updated)
            setFlagStates(updated.map(f => f.is_enabled))
        } catch (err) {
            console.error('Failed to delete flag:', err)
        }
    }

    async function handleCreateExperiment() {
        try {
            const created = await createExperiment(newExp.name, newExp.is_active)
            setExperiments(prev => [...prev, created])
            setShowExpModal(false)
            setNewExp({ name: '', is_active: true })
        } catch (err) {
            console.error('Failed to create experiment:', err)
        }
    }

    async function handleDeleteExperiment(id) {
        try {
            await deleteExperiment(id)
            setExperiments(prev => prev.filter(e => e.id !== id))
        } catch (err) {
            console.error('Failed to delete experiment:', err)
        }
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
            {loading && <div style={{ padding: 40, color: 'var(--muted)' }}>Loading...</div>}

            {/* ── Sidebar ── */}
            <aside style={{
                width: 240, flexShrink: 0,
                background: 'var(--bg2)',
                borderRight: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column',
                position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50
            }}>
                {/* Logo */}
                <div style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: 10
                }}>
                    <div style={{
                        width: 30, height: 30, background: 'var(--accent)',
                        borderRadius: 7, display: 'grid', placeItems: 'center', flexShrink: 0
                    }}>
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                            <rect x="2" y="8" width="5" height="8" rx="1.5" fill="#080c10" />
                            <rect x="9" y="4" width="5" height="12" rx="1.5" fill="#080c10" />
                            <circle cx="4.5" cy="5" r="2.5" fill="#080c10" />
                        </svg>
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
                        Testify
                    </span>
                </div>

                {/* Project selector */}
                <div style={{ padding: '16px 16px 8px' }}>
                    <div style={{
                        padding: '10px 12px', background: 'var(--bg3)',
                        border: '1px solid var(--border2)', borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        cursor: 'pointer'
                    }}>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 500 }}>Acme Corp</div>
                            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>production</div>
                        </div>
                        <span style={{ color: 'var(--muted)', fontSize: 12 }}>⌄</span>
                    </div>
                </div>

                {/* Nav items */}
                <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {navItems.map(({ id, label, icon }) => (
                        <button key={id} onClick={() => setActiveNav(id)} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '9px 12px', borderRadius: 8, border: 'none',
                            background: activeNav === id ? 'rgba(58,240,122,0.08)' : 'none',
                            color: activeNav === id ? 'var(--accent)' : 'var(--muted)',
                            fontSize: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
                            transition: 'all 0.15s',
                            borderLeft: activeNav === id ? '2px solid var(--accent)' : '2px solid transparent',
                        }}>
                            <span style={{ fontSize: 16 }}>{icon}</span>
                            {label}
                        </button>
                    ))}
                </nav>

                {/* User */}
                <div style={{
                    padding: '16px', borderTop: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: 10
                }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'rgba(58,240,122,0.15)', color: 'var(--accent)',
                        display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600, flexShrink: 0
                    }}>A</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>Anant</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Admin</div>
                    </div>
                    <button onClick={() => navigate('/')} style={{
                        background: 'none', border: 'none', color: 'var(--muted)',
                        cursor: 'pointer', fontSize: 16, padding: 4
                    }} title="Logout">⏻</button>
                </div>
            </aside>

            {/* ── Main content ── */}
            <div style={{ marginLeft: 240, flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Top bar */}
                <header style={{
                    position: 'sticky', top: 0, zIndex: 40,
                    background: 'rgba(8,12,16,0.8)', backdropFilter: 'blur(16px)',
                    borderBottom: '1px solid var(--border)',
                    padding: '14px 32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div>
                        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.5px' }}>
                            Overview
                        </h1>
                        <p style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
                            Last updated: just now
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ position: 'relative' }}>
                            <input placeholder="Search flags..." style={{
                                background: 'var(--bg2)', border: '1px solid var(--border2)',
                                color: 'var(--text)', padding: '8px 14px 8px 36px',
                                borderRadius: 8, fontSize: 13, outline: 'none', width: 200,
                                fontFamily: 'var(--font-body)'
                            }} />
                            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 14 }}>⌕</span>
                        </div>
                        <button onClick={() => setShowFlagModal(true)} style={{
                            background: 'var(--accent)', border: 'none',
                            color: '#080c10', padding: '8px 16px',
                            borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer'
                        }}>+ New Flag</button>
                    </div>
                </header>

                {/* Page content */}
                <main style={{ padding: '32px', flex: 1 }}>

                    {/* Stats cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
                        {[
                            { label: 'Active Flags', value: flags.filter((_, i) => flagStates[i]).length.toString(), sub: 'live flags', color: '#3af07a', icon: '🚩' },
                            { label: 'Running Experiments', value: experiments.filter(e => e.is_active).length.toString(), sub: 'active now', color: '#1be5ff', icon: '🧪' },
                            { label: 'Events Today', value: '48.2K', sub: '↑ 12% vs yesterday', color: '#f7c948', icon: '📊' },
                            { label: 'Team Members', value: '6', sub: '2 pending invite', color: '#d2a8ff', icon: '👥' },
                        ].map(({ label, value, sub, color, icon }) => (
                            <div key={label} style={{
                                background: 'var(--bg2)', border: '1px solid var(--border)',
                                borderRadius: 12, padding: '20px 24px', transition: 'border-color 0.2s'
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <span style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</span>
                                    <span style={{ fontSize: 20 }}>{icon}</span>
                                </div>
                                <div style={{
                                    fontFamily: 'var(--font-display)', fontSize: 32,
                                    fontWeight: 800, letterSpacing: '-1px', color, marginBottom: 4
                                }}>{value}</div>
                                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Flags + Activity row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 24 }}>

                        {/* Feature flags */}
                        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{
                                padding: '16px 20px', borderBottom: '1px solid var(--border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 15 }}>Feature Flags</div>
                                    <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>production environment</div>
                                </div>
                                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{flags.length} flags</span>
                            </div>
                            <div>
                                {flags.map((flag, i) => (
                                    <div key={flag.key} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '14px 20px',
                                        borderBottom: i < flags.length - 1 ? '1px solid var(--border)' : 'none',
                                        transition: 'background 0.15s'
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, marginBottom: 3 }}>{flag.key}</div>
                                            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{flag.rollout_percentage}% rollout</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{
                                                fontSize: 11, fontFamily: 'var(--font-mono)',
                                                background: 'var(--bg3)', padding: '3px 10px',
                                                borderRadius: 100, color: 'var(--muted)'
                                            }}>{flag.rollout_percentage}%</span>
                                            {/* Toggle */}
                                            <div onClick={() => toggleFlag(i)} style={{
                                                width: 40, height: 22, borderRadius: 11, position: 'relative',
                                                background: flagStates[i] ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                                cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0
                                            }}>
                                                <div style={{
                                                    position: 'absolute', width: 16, height: 16,
                                                    borderRadius: '50%', background: 'white',
                                                    top: 3, left: flagStates[i] ? 21 : 3,
                                                    transition: 'left 0.2s'
                                                }} />
                                            </div>
                                            {/* Delete */}
                                            <button onClick={() => handleDeleteFlag(flag.key)} style={{
                                                background: 'none', border: 'none',
                                                color: '#ff4f6a', cursor: 'pointer', fontSize: 16, padding: '0 4px'
                                            }}>✕</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Activity feed */}
                        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                                <div style={{ fontWeight: 600, fontSize: 15 }}>Recent Activity</div>
                                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>last 7 days</div>
                            </div>
                            <div style={{ padding: '8px 0' }}>
                                {activity.map(({ action, target, time, color }, i) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: 12, padding: '12px 20px',
                                        borderBottom: i < activity.length - 1 ? '1px solid var(--border)' : 'none'
                                    }}>
                                        <div style={{
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: color, marginTop: 5, flexShrink: 0
                                        }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, marginBottom: 2 }}>
                                                <span style={{ color: 'var(--muted)' }}>{action}: </span>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{target}</span>
                                            </div>
                                            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Experiments */}
                    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                        <div style={{
                            padding: '16px 20px', borderBottom: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 15 }}>A/B Experiments</div>
                                <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{experiments.length} experiments</div>
                            </div>
                            <button onClick={() => setShowExpModal(true)} style={{
                                background: 'none', border: '1px solid var(--border2)',
                                color: 'var(--text)', padding: '6px 14px',
                                borderRadius: 7, fontSize: 12, cursor: 'pointer'
                            }}>+ New Experiment</button>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                        {['Experiment', 'Variants', 'Traffic', 'Conversion', 'Status', ''].map(h => (
                                            <th key={h} style={{
                                                padding: '10px 20px', textAlign: 'left',
                                                fontSize: 11, color: 'var(--muted)',
                                                fontFamily: 'var(--font-mono)', fontWeight: 500,
                                                textTransform: 'uppercase', letterSpacing: 1
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {experiments.map((exp, i) => (
                                        <tr key={exp.id} style={{
                                            borderBottom: i < experiments.length - 1 ? '1px solid var(--border)' : 'none',
                                            transition: 'background 0.15s', cursor: 'pointer'
                                        }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500 }}>{exp.name}</td>
                                            <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>-</td>
                                            <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>-</td>
                                            <td style={{ padding: '14px 20px', fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>-</td>
                                            <td style={{ padding: '14px 20px' }}>
                                                <span style={{
                                                    fontSize: 11, fontFamily: 'var(--font-mono)',
                                                    padding: '3px 10px', borderRadius: 100,
                                                    background: exp.is_active ? 'rgba(58,240,122,0.1)' : 'rgba(125,133,144,0.1)',
                                                    color: exp.is_active ? 'var(--accent)' : 'var(--muted)',
                                                    border: `1px solid ${exp.is_active ? 'rgba(58,240,122,0.2)' : 'var(--border2)'}`
                                                }}>
                                                    {exp.is_active && <span style={{ marginRight: 4 }}>●</span>}
                                                    {exp.is_active ? 'running' : 'completed'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 20px' }}>
                                                <button onClick={() => handleDeleteExperiment(exp.id)} style={{
                                                    background: 'none', border: 'none',
                                                    color: '#ff4f6a', cursor: 'pointer', fontSize: 16
                                                }}>✕</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </main>
            </div>

            {/* Flag Modal */}
            {showFlagModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                    display: 'grid', placeItems: 'center', zIndex: 100
                }}>
                    <div style={{
                        background: 'var(--bg2)', border: '1px solid var(--border2)',
                        borderRadius: 14, padding: 32, width: 400
                    }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 24 }}>New Feature Flag</h3>

                        <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Flag Key</label>
                        <input
                            value={newFlag.key}
                            onChange={e => setNewFlag(p => ({ ...p, key: e.target.value }))}
                            placeholder="e.g. new-checkout-flow"
                            style={{
                                width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
                                color: 'var(--text)', padding: '10px 14px', borderRadius: 8,
                                fontSize: 14, marginBottom: 16, boxSizing: 'border-box'
                            }}
                        />

                        <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Rollout %</label>
                        <input
                            type="number" min="0" max="100"
                            value={newFlag.rollout_percentage}
                            onChange={e => setNewFlag(p => ({ ...p, rollout_percentage: parseInt(e.target.value) }))}
                            style={{
                                width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
                                color: 'var(--text)', padding: '10px 14px', borderRadius: 8,
                                fontSize: 14, marginBottom: 16, boxSizing: 'border-box'
                            }}
                        />

                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={newFlag.is_enabled}
                                onChange={e => setNewFlag(p => ({ ...p, is_enabled: e.target.checked }))}
                            />
                            <span style={{ fontSize: 14 }}>Enabled</span>
                        </label>

                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={() => setShowFlagModal(false)} style={{
                                flex: 1, background: 'none', border: '1px solid var(--border2)',
                                color: 'var(--text)', padding: 10, borderRadius: 8, cursor: 'pointer'
                            }}>Cancel</button>
                            <button onClick={handleCreateFlag} style={{
                                flex: 1, background: 'var(--accent)', border: 'none',
                                color: '#080c10', padding: 10, borderRadius: 8,
                                fontWeight: 600, cursor: 'pointer'
                            }}>Create Flag</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Experiment Modal */}
            {showExpModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                    display: 'grid', placeItems: 'center', zIndex: 100
                }}>
                    <div style={{
                        background: 'var(--bg2)', border: '1px solid var(--border2)',
                        borderRadius: 14, padding: 32, width: 400
                    }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 24 }}>New Experiment</h3>

                        <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Experiment Name</label>
                        <input
                            value={newExp.name}
                            onChange={e => setNewExp(p => ({ ...p, name: e.target.value }))}
                            placeholder="e.g. Checkout CTA Test"
                            style={{
                                width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)',
                                color: 'var(--text)', padding: '10px 14px', borderRadius: 8,
                                fontSize: 14, marginBottom: 16, boxSizing: 'border-box'
                            }}
                        />

                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={newExp.is_active}
                                onChange={e => setNewExp(p => ({ ...p, is_active: e.target.checked }))}
                            />
                            <span style={{ fontSize: 14 }}>Active</span>
                        </label>

                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={() => setShowExpModal(false)} style={{
                                flex: 1, background: 'none', border: '1px solid var(--border2)',
                                color: 'var(--text)', padding: 10, borderRadius: 8, cursor: 'pointer'
                            }}>Cancel</button>
                            <button onClick={handleCreateExperiment} style={{
                                flex: 1, background: 'var(--accent)', border: 'none',
                                color: '#080c10', padding: 10, borderRadius: 8,
                                fontWeight: 600, cursor: 'pointer'
                            }}>Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}