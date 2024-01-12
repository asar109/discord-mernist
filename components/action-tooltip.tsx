import React, { ReactNode } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


  
  const ActionTooltip = ({
    children , 
    message ,
    side ,
    align,

  } : {
    children : ReactNode,
    message : string,
    side? : 'bottom'| 'top' | 'left' | 'right' ,
    align : 'start' | 'center' | 'end'
  }) => {
    return (
        <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent className='border-0 ' side={side} align={align}  >
            <p className='capitalize text-sm ' >{message.toLocaleLowerCase()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  
  export default ActionTooltip