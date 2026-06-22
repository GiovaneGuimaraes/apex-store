import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import WordsPullUpMultiStyle from '@/components/ui/WordsPullUpMultiStyle'

const CARD_EASE = [0.22, 1, 0.36, 1] as const

interface FeatureCard {
  number: string
  title: string
  icon: string
  items: string[]
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    number: '01',
    title: 'Exclusive Drops.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    items: [
      'Members-first 48-hour early access',
      'Limited silhouettes, no restocks',
      'Real-time restock notifications',
      'Verified authenticity on every pair',
    ],
  },
  {
    number: '02',
    title: 'Smart Sizing.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    items: [
      'AI-powered fit recommendation',
      'Multi-brand size conversion',
      'Width & arch-type profiling',
    ],
  },
  {
    number: '03',
    title: 'Deep Focus Mode.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    items: [
      'Curated drop calendar synced to your schedule',
      'Ambient soundscapes for focused browsing',
      'Distraction-free checkout flow',
    ],
  },
]

function FeatureCardStatic({ card, index }: { card: FeatureCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="bg-[#212121] rounded-2xl p-6 flex flex-col justify-between h-full min-h-[320px]"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: (index + 1) * 0.15, duration: 0.6, ease: CARD_EASE }}
    >
      <div>
        <img src={card.icon} alt={card.title} className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-4 object-cover" />
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-gray-500 text-xs">{card.number}</span>
          <h3 className="text-primary font-medium text-lg">{card.title}</h3>
        </div>
        <ul className="space-y-2">
          {card.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <span className="text-gray-400 text-xs">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href="/products"
        className="inline-flex items-center gap-1.5 text-primary text-xs mt-6 hover:gap-2.5 transition-all"
      >
        Learn more
        <ArrowRight className="w-3 h-3 -rotate-45" />
      </a>
    </motion.div>
  )
}

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  const videoRef = useRef<HTMLDivElement>(null)
  const isVideoInView = useInView(videoRef, { once: true, margin: '-100px' })

  return (
    <section className="min-h-screen bg-black py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      {/* Header */}
      <div ref={headerRef} className="text-center mb-12 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: 'Cult-grade curation for next-level collectors.',
                className: 'text-primary',
              },
              {
                text: 'Built for the obsessed. Powered by culture.',
                className: 'text-gray-500',
              },
            ]}
          />
        </h2>
      </div>

      {/* 4-col card grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
        {/* Hero image card */}
        <motion.div
          ref={videoRef}
          className="bg-[#212121] rounded-2xl overflow-hidden relative h-[280px] lg:h-full"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={isVideoInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0, duration: 0.6, ease: CARD_EASE }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/feature-hero.svg"
            alt="APEX SS26 Collection"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <p
            className="absolute bottom-5 left-5 font-medium text-base"
            style={{ color: '#E1E0CC' }}
          >
            Your creative canvas.
          </p>
        </motion.div>

        {/* Feature cards */}
        {FEATURE_CARDS.map((card, i) => (
          <FeatureCardStatic key={card.number} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}
