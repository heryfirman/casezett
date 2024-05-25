'use client'

import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn, formatPrice } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import NextImage from 'next/image'
import { Rnd } from "react-rnd"
import { RadioGroup } from "@headlessui/react"
import { Label } from "@/components/ui/label"
import { 
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator"
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

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
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
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

        <div className="w-full h-[37.5rem] flex flex-col col-span-full lg:col-span-1 bg-white">
          <ScrollArea className="relative flex-1 overflow-auto">
            {/* <div
              aria-hidden='true'
              className='absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none border-2 border-green-500'
              // className='absolute z-10 inset-x-0 -bottom-[43%] h-12 bg-gradient-to-t from-white to-transparent pointer-events-none border-2 border-green-500'
            /> */}

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
                  
                  <div className="relative w-full flex flex-col gap-3">
                    <Label>Model</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='outline'
                          role="combobox"
                          className="w-full justify-between">
                          {options.model.label}
                          <ChevronsUpDown className="w-4 h-4 ml-2 shrink-0 opacity-50" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {MODELS.options.map((model) => (
                          <DropdownMenuItem
                            key={model.label}
                            className={cn(
                              'flex items-center p-1.5 gap-1 text-sm cursor-pointer hover:bg-zinc-100',
                              {
                                'bg-zinc-100': model.label === options.model.label,
                              }
                            )}
                            onClick={() => {
                              setOptions((prev) => ({ ...prev, model }))
                            }}>
                            <Check
                              className={cn(
                                'w-4 h-4 mr-2',
                                model.label === options.model.label ? 'opactiy-100' : 'opactiy-0'
                              )}
                            />
                            {model.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                
                  {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }))
                      }}>
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className='mt-3 space-y-4'>
                        {selectableOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({ active, checked }) =>
                              cn(
                                'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
                                {
                                  'border-primary': active || checked,
                                }
                              )
                            }>
                            <span className='flex items-center'>
                              <span className='flex flex-col text-sm'>
                                <RadioGroup.Label
                                  className='font-medium text-gray-900'
                                  as='span'>
                                  {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                  <RadioGroup.Description
                                    as='span'
                                    className='text-gray-500'>
                                    <span className='block sm:inline'>
                                      {option.description}
                                    </span>
                                  </RadioGroup.Description>
                                ) : null}
                              </span>
                            </span>

                            <RadioGroup.Description
                              as='span'
                              className='mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'>
                              <span className='font-medium text-gray-900'>
                                {formatPrice(option.price / 100)}
                              </span>
                            </RadioGroup.Description>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
                
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
  )
}

export default DesignConfigurator
