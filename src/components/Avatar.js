import React from "react";

export default class Avatar extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    avatar: React.PropTypes.string.isRequired
  };

  styles() {
    return {
      image: {
        width: 32,
        height: 32,
        borderRadius: 3,
        marginRight: 3
      }
    };
  }

  render() {
    const styles = this.styles();
    return (
      <a href={this.props.url} target="_blank">
        <img src={this.props.avatar} style={styles.image}/>
      </a>
    );
  }
}
