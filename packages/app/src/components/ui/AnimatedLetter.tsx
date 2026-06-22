import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  char: string
  index: number
  total: number
  targetRef: React.RefObject<HTMLElement>
}

export default function AnimatedLetter({ char, index, total, targetRef }: Props) {
  const charProgress = index / total
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const opacity = useTransform(
    scrollYProgress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.2, 1],
  )

  if (char === ' ') return <span>&nbsp;</span>

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  )
}
