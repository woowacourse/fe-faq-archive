'use client'

import { useState } from 'react'

export function Reveal({ label = '탐색 미션 열기', children }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginTop: '2rem' }}>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            fontSize: '0.95rem',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {label} →
        </button>
      ) : (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#8b5cf6',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              탐색 미션
            </span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                color: '#9ca3af',
              }}
            >
              닫기
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}
