'use client'

import { useState } from 'react'

export function Reveal({
  label = '선배 PR 읽기 가이드 열기',
  title = '선배 PR 읽기 가이드',
  children,
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={open ? 'notion-reveal notion-reveal--open' : 'notion-reveal'}>
      {!open ? (
        <button className="notion-reveal__trigger" onClick={() => setOpen(true)}>
          <span className="notion-reveal__caret" aria-hidden="true">
            ▸
          </span>
          {label}
        </button>
      ) : (
        <div>
          <div className="notion-reveal__header">
            <span className="notion-reveal__title">
              <span className="notion-reveal__caret" aria-hidden="true">
                ▾
              </span>
              {title}
            </span>
            <button className="notion-reveal__close" onClick={() => setOpen(false)}>
              닫기
            </button>
          </div>
          <div className="notion-reveal__content">{children}</div>
        </div>
      )}
    </div>
  )
}
