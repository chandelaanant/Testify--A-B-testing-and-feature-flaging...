import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 48px',
            background: 'rgba(8,12,16,0.7)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)'
        }}>
            {/* Logo */}
            <Link to="/" style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 22, letterSpacing: '-0.5px', color: 'var(--text)'
            }}>
                <div style={{
                    width: 32, height: 32, background: 'var(--accent)',
                    borderRadius: 8, display: 'grid', placeItems: 'center'
                }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="2" y="8" width="5" height="8" rx="1.5" fill="#080c10" />
                        <rect x="9" y="4" width="5" height="12" rx="1.5" fill="#080c10" />
                        <circle cx="4.5" cy="5" r="2.5" fill="#080c10" />
                    </svg>
                </div>
                Testify
            </Link>

            {/* Links */}
            <ul style={{
                display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none'
            }}>
                {['Features', 'Docs', 'Pricing', 'Blog'].map(item => (
                    <li key={item}>
                        <a href="#" style={{
                            color: 'var(--muted)', fontSize: 14, fontWeight: 400,
                            transition: 'color 0.2s'
                        }}
                            onMouseEnter={e => e.target.style.color = 'var(--text)'}
                            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
                        >
                            {item}
                        </a>
                    </li>
                ))}
            </ul>

            {/* CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => navigate('/auth?tab=signin')} style={{
                    background: 'none', border: '1px solid var(--border2)',
                    color: 'var(--text)', padding: '8px 20px', borderRadius: 8,
                    fontSize: 14, transition: 'border-color 0.2s'
                }}>
                    Log in
                </button>
                <button onClick={() => navigate('/auth?tab=signup')} style={{
                    background: 'var(--accent)', color: '#080c10', border: 'none',
                    padding: '9px 22px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'opacity 0.2s'
                }}>
                    Get started
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </nav>
    )
}