import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Printer, Sparkles, Heart, ImageIcon } from 'lucide-react';
import { CULTURAL_IMAGES } from '../config/culturalImages';

function ArchivalImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-72 rounded-xs bg-[#1a1816] border border-dashed border-[#d4af37]/25 flex flex-col items-center justify-center gap-3 px-6 text-center">
        <ImageIcon className="w-10 h-10 text-[#d4af37]/40" aria-hidden="true" />
        <p className="text-[11px] font-sans uppercase tracking-widest text-[#8a7b66]">Archival image forthcoming</p>
        <p className="text-[10px] text-[#5c5448] font-mono leading-relaxed">
          Add <span className="text-[#d4af37]/80">{src.split('/').pop()}</span> to public/images/cultural/
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-72 object-cover rounded-xs sepia grayscale-[10%] brightness-95 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
    />
  );
}

export function CulturalHistory() {
  const [activeSegment, setActiveSegment] = useState<'all' | 'media' | 'revival' | 'health'>('all');

  const historySections = [
    {
      id: 'media',
      title: "I. The Print Revolution & Media Ministry",
      subtitle: "Navigating the Transition from Handcrafting to Steam-Powered Presses",
      dateRange: "1880 - 1910",
      image: CULTURAL_IMAGES.printingPress,
      altText: "Late 19th-century printing press workshop layout showing antique bookbinders and typesetters",
      icon: <Printer className="w-4 h-4 text-[#d4af37]" />,
      lead: "In the final decades of the nineteenth century, the advent of high-speed rotary presses and rapid transcontinental railway distribution fundamentally reshaped publishing.",
      description: "Ellen White's devotional classics—including Steps to Christ and The Desire of Ages—were drafted during this transitional publishing boom. Rather than relying on traditional, localized town pulpits, the early Adventist movement leveraged massive literature-evangelism schemes, sending colporteurs carrying newly compiled volumes directly to frontier cabins, rural outposts, and expanding cities. The visual presentation of books became a hallmark of the era; heavily embossed leather covers with gilded gold foil overlays served as visual invitations, treating printed literature as permanent, prized family heirlooms rather than disposable pamphlets.",
      contextQuote: "The publication of the 'Conflict of the Ages' volumes in premium gilded cover editions served as an intellectual response to the fast transition into the industrial age, embedding timeless spiritual reflections in high-quality papercraft."
    },
    {
      id: 'revival',
      title: "II. The Era of Pitch-Tent Revivals",
      subtitle: "The Living Echoes of the Second Great Awakening and Camp Meetings",
      dateRange: "1870 - 1890",
      image: CULTURAL_IMAGES.revivalTent,
      altText: "Great 19th-century tent meeting revival gatherings with high arches and crowds of people",
      icon: <Sparkles className="w-4 h-4 text-[#d4af37]" />,
      lead: "In standard American Victorian life, traveling summer revivals under immense canvas tents represented the primary cultural, community, and spiritual events of the year.",
      description: "Preachers traveled cross-country, pitching tents on high hills outside expanding railway towns to draw thousands of listeners. These meetings provided an emotional and sensory landscape: lanterns illuminating massive timber posts, communal choirs singing traditional hymns, and direct, heart-appealing preaching. Ellen White frequently delivered addresses under these heavy canvases, speaking to crowds numbering over ten thousand people. Steps to Christ was written directly to heal the anxieties of these revivalists, replacing fear-driven 'hellfire' pressure with a gentle, Christocentric blueprint focused on gradual growth and unbroken access to God's non-judgmental embrace.",
      contextQuote: "Camp-meetings represented a vibrant, democratic community space. In an age of sudden industrial expansion and social displacement, gathering beneath a canvas canopy offered a stabilizing return to simple community values and absolute faith."
    },
    {
      id: 'health',
      title: "III. The Sanitarium & Holistic Health Movement",
      subtitle: "The Rise of Biological Living and Natural Remedial Institutions",
      dateRange: "1866 - 1915",
      image: CULTURAL_IMAGES.sanitarium,
      altText: "Historic Battle Creek Style Sanitarium with lush botanical gardens and early health-reform patients walking",
      icon: <Heart className="w-4 h-4 text-[#d4af37]" />,
      lead: "Victorian sanitary medical science was notoriously primitive; urban center contagions of cholera and typhoid were widely treated with toxic mercury derivatives, bleeding, and stale air.",
      description: "In response to widespread physical breakdown, Ellen White introduced a revolutionary holistic medical template linking biology directly with moral clarity and spiritual perception. This spurred the creation of natural sanitary institution models—most notably the world-famous Battle Creek Sanitarium directed by Dr. John Harvey Kellogg. These wellness resorts focused strictly on natural remedies: pure water treatments, deep breathing, hydrotherapy, sunlight, restorative rest, and a clean vegetarian diet of unprocessed grains, fruits, and nuts. Physical stewardship was elevated to a high moral calling, laying the foundation for modern holistic medical institutions.",
      contextQuote: "True health reform was never treated as a legalistic checklist, but rather as a merciful provision of natural law designed to restore mental sovereignty and help humanity perceive spiritual truths on the highest frequency."
    }
  ];

  const filteredSections = activeSegment === 'all' 
    ? historySections 
    : historySections.filter(s => s.id === activeSegment);

  return (
    <div id="cultural-history-archive-container" className="space-y-8 max-w-5xl mx-auto">

      {/* Newspaper Header Styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border bg-[#141211]/90 backdrop-blur-sm border-[#2e2a25] p-6 text-center relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-2 left-2 text-[10px] font-mono text-[#5c5448]">VOL. XII &bull; NO. IV</div>
        <div className="absolute top-2 right-2 text-[10px] font-mono text-[#5c5448]">ARCHIVAL REPRINTS</div>
        
        {/* Double lines */}
        <div className="border-t border-b border-[#3e3427] py-2 px-1 max-w-xl mx-auto">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#8a7b66]">
            The Victorian Centennial Chronicle
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-[#f2edd9] tracking-widest my-1 uppercase">
            Cultural History Archive
          </h2>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a7b66] block">
            Archival Record &bull; Explaining the Social & Environmental Background of the Classic Writings
          </span>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mt-5">
          <button
            type="button"
            aria-pressed={activeSegment === 'all'}
            onClick={() => setActiveSegment('all')}
            className={`px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all rounded-sm border ${
              activeSegment === 'all' 
                ? 'bg-[#2b241e] text-[#d4af37] border-[#d4af37]/45' 
                : 'bg-transparent text-[#8a7b66] border-[#2c2926] hover:text-[#e3ddce]'
            }`}
          >
            Chronicle Overview
          </button>
          <button
            type="button"
            aria-pressed={activeSegment === 'media'}
            onClick={() => setActiveSegment('media')}
            className={`px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all rounded-sm border ${
              activeSegment === 'media' 
                ? 'bg-[#1b3d2f] text-[#ebd59a] border-[#ebd59a]/40' 
                : 'bg-transparent text-[#8a7b66] border-[#2c2926] hover:text-[#e3ddce]'
            }`}
          >
            I. Print Revolution
          </button>
          <button
            type="button"
            aria-pressed={activeSegment === 'revival'}
            onClick={() => setActiveSegment('revival')}
            className={`px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all rounded-sm border ${
              activeSegment === 'revival' 
                ? 'bg-[#2b241e] text-[#ebd59a] border-[#ecd392]/40' 
                : 'bg-transparent text-[#8a7b66] border-[#2c2926] hover:text-[#e3ddce]'
            }`}
          >
            II. Tent Revivals
          </button>
          <button
            type="button"
            aria-pressed={activeSegment === 'health'}
            onClick={() => setActiveSegment('health')}
            className={`px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-all rounded-sm border ${
              activeSegment === 'health' 
                ? 'bg-[#1b3a3d] text-[#ebd59a] border-[#ebd59a]/40' 
                : 'bg-transparent text-[#8a7b66] border-[#2c2926] hover:text-[#e3ddce]'
            }`}
          >
            III. Medical Reform
          </button>
        </div>
      </motion.div>

      {/* Chronicle Sections */}
      <div className="space-y-12">
        {filteredSections.map((section, idx) => (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            key={section.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#121110]/90 backdrop-blur-sm border border-[#262320] p-6 md:p-8 rounded-sm shadow-xl"
          >
            
            {/* Context & Description column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2e261f] pb-3">
                <div className="w-8 h-8 rounded-full bg-[#1e1c1a] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                  {section.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-black text-[#e3ddce] leading-tight">{section.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-sans text-[10px] text-[#8a7b66] italic leading-tight uppercase font-semibold">{section.subtitle}</span>
                    <span className="text-[9px] bg-[#d4af37]/10 text-[#d4af37] px-2 py-0.5 rounded-sm font-mono">{section.dateRange}</span>
                  </div>
                </div>
              </div>

              <p className="font-serif italic text-base text-[#d4af37] leading-relaxed text-justify relative pl-4 border-l-2 border-[#d4af37]/35 py-1">
                {section.lead}
              </p>

              <p className="font-sans text-sm text-[#a39a8c] leading-relaxed text-justify">
                {section.description}
              </p>

              <div id={`ledger-context-${section.id}`} className="bg-[#1b1917] border border-[#2e2a25] p-4 rounded-xs italic font-serif text-xs text-[#ebd8af] leading-relaxed relative overflow-hidden pr-8">
                <span className="absolute top-2 right-2 text-3xl opacity-[0.03]">❧</span>
                &ldquo;{section.contextQuote}&rdquo;
              </div>
            </div>

            {/* Picture Column (Beautiful Realistic Generated Image) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative group border-4 border-[#302c28] p-1.5 bg-[#1e1c1a]/50 shadow-2xl rounded-xs">
                {/* Antique corner brackets */}
                <div className="absolute top-1 left-1 w-3.5 h-3.5 border-t border-l border-[#d4af37]/45 pointer-events-none" />
                <div className="absolute top-1 right-1 w-3.5 h-3.5 border-t border-r border-[#d4af37]/45 pointer-events-none" />
                <div className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b border-l border-[#d4af37]/45 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b border-r border-[#d4af37]/45 pointer-events-none" />

                <ArchivalImage src={section.image} alt={section.altText} />
                
                {/* Subtle dark caption strip */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0e0e0d]/90 border border-[#3e352b] py-2 px-3 text-[10px] text-[#8a7b66] font-sans rounded-xs shadow-md">
                  <strong className="text-[#ebd8af] block mb-0.5">ARCHIVAL IMAGE SOURCE:</strong>
                  {section.altText}
                </div>
              </div>
              <div className="text-[10px] text-[#5c5448] text-right font-sans italic">
                Compiled under Seventh-day Adventist Historical Preservation Guild.
              </div>
            </div>

          </motion.article>
        ))}
      </div>

      {/* Timeline Footnote segment */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="bg-[#141211]/90 backdrop-blur-sm border border-[#2e2a25] p-5 rounded-xs space-y-4"
      >
        <h4 className="font-serif text-sm font-bold text-[#e3ddce] flex items-center gap-1.5 uppercase border-b border-[#2e2620] pb-2">
          <Calendar className="w-4 h-4 text-[#d4af37]" /> Historical Advent Era Chronology
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-sans">
          <div className="border-l border-[#d4af37]/40 pl-3">
            <strong className="text-[#ebd392] font-mono block">1844</strong>
            <span className="text-[#8a7b66] text-[10.5px]">The Millerite Great Disappointment; refocus on biblical study groups.</span>
          </div>
          <div className="border-l border-[#d4af37]/40 pl-3">
            <strong className="text-[#ebd392] font-mono block">1863</strong>
            <span className="text-[#8a7b66] text-[10.5px]">Official organizing of Seventh-day Adventist General Conference.</span>
          </div>
          <div className="border-l border-[#d4af37]/40 pl-3">
            <strong className="text-[#ebd392] font-mono block">1888</strong>
            <span className="text-[#8a7b66] text-[10.5px]">Minneapolis Conference salvation-by-faith debates; catalyst for STC.</span>
          </div>
          <div className="border-l border-[#d4af37]/40 pl-3">
            <strong className="text-[#ebd392] font-mono block">1892-1898</strong>
            <span className="text-[#8a7b66] text-[10.5px]">Ellen White travels through Australia; writing peak of devotional books.</span>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
