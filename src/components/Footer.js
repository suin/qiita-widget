import React from "react";
import Link from "components/Link";

export default class Footer extends React.Component {
  styles() {
    return {
      container: {
        fontFamily: "\"Helvetica Neue\", Helvetica, \"ヒラギノ角ゴ ProN W3\", \"Hiragino Kaku Gothic ProN\", \"メイリオ\", Meiryo, sans-serif",
        fontSize: 12,
        marginTop: 5
      }
    };
  }

  render() {
    const styles = this.styles();
    return (
      <div style={styles.container}>
        <Link href="https://qiita-widget.suin.io" target="_blank">Qiita Widgetを埋め込む</Link>
      </div>
    );
  }
}
