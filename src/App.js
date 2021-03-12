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

//  console.log(textOutput.split(/\n{2}/g))
  const transformText = input => { 
    let paragraphs = []
    let wrappedParagraphs = []

    for (let line of input.split(/\n{2}/g)) {
      line = line.replace(/\s{3,}/g, ' ')
      paragraphs.push(line.replace('\n',' '))
    }
    console.log('PARAGRAPHS ARR',paragraphs)
  
    for (let i = 0; i < paragraphs.length; i++) {
      if (paragraphs[i] !== paragraphs[paragraphs.length -1]) {
        paragraphs[i] = paragraphs[i] + '\n\n'
      }
      if (paragraphs[i].length > 80) {
        // console.log(paragraphs[i].substring(0,80) + '\n')
        // console.log(paragraphs[i].substring(80))
        wrappedParagraphs.push(paragraphs[i].substring(0,80) + '\n')
        wrappedParagraphs.push(paragraphs[i].substring(80))
      } else {
        wrappedParagraphs.push(paragraphs[i])
      }
      
    }
    console.log('WRAPPED ARR', wrappedParagraphs)
    console.log('WRAPPED AND JOINED', wrappedParagraphs.join(''))
    setTextOutput(wrappedParagraphs.join(''))
  }


  // transformText(textInput)

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
