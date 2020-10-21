import React from 'react';
import './Drag.scss';

class Drag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Items: [
                {
                    name: 'drag1',
                },
                {
                    name: 'drag2',
                },
                {
                    name: 'drag3',
                }, 
            ],
            Box: '',
            Boxs: [
                {
                    name: 'Drag Me!',
                    width: 80,
                    height: 80
                }
            ],
        };
    }
    handleDragOver = event =>{
        event.preventDefault();
    }
    handleOnDrop = event => {
        event.stopPropagation();
        event.preventDefault();
        event.persist();
        console.log(event.nativeEvent)
        
        const {offsetX, offsetY} = event.nativeEvent;
        
        let { Boxs, Box } = this.state;
        Box.left = (offsetX - Box.width / 2).toFixed(6);
        Box.top = (offsetY - Box.height / 2).toFixed(6);

        Boxs.push(Box);
    
        this.setState({
            Boxs: Boxs
        })
    }
    handleOnDragStart = (event, it) => {
        // 通过persist 获取 event 对象
        event.persist();
        console.log(event, it);
        let obj = { 
            width: 80,
            height: 80,
            name: it.name
        }
        this.setState({
            Box: obj
        })
    }
    handleDragBox = (event, it, index) => {

        event.stopPropagation();
        event.preventDefault();

        let {width, height} = it;
   
        this.boxRef = this[`boxRef${index}`];
        // 可视区域宽高
        let browserWidth = this.targetRef.style.width.split('px')[0],
            browserHeight = this.targetRef.style.height.split('px')[0];
        // 拖拽元素宽高
        let boxWidth = width,
            boxHeight = height;
        // 鼠标相对element 左侧位置, offsetLeft: 已经定义好的相对父元素的距离

        let disX = event.nativeEvent.clientX - this.boxRef.offsetLeft;
        let disY = event.nativeEvent.clientY - this.boxRef.offsetTop;

        document.onmousemove = e => {
          let clientX = e.clientX,
              clientY = e.clientY;

          this.boxRef.style.left = clientX - disX + "px";
		  // 左侧边缘
		  if (clientX - disX <= 0) {
			this.boxRef.style.left = 0 + "px";
			// 右侧边缘
		  } else if (boxWidth - disX + clientX >= browserWidth) {
			this.boxRef.style.left = browserWidth - boxWidth + "px";
		  }
  
		  this.boxRef.style.top = clientY - disY + "px";
		  // 与上同理
		  if (clientY - disY <= 0) {
			this.boxRef.style.top = 0 + "px";
		  } else if (boxHeight - disY + clientY >= browserHeight) {
			this.boxRef.style.top = browserHeight - boxHeight + "px";
		  }
        };

        document.onmouseup = () => {
            return ([document.onmousemove, document.onmouseup] = [null, null]);
        };

    }
    handleResizeImageX = (event, it, index) => {
        event.stopPropagation();
        event.preventDefault();

        const { width } = it;
        let x = event.clientX;

        document.onmousemove = e => {
            let xx = e.clientX;
            let resizeWidth = width +  xx - x;
            let rightOrigin = this.targetRef.style.width.split('px')[0] - this[`boxRef${index}`].style.left.split('px')[0];
            console.log(resizeWidth, rightOrigin);
            if(resizeWidth < width) {
                this[`boxRef${index}`].style.width = `${width}px`;
            } else if(resizeWidth >= rightOrigin) {
                this[`boxRef${index}`].style.width = `${rightOrigin}px`;
            } else{
                this[`boxRef${index}`].style.width = `${resizeWidth}px`;
            }
        };

        document.onmouseup = () => {
            return ([document.onmousemove, document.onmouseup] = [null, null]);
        };
    }

    render() {
        let { Items, Boxs } = this.state;
        Items = Items.map((it, index) => 
            <li 
                draggable="true"
                key={ index }
                onDragStart={(Event) => this.handleOnDragStart(Event, it)}
            > 
                { it.name }
            </li>
        );
        Boxs = Boxs.map((it, index) => 
            <div
                key= {index}
                className="Box"
                draggable="true"
                style={{
                    width: `${it.width}px`,
                    height: `${it.height}px`,
                    lineHeight: `${it.height}px`,
                    top: `${it.top}px`,
                    left: `${it.left}px`
                }}
                ref = {e => this[`boxRef${index}`] = e}
                onMouseDown={e => this.handleDragBox(e, it, index)}
            >
                { it.name }
                <span
                    className={['Circle', 'xLCircle'].join(' ')}
                    onMouseDown={e => this.handleResizeImageX(e, it, index)}
                ></span>
                <span
                    className={['Circle', 'xRCircle'].join(' ')}
                    onMouseDown={e => this.handleResizeImageX(e, it, index)}
                ></span>
                <span
                    className={['Circle', 'yTCircle'].join(' ')}
                ></span>
                <span
                    className={['Circle', 'yBCircle'].join(' ')}
                ></span>
            </div>
        );
        
        return (
            <div className="Drag">
                <div 
                    className="DragTarget"
                    onDrop={e => this.handleOnDrop(e)}
                    onDragOver={e => this.handleDragOver(e)}
                    style= {{
                        width: '600px',
                        height: '400px'
                    }}
                    ref={e => this.targetRef = e}
                >
                   { Boxs }
                </div>
                <div className="DragItem">
                    <ul>
                    { Items }
                    </ul>
                </div>
            </div>
        )
    }
    
}

export default Drag;