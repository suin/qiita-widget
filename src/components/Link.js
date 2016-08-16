import React from "react";

export default class Link extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    hoverStyle: React.PropTypes.object
  };

  static defaultProps = {
    style: {},
    hoverStyle: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  styles() {
    return {
      defaultLink: {
        color: "#337ab7",
        textDecoration: "none"
      },
      hoveredLink: {
        color: "#23527c",
        textDecoration: "underline"
      }
    };
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    const styles = this.styles();
    const defaultLink = {...styles.defaultLink, ...this.props.style};
    const hoveredLink = {...styles.hoveredLink, ...this.props.hoverStyle};
    const style = {...defaultLink, ...(this.state.hover ? hoveredLink : {})};
    const props = {...this.props};
    delete props.hoverStyle;
    return (<a {...props} style={style} onMouseEnter={::this.toggleHover} onMouseLeave={::this.toggleHover} />);
  }
}
