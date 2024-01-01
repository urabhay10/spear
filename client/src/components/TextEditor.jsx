import React from 'react';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Saviours: Tales of the nails',
      placeholder: 'Beginning of a new story',
    };
    this.divRef = React.createRef(); // Create a ref for the contentEditable div
  }

  handleTitleChange = (e) => {
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
    const { title, placeholder } = this.state;
    return (
      <div style={{
        width: '80vw',
        position: 'absolute',
        left: '20vw',
        top: '70px',
      }}>
        {/* Title Input Section */}
        <div style={{ textAlign: 'center', marginBottom: '0', position: 'relative', width: '100%', right: '0px' }}>
          <input
            type="text"
            value={title}
            onChange={this.handleTitleChange}
            style={{ fontSize: '1.5em', fontWeight: 'bold', border: 'none', textAlign: 'left', width: '100%', outline: 'none', fontFamily: "'Poppins',sans-serif", }}
          />
        </div>

        {/* ContentEditable Div Section */}
        {/* <div
          ref={this.divRef}
          contentEditable="true"
          placeholder={placeholder}
          // onInput={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
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
          }}
          className="text-input"
        />*/}
      <textarea
      spellCheck="true"
      ref={this.divRef}
      placeholder={placeholder}
      onInput={this.handleInputChange}
      onKeyDown={this.handleKeyDown}
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
      }}
      className="text-input"
      />
    </div>
    );
  }
}

export default TextEditor;
