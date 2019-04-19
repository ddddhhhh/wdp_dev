import * as React from 'react';
import styled from 'styled-components';
import * as S from './StyledComponents';

const Div = styled.div`    
    position: relative;
    flex: 0 0 100%;
`;

const PlaceHolder = styled.div`
    // place holder 자체가 drag event를 받지 않기 위해서
    pointer-events: none;
    position: absolute;
    left: ${props => props.rect.left};
    top: ${props => props.rect.top};
    width: ${props => props.rect.width};
    height: ${props => props.rect.height};
    background: grey;
    opacity: 0.3;
`;

export class Component extends React.Component {
    constructor(props) {
        super(props);

        this.innerDiv = React.createRef();
        this.state = {
            placeholder: null
        };
        this.dropPosition = 0;
    }
    componentDidMount() {}
    handleTabDragEnter(e) {
        //e.target.style.background = ScrollConstants.SCROLL_HOVER_COLOR;
        e.preventDefault();
    }
    handleTabDragLeave(e) {
        this.setState({
            placeholder: null
        });
        e.preventDefault();
    }
    handleTabDrop(e) {
        console.log('tab drop');
        let sourceTabId = e.dataTransfer.getData('text');
        this.setState({
            placeholder: null
        });
        this.props.onTabDrop(sourceTabId, this.dropPosition);
        //e.target.style.background = "white";        
        e.stopPropagation();
    }
    // CouterClockWise
    ccw(p1, p2, p3) {
        let v = p1.x * p2.y + p2.x * p3.y + p3.x * p1.y;
        v = v - p1.y * p2.x - p2.y * p3.x - p3.y * p1.x;        
        if (v > 0) {
            // p1 -> p2 -> p3가 반시계 방향
            return 1;        
        } else if (v < 0) {
            // p1 -> p2 -> p3가 시계 방향
            return -1;
        } else {
            // p1 -> p2 -> p3가 일직선
            return 0;
        }
    }
    calcDropPosition(leftTop, rightTop, leftBottom, rightBottom, offset) {
        if (this.ccw(rightBottom, offset, leftTop) <= 0) {
            if (this.ccw(leftBottom, offset, rightTop) >= 0) {
                // top
                return 0;
            } else {
                // right
                return 1;
            }
        } else {
            if (this.ccw(leftBottom, offset, rightTop) >= 0) {
                // left
                return 2;
            } else {
                // bottom
                return 3;
            }
        }
    }
    handleTabDragOver(e) {
        let x = e.pageX - this.innerDiv.current.offsetLeft;
        let y = e.pageY - this.innerDiv.current.offsetTop;
        let rect = this.innerDiv.current.getBoundingClientRect();
        let leftTop = { x: 0, y: 0 };
        let rightTop = { x: rect.width, y: 0 };
        let leftBottom = { x: 0, y: rect.height };
        let rightBottom = { x: rect.width, y: rect.height };
        let offset = { x: x, y: y };
        this.dropPosition = this.calcDropPosition(leftTop, rightTop, leftBottom, rightBottom, offset);
        let phRect = null;
        switch (this.dropPosition) {
            // top
            case 0:
                phRect = {
                    left: '0px',
                    top: '0px',
                    width: `${rect.width}px`,
                    height: `${rect.height / 2}px`
                };
                break;
            // right
            case 1:
                phRect = {
                    left: `${rect.width / 2}px`,
                    top: '0px',
                    width: `${rect.width / 2}px`,
                    height: `${rect.height}px`
                };
                break;
            // left
            case 2:
                phRect = {
                    left: '0px',
                    top: '0px',
                    width: `${rect.width / 2}px`,
                    height: `${rect.height}px`
                };
                break;
            // bottom
            case 3:
                phRect = {
                    left: '0px',
                    top: `${rect.height / 2}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height / 2}px`
                };
                break;
            default:
        }
        this.setState({
            placeholder: phRect
        });
        e.preventDefault();
    }
    render() {
        return (
            <Div
                {...this.props}
                ref={this.innerDiv}
                onDragEnter={this.handleTabDragEnter.bind(this)}
                onDragLeave={this.handleTabDragLeave.bind(this)}
                onDragOver={this.handleTabDragOver.bind(this)}
                onDrop={this.handleTabDrop.bind(this)}>
                <div>component</div>
                {this.state.placeholder != null && <PlaceHolder rect={this.state.placeholder} />}
            </Div>
        );
    }
}
