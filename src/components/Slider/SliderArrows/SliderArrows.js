import React from "react";

const SliderArrows = (props) => {
  const { turn } = props;
  const handleArrowClick = (option) => {
    console.info(option)
    turn(option);
  };
  return (
    <div className="slider-arrows-warp">
      <span
        className="slider-arrow slider-arrow-left"
        onClick={handleArrowClick.bind(this,-1)}
      >
        &lt;
      </span>
      <span
        className="slider-arrow slider-arrow-right"
        onClick={handleArrowClick.bind(this,1)}
      >
        &gt;
      </span>
    </div>
  )
}

export default SliderArrows;