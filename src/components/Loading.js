import React from "react"
import MiningIcon from '../hoe.svg';
import { ImageLoad } from "./ImageLoad";
import { useSpring, animated } from "react-spring";

export default function Loading() {

  const { rotateZ } = useSpring({
    loop: true,
    from: {
      rotateZ: 0,
      scale: 1
    },
    to: {

      rotateZ: 45,
      scale: 1.3
    },
    config: { duration: 500 },
    reset: true,
  });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <animated.div className="p-10 " style={ {
          transform: rotateZ.interpolate(z => `rotateZ(${z}deg)`)
        } }>
          <div className="w-20 h-20">
            <ImageLoad image={ MiningIcon } />
          </div>
        </animated.div>
        <h2 class="text-center text-white text-2xl font-semibold">Loading...</h2>
      </div>
    </>
  )
}
