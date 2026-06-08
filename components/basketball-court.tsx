'use client'

import { motion } from 'framer-motion'

interface BasketballCourtProps {
  children: React.ReactNode
}

export function BasketballCourt({ children }: BasketballCourtProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[16/10]">
      {/* Hardwood floor background — per-segment colored planks */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{
          background: `
            linear-gradient(180deg,
              oklch(0.55 0.06 71) 0%, oklch(0.55 0.06 71) 18%,
              oklch(0.57 0.06 73) 18%, oklch(0.57 0.06 73) 86%,
              oklch(0.52 0.05 68) 86%, oklch(0.52 0.05 68) 100%
            ),
            linear-gradient(180deg,
              oklch(0.53 0.05 69) 0%, oklch(0.53 0.05 69) 6%,
              oklch(0.54 0.05 70) 6%, oklch(0.54 0.05 70) 74%,
              oklch(0.56 0.06 72) 74%, oklch(0.56 0.06 72) 100%
            ),
            linear-gradient(180deg,
              oklch(0.57 0.06 73) 0%, oklch(0.57 0.06 73) 42%,
              oklch(0.56 0.06 72) 42%, oklch(0.56 0.06 72) 100%
            ),
            linear-gradient(180deg,
              oklch(0.54 0.05 70) 0%, oklch(0.54 0.05 70) 26%,
              oklch(0.56 0.06 72) 26%, oklch(0.56 0.06 72) 90%,
              oklch(0.53 0.05 69) 90%, oklch(0.53 0.05 69) 100%
            ),
            linear-gradient(180deg,
              oklch(0.52 0.05 68) 0%, oklch(0.52 0.05 68) 2%,
              oklch(0.55 0.06 71) 2%, oklch(0.55 0.06 71) 66%,
              oklch(0.57 0.06 73) 66%, oklch(0.57 0.06 73) 100%
            ),
            linear-gradient(180deg,
              oklch(0.56 0.06 72) 0%, oklch(0.56 0.06 72) 50%,
              oklch(0.57 0.06 73) 50%, oklch(0.57 0.06 73) 100%
            ),
            linear-gradient(180deg,
              oklch(0.55 0.06 71) 0%, oklch(0.55 0.06 71) 14%,
              oklch(0.54 0.05 70) 14%, oklch(0.54 0.05 70) 82%,
              oklch(0.56 0.06 72) 82%, oklch(0.56 0.06 72) 100%
            ),
            linear-gradient(180deg,
              oklch(0.53 0.05 69) 0%, oklch(0.53 0.05 69) 34%,
              oklch(0.52 0.05 68) 34%, oklch(0.52 0.05 68) 100%
            ),
            linear-gradient(180deg,
              oklch(0.57 0.06 73) 0%, oklch(0.57 0.06 73) 62%,
              oklch(0.55 0.06 71) 62%, oklch(0.55 0.06 71) 100%
            ),
            linear-gradient(180deg,
              oklch(0.54 0.05 70) 0%, oklch(0.54 0.05 70) 54%,
              oklch(0.56 0.06 72) 54%, oklch(0.56 0.06 72) 100%
            ),
            linear-gradient(180deg,
              oklch(0.52 0.05 68) 0%, oklch(0.52 0.05 68) 38%,
              oklch(0.53 0.05 69) 38%, oklch(0.53 0.05 69) 94%,
              oklch(0.54 0.05 70) 94%, oklch(0.54 0.05 70) 100%
            ),
            linear-gradient(180deg,
              oklch(0.55 0.06 71) 0%, oklch(0.55 0.06 71) 22%,
              oklch(0.54 0.05 70) 22%, oklch(0.54 0.05 70) 70%,
              oklch(0.56 0.06 72) 70%, oklch(0.56 0.06 72) 100%
            ),
            linear-gradient(180deg,
              oklch(0.56 0.06 72) 0%, oklch(0.56 0.06 72) 46%,
              oklch(0.53 0.05 69) 46%, oklch(0.53 0.05 69) 100%
            ),
            linear-gradient(180deg,
              oklch(0.57 0.06 73) 0%, oklch(0.57 0.06 73) 10%,
              oklch(0.56 0.06 72) 10%, oklch(0.56 0.06 72) 78%,
              oklch(0.53 0.05 69) 78%, oklch(0.53 0.05 69) 100%
            ),
            linear-gradient(180deg,
              oklch(0.54 0.05 70) 0%, oklch(0.54 0.05 70) 58%,
              oklch(0.55 0.06 71) 58%, oklch(0.55 0.06 71) 100%
            ),
            linear-gradient(180deg,
              oklch(0.52 0.05 68) 0%, oklch(0.52 0.05 68) 30%,
              oklch(0.57 0.06 73) 30%, oklch(0.57 0.06 73) 100%
            ),
            linear-gradient(180deg,
              oklch(0.55 0.06 71) 0%, oklch(0.55 0.06 71) 100%
            ),
            linear-gradient(180deg,
              oklch(0.56 0.06 72) 0%, oklch(0.56 0.06 72) 100%
            ),
            linear-gradient(180deg,
              oklch(0.55 0.06 71) 0%, oklch(0.55 0.06 71) 100%
            )
          `,
          backgroundSize: '36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%',
          backgroundPosition: '0 0, 36px 0, 72px 0, 108px 0, 144px 0, 180px 0, 216px 0, 252px 0, 288px 0, 324px 0, 360px 0, 396px 0, 432px 0, 468px 0, 504px 0, 540px 0, 576px 0, 612px 0, 648px 0',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'inset 0 0 80px rgba(0,0,0,0.35)',
        }}
      >
        {/* Plank gap lines (vertical) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 35.5px,
                rgba(0,0,0,0.12) 35.5px,
                rgba(0,0,0,0.12) 36px,
                transparent 36px
              )
            `,
          }}
        />
        {/* Staggered end joints — 24 lines, scrambled across planks */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(180deg,
                transparent 2%, rgba(0,0,0,0.09) 2%, rgba(0,0,0,0.09) 2.5%, transparent 2.5%
              ),
              linear-gradient(180deg,
                transparent 6%, rgba(0,0,0,0.07) 6%, rgba(0,0,0,0.07) 6.5%, transparent 6.5%
              ),
              linear-gradient(180deg,
                transparent 10%, rgba(0,0,0,0.08) 10%, rgba(0,0,0,0.08) 10.5%, transparent 10.5%
              ),
              linear-gradient(180deg,
                transparent 14%, rgba(0,0,0,0.07) 14%, rgba(0,0,0,0.07) 14.5%, transparent 14.5%
              ),
              linear-gradient(180deg,
                transparent 18%, rgba(0,0,0,0.09) 18%, rgba(0,0,0,0.09) 18.5%, transparent 18.5%
              ),
              linear-gradient(180deg,
                transparent 22%, rgba(0,0,0,0.07) 22%, rgba(0,0,0,0.07) 22.5%, transparent 22.5%
              ),
              linear-gradient(180deg,
                transparent 26%, rgba(0,0,0,0.08) 26%, rgba(0,0,0,0.08) 26.5%, transparent 26.5%
              ),
              linear-gradient(180deg,
                transparent 30%, rgba(0,0,0,0.07) 30%, rgba(0,0,0,0.07) 30.5%, transparent 30.5%
              ),
              linear-gradient(180deg,
                transparent 34%, rgba(0,0,0,0.09) 34%, rgba(0,0,0,0.09) 34.5%, transparent 34.5%
              ),
              linear-gradient(180deg,
                transparent 38%, rgba(0,0,0,0.07) 38%, rgba(0,0,0,0.07) 38.5%, transparent 38.5%
              ),
              linear-gradient(180deg,
                transparent 42%, rgba(0,0,0,0.08) 42%, rgba(0,0,0,0.08) 42.5%, transparent 42.5%
              ),
              linear-gradient(180deg,
                transparent 46%, rgba(0,0,0,0.07) 46%, rgba(0,0,0,0.07) 46.5%, transparent 46.5%
              ),
              linear-gradient(180deg,
                transparent 50%, rgba(0,0,0,0.09) 50%, rgba(0,0,0,0.09) 50.5%, transparent 50.5%
              ),
              linear-gradient(180deg,
                transparent 54%, rgba(0,0,0,0.07) 54%, rgba(0,0,0,0.07) 54.5%, transparent 54.5%
              ),
              linear-gradient(180deg,
                transparent 58%, rgba(0,0,0,0.08) 58%, rgba(0,0,0,0.08) 58.5%, transparent 58.5%
              ),
              linear-gradient(180deg,
                transparent 62%, rgba(0,0,0,0.07) 62%, rgba(0,0,0,0.07) 62.5%, transparent 62.5%
              ),
              linear-gradient(180deg,
                transparent 66%, rgba(0,0,0,0.09) 66%, rgba(0,0,0,0.09) 66.5%, transparent 66.5%
              ),
              linear-gradient(180deg,
                transparent 70%, rgba(0,0,0,0.07) 70%, rgba(0,0,0,0.07) 70.5%, transparent 70.5%
              ),
              linear-gradient(180deg,
                transparent 74%, rgba(0,0,0,0.08) 74%, rgba(0,0,0,0.08) 74.5%, transparent 74.5%
              ),
              linear-gradient(180deg,
                transparent 78%, rgba(0,0,0,0.07) 78%, rgba(0,0,0,0.07) 78.5%, transparent 78.5%
              ),
              linear-gradient(180deg,
                transparent 82%, rgba(0,0,0,0.09) 82%, rgba(0,0,0,0.09) 82.5%, transparent 82.5%
              ),
              linear-gradient(180deg,
                transparent 86%, rgba(0,0,0,0.07) 86%, rgba(0,0,0,0.07) 86.5%, transparent 86.5%
              ),
              linear-gradient(180deg,
                transparent 90%, rgba(0,0,0,0.08) 90%, rgba(0,0,0,0.08) 90.5%, transparent 90.5%
              ),
              linear-gradient(180deg,
                transparent 94%, rgba(0,0,0,0.09) 94%, rgba(0,0,0,0.09) 94.5%, transparent 94.5%
              )
            `,
            backgroundSize: '36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%, 36px 100%',
            backgroundPosition: '144px 0, 36px 0, 504px 0, 216px 0, 0px 0, 432px 0, 108px 0, 576px 0, 252px 0, 360px 0, 72px 0, 468px 0, 180px 0, 324px 0, 540px 0, 288px 0, 144px 0, 432px 0, 36px 0, 504px 0, 216px 0, 0px 0, 108px 0, 360px 0',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Horizontal wood grain across all planks */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 4px,
                rgba(0,0,0,0.04) 4.5px,
                transparent 5px
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
