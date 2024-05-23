'use client'

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const STEPS =[
    {
        name: 'Step 1: Add image',
        description: 'Choose an image for your case',
        url: '/upload',
    },
    {
        name: 'Step 2: Customize design',
        description: 'Make the case yours',
        url: '/design',
    },
    {
        name: 'Step 3: Summary',
        description: 'Review your final design',
        url: '/preview',
    },
]

const Steps = () => {
  const pathName = usePathname()
  
  return (
    <ol className="rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200 bg-white">
      {STEPS.map((step, i) => {
        const isCurrent = pathName.endsWith(step.url)
        const isCompleted = STEPS.slice(i + 1).some((step) => pathName.endsWith(step.url))
        const imgPath = `/snake-${i + 1}.png`

        return (
            <li key={step.name} className="relative overflow-hidden lg:flex-1">
              <div>
                <span
                  className={cn(
                    'absolute left-0 top-0 w-1 h-full lg:bottom-0 lg:top-auto lg:w-full lg:h-1 bg-zinc-400',
                    {
                        'bg-zinc-700': isCurrent,
                        'bg-primary': isCompleted,
                    }
                  )}
                  aria-hidden='true'
                />

                <span
                  className={cn(
                    i !== 0 ? 'lg:pl-9': '',
                    'flex items-center px-6 py-4 text-sm font-medium'
                  )}
                >
                  <span className="flex-shrink-0">
                    <picture>
                        <img src={imgPath} alt="" className={cn(
                            'flex w-20 h-20 object-contain items-center justify-center',
                            {
                                'border-none': isCompleted,
                                'border-zinc-700': isCurrent,
                            }
                        )}/>
                    </picture>
                  </span>

                  <span className="flex flex-col min-w-0 h-full ml-4 mt-0.5 justify-center">
                    <span className={cn('text-sm font-semibold text-zinc-700', {
                        'text-primary': isCompleted,
                        'text-zinc-700': isCurrent,
                    })}>
                      {step.description}
                    </span>
                  </span>

                  {i !== 0 ? (
                    <div className="absolute hidden w-3 inset-0 lg:block">
                      <svg
                        className='h-full w-full text-gray-300'
                        viewBox='0 0 12 82'
                        fill='none'
                        preserveAspectRatio='none'>
                        <path
                        d='M0.5 0V31L10.5 41L0.5 51V82'
                        stroke='currentcolor'
                        vectorEffect='non-scaling-stroke'
                        />
                      </svg>
                    </div>
                  ): null}
                </span>
              </div>
            </li>
        )
      })}
    </ol>
  )
}

export default Steps
