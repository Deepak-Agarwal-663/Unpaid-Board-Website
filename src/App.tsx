/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {MotionConfig} from 'motion/react';
import {useRef} from 'react';
import {AboutSection} from './components/AboutSection';
import {BeforeAfterSection} from './components/BeforeAfterSection';
import {FinalInvitation} from './components/FinalInvitation';
import {Footer} from './components/Footer';
import {HeroSection} from './components/HeroSection';
import {HowWeStartSection} from './components/HowWeStartSection';
import {MobileStickyBar} from './components/MobileStickyBar';
import {Navbar} from './components/Navbar';
import {ProblemSection} from './components/ProblemSection';
import {QuestionsSection} from './components/QuestionsSection';
import {WhatIDoSection} from './components/WhatIDoSection';

export default function App() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F6F1E7] text-[#1C2226]">
        <Navbar />
        <main>
          <HeroSection heroRef={heroRef} />
          <ProblemSection />
          <WhatIDoSection />
          <BeforeAfterSection />
          <HowWeStartSection />
          <AboutSection />
          <QuestionsSection />
          <FinalInvitation />
        </main>
        <Footer />
        <MobileStickyBar heroRef={heroRef} />
      </div>
    </MotionConfig>
  );
}
