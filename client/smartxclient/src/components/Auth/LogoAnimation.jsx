import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const LogoAnimation = () => {

  useGSAP(()=>{
    const t1 = gsap.timeline();

    t1.from(".smart",{
      x:200,
      opacity:0,
      delay:0.3,
      duration:0.6,
    });

    t1.from(".xLogo",{
      y:200,
      opacity:0,
      delay:0.3,
      duration:0.6,
    },"-=1")
  })

  return (
    <div>
      <h1 className='font-bold flex items-center'> 
          <p className='smart text-4xl sm:text-5xl lg:text-6xl'>
            Smart
          </p>

         <p className='text-yellow-400 inline-block xLogo
                       text-6xl sm:text-7xl lg:text-9xl'>
            X
         </p>
       </h1>
    </div>
  )
}

export default LogoAnimation
