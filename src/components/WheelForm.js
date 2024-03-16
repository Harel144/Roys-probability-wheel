import React, { useState } from 'react';
import RandomTextChanger from './RandomTextChanger.js'; // Assuming RandomTextChanger is in a separate file
import '../styles.css'

function WheelForm() {
  const [choices, setChoices] = useState([{ text: '', prob: '', editable: true }]);
  const [sum, setSum] = useState(0);

  const chooseRandom = (arr) => {
    var rand_num = parseFloat(Math.random());
    var cumulative_prob = 0;

    for (var i = 0; i < arr.length; i++) {
      cumulative_prob = parseFloat(cumulative_prob) + parseFloat(arr[i].prob);
      if (rand_num < cumulative_prob) {
        return i;
      }
    }
  };

  const handleChange = (index, key, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index][key] = value;
    setChoices(updatedChoices);
  };

  const addChoice = (index) => 
  {
    const updatedChoices = [...choices];
    //if it's not empty
    var flag = updatedChoices[index].text.length != 0 && updatedChoices[index].prob.length != 0;
    
    //if it's a float between 0 <= prob <= 1.
    if(updatedChoices[index].prob != "0" && updatedChoices[index].prob != "1")
    {
        flag = flag && Number(updatedChoices[index].prob) == updatedChoices[index].prob && updatedChoices[index].prob.substring(0,2) == "0.";
        flag = flag && updatedChoices[index].prob.length > 2 && updatedChoices[index].prob.length < 5;
        flag = flag && (parseFloat(sum) + parseFloat(updatedChoices[index].prob)) <= 1;
    }

    if(flag)
    {
        setSum(parseFloat(parseFloat(sum) + parseFloat(updatedChoices[index].prob)));
        updatedChoices[index].editable = !updatedChoices[index].editable;
        setChoices(updatedChoices);
        setChoices([...choices, { text: '', prob: '', editable: true }]);
    }
  };

  const deleteOption = (index) => {
    setSum(parseFloat(sum) - parseFloat(choices[index].prob));
    const updatedChoices = choices.filter((option, i) => i !== index);
    setChoices(updatedChoices);
  };
  return (
    <div>
      {choices.map((friend, index) => (
        (sum !== 1 && ( // Check if it's not the last choice and sum is not equal to 1
          <div key={index}>
            <input
              type="text"
              placeholder="Enter text"
              value={friend.text}
              onChange={(e) => handleChange(index, 'text', e.target.value)}
              disabled={!friend.editable}
            />
            <input
              type="text"
              placeholder="Enter prob"
              value={friend.prob}
              onChange={(e) => handleChange(index, 'prob', e.target.value)}
              disabled={!friend.editable}
            />
            
            {!friend.editable && (
              <button onClick={() => deleteOption(index)}>X</button>
            )}
            {friend.editable && sum !== 1 && (
              <button onClick={() => addChoice(index)}>
                Add that thing
              </button>
            )}
          </div>
        )) 
      ))}
         {choices.map((friend, index) => (
        (sum === 1 && index !== choices.length - 1 && ( // Check if it's not the last choice and sum is not equal to 1
          <div key={index}>
            <input
              type="text"
              placeholder="Enter text"
              value={friend.text}
              onChange={(e) => handleChange(index, 'text', e.target.value)}
              disabled={!friend.editable}
            />
            <input
              type="text"
              placeholder="Enter prob"
              value={friend.prob}
              onChange={(e) => handleChange(index, 'prob', e.target.value)}
              disabled={!friend.editable}
            />
            
            {!friend.editable && (
              <button style={{
                backgroundColor: "transparent",
                color: "red",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                padding: 0,
              }} onClick={() => deleteOption(index)}>X</button>
            )}
            {friend.editable && sum !== 1 && (
              <button onClick={() => addChoice(index)}>
                Add that thing
              </button>
            )}
          </div>
        )) 
      ))}
      {sum === 1 && (
        <RandomTextChanger texts={choices.map(option => option.text)} stopAtIndex={chooseRandom(choices)} />
      )}
    </div>
  );
}

export default WheelForm;
