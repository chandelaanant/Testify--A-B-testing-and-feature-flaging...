const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
// Auth
export async function loginUser(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Invalid credentials')
    return res.json()
}
export async function registerUser(name, email, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    if (!res.ok) throw new Error('Registration failed')
    return res.json()
}
// ✅ After
export async function setRoleUser(userId, role) {
    const res = await fetch(`${BASE_URL}/auth/role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, role })
    })
    if (!res.ok) throw new Error('Failed to set role')
    return res.json()
}// Decision
export async function getDecision(user_id, experiment_id) {
    const res = await fetch(`${BASE_URL}/decision/?user_id=${user_id}&experiment_id=${experiment_id}`)
    if (!res.ok) throw new Error('Failed to get decision')
    return res.json()
}

// Events
export async function trackEvent(data) {
    const res = await fetch(`${BASE_URL}/event/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to track event')
    return res.json()
}

// Feature Flags
export async function getFlag(key, user_id) {
    const res = await fetch(`${BASE_URL}/flag/${key}?user_id=${user_id}`)
    if (!res.ok) throw new Error('Failed to get flag')
    return res.json()
}

// Analytics
export async function getAnalytics(experiment_id) {
    const res = await fetch(`${BASE_URL}/analytics/${experiment_id}`)
    if (!res.ok) throw new Error('Failed to get analytics')
    return res.json()
}
// Get all flags
export async function getAllFlags() {
    const res = await fetch(`${BASE_URL}/flag/`)
    if (!res.ok) throw new Error('Failed to fetch flags')
    return res.json()
}

// Get all experiments
export async function getAllExperiments() {
    const res = await fetch(`${BASE_URL}/analytics/`)
    if (!res.ok) throw new Error('Failed to fetch experiments')
    return res.json()
}
export async function createFlag(key, is_enabled, rollout_percentage) {
    const res = await fetch(`${BASE_URL}/flag/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, is_enabled, rollout_percentage })
    })
    if (!res.ok) throw new Error('Failed to create flag')
    return res.json()
}

export async function updateFlag(key, is_enabled, rollout_percentage) {
    const res = await fetch(`${BASE_URL}/flag/${key}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, is_enabled, rollout_percentage })
    })
    if (!res.ok) throw new Error('Failed to update flag')
    return res.json()
}

export async function deleteFlag(key) {
    const res = await fetch(`${BASE_URL}/flag/${key}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete flag')
    return res.json()
}
export async function createExperiment(name, is_active) {
    const res = await fetch(`${BASE_URL}/analytics/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, is_active })
    })
    if (!res.ok) throw new Error('Failed to create experiment')
    return res.json()
}

export async function deleteExperiment(id) {
    const res = await fetch(`${BASE_URL}/analytics/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete experiment')
    return res.json()
}