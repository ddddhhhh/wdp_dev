import React from "react";
import ReactDom from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Layout } from "./comps/Layout";

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        font-family: Segoe WPC,Segoe UI,Malgun Gothic,Dotom,sans-serif;
        font-size: 13px;
        height: 100%;
        margin: 0;
        overflow: hidden;
        width: 100%;
    }
`;

//ReactDom.render(<CKEditor editor={ ClassicEditor } data="<p>Hello from CKEditor 5!</p>"/>, document.getElementById("root"));
ReactDom.render(
  <>
    <GlobalStyle />
    <Layout />
  </>,
  document.getElementById("root")
);
