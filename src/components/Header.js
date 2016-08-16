import React from "react";
import Logo from "components/Logo";

export default class Header extends React.Component {
  styles() {
    return {
      container: {
        borderBottom: "1px solid rgba(43,91,6,0.15)"
      }
    };
  }

  render() {
    const styles = this.styles();
    return (
      <div style={styles.container}>
        <Logo />
      </div>
    );
  }
}
