import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-neutral-900 dark:text-white px-6 max-w-3xl mx-auto py-20 flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight uppercase mb-8">
          The Manifesto
        </h1>
        <div className="font-serif italic text-xl text-neutral-500 mb-8 border-l border-amber-600 pl-6 py-2">
          "Design is not decoration. It is structural reductionism meant to project clear, raw narrative content over visual noise."
        </div>
        <div className="font-sans text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-6">
          <p>
            Chronicle represents an extreme editorial exercise in digital media presentation. Borrowing design cues from historical independent printed catalogs, layout grids, and European architectural typography, we reject typical modern analytical tracking and excessive UI decorations.
          </p>
          <p>
            This system runs purely under React processing pipelines, Tailwind custom parameters, and distributed API structures. It serves cleanly to display text and imagery unencumbered by artificial sensory loops.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;