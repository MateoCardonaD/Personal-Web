import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import Tagline from '@/components/sections/Tagline'
import About from '@/components/sections/About'
import BeforeContinue from '@/components/sections/BeforeContinue'
import Projects from '@/components/sections/Projects'
import Hobbies from '@/components/sections/Hobbies'
import Certifications from '@/components/sections/Certifications'
import Highlights from '@/components/sections/Highlights'
import ReachOut from '@/components/sections/ReachOut'
import BuyCoffee from '@/components/sections/BuyCoffee'
import Footer from '@/components/Footer'
import FloatingSocial from '@/components/FloatingSocial'
import CustomCursor from '@/components/CustomCursor'
import PWAInstallButton from '@/components/PWAInstallButton'
import ParallaxWrapper from '@/components/ui/ParallaxWrapper'
import SmoothSectionTransition from '@/components/SmoothSectionTransition'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <SmoothSectionTransition>
          <ParallaxWrapper speed={0.5}>
            <Hero />
          </ParallaxWrapper>
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <ParallaxWrapper speed={0.3}>
            <Tagline />
          </ParallaxWrapper>
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <ParallaxWrapper speed={0.2}>
            <Highlights />
          </ParallaxWrapper>
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <About />
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <Certifications />
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <ParallaxWrapper speed={0.4}>
            <Projects />
          </ParallaxWrapper>
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <BeforeContinue />
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <Hobbies />
        </SmoothSectionTransition>
        
        <SmoothSectionTransition>
          <ReachOut />
        </SmoothSectionTransition>
      </main>
      <BuyCoffee />
      <FloatingSocial />
      <PWAInstallButton />
      <Footer />
    </>
  )
}
