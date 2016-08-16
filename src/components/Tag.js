import React from "react";

export default class Tag extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  styles() {
    return {
      container: {
        display: "inline-block",
        position: "relative",
        marginLeft: 7,
        marginRight: 5
      },
      name: {
        marginLeft: 0,
        padding: "0 3px 0 3px",
        background: "#dfdfdf",
        color: "#555",
        textDecoration: "none",
        borderBottomRightRadius: 2,
        borderTopRightRadius: 2,
        display: "inline-block",
        height: 14,
        fontSize: 11.9,
        lineHeight: "14px"
      },
      before: {
        float: "left",
        position: "absolute",
        marginTop: -5,
        top: "50%",
        right: "100%",
        width: 0,
        height: 0,
        borderColor: "transparent #dfdfdf transparent transparent",
        borderStyle: "solid",
        borderWidth: "7px 7px 7px 0"
      },
      nameHover: {
        background: "#acacac"
      },
      beforeHover: {
        borderColor: "transparent #acacac transparent transparent"
      }
    };
  }

  onMouseEnter() {
    this.setState({hover: true});
  }

  onMouseLeave() {
    this.setState({hover: false});
  }

  render() {
    const styles = this.styles();
    return (
      <a href={this.props.url} target="_blank" style={styles.container} onMouseEnter={::this.onMouseEnter} onMouseLeave={::this.onMouseLeave}>
        <span style={{...styles.before, ...(this.state.hover ? styles.beforeHover : {})}} />
        <span style={{...styles.name, ...(this.state.hover ? styles.nameHover : {})}}>{this.props.name}</span>
      </a>
    );
  }
}
