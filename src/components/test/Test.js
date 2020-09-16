import React from "react";
import { Button } from "antd"

const My = (props) => {
  const handldeClick = () => {
    console.log('1344444')
  };
  return (
    <div>
      <Button type="dashed" onClick={handldeClick.bind(this)}>hello world!</Button>
    </div>
  )
};

export default My;

