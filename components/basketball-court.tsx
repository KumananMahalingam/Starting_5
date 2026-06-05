'use client'

import { motion } from 'framer-motion'

interface BasketballCourtProps {
  children: React.ReactNode
}

export function BasketballCourt({ children }: BasketballCourtProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/5]">
      {/* Court background with wood texture effect */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              oklch(0.32 0.05 45) 0px,
              oklch(0.35 0.06 45) 8px,
              oklch(0.30 0.04 40) 16px,
              oklch(0.34 0.05 48) 24px,
              oklch(0.31 0.04 42) 32px
            )
          `,
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Wood grain overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 3px,
                rgba(0,0,0,0.1) 4px,
                transparent 5px
              )
            `,
          }}
        />
      </div>

      {/* Court SVG with lines */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Court outline */}
        <rect
          x="20"
          y="20"
          width="360"
          height="460"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          rx="4"
        />

        {/* Half court line */}
        <line
          x1="20"
          y1="40"
          x2="380"
          y2="40"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
        />

        {/* Center circle (partial - just the arc visible) */}
        <motion.path
          d="M 140 40 A 60 60 0 0 1 260 40"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Three-point line */}
        <motion.path
          d="M 40 480 L 40 320 Q 40 180 200 180 Q 360 180 360 320 L 360 480"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        {/* Paint / Key */}
        <motion.rect
          x="120"
          y="320"
          width="160"
          height="160"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Free throw circle */}
        <motion.circle
          cx="200"
          cy="320"
          r="60"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* Rim */}
        <motion.circle
          cx="200"
          cy="440"
          r="12"
          fill="none"
          stroke="oklch(0.70 0.18 45)"
          strokeWidth="4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        />

        {/* Backboard */}
        <motion.line
          x1="160"
          y1="465"
          x2="240"
          y2="465"
          stroke="oklch(0.95 0 0)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        />

        {/* Restricted area */}
        <motion.path
          d="M 160 480 A 40 40 0 0 1 240 480"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
        />
      </svg>

      {/* Player positions container */}
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}
