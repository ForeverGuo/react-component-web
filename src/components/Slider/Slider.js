import React, { Component } from "react";
import SliderItem from "./SliderItem/SliderItem"
import SliderDots from "./SliderDots/SliderDots"
import SliderArrows from "./SliderArrows/SliderArrows"
import "./Slider.scss"

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
class Slider extends Component {
  static defaultProps = {
    speed: 1,
    delay: 2,
    pause: true,
    autoPlay: true,
    dots: true,
    arrows: true,
    items: []
  };

  constructor(props) {
    super(props);
    this.state = {
      newLocal: 0
    }
  };

  /**
   * 向前向后移动多少
   * @param {*} n 
   */
  turn = (n) => {
    const { items } = this.props;
    let _n = this.state.newLocal + n;

    if(_n < 0) {
      _n = _n + items.length;
    }
    if(_n >= items.length) {
      _n = _n - items.length;
    }
    this.setState({
      newLocal: _n
    });
  };
  /**
   * 开始轮播
   */
  goPlay = () => {
    const {autoPlay, delay} = this.props;
    if(autoPlay) {
      this.autoPlayFlag = setInterval(() => {
        this.turn(1)
      }, delay *  1000);
    }
  };
  /**
   * 暂停轮播
   */
  pausePlay = () => {
    clearInterval(this.autoPlayFlag);
  };

  componentDidMount() {
    this.goPlay();
  };
  componentWillUnmount() {
    clearInterval(this.autoPlayFlag);
  };
  render() {
    const{items, arrows, dots, pause, speed} = this.props;
    const newLocal = this.state.newLocal;
    let count = items.length;
    let itemNodes = items.map((item,idx) => {
      return <SliderItem  item={item} count={count} key={`item${idx}`} />
    })
    let arrowsNode = <SliderArrows turn={this.turn.bind(this)} />
    let dotsNode = <SliderDots turn={this.turn.bind(this)} count={count} newLocal={newLocal} />
    return(
      <div
        className="slider"
        onMouseMove={pause ? this.pausePlay.bind(this) : null}
        onMouseOut={pause ? this.goPlay.bind(this) : null}
      >
        <ul
          style={{
            left: `${-100 * newLocal}%`,
            transitionDuration: `${speed}s`,
            width: `${items.length * 100}%`
          }}
        >
          { itemNodes }
        </ul>
        {arrows ? arrowsNode : null}
        {dots ? dotsNode : null}
      </div>
    )
  }
}
Slider.autoPlayFlag = null;

export default Slider;