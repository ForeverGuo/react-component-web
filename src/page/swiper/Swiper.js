import React from "react";
import Slider from "@/components/Slider/Slider"
const IMAGE_DATA = [
  {
    src: require('@/assets/imgs/timg.jpeg'),
    alt: ''
  },
  {
    src: 'http://5b0988e595225.cdn.sohucs.com/images/20190724/a801831af3c743a4b97e443121f44f30.jpeg',
    alt: ''
  },
  {
    src: require('@/assets/imgs/timg.jpeg'),
    alt: ''
  },
]
/**
* @param speed 选填
* @param delay 选填
* @param pause 选填
* @param autoPlay 选填
* @param dots 选填
* @param arrows 选填
* @param items 必填
* @return 
*/
const Swiper = () => {
  return <div className="scroller">
    <Slider
      items={IMAGE_DATA}
      speed={1.2}
      delay={2.1}
      pause={true}
      autoplay={true}
      dots={true}
      arrows={true}
    />
  </div>
}

export default Swiper;