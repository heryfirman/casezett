'use client'

import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import NextImage from 'next/image'
import { Rnd } from "react-rnd"

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
                `bg-blue-950`
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
                  Colors
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
    )
}

export default DesignConfigurator
