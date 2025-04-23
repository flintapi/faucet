import { Container, Main, Section } from '@/components/craft'
import { ModeToggle } from '@/components/mode-toggle'
import { AIInput } from '@/components/ui/ai-input'
import { createFileRoute } from '@tanstack/react-router'
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Main className='h-screen grid'>
      <Section className='grid gap-4 grid-cols-1 md:grid-cols-3'>
        <Container className='w-full grid items-center md:col-span-2'>
          <div>
            <h1 className='text-2xl md:text-5xl font-semibold font-sans'>Testnet Faucet</h1>
            <span className='text-black dark:text-white/65'>Send testnet cNGN to your wallet to experiment with</span>
            <AIInput className='' placeholder='Enter address' />
          </div>
          <TerminalUse />
        </Container>
        <Container className='w-full grid grid-cols-2 gap-8 items-center justify-center'>
          {new Array(6).fill('words').map((_, index) => <div key={index} className='rounded-full size-40 aspect-square bg-red-400' />)}
        </Container>
      </Section>
      <Footer />
    </Main>
  )
}

function TerminalUse() {
  return (
    <Terminal>
      <TypingAnimation>&gt; flint@latest fund -a 0xaddress -n base-sepolia</TypingAnimation>

      <AnimatedSpan delay={3000} className="text-green-500">
        <span>✔ Address funded.</span>
      </AnimatedSpan>
      <AnimatedSpan delay={4000} className="text-green-500">
        <span>✔ 1,000,000cNGN test tokens.</span>
      </AnimatedSpan>
    </Terminal>
  )
}

function Footer() {
  return (
    <Section className='md:!p-0 !p-0 grid items-center'>
      <Container className='md:!p-0 !p-0 w-full flex items-center justify-between'>
        <div className='flex items-center'>
          <p className='text-foreground'>Part of the</p>
          <a href='https://flintapi.io' target='_blank'>
            <img src='/icon.png' className='object-cover size-6 mx-3' />
          </a>
          <p>project</p>
        </div>
        <ModeToggle />
      </Container>
    </Section>
  )
}
