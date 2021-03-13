import './App.css';
import React from "react";

function App() {
  const [textInput, setTextInput] = React.useState(`This is
a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  /*
  - A line cannot be:
    - greater than 80 chars 
    - Exceptions & Considerations:
      - if the 81st char is in the middle of a word
        - break the line on the space before the word
      -  if a single word is greater than 80 chars
        - that word will take up its own line
  - Whitespace: 
    - There needs to be 1 blank line between paragraphs
    - There cannot be more than 1 
      - blank line between paragraphs
      - space between words
  */

  const transformText = input => { 
    // split words by paragraphs and remove extra blank lines
    let splitParagraphs = input.split(/\n{2}/g).filter(line => line != '')
    let output = ''

    function format(words) {
      let lineLimit = 80
      let count = 0
      let space = 1
      let groups = []
  
      let noWrap = ''
      let wrap = ''
      // wrap words onto new line if count exceeds 80 chars
      for(let i = 0; i < words.length; i++) {
        if (count + words[i].length < lineLimit) {
          noWrap += words[i] + ' '
          
        } else {
          wrap += words[i] + ' '
        }
        count += words[i].length + space
      }
      
      groups.push(noWrap)
      if (wrap) {
        groups.push('\n' + wrap)
      }
  
      return groups.join(' ')
    }
  
    // run each each word of a paragraph through formatter and add line breaks
    for (let i = 0; i < splitParagraphs.length; i++) {
      let wordsOfP = splitParagraphs[i].split(/\s{1,}/g)
      output += format(wordsOfP) + '\n\n'
    }
    // remove line breaks from last paragraph
    setTextOutput(output.slice(0, [output.length - 2]))
  }

  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <div id="result">
        {textOutput}
      </div>
    </div>
  );
}

export default App;
