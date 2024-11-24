import React, { useState } from 'react';
import './VastuCalc.css';

// DirectionGrid Component
const DirectionGrid = ({ onSelectDirection, selectedDirection }) => {
  const directions = [
    'North-West', 'North', 'North-East',
    'West', 'Center', 'East',
    'South-West', 'South', 'South-East'
  ];

  return (
    <div className="direction-grid">
      {directions.map((direction) => (
        <div
          key={direction}
          className={`grid-item ${selectedDirection === direction ? 'selected' : ''}`}
          onClick={() => onSelectDirection(direction)}
        >
          {direction}
        </div>
      ))}
    </div>
  );
};

// Score configuration for each question
const scoreConfig = {
  question1: {
    'North-West': 10,
    'North': 2,
    'North-East': 3,
    'West': 4,
    'Center': 5,
    'East': 6,
    'South-West': 7,
    'South': 8,
    'South-East': 9
  },
  question2: {
    'North-West': 3,
    'North': 4,
    'North-East': 5,
    'West': 6,
    'Center': 7,
    'East': 8,
    'South-West': 9,
    'South': 10,
    'South-East': 2
  },
  question3: {
    'North-West': 4,
    'North': 5,
    'North-East': 6,
    'West': 7,
    'Center': 8,
    'East': 9,
    'South-West': 10,
    'South': 2,
    'South-East': 3
  },
  question4: {
    'North-West': 5,
    'North': 6,
    'North-East': 7,
    'West': 8,
    'Center': 9,
    'East': 10,
    'South-West': 2,
    'South': 3,
    'South-East': 4
  },
  question5: {
    'North-West': 6,
    'North': 7,
    'North-East': 8,
    'West': 9,
    'Center': 10,
    'East': 2,
    'South-West': 3,
    'South': 4,
    'South-East': 5
  },
  question6: {
    'North-West': 7,
    'North': 8,
    'North-East': 9,
    'West': 10,
    'Center': 2,
    'East': 3,
    'South-West': 4,
    'South': 5,
    'South-East': 6
  },
  question7: {
    'North-West': 8,
    'North': 9,
    'North-East': 10,
    'West': 2,
    'Center': 3,
    'East': 4,
    'South-West': 5,
    'South': 6,
    'South-East': 7
  },
  question8: {
    'North-West': 9,
    'North': 10,
    'North-East': 2,
    'West': 3,
    'Center': 4,
    'East': 5,
    'South-West': 6,
    'South': 7,
    'South-East': 8
  },
  question9: {
    'North-West': 7,
    'North': 2,
    'North-East': 4,
    'West': 5,
    'Center': 10,
    'East': 3,
    'South-West': 8,
    'South': 9,
    'South-East': 6
  },
  question10: {
    'North-West': 1,
    'North': 4,
    'North-East': 2,
    'West': 9,
    'Center': 5,
    'East': 7,
    'South-West': 8,
    'South': 6,
    'South-East': 9
  }
};

// Function to calculate score based on answers
const calculateScore = (question, answer) => {
  return scoreConfig[question][answer] || 0; // Return score based on the specific question context
};

// Function to get feedback based on score
const getFeedback = (score) => {
  if (score <= 4) return "Inauspicious";
  if (score >= 5 && score <= 7) return "Can be better";
  if (score >=8 && score <=10) return "Auspicious";
  return ""; // For empty or unrecognized scores
};

// Main App Component
function VastuCalc({ formData, updateFormData, prevStep, nextStep }) {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: ''
  });
  
  const [vastuResult, setVastuResult] = useState('');
  const [totalScore, setTotalScore] = useState(0);

  // Function to handle direction selection for each question
  const handleSelectDirection = (question, direction) => {
    const newAnswers = {
      ...answers,
      [question]: direction
    };
    setAnswers(newAnswers);

    // Update total score whenever an answer is selected
    const newScore = calculateScore(question, direction); // Calculate score based on selected direction
    setTotalScore((prevScore) => prevScore - calculateScore(question, answers[question]) + newScore); // Update total score
  };

  // Handle form submission and calculate Vastu result
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Example logic for calculating result based on total score
    let result = '';
    if (totalScore >= 70) {
      result = 'Your house is well-aligned with Vastu principles.';
    } else if (totalScore >= 30) {
      result = 'You may need to make some adjustments to your house layout.';
    } else {
      result = 'Your house needs significant improvements to align with Vastu principles.';
    }

    setVastuResult(result);
    updateFormData({
      ...formData,
      vastuScore: totalScore,
    });
  };

  const handleBack = () => {
    prevStep();
  };
  const handleNext = () => {
    nextStep();
  };


  return (
    <div className="vastu-calc">
      <h1>Vastu Questionnaire</h1>
      <form onSubmit={handleSubmit} className='vastu-form'>
        <div className="questions-grid"> {/* Add this div for grid layout */}
          {/* Question 1 */}
          <div className="question-container">
            <div className="question-label">
              <label>1. Select the direction of your main door from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question1}
              onSelectDirection={(direction) => handleSelectDirection('question1', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question1', answers.question1)}</span>
              <div>{answers.question1 && getFeedback(calculateScore('question1', answers.question1))}</div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="question-container">
            <div className="question-label">
              <label>2. Select the direction of your kitchen from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question2}
              onSelectDirection={(direction) => handleSelectDirection('question2', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question2', answers.question2)}</span>
              <div>{answers.question2 && getFeedback(calculateScore('question2', answers.question2))}</div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="question-container">
            <div className="question-label">
              <label>3. Select the direction of your master bedroom from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question3}
              onSelectDirection={(direction) => handleSelectDirection('question3', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question3', answers.question3)}</span>
              <div>{answers.question3 && getFeedback(calculateScore('question3', answers.question3))}</div>
            </div>
          </div>

          {/* Question 4 */}
          <div className="question-container">
            <div className="question-label">
              <label>4. Select the direction of your children's bedroom from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question4}
              onSelectDirection={(direction) => handleSelectDirection('question4', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question4', answers.question4)}</span>
              <div>{answers.question4 && getFeedback(calculateScore('question4', answers.question4))}</div>
            </div>
          </div>

          {/* Question 5 */}
          <div className="question-container">
            <div className="question-label">
              <label>5. Select the direction of your bathroom from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question5}
              onSelectDirection={(direction) => handleSelectDirection('question5', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question5', answers.question5)}</span>
              <div>{answers.question5 && getFeedback(calculateScore('question5', answers.question5))}</div>
            </div>
          </div>

          {/* Question 6 */}
          <div className="question-container">
            <div className="question-label">
              <label>6. Select the direction of your living room from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question6}
              onSelectDirection={(direction) => handleSelectDirection('question6', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question6', answers.question6)}</span>
              <div>{answers.question6 && getFeedback(calculateScore('question6', answers.question6))}</div>
            </div>
          </div>

          {/* Question 7 */}
          <div className="question-container">
            <div className="question-label">
              <label>7. Select the direction of your study room from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question7}
              onSelectDirection={(direction) => handleSelectDirection('question7', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question7', answers.question7)}</span>
              <div>{answers.question7 && getFeedback(calculateScore('question7', answers.question7))}</div>
            </div>
          </div>

          {/* Question 8 */}
          <div className="question-container">
            <div className="question-label">
              <label>8. Select the direction of your pooja room from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question8}
              onSelectDirection={(direction) => handleSelectDirection('question8', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question8', answers.question8)}</span>
              <div>{answers.question8 && getFeedback(calculateScore('question8', answers.question8))}</div>
            </div>
          </div>

          {/* Question 9 */}
          <div className="question-container">
            <div className="question-label">
              <label>9. Select the direction of your guest room from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question9}
              onSelectDirection={(direction) => handleSelectDirection('question9', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question9', answers.question9)}</span>
              <div>{answers.question9 && getFeedback(calculateScore('question9', answers.question9))}</div>
            </div>
          </div>

          {/* Question 10 */}
          <div className="question-container">
            <div className="question-label">
              <label>10. Select the direction of your dining room from below direction selector.</label>
            </div>
            <DirectionGrid
              selectedDirection={answers.question10}
              onSelectDirection={(direction) => handleSelectDirection('question10', direction)}
            />
            <div className="question-box">
              <span className="score">Score: {calculateScore('question10', answers.question10)}</span>
              <div>{answers.question10 && getFeedback(calculateScore('question10', answers.question10))}</div>
            </div>
          </div>
        </div>

        <button type="submit" className='vastu-button'>Submit</button>
      </form>
      <div className="button-group">
            <button type="button" onClick={handleBack} className='vastu-button'>Back</button>
            <button type="button" onClick={handleNext} className='vastu-button'>Next</button>
            </div>
      {vastuResult && <div className="result"><h2>Total Score: {totalScore} <br></br>Result: {vastuResult}</h2></div>}
    </div>
  );
}

export default VastuCalc;
