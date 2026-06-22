import { useRef } from 'react'
import WordsPullUpMultiStyle from '@/components/ui/WordsPullUpMultiStyle'
import AnimatedLetter from '@/components/ui/AnimatedLetter'

const BODY =
  'Over the last decade, APEX has partnered with the world\'s most forward-thinking designers — from Tokyo ateliers to London skate shops. Together, we have created drops that have earned cult status across every major city on the map.'

export default function About() {
  const bodyRef = useRef<HTMLParagraphElement>(null)

  return (
    <section className="bg-black py-20 px-4 md:px-8 flex items-center justify-center">
      <div
        className="bg-[#101010] rounded-3xl p-10 md:p-16 max-w-6xl w-full text-center"
      >
        {/* Label */}
        <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-6">
          Street Culture
        </p>

        {/* Multi-style heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-10">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'We are APEX,', className: 'font-normal text-primary' },
              { text: 'born from the streets.', className: 'font-serif italic text-primary' },
              {
                text: 'We live in colourways, drops, and the energy between sole and ground.',
                className: 'font-normal text-primary',
              },
            ]}
          />
        </h2>

        {/* Scroll-linked character opacity */}
        <p
          ref={bodyRef}
          className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto"
          style={{ color: '#DEDBC8', lineHeight: 1.7 }}
        >
          {BODY.split('').map((char, i) => (
            <AnimatedLetter
              key={i}
              char={char}
              index={i}
              total={BODY.length}
              targetRef={bodyRef as React.RefObject<HTMLElement>}
            />
          ))}
        </p>
      </div>
    </section>
  )
}
