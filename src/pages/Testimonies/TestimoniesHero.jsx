import React from 'react';

export const DEFAULT_HERO_BACKGROUND = '/images/transformation.png';

// Shared by the public page and the admin preview, so both render the same markup.
// Line breaks typed in the admin are kept (whitespace-pre-line); outer ones are
// trimmed so a stray Enter at the start or end of a field does not add an empty line.
const TestimoniesHero = ({
  title = '',
  titleHighlight = '',
  description = '',
  background = DEFAULT_HERO_BACKGROUND,
  headingAs: Heading = 'h1',
}) => (
  <section className="relative isolate w-full overflow-hidden">
    <img
      src={background || DEFAULT_HERO_BACKGROUND}
      alt=""
      className="
        absolute inset-0 h-full w-full object-cover
        object-[60%_54%] sm:object-[60%_62%] md:object-[60%_70%] lg:object-[60%_78%] xl:object-[60%_82%]
        scale-[1.08] md:scale-[1.12] lg:scale-[1.14]
        brightness-[0.96] contrast-[0.86] saturate-[0.9]
      "
    />
    <div className="absolute inset-0 z-[1] bg-white/82 backdrop-blur-[2px]" />
    <div className="absolute inset-0 z-[2] bg-[#1F7A5B]/20 mix-blend-multiply" />

    <div className="relative z-[4] w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-[96px] sm:py-[136px] md:py-[170px] text-left">
        <Heading className="text-[32px] sm:text-[48px] md:text-[64px] font-extrabold leading-[1.08] tracking-tight mb-4 whitespace-pre-line lg:text-balance">
          <span className="text-neutral-900">{title.trimStart()}</span>
          <span className="text-[#1F7A5B]"> {titleHighlight.trimEnd()}</span>
        </Heading>
        {description.trim() && (
          <p className="text-[16px] sm:text-[18px] md:text-[20px] leading-[26px] sm:leading-[28px] md:leading-[30px] text-[#111827]/80 max-w-[740px] whitespace-pre-line">
            {description.trim()}
          </p>
        )}
      </div>
    </div>

    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-48 z-[3] bg-gradient-to-t from-white/75 to-transparent" />
  </section>
);

export default TestimoniesHero;
