import * as React from "react";
import Tab from "./Tab";
import ScrollBox from "./ScrollBox";
import * as S from "./StyledComponents";
import TabConstants from "./constants/TabConstants";

export default class Tabbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentWidth: ""
    };
    this.selectedId = "";
    this.innerDiv = React.createRef();
  }
  componentDidMount() {
    this.setState({
      contentWidth: this.innerDiv.current.scrollWidth
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contentWidth != this.innerDiv.current.scrollWidth) {
      this.setState({
        contentWidth: this.innerDiv.current.scrollWidth
      });
    }
  }
  handleTabClick(id) {
    this.props.onTabClick(this.selectedId, id);
  }
  handleTabDragEnter(e) {
    e.target.style.border = `1px solid ${TabConstants.TAB_BORDER_HOVER_COLOR}`;
    e.target.style.opacity = "0.3";
    e.preventDefault();
    //this.props.onTabDragEnter(id);
  }
  handleTabDragLeave(e) {
    e.target.style.border = `1px solid ${TabConstants.TAB_BORDER_COLOR}`;
    e.target.style.opacity = "1";
    e.preventDefault();
    //this.props.onTabDragLeave(id);
  }
  handleTabDragOver(e) {
    e.preventDefault();
  }
  handleTabDragStart(e) {
    let id = e.currentTarget.id;
    e.dataTransfer.setData("text", id);
    this.props.onTabDragStart(id);
  }
  handleTabDragEnd(e) {
    let id = e.currentTarget.id;
    this.props.onTabDragEnd(id);
  }
  handleTabDrop(e) {
    e.target.style.border = `1px solid ${TabConstants.TAB_BORDER_COLOR}`;
    e.target.style.opacity = "1";
    let sourceTabId = e.dataTransfer.getData("text");
    let targetTabId = e.target.id;
    this.props.onTabDrop(sourceTabId, targetTabId);
    e.stopPropagation();
  }
  render() {
    let content = [];
    this.props.tabs.map((tab, idx) => {
      if (tab.selected) {
        this.selectedId = tab.id;
      }
      content.push(
        <S.DragTab
          key={idx}
          id={tab.id}
          draggable="true"
          onDragStart={this.handleTabDragStart.bind(this)}
          onDragEnter={this.handleTabDragEnter.bind(this)}
          onDragEnd={this.handleTabDragEnd.bind(this)}
          onDragLeave={this.handleTabDragLeave.bind(this)}
          onDrop={this.handleTabDrop.bind(this)}
          onDragOver={this.handleTabDragOver.bind(this)}
        >
          <Tab
            id={tab.id}
            title={tab.title}
            tooltip={tab.tooltip}
            closable={tab.closable}
            selected={tab.selected}
            isDragging={this.props.isDragging}
            onClick={this.handleTabClick.bind(this)}
            onCloseClick={this.props.onTabCloseClick}
          />
        </S.DragTab>
      );
    });
    let s1 = {
      //flex: `0 0 ${this.state.headerWidth - this.state.toolbarWidth}`
      flex: "1 1 auto"
    };
    console.log(`tabbar : ${this.props.width}`);
    return (
      //<S.Tabbar ref={this.innerDiv}>{content}</S.Tabbar>

      <ScrollBox
        //style={s1}
        width={this.props.width}
        //width='500px'
        contentWidth={this.state.contentWidth}
      >
        <S.Tabbar ref={this.innerDiv}>{content}</S.Tabbar>
      </ScrollBox>
    );
  }
}
