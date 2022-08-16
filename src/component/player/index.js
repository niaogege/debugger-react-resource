import React, { Component } from "react";
import Player from "@xmly/x-player";

class AlbumBtnUI extends Component {
  handlePlay = () => {
    this.props.$_playWithAlbumId({ albumId: this.props.albumId });
  };

  render() {
    return <button onClick={this.handlePlay}>{this.props.children}播放</button>;
  }
}

const AlbumBtn = (props) => <Player Component={AlbumBtnUI} {...props} />;

export default AlbumBtn;
