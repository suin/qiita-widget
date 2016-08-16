import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Item from "components/Item";

export default class Timeline extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    showHeader: React.PropTypes.bool.isRequired,
    showFooter: React.PropTypes.bool.isRequired
  };

  styles() {
    return {
      container: {}
    };
  }

  render() {
    const styles = this.styles();
    const length = this.props.items.length;
    return (
      <div style={styles.container}>
        {this.props.showHeader ? <Header /> : null}
        {this.props.items.map((item, index) => {
          return <Item key={item.id} {...item} last={index + 1 === length && !this.props.showFooter}/>
        })}
        {this.props.showFooter ? <Footer /> : null}
      </div>
    );
  }
}
