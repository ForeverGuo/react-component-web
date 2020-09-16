import React from "react";

const SliderItem = (props) => {
  const {count, item} = props;
  let width = `${100 / count}%`;
  return(
    <li className="slider-item" style={{width: width}}>
      <img src={item.src}  alt={item.alt} />
    </li>
  )
}

export default SliderItem;