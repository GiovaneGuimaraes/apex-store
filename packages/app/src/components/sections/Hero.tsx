import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import WordsPullUp from '@/components/ui/WordsPullUp'

const NAV_ITEMS = ['New Drops', 'Sneakers', 'Apparel', 'Collabs', 'About']

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section className="h-screen p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-colors"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'rgba(225, 224, 204, 0.8)')
                }
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content — bottom aligned, 12-col grid */}
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-12 items-end">
          {/* Heading — 8 cols */}
          <div className="col-span-12 lg:col-span-8 relative">
            <h1
              className="font-medium leading-[0.85] tracking-[-0.07em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              style={{ color: '#E1E0CC' }}
            >
              <WordsPullUp text="APEX" showAsterisk />
            </h1>
          </div>

          {/* Right — description + CTA — 4 cols */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 p-4 md:p-6 pb-8 lg:pb-10">
            <motion.p
              className="text-primary/70 text-xs sm:text-sm md:text-base"
              style={{ lineHeight: 1.2 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            >
              APEX is a worldwide network of silhouettes, colourways and drops — bound not by
              hype but by a relentless pursuit of sole perfection and street culture.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            >
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 bg-primary rounded-full pl-5 pr-1 py-1 hover:gap-3 transition-all duration-300"
              >
                <span className="text-black font-medium text-sm sm:text-base">Shop now</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
