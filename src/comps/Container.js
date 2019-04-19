import * as React from "react";
import Header from "./Header.js";
import { Component } from "./Component.js";
import * as S from "./StyledComponents";

export default class Container extends React.Component {
  constructor(props) {
    super(props);

    this.containerDiv = React.createRef();
  }
  componentDidMount() {
    let rect = this.containerDiv.current.getBoundingClientRect();
    this.props.onSetContainerRect(this.props.id, rect);
  }
  handleTabClick(prevTabId, newTabId) {
    this.props.onTabClick(this.props.id, prevTabId, newTabId);
  }
  handleTabCloseClick(tabId) {
    this.props.onTabCloseClick(this.props.id, tabId);
  }
  handleTabDragStart(tabId) {
    this.props.onTabDragStart(this.props.id, tabId);
  }
  /*
    handleTabDragEnter(tabId) {
        this.props.onTabDragEnter(this.props.id, tabId);
    }
    handleTabDragLeave(tabId) {
        this.props.onTabDragLeave(this.props.id, tabId);
    }
    */
  handleTabDragEnd(tabId) {
    this.props.onTabDragEnd(this.props.id, tabId);
  }
  handleTabDrop(sourceTabId, targetTabId) {
    this.props.onTabDrop(this.props.id, sourceTabId, targetTabId);
  }
  handleToolClick(toolId) {
    this.props.onToolClick(this.props.id, toolId);
  }
  handleTabDropComponent(sourceTabId, position) {
    this.props.onTabDropContainer(this.props.id, sourceTabId, position);
  }
  render() {
    console.log(this.props.rect);
    return (
      <S.TContainer {...this.props} ref={this.containerDiv}>
        <Header
          id={this.props.id}
          size={this.props.size}
          width={this.props.width}
          //height='24px'
          tabs={this.props.tabs}
          maximise={this.props.maximise}
          closable={this.props.closable}
          isDragging={this.props.isDragging}
          onTabClick={this.handleTabClick.bind(this)}
          onTabCloseClick={this.handleTabCloseClick.bind(this)}
          onTabDragStart={this.handleTabDragStart.bind(this)}
          //onTabDragEnter={this.handleTabDragEnter.bind(this)}
          //onTabDragLeave={this.handleTabDragLeave.bind(this)}
          onTabDragEnd={this.handleTabDragEnd.bind(this)}
          onTabDrop={this.handleTabDrop.bind(this)}
          onToolClick={this.handleToolClick.bind(this)}
        />
        <Component onTabDrop={this.handleTabDropComponent.bind(this)} />
      </S.TContainer>
    );
  }
}
