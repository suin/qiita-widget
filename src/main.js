import React from "react";
import ReactDom from "react-dom";
import Widget from "components/Widget";

const WIDGET_SELECTOR = "[data-qiita-widget],.qiita-timeline"; // .qiita-timelineは旧ウィジェット互換のため

Array.prototype.forEach.call(document.querySelectorAll(WIDGET_SELECTOR), (element) => {
  const newElement = document.createElement("div");
  const dataset = {...element.dataset};
  ReactDom.render(<Widget {...dataset} />, newElement);
  element.parentNode.replaceChild(newElement, element);
});
