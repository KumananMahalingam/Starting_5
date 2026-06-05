'use client'

import { motion } from 'framer-motion'

interface BasketballCourtProps {
  children: React.ReactNode
}

export function BasketballCourt({ children }: BasketballCourtProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[16/10]">
      {/* Court background with wood texture effect - vertical grain */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              oklch(0.32 0.05 45) 0px,
              oklch(0.35 0.06 45) 12px,
              oklch(0.30 0.04 40) 24px,
              oklch(0.34 0.05 48) 36px,
              oklch(0.31 0.04 42) 48px
            )
          `,
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Subtle vertical wood grain overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 4px,
                rgba(0,0,0,0.08) 5px,
                transparent 6px
              )
            `,
          }}
        />
      </div>

      {/* Court SVG with lines - wider aspect ratio */}
      <svg
        viewBox="0 0 640 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Court outline */}
        <rect
          x="20"
          y="20"
          width="600"
          height="360"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          rx="4"
        />

        {/* Half court line (top) */}
        <line
          x1="20"
          y1="20"
          x2="620"
          y2="20"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
        />

        {/* Center circle arc (at top) */}
        <motion.path
          d="M 260 20 A 60 60 0 0 1 380 20"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        {/* Three-point line - wider arc */}
        <motion.path
          d="M 60 380 L 60 200 Q 60 80 320 80 Q 580 80 580 200 L 580 380"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        {/* Paint / Key */}
        <motion.rect
          x="220"
          y="240"
          width="200"
          height="140"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* Free throw circle */}
        <motion.circle
          cx="320"
          cy="240"
          r="60"
          fill="none"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* Lane / Block marks - left side */}
        <motion.line
          x1="220"
          y1="290"
          x2="230"
          y2="290"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9 }}
        />
        <motion.line
          x1="220"
          y1="320"
          x2="230"
          y2="320"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.95 }}
        />
        <motion.line
          x1="220"
          y1="350"
          x2="230"
          y2="350"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1 }}
        />

        {/* Lane / Block marks - right side */}
        <motion.line
          x1="410"
          y1="290"
          x2="420"
          y2="290"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9 }}
        />
        <motion.line
          x1="410"
          y1="320"
          x2="420"
          y2="320"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.95 }}
        />
        <motion.line
          x1="410"
          y1="350"
          x2="420"
          y2="350"
          stroke="oklch(0.95 0 0)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1 }}
        />

        {/* Rim only - orange circle in paint */}
        <motion.circle
          cx="320"
          cy="355"
          r="10"
          fill="none"
          stroke="oklch(0.70 0.18 45)"
          strokeWidth="4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
        />

        {/* Restricted area arc */}
        <motion.path
          d="M 280 380 A 40 40 0 0 1 360 380"
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
