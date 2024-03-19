import React, { useState } from 'react';
import RandomTextChanger from './RandomTextChanger.js'; // Assuming RandomTextChanger is in a separate file
import '../styles.css'

/**
 * @typedef {Object} Choice
 * @property {string} text The text associated with the choice
 * @property {string} weight The weight of odds to be applied on this choice entry in the final probability calculation
**/

/**
 * @returns {Choice} A new default choice object
 */
const defChoice = () => ({ text: '', weight: '' })

/**
 * @param {Choice[]} choices
 * @returns A random choice based on the weight of each choice
 */
const chooseRandom = (choices) => {
  choices = choices.filter((val) => !isNaN(parseFloat(val.weight)))
  const weight_total = choices.map((choice) => parseFloat(choice.weight))
                              .reduce((prev, curr) => prev + curr, 0);
  
  const rand_num = Math.random()
  let cumulative_prob = 0;

  for (let i = 0; i < choices.length; i++) {
    cumulative_prob += parseFloat(choices[i].weight) / weight_total
    console.log(cumulative_prob+", " + rand_num)
    if (rand_num < cumulative_prob) {
      return i;
    }
  }
}


function WheelForm() {
  const [choices, setChoices] = useState([defChoice()]);
  const [isTextChanging, setIsTextChanging] = useState(false);

  /**
   * @param {number} index The index of the choice to change
   * @param {(choice: Choice) => void} choice_consumer A consumer responsible for changing the values within the choice object
   */
  const updateChoice = (index, choice_consumer) => {
    const updatedChoices = [...choices];
    choice_consumer(updatedChoices[index])
    setChoices(updatedChoices);
  };

  /**
   * @param {Choice} choice The choice to validate
   * @returns Whether the provided choice is valid
   */
  const validateChoice = (choice) => {
    return (
      // Not empty
      (choice.text.length != 0 && choice.weight.length != 0)
      // Valid weight
      && (parseFloat(choice.weight) == choice.weight)
    )
  }

  const addChoice = (index) =>
  {
    const updatedChoices = [...choices];
    const choice = updatedChoices[index];

    if (!validateChoice(choice))
      return;

    // Add a new editable choice
    updatedChoices.push(defChoice())
    setChoices(updatedChoices);
  };

  const deleteOption = (index) => {
    const updatedChoices = choices.filter((_option, i) => i !== index);
    setChoices(updatedChoices);
  };

  return (
    <div>
      {choices.map((choice, index) => {
        const editable = index == choices.length - 1
        return (
          <div key={index}>
            <input
              type="text"
              placeholder="Enter text"
              value={choice.text}
              onChange={(e) => updateChoice(index, (choice) => choice.text = e.target.value)}
              disabled={!editable}
            />
            <input
              type="text"
              placeholder="Enter weight"
              value={choice.weight}
              onChange={(e) => updateChoice(index, (choice) => choice.weight = e.target.value)}
              disabled={!editable}
            />
            
            { editable ? (
                <button onClick={() => addChoice(index)}>
                  Add that thing
                </button>
              ) : (
                <button style={{
                  backgroundColor: "transparent",
                  color: "red",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: 0,
                }} onClick={() => deleteOption(index)}>X</button>
              )}
          </div>
        )
      }
      )}
      <RandomTextChanger
        texts={choices.filter(option => !option.editable).map(option => option.text)}
        stopAtIndex={chooseRandom(choices)}
        setIsTextChanging={setIsTextChanging} 
      />
    </div>
  );
}

export default WheelForm;
