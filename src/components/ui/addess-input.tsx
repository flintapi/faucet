'use client'

import { CornerRightUp, Link2, Mic } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AIInputProps {
  id?: string
  placeholder?: string
  minHeight?: number
  maxHeight?: number
  onSubmit?: (value: string) => void
  className?: string
}

const NETWORKS = [
  {
    name: 'Base sepolia',
    label: 'BASE',
    url: 'https://mainnet.com',
    icon: 'MainnetIcon',
    token: 'tETH',
  },
  {
    name: 'Ethereum Sepolia',
    label: 'ETH',
    url: 'https://testnet.com',
    icon: 'TestnetIcon',
    token: 'tETH',
  },
  {
    name: 'Polygon Mumbai',
    label: 'MATIC',
    url: 'https://testnet.com',
    icon: 'TestnetIcon',
    token: 'tMATIC',
  },
  {
    name: 'Asset Chain Enugu',
    label: 'RWA',
    url: 'https://testnet.com',
    icon: 'TestnetIcon',
    token: 'tRWA',
  },
  {
    name: 'Binance Smart Chain',
    label: 'BNB',
    url: 'https://testnet.com',
    icon: 'TestnetIcon',
    token: 'tBNB',
  },
]

export function AddressInput({
  id = 'ai-input',
  placeholder = 'Enter receiving address...',
  minHeight = 52,
  maxHeight = 200,
  onSubmit,
  className,
}: AIInputProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  })
  const [inputValue, setInputValue] = useState('')
  const [network, setNetwork] = useState<string>()

  const handleReset = () => {
    if (!inputValue.trim()) return
    onSubmit?.(inputValue)
    setInputValue('')
    adjustHeight(true)
  }

  return (
    <div className={cn('w-full py-4', className)}>
      <div className="relative max-w-xl w-full">
        <Textarea
          id={id}
          placeholder={placeholder}
          className={cn(
            'max-w-xl w-full bg-black/5 dark:bg-white/5 rounded-3xl pl-6 pr-16',
            'placeholder:text-black/50 dark:placeholder:text-white/50',
            'border-none ring-black/20 dark:ring-white/20',
            'text-black dark:text-white text-wrap',
            'overflow-y-auto resize-none',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            'transition-[height] duration-100 ease-out',
            'leading-[1.2] py-[16px]',
            `min-h-[${minHeight}px]`,
            `max-h-[${maxHeight}px]`,
            '[&::-webkit-resizer]:hidden', // Скрываем ресайзер
          )}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            adjustHeight()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleReset()
            }
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2  bg-black/5 dark:bg-white/5 py-1 px-1 transition-all duration-200',
                inputValue ? 'right-10' : 'right-3',
                network
                  ? 'rounded-lg px-2 flex items-center justify-center hover:cursor-pointer'
                  : 'rounded-xl',
              )}
            >
              {network ? (
                <span className="text-xs font-semibold">{network}</span>
              ) : (
                <Link2 className="w-4 h-4 text-black/70 dark:text-white/70" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Supported Network</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={network} onValueChange={setNetwork}>
              {NETWORKS.map((item, index) => (
                <DropdownMenuRadioItem key={index} value={item.label}>
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={handleReset} // TODO: server function call to make request
          type="button"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 right-3',
            'rounded-xl bg-black/5 dark:bg-red-400 py-1 px-1',
            'transition-all duration-200',
            inputValue
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-25 pointer-events-none',
          )}
        >
          <CornerRightUp className="w-4 h-4 text-black/70 dark:text-white/70" />
        </button>
      </div>
    </div>
  )
}
