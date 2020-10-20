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
            Box: {},
            Boxs: []
        }
    }
    handleDragOver = event =>{
        event.preventDefault();
    }
    handleOnDrop = event => {
        event.stopPropagation();
        event.preventDefault();
        event.persist();
        console.log(event)
        
        const {offsetX, offsetY} = event;
        
        let { Boxs, Box } = this.state;
        Boxs.push(Box);
        this.setState({
            Boxs: Boxs
        })
    }
    handleOnDragStart = (event, it) => {
        event.persist();
        console.log(event, it);

        it.width = 80;
        it.height = 80;

        this.setState({
            Box: it
        })
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
                style={{
                    width: `${it.width}px`,
                    height: `${it.height}px`,
                    lineHeight: `${it.height}px`
                }}
            >
                { it.name }
            </div>
        );
        
        return (
            <div className="Drag">
                <div 
                    className="DragTarget"
                    onDrop={(Event) => this.handleOnDrop(Event)}
                    onDragOver={(Event) => this.handleDragOver(Event)}
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