import * as React from "react";
import Container from "./Container";
import Splitter from "./Splitter";
import * as S from "./StyledComponents";
import LayoutProcessor from "./LayoutProcessor";

export class Layout extends React.Component {
  constructor(props) {
    super(props);

    let rootDom = document.getElementById("root");
    this.rootWidth = rootDom.clientWidth;
    this.rootHeight = rootDom.clientHeight;
    this.LP = new LayoutProcessor(this.rootWidth, this.rootHeight);

    this.dragTabData = {};
    this.isResizing = false;
    this.state = {
      isDragging: false,
      layout: this.LP.getLayout()
    };

    this.containerRects = [];
  }

  removeTab(containerId, tabId) {
    let container = this.LP.findContainer(containerId);
    let idx = this.LP.getTabIndexFromData(container, tabId);
    let tab = container.children[idx];
    if (tab.selected) {
      // TODO: 바로 전에 선택되었던 tab을 선택
      // 현재는 앞의 tab을 선택, 앞에 tab이 없는 경우에는 뒤의 tab을 선택
      if (idx - 1 >= 0) {
        container.children[idx - 1].selected = true;
      } else if (idx + 1 <= container.children.length - 1) {
        container.children[idx + 1].selected = true;
      }
    }
    container.children.splice(idx, 1);
  }
  selectTab(containerId, prevTabId, nextTabId) {
    let container = this.LP.findContainer(containerId);
    let prevTab = this.LP.findTabFromData(container, prevTabId);
    let nextTab = this.LP.findTabFromData(container, nextTabId);
    prevTab.selected = false;
    nextTab.selected = true;
  }
  addTab(targetContainerId, targetTabId, sourceTabData, addNext) {
    let container = this.LP.findContainer(targetContainerId);
    // 기존 selected tab을 비활성화하고, source tab의 selected를 활성화한다
    let selectedTabIdx = container.children.findIndex(
      elm => elm.selected == true
    );
    container.children[selectedTabIdx].selected = false;
    sourceTabData.selected = true;
    let targetIdx = this.LP.getTabIndexFromData(container, targetTabId);
    if (addNext) {
      container.children.splice(targetIdx + 1, 0, sourceTabData);
    } else {
      container.children.splice(targetIdx, 0, sourceTabData);
    }
  }
  addTabLast(targetContainerId, sourceTabData) {
    let container = this.LP.findContainer(targetContainerId);
    // 기존 selected tab을 비활성화하고, source tab의 selected를 활성화한다
    sourceTabData.selected = true;
    // 미리 tab을 지우기 때문에, tab이 없는 경우가 있을 수 있다
    if (container.children.length > 0) {
      let selectedTabIdx = container.children.findIndex(
        elm => elm.selected == true
      );
      container.children[selectedTabIdx].selected = false;
    }
    container.children.push(sourceTabData);
  }
  handleTabClick(containerId, prevTabId, nextTabId) {
    this.selectTab(containerId, prevTabId, nextTabId);
    this.setState({
      layout: this.LP.getLayout()
    });
  }
  handleTabCloseClick(containerId, tabId) {
    this.removeTab(containerId, tabId);
    this.setState({
      layout: this.LP.getLayout()
    });
  }
  handleTabDragStart(containerId, tabId) {
    let container = this.LP.findContainer(containerId);
    let tab = this.LP.findTabFromData(container, tabId);
    this.dragTabData = {
      containerId: containerId,
      tab: Object.assign({}, tab)
    };
    console.log(this.dragTabData);
    this.setState({
      isDragging: true
    });
  }
  handleTabDragEnd(containerId, tabId) {
    this.setState({
      isDragging: false
    });
  }
  /*
    handleTabDragEnter(containerId, tabId) {      
        
    }
    handleTabDragLeave(containerId, tabId) {        
        
    }
    */
  handleTabDrop(targetContainerId, sourceTabId, targetTabId) {
    // 같지 않는 경우는 없어야 함
    if (this.dragTabData.tab.id != sourceTabId) {
      return;
    }
    if (sourceTabId == targetTabId) {
      return;
    }
    let sourceContainerId = this.dragTabData.containerId;
    if (targetTabId == -1) {
      this.removeTab(sourceContainerId, sourceTabId);
      this.addTabLast(targetContainerId, this.dragTabData.tab);
    } else if (sourceContainerId == targetContainerId) {
      let container = this.LP.findContainer(sourceContainerId);
      let sourceTabIdx = this.LP.getTabIndexFromData(container, sourceTabId);
      let targetTabIdx = this.LP.getTabIndexFromData(container, targetTabId);
      this.removeTab(sourceContainerId, sourceTabId);
      if (sourceTabIdx > targetTabIdx) {
        this.addTab(
          targetContainerId,
          targetTabId,
          this.dragTabData.tab,
          false
        );
      } else {
        this.addTab(targetContainerId, targetTabId, this.dragTabData.tab, true);
      }
    } else {
      this.removeTab(sourceContainerId, sourceTabId);
      this.addTab(targetContainerId, targetTabId, this.dragTabData.tab, false);
    }
    this.setState({
      isDragging: false,
      layout: this.LP.getLayout()
    });
  }
  handleTabDropContainer(targetContainerId, sourceTabId, position) {
    console.log(arguments);
    // 같지 않는 경우는 없어야 함
    if (this.dragTabData.tab.id != sourceTabId) {
      return;
    }
    switch (position) {
      // top
      case 0:
        this.LP.addTabToTop(targetContainerId, this.dragTabData.tab);
        break;
      // right
      case 1:
        this.LP.addTabToRight(targetContainerId, this.dragTabData.tab);
        break;
      // left
      case 2:
        //this.LP.addTabToRight(targetContainerId, this.dragTabData.tab)
        break;
      // bottom
      case 3:
        this.LP.addTabToBottom(targetContainerId, this.dragTabData.tab);
        break;
    }
    this.setState({
      isDragging: false,
      layout: this.LP.getLayout()
    });
  }
  handleSplitterMouseDown(id) {
    this.isResizing = true;
  }
  handleSplitterMouseMove(e, id) {
    if (this.isResizing) {
    }
  }
  handleSplitterMouseUp(id) {
    this.isResizing = false;
  }
  handleToolClick(containerId, toolId) {
    console.log(containerId, toolId);
  }
  handleSetContainerRect(containerId, rect) {
    this.LP.setContainerRect(containerId, rect);
    this.setState({
      layout: this.LP.getLayout()
    });
  }
  generateLayout(layout) {
    return layout.map((cont, idx) => {
      if (cont.type == "row" || cont.type == "column") {
        let inner = this.generateLayout(cont.children);
        return (
          <S.Layout key={idx} type={cont.type}>
            {inner}
          </S.Layout>
        );
      } else {
        let inner = [];
        if (cont.type == "container") {
          inner.push(
            <Container
              key={idx}
              id={cont.id}
              size={cont.size}
              width={cont.width}
              rect={cont.rect}
              //height={cont.rect.height}
              tabs={cont.children}
              isDragging={this.state.isDragging}
              maximise={cont.maximise}
              closable={cont.closable}
              onTabClick={this.handleTabClick.bind(this)}
              onTabCloseClick={this.handleTabCloseClick.bind(this)}
              onTabDragStart={this.handleTabDragStart.bind(this)}
              //onTabDragEnter={this.handleTabDragEnter.bind(this)}
              //onTabDragLeave={this.handleTabDragLeave.bind(this)}
              onTabDragEnd={this.handleTabDragEnd.bind(this)}
              onTabDrop={this.handleTabDrop.bind(this)}
              onTabDropContainer={this.handleTabDropContainer.bind(this)}
              onToolClick={this.handleToolClick.bind(this)}
              onSetContainerRect={this.handleSetContainerRect.bind(this)}
            />
          );
        } else if (cont.type == "splitter") {
          inner.push(
            <Splitter
              key={idx}
              id={cont.id}
              vertical={cont.vertical}
              size={cont.size}
              rect={cont.rect}
              //width={cont.rect.width}
              //height={cont.rect.height}
              onSplitterMouseDown={this.handleSplitterMouseDown.bind(this)}
              onSplitterMouseMove={this.handleSplitterMouseMove.bind(this)}
              onSplitterMouseUp={this.handleSplitterMouseUp.bind(this)}
            />
          );
        }
        return inner;
      }
    });
  }
  generateLayout2(layout) {
    return layout.map((cont, idx) => {
      if (cont.type == "row" || cont.type == "column") {
        let inner = this.generateLayout2(cont.children);
        return <>{inner}</>;
      } else {
        let inner = [];
        if (cont.type == "container") {
          inner.push(
            <Container
              key={idx}
              id={cont.id}
              size={cont.size}
              width={cont.width}
              rect={cont.rect}
              //height={cont.rect.height}
              tabs={cont.children}
              isDragging={this.state.isDragging}
              maximise={cont.maximise}
              closable={cont.closable}
              onTabClick={this.handleTabClick.bind(this)}
              onTabCloseClick={this.handleTabCloseClick.bind(this)}
              onTabDragStart={this.handleTabDragStart.bind(this)}
              //onTabDragEnter={this.handleTabDragEnter.bind(this)}
              //onTabDragLeave={this.handleTabDragLeave.bind(this)}
              onTabDragEnd={this.handleTabDragEnd.bind(this)}
              onTabDrop={this.handleTabDrop.bind(this)}
              onTabDropContainer={this.handleTabDropContainer.bind(this)}
              onToolClick={this.handleToolClick.bind(this)}
              onSetContainerRect={this.handleSetContainerRect.bind(this)}
            />
          );
        } else if (cont.type == "splitter") {
          inner.push(<S.TestDiv2 rect={cont.rect} />);
        }
        return inner;
      }
    });
  }
  render() {
    /*
        let w = this.rootWidth - 3;
        let w2 = w / 2;
        let p1 = {
            left: 0,
            top: 0,
            width: w2,
            height: this.rootHeight
        }
        let p2 = {
            left: p1.left + p1.width,
            top: 0,
            width: 3,
            height: this.rootHeight
        }
        let p3 = {
            left: p2.left + 3,
            top: 0,
            width: w2,
            height: this.rootHeight
        }
        return <>
        <S.TestDiv rect={p1} />
        <S.TestDiv2 rect={p2} />
        <S.TestDiv rect={p3} />
        </>
        */
    let layout = this.generateLayout2([this.state.layout]);
    return <S.Root>{layout}</S.Root>;
  }
}
