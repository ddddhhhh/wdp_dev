import * as React from "react";
import Tabbar from "./Tabbar";
import { Toolbar } from "./Toolbar";
import ScrollConstants from "./constants/ScrollConstants";
import * as S from "./StyledComponents";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toolbarRef = React.createRef();
    this.headerWidth = React.createRef();
    this.state = {
      toolbarWidth: "0px",
      headerWidth: "0px"
    };
  }
  componentDidUpdate(prevProps, prevState) {}
  componentWillReceiveProps(nextProps) {
    /*
    if (this.state.headerWidth != nextProps.width) {
      this.setState({
        headerWidth: nextProps.width
      });
    }
    */
    //console.log('receive props');
    //console.log(`${this.props.id}, ${this.toolbarRef.current.innerDiv.current.clientWidth}, ${this.headerWidth.current.clientWidth}`);
  }
  componentDidMount() {
    //console.log('mount')
    //console.log(`${this.props.id}, ${this.toolbarRef.current.innerDiv.current.clientWidth}, ${this.headerWidth.current.clientWidth}`);
    this.setState({
      toolbarWidth: this.toolbarRef.current.innerDiv.current.clientWidth,
      headerWidth: this.headerWidth.current.clientWidth
    });
  }
  handleTabDragEnter(e) {
    // toolbar일 경우 금지
    if (e.target.className.trim() != "scrollarea") {
      return;
    }
    e.target.style.background = ScrollConstants.SCROLL_HOVER_COLOR;
    e.preventDefault();
  }
  handleTabDragLeave(e) {
    // toolbar일 경우 금지
    if (e.target.className.trim() != "scrollarea") {
      return;
    }
    e.target.style.background = ScrollConstants.SCROLL_BACKGROUND_COLOR;
    e.preventDefault();
  }
  handleTabDrop(e) {
    let sourceTabId = e.dataTransfer.getData("text");
    // 제일 마지막에 추가하는 경우에 target tab id는 -1
    this.props.onTabDrop(sourceTabId, -1);
    e.target.style.background = ScrollConstants.SCROLL_BACKGROUND_COLOR;
    e.stopPropagation();
  }
  handleTabDragOver(e) {
    e.preventDefault();
  }
  render() {
    //let w = `${this.state.headerWidth - this.state.toolbarWidth}px`;
    //console.log(this.props.id);
    //console.log(`header ${this.props.width}`);
    //console.log(`calc ${this.state.headerWidth - this.state.toolbarWidth}`);
    let w = this.state.headerWidth - this.state.toolbarWidth;
    /*
    if (this.props.width) {
      w = this.props.width - this.state.toolbarWidth;
    }
    */
    return (
      <S.Header
        {...this.props}
        onDragEnter={this.handleTabDragEnter.bind(this)}
        onDragLeave={this.handleTabDragLeave.bind(this)}
        onDragOver={this.handleTabDragOver.bind(this)}
        onDrop={this.handleTabDrop.bind(this)}
        ref={this.headerWidth}
      >
        <Tabbar
          width={w}
          //width={this.props.size}
          isDragging={this.props.isDragging}
          onTabClick={this.props.onTabClick}
          onTabCloseClick={this.props.onTabCloseClick}
          onTabDragStart={this.props.onTabDragStart}
          //onTabDragEnter={this.props.onTabDragEnter}
          //onTabDragLeave={this.props.onTabDragLeave}
          onTabDragEnd={this.props.onTabDragEnd}
          onTabDrop={this.props.onTabDrop}
          tabs={this.props.tabs}
        />
        {(this.props.closable != false || this.props.maximise != false) && (
          <Toolbar
            ref={this.toolbarRef}
            isDragging={this.props.isDragging}
            closable={this.props.closable}
            maximise={this.props.maximise}
            onToolClick={this.props.onToolClick}
          />
        )}
      </S.Header>
    );
  }
}
