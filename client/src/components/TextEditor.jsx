import React from 'react';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: this.writingPrompts[Math.floor(Math.random() * this.writingPrompts.length)],
    };
    this.divRef = React.createRef();
  }
  writingPrompts = [
    "Embrace the art of storytelling",
    "Beginning of a new story",
    "Embark on a literary journey",
    "Unleash your creativity on the blank page",
    "Dive into the world of words",
    "Crafting tales from the heart",
    "Let your imagination guide the pen",
    "In the realm of infinite possibilities",
    "Weaving dreams into sentences",
    "Discover the power of your narrative voice",
    "Navigate the landscapes of your own creation",
    "Assemble words like pieces of a puzzle",
  ];
  
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
        width: this.props.activeBoard === '' ? '100vw' : window.innerWidth<768?'0vw':'80vw',
        position: 'absolute',
        left: this.props.activeBoard === '' ? '0' : '20vw',
        top: '40px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '0', position: 'relative', width: '100%', right: '0px' }}>
          <input
            type="text"
            value={this.props.title}
            onChange={this.handleTitleChange}
            style={{ fontSize: '1.5rem', fontWeight: 'bold', border: 'none', textAlign: 'center', width: '100%', outline: 'none', fontFamily: "'Poppins',sans-serif", }}
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
