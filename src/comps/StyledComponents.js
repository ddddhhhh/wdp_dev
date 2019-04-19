import styled from "styled-components";
import ScrollConstants from "./constants/ScrollConstants";
import TabConstants from "./constants/TabConstants";
import ToolConstants from "./constants/ToolConstants";
import SplitterConstants from "./constants/SplitterConstants";

export const Root = styled.div`
  width: 100%;
  height: 100%;
`;

export const TestDiv = styled.div`
  position: absolute;
  left: ${props => `${props.rect.left}px`};
  top: ${props => `${props.rect.top}px`};
  width: ${props => `${props.rect.width}px`};
  height: ${props => `${props.rect.height}px`};
  background: grey;
`;

export const TestDiv2 = styled.div`
  position: absolute;
  left: ${props => `${props.rect.left}px`};
  top: ${props => `${props.rect.top}px`};
  width: ${props => `${props.rect.width}px`};
  height: ${props => `${props.rect.height}px`};
  background: red;
`;

export const Tabbar = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex: none;
  //overflow: hidden;
`;

export const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: ${props => props.type};
`;

export const Container = styled.div`
    //width: ${props => props.width && props.width};
    // border 위,아래 2px
    //height: calc(${props => props.height} - 2px);
    //border: 1px solid ${ScrollConstants.SCROLL_HOVER_COLOR};
    display: flex;
    flex-grow: ${props => (props.size !== "100%" ? 0 : 1)}
    flex-shrink: ${props => (props.size !== "100%" ? 0 : 1)}
    flex-basis: ${props => props.size}
    //flex: 1 1 100%
    flex-direction: column;
`;

export const Splitter = styled.div`
    cursor: ew-resize;
    flex: 0 0 ${props => props.size}
    background-color: ${SplitterConstants.SPLITTER_BACKGROUND_COLOR};
`;

export const TContainer = styled.div`
  position: absolute;
  left: ${props => `${props.rect.left}px`};
  top: ${props => `${props.rect.top}px`};
  width: ${props => `${props.rect.width}px`};
  height: ${props => `${props.rect.height}px`};
  display: flex;
  flex-direction: column;
`;

export const TSplitter = styled.div`
  cursor: ew-resize;
  position: absolute;
  left: ${props => `${props.rect.left}px`};
  top: ${props => `${props.rect.top}px`};
  width: ${props => `${props.rect.width}px`};
  height: ${props => `${props.rect.height}px`};
  background-color: ${SplitterConstants.SPLITTER_BACKGROUND_COLOR};
`;

export const ImageButton = styled.button`
  background: url(${props => props.src});
  background-size: ${props => props.size || "13px"};
  background-position: center center;
  border: none;
  cursor: pointer;
  width: ${props => props.size || "13px"};
  height: ${props => props.size || "13px"};
  vertical-align: middle;
  visibility: ${props => (props.visible ? "visible" : "hidden")};
`;

export const Header = styled.div`
  display: flex;
  //justify-content: space-between;
  //border: 1px solid black;
  position: relative;
  flex: none;
`;

export const DragTab = styled.div`
  flex: none;
  opacity: ${props => (props.hover ? "0.3" : "1")};
  border: 1px solid ${TabConstants.TAB_BORDER_COLOR};
`;

export const Tab = styled.div`
  background: ${props => (props.selected ? "Bisque" : "white")};
  // dragging 시작시 pointer-events를 비활성화한다
  pointer-events: ${props => (props.isDragging ? "none" : "auto")};
  display: flex;
  //border: 1px solid ${TabConstants.TAB_BORDER_COLOR};
  align-items: center;
  margin: 0px;
  padding: 2px;
  max-width: 150px;
  cursor: pointer;
  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
`;

export const TabTitle = styled.span`
  font-family: Segoe WPC, Segoe UI, Malgun Gothic, Dotom, sans-serif;
  font-size: 13px;
  vertical-align: middle;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-left: 3px;
  padding-right: 3px;
`;

export const TabTooltip = styled.span`
  display: ${props => (props.visible ? "block" : "none")};
  //display: block;
  position: absolute;
  padding: 5px;
  //top: 100%;
  //left: 0px;
`;

export const Toolbar = styled.div`
  background-color: ${ToolConstants.TOOLBAR_BACKGROUND_COLOR};
  display: flex;
  pointer-events: ${props => (props.isDragging ? "none" : "auto")};
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0px 3px 0px 3px;
  flex: none;
  marginleft: auto;
`;

export const Tool = styled.div`
  display: flex;
  //border: 1px solid green;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0px 3px 0px 3px;
  flex: 1 1 auto;
`;

export const ToolTooltip = styled.span`
  background-color: lightgreen;
  display: ${props => (props.visible ? "block" : "none")}};
  position: absolute;
  padding: 5px;
  top: 100%;
  left: 0px;
`;
