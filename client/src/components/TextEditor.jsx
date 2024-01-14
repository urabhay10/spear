import React from 'react';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Beginning of a new story',
    };
    this.divRef = React.createRef();
  }
  componentDidMount() {
    this.divRef.current.selectionStart = this.divRef.current.value.length;
  }
  componentDidUpdate() {
    if (this.props.text !== this.divRef.current.value) {
      this.divRef.current.value = this.props.text;
    }
  }
  handleTitleChange = (e) => {
    const { setTitle } = this.props;
    setTitle(e.target.value);
    this.setState({ title: e.target.value });
  };
  handleInputChange = (e) => {
    const { setText } = this.props;
    setText(e.target.value);
  };
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.adjustDivHeight();
    }
  };

  adjustDivHeight = () => {
    const div = this.divRef.current;
    if (div) {
      div.style.height = 'auto';
      div.style.height = `${div.scrollHeight}px`;
    }
  };

  render() {
    const { placeholder } = this.state;
    return (
      <div style={{
        width: this.props.activeBoard === '' ? '100vw' : '80vw',
        position: 'absolute',
        left: this.props.activeBoard === '' ? '0' : '20vw',
        top: '100px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '0', position: 'relative', width: '100%', right: '0px' }}>
          <input
            type="text"
            value={this.props.title}
            onChange={this.handleTitleChange}
            style={{ fontSize: '1.5em', fontWeight: 'bold', border: 'none', textAlign: 'center', width: '100%', outline: 'none', fontFamily: "'Poppins',sans-serif", }}
          />
        </div>
        <textarea
          spellCheck="true"
          autoFocus={true}
          ref={this.divRef}
          placeholder={placeholder}
          onInput={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          value={this.props.text}
          style={{
            width: '98%',
            border: 'none',
            padding: '1%',
            position: 'absolute',
            right: '0',
            resize: 'none',
            overflowY: 'auto',
            outline: 'none',
            backgroundColor: '#333333',
            color: '#ffffff',
            minHeight: '100vh',
            textAlign: this.props.alignment,
          }}
          className="text-input"
        />
      </div>
    );
  }
}

export default TextEditor;
