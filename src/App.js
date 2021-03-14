import './App.css';
import React from "react";

function App() {
  const [textInput, setTextInput] = React.useState(`This is an extremely long line of text with lots and lot of characters in it. The previous sentence should be on a line by itself, and this one should also. However, this sentence is short. Multiple sentences fit here.

A very short paragraph.


Another short paragraph, after multiple blank lines.



Even more blank lines,    as well      as some erratic           space characters.

This
sentence
includes
a few words on lines by themselves that should be combined, and then
suchaverylongworditbelongsonalinebyitselfeventhoughitislongerthan80charactersandthelinebeforeisshort,
however, it's fine for these words to go on the next line. Formatting should continue normally at this point.`);
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
  const transformParagraph = words => {
    const lineLimit = 80
    let count = 0
    let lines = []

    let currentLine = []
    for (let i = 0; i < words.length; i++) {
      if (count + words[i].length < lineLimit) {
        currentLine.push(words[i])

      } else {
        lines.push(currentLine.join(' ') + '\n')
        currentLine = [words[i]]
        count = 0
      }
      count += words[i].length + 1
    }

    lines.push(currentLine.join(' ') + '\n')
    

    return lines.join('')
  }

  const transformText = input => {
    let paragraphsArr = input.split(/\n\n+/)
    console.log(paragraphsArr)
    let output = ''

    for (let i = 0; i < paragraphsArr.length; i++) {
      let paragraphText = paragraphsArr[i].split(/\s{1,}/g)
      output += transformParagraph(paragraphText) + '\n\n'
    }
    setTextOutput(output.slice(0, [output.length - 2]))
  }

  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div id="result">
        {textOutput}
      </div>
    </div>
  );
}

export default App;
