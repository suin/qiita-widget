import React from "react";
import logo from "images/logo.png";

export default class Logo extends React.Component {
  styles() {
    return {
      image: {
        width: 74
      }
    };
  }

  render() {
    const styles = this.styles();
    return (
      <div>
        <a href="http://qiita.com" target="_blank">
          <img src={logo} style={styles.image} />
        </a>
      </div>
    );
  }
}
