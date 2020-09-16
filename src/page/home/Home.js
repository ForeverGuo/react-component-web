import React from "react";
import { Button } from "antd"
import Test from '@/components/test/Test';
export default () => {
  return <div>
    <Test name="msg" />
    <Button type="primary"> Hello World !</Button>
  </div>
}