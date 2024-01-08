import React from 'react';

export default class RandomFontSpan extends React.Component {
  render() {
    const { fontFamily, text,isPosFixed } = this.props;

    const spanStyle = {
      fontFamily: `${fontFamily}`,
      textShadow: fontFamily!=='inherit'?'0 0 0.4em white, 0 0 0.5em white, 0 0 0.25em white':'',
      mixBlendMode: fontFamily!=='inherit'?'screen':'',
      fontSize: '1.5em',
      position: isPosFixed?'fixed':'',
    };

    return <span style={spanStyle}>{text}</span>;
  }
}