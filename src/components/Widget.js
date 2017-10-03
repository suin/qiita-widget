import React from "react";
import Frame from "react-frame-component";
import Timeline from "components/Timeline";
import request from "http/cors";

export default class Widget extends React.Component {
  static propTypes = {
    // コンテンツ設定(以下のいずれかが必須)
    username: React.PropTypes.string, // ユーザの投稿
    qiitaUsername: React.PropTypes.string, // ユーザの投稿(旧ウィジェット互換のために使えるが非推奨)
    tag: React.PropTypes.string, // タグへの投稿
    search: React.PropTypes.string, // 検索キーワードにマッチする投稿
    // 表示設定
    hideHeader: React.PropTypes.any, // ヘッダーを非表示にするかどうか
    hideFooter: React.PropTypes.any, // フッターを非表示にするかどうか
    items: React.PropTypes.string, // 表示する件数
    width: React.PropTypes.string, // 幅
    height: React.PropTypes.string // 高さ
  };

  static defaultProps = {
    width: "100%",
    height: "400px",
    items: "5"
  };

  constructor(props) {
    super(props);
    let query = null;
    if (props.username) {
      query = "user:" + props.username;
    } else if (props.tag) {
      query = "tag:" + props.tag;
    } else if (props.search) {
      query = props.search;
    } else if (props.qiitaUsername) {
      query = "user:" + props.qiitaUsername;
    }
    this.state = {
      loaded: false,
      items: [],
      query: query
    };
  }

  componentDidMount() {
    if (this.state.query === null) {
      return;
    }
    request(`https://qiita.com/api/v2/items?query=${encodeURIComponent(this.state.query)}&per_page=${this.props.items}`, (items) => {
      this.setState({loaded: true, items});
    });
  }

  render() {
    const showHeader = this.props.hideHeader === undefined;
    const showFooter = this.props.hideFooter === undefined;
    const iframeStyle = {
      border: "none",
      overflow: "hidden",
      width: this.props.width,
      height: this.props.height
    };

    return !this.state.loaded ? null : (
      <div style={{borderRadius: 3, background: "#fff", padding: "0 3px"}}>
        <Frame
          initialContent='<!DOCTYPE html><html><body style="-ms-overflow-style: -ms-autohiding-scrollbar"><div id="mount"></div></body></html>'
          mountTarget="#mount"
          style={iframeStyle}>
          <Timeline items={this.state.items} showHeader={showHeader} showFooter={showFooter}/>
        </Frame>
      </div>
    );
  }
}
