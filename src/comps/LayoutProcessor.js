import LayoutData from "../layoutData";

const hSplitter = {
  type: "splitter",
  vertical: false,
  size: "3px"
};

const vSplitter = {
  type: "splitter",
  vertical: true,
  size: "3px"
};

export default class LayoutProcessor {
  constructor(rootWidth, rootHeight) {
    let layout = LayoutData.layout;
    this.rootWidth = rootWidth;
    this.rootHeight = rootHeight;
    this.setId(layout);
    this.layout = layout;
    this.calculateContainerRect(this.layout, 0, 0, rootWidth, rootHeight);
    console.log(this.layout);
  }
  calculateContainerRect(parent, left, top, width, height) {
    if (parent.children) {
      let childLength = parent.children.filter(c => c.type != "splitter")
        .length;
      let splitterNum = childLength - 1;
      if (parent.type == "row") {
        let w = width - splitterNum * 3;
        let sw = w / childLength;
        for (let i = 0; i < parent.children.length; i++) {
          let item = parent.children[i];
          if (item.type == "container") {
            item.rect = {
              left: left,
              top: top,
              width: sw,
              height: height
            };
            left = item.rect.left + item.rect.width;
          } else if (item.type == "splitter") {
            item.rect = {
              left: left,
              top: top,
              width: 3,
              height: height
            };
            left = item.rect.left + item.rect.width;
          } else if (item.type == "column") {
            this.calculateContainerRect(item, left, top, sw, height);
            left = left + sw;
          }
        }
      } else if (parent.type == "column") {
        let h = height - splitterNum * 3;
        let sh = h / childLength;
        for (let i = 0; i < parent.children.length; i++) {
          let item = parent.children[i];
          if (item.type == "container") {
            item.rect = {
              left: left,
              top: top,
              width: width,
              height: sh
            };
            top = item.rect.top + item.rect.height;
          } else if (item.type == "splitter") {
            item.rect = {
              left: left,
              top: top,
              width: width,
              height: 3
            };
            top = item.rect.top + item.rect.height;
          } else if (item.type == "row") {
            this.calculateContainerRect(item, left, top, width, sh);
            top = top + height;
          }
        }
      }
    }
  }
  setId(item) {
    if (item.children) {
      item.children.forEach(i => {
        if (!i.id) {
          i.id = this.genId();
        }
        this.setId(i);
      });
    }
  }
  genId() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
  getContainerLayout(parent, id) {
    if (parent.children) {
      for (let i = 0; i < parent.children.length; i++) {
        let container = parent.children[i];
        if (container.id == id) {
          return {
            parent: parent,
            container: container,
            idx: i
          };
        }
        if (container.type == "row" || container.type == "column") {
          let result = this.getContainerLayout(container, id);
          if (result) {
            return result;
          }
        }
      }
    }
  }
  findContainer(id) {
    return this.getContainerLayout(this.layout, id).container;
  }
  findTab(containerId, tabId) {
    let c = this.findContainer(containerId);
    let idx = c.children.findIndex(e => e.id == tabId);
    return c.children[idx];
  }
  findTabFromData(container, tabId) {
    let idx = container.children.findIndex(e => e.id == tabId);
    return container.children[idx];
  }
  getTabIndexFromData(container, tabId) {
    let idx = container.children.findIndex(e => e.id == tabId);
    return idx;
  }
  getLayout() {
    return this.layout;
  }
  setContainerRect(id, rect) {
    //let container = this.findContainer(id);
    let containerLayout = this.getContainerLayout(this.layout, id);
    let container = containerLayout.container;
    let parent = containerLayout.parent;
    if (parent.type == "row") {
      //container.size = `${rect.width}px`;
      container.width = rect.width;
      container.height = rect.height;
    } else {
      //container.size = `${rect.height}px`;
      container.width = rect.width;
      container.height = rect.height;
    }
  }
  generateNewContainer(type, tabData, width, height) {
    return {
      type: "container",
      size: type == "row" ? `${width}px` : `${height}px`,
      //id: 'aaaa',
      id: this.genId(),
      width: width,
      height: height,
      children: [tabData]
    };
  }
  addTabToTop(containerId, tabData) {
    let containerLayout = this.getContainerLayout(this.layout, containerId);
    let container = containerLayout.container;
    let parent = containerLayout.parent;
    let containerIdx = containerLayout.idx;
    if (parent.type == "row") {
      let newLayout = {
        type: "column",
        children: [this.generateNewContainer(tabData), vSplitter, container]
      };
      parent.children[containerIdx] = newLayout;
    } else if (parent.type == "column") {
      parent.children.splice(containerIdx, 0, vSplitter);
      parent.children.splice(
        containerIdx,
        0,
        this.generateNewContainer(tabData)
      );
    }
  }
  addTabToBottom(containerId, tabData) {
    let containerLayout = this.getContainerLayout(this.layout, containerId);
    let container = containerLayout.container;
    let parent = containerLayout.parent;
    let containerIdx = containerLayout.idx;
    if (parent.type == "row") {
      let newLayout = {
        type: "column",
        children: [container, hSplitter, this.generateNewContainer(tabData)]
      };
      parent.children[containerIdx] = newLayout;
    } else if (parent.type == "column") {
      parent.children.splice(
        parent.children.length - 1,
        0,
        this.generateNewContainer(tabData)
      );
      parent.children.splice(parent.children.length - 1, 0, vSplitter);
    }
  }
  addTabToRight(containerId, tabData) {
    let containerLayout = this.getContainerLayout(this.layout, containerId);
    let container = containerLayout.container;
    let parent = containerLayout.parent;
    let containerIdx = containerLayout.idx;
    let newWidth = container.rect.width / 2;
    container.rect = {
      left: container.rect.left,
      top: container.rect.top,
      width: newWidth,
      height: container.rect.height
    };
    let splitter = {
      type: "splitter",
      vertical: false,
      rect: {
        left: container.rect.left + newWidth,
        top: container.rect.top,
        width: 3,
        height: container.rect.height
      }
    };
    let newCont = {
      type: "container",
      id: this.genId(),
      rect: {
        left: splitter.rect.left + 3,
        top: container.rect.top,
        width: newWidth,
        height: container.rect.height
      },
      children: [tabData]
    };
    if (parent.type == "column") {
      let newLayout = {
        type: "row",
        children: [container, splitter, newCont]
      };
      parent.children[containerIdx] = newLayout;
    } else if (parent.type == "row") {
      parent.children.splice(containerIdx + 1, 0, newCont);
      parent.children.splice(containerIdx + 1, 0, splitter);
    }
  }
}
