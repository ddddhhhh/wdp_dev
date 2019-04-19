import * as React from "react";
import ScrollArea from "react-scrollbar";
import ScrollConstants from "./constants/ScrollConstants";

export default class ScrollBox extends React.Component {
  render() {
    let scrollStyle = {
      margin: "0 auto",
      width: this.props.width,
      background: ScrollConstants.SCROLL_BACKGROUND_COLOR
    };

    let contentStyle = {
      width: this.props.contentWidth
    };

    let hcontainerStyle = {
      width: "100%",
      height: "5px",
      left: "0",
      bottom: "0"
    };

    let hscrollbarStyle = {
      width: "20px",
      height: "5px",
      background: "black",
      marginTop: "0px"
    };

    let vcontainerStyle = {
      width: "6px",
      height: "100%",
      left: "0",
      bottom: "0"
    };

    let vscrollbarStyle = {
      width: "6px",
      height: "20px",
      background: "black",
      marginLeft: "1px"
    };

    return (
      <ScrollArea
        style={scrollStyle}
        contentStyle={contentStyle}
        horizontalContainerStyle={hcontainerStyle}
        horizontalScrollbarStyle={hscrollbarStyle}
        verticalContainerStyle={vcontainerStyle}
        verticalScrollbarStyle={vscrollbarStyle}
      >
        {this.props.children}
      </ScrollArea>
    );
  }
}
