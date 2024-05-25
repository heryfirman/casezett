'use client'

import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import NextImage from 'next/image'
import { Rnd } from "react-rnd"
import { Label, RadioGroup } from "@headlessui/react"
import { 
  COLORS,
} from "@/validators/option-validator"
import { useState } from "react";

interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}

const DesignConfigurator = ({
    configId,
    imageUrl,
    imageDimensions,
}: DesignConfiguratorProps) => {

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
  }>({
    color: COLORS[0],
  })


  return (
      <div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
        <div className="relative w-full max-w-4xl h-[37.5rem] p-12 overflow-hidden col-span-2 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <div className="relative w-60 pointer-events-none aspect-[896/1831] bg-opacity-50">
            <AspectRatio
              ratio={896 / 1831}
              className='relative w-full pointer-events-none aspect-[896/1831] z-50'
            >
              <NextImage src="/phone-template.png" alt="phone image" className="pointer-events-none select-none z-50" fill/>
            </AspectRatio>
            <div className={cn(
              'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
              `bg-${options.color.tw}`
            )}>
            </div>

          </div>
            <Rnd
              default={{ 
                x: 150,
                y: 205,
                width: imageDimensions.width / 4,
                height: imageDimensions.height / 4,
              }}
              lockAspectRatio
              resizeHandleComponent={{ 
                bottomRight: <HandleComponent />,
                bottomLeft: <HandleComponent />,
                topLeft: <HandleComponent />,
                topRight: <HandleComponent />,
              }}
              className="absolute border-[3px] border-primary z-20"
            >
              <div className="relative w-full h-full">
              <NextImage
                src={imageUrl}
                fill
                alt='your image'
                className='pointer-events-none'
              />
              </div>
            </Rnd>
        </div>

        <div className="h-[37.5rem] flex flex-col bg-white">
          <ScrollArea className="relative flex-1 overflow-auto">
            <div 
              aria-hidden="true"
              className="absolute h-12 inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white pointer-events-none"
            />

            <div className="px-8 pb-12 pt-8">
              <h2 className="tracking-tight font-bold text-3xl">
                Customize your case
              </h2>

              <div className="w-full h-px my-6 bg-zinc-200" />
              
              <div className="relative h-full flex flex-col justify-between mt-4">
                <div className="flex flex-col gap-6">
                  <RadioGroup 
                    value={options.color}
                    onChange={(val) => {
                      setOptions((prev) => ({
                        ...prev,
                        color: val,
                      }))
                  }}>
                    <Label>Color: {options.color.label}</Label>
                    <div className="flex items-center mt-3 space-x-3">
                      {COLORS.map((color) => (
                        <RadioGroup.Option
                          key={color.label}
                          value={color}
                          className={({ active, checked }) => 
                          cn(
                            'relative flex items-center justify-center -m-0.5 p-0.5 cursor-pointer rounded-full active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
                            {
                              [`border-${color.tw}`]: active || checked,
                            }
                          )
                        }>
                          <span
                            className={cn(
                              `bg-${color.tw}`,
                              'w-8 h-8 rounded-full border border-black border-opacity-10'
                            )} 
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>


                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
  )
}

export default DesignConfigurator
