import React from "react";

const SliderDots = (props) => {
  // count: 轮播总项，
  // newLocal: 当前轮播项，
  // turn: 点击 dot 回调
  const {count , newLocal, turn} = props;
  const dots = [];
  const handleDotClick = (i) => {
    let option = i - newLocal;
    turn(option);
  };
  for(let i=0; i<count; i++) {
    dots[i] = (
      <span
        key={`dot${i}`}
        className={`slider-dot ${i === newLocal ? 'slider-dot-selected' : ''}`}
        onClick={handleDotClick.bind(this,i)}
      ></span>
    )
  };
  return(
    <div className="slider-dots-wrap">
      { dots }
    </div>
  )
}

export default SliderDots;