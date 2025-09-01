import { RxNotionLogo } from 'react-icons/rx'
import { BiLogoGmail } from 'react-icons/bi'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { BsMedium } from 'react-icons/bs'
import { PiMicrosoftOutlookLogoFill } from 'react-icons/pi'
import { VscVscode } from 'react-icons/vsc'
import { SiObsidian } from 'react-icons/si'
import { FaSquareWhatsapp } from 'react-icons/fa6'
import { FaFileWord } from 'react-icons/fa'
import { IoLogoLinkedin } from 'react-icons/io5'
import { SiOpenai } from 'react-icons/si'
import { FaFacebookMessenger } from 'react-icons/fa'

interface AppLogoProps {
  icon: React.ReactNode
}

function AppLogo({ icon }: AppLogoProps) {
  return (
    <div className="flex-none bg-neutral-900/0 w-22 h-22 flex items-center justify-center">
      <div className="text-neutral-300 text-[48px]">{icon}</div>
    </div>
  )
}

interface ScrollingRowProps {
  apps: AppLogoProps[]
  direction: 'left' | 'right'
}

function ScrollingRow({ apps, direction }: ScrollingRowProps) {
  const animationClass = direction === 'right' ? 'animate-scroll-right' : 'animate-scroll-left'

  return (
    <div className="flex overflow-hidden">
      <div className={`flex ${animationClass} space-x-4 min-w-max`}>
        {/* First set */}
        {apps.map((app, index) => (
          <AppLogo key={`first-${index}`} icon={app.icon} />
        ))}
        {/* Second set for seamless loop */}
        {apps.map((app, index) => (
          <AppLogo key={`second-${index}`} icon={app.icon} />
        ))}
        {/* Third set for extra smoothness */}
        {apps.map((app, index) => (
          <AppLogo key={`third-${index}`} icon={app.icon} />
        ))}
      </div>
    </div>
  )
}

export default function AppLogosScroller() {
  const row1Apps: AppLogoProps[] = [
    { icon: <RxNotionLogo /> },
    { icon: <BiLogoGmail /> },
    { icon: <FaSquareXTwitter /> },
    { icon: <BsMedium /> },
    { icon: <PiMicrosoftOutlookLogoFill /> },
    { icon: <VscVscode /> },
    { icon: <SiObsidian /> },
    { icon: <FaSquareWhatsapp /> },
  ]

  const row2Apps: AppLogoProps[] = [
    { icon: <FaFileWord /> },
    { icon: <IoLogoLinkedin /> },
    { icon: <SiOpenai /> },
    { icon: <RxNotionLogo /> },
    { icon: <BiLogoGmail /> },
    { icon: <VscVscode /> },
    { icon: <SiObsidian /> },
    { icon: <FaSquareWhatsapp /> },
    { icon: <FaFacebookMessenger /> },
  ]

  return (
    <div className="w-full bg-neutral-900/0 rounded-lg p-4 overflow-hidden">
      <div className="space-y-4">
        <ScrollingRow apps={row1Apps} direction="right" />
        <ScrollingRow apps={row2Apps} direction="left" />
      </div>
    </div>
  )
}
