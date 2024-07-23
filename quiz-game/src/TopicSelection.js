import React from 'react';
import './TopicSelection.css';

function TopicSelection({ onSelectTopic }) { // Destructure the onSelectTopic prop
  const handleTopicSelect = (topic) => {
    onSelectTopic(topic); // Use the prop function
  };

  return (
    <div className="topic-selection">
      <h1>Select a Topic</h1>
      <div className="topic-card" onClick={() => handleTopicSelect('html')}>HTML</div>
      <div className="topic-card" onClick={() => handleTopicSelect('css')}>CSS</div>
      <div className="topic-card" onClick={() => handleTopicSelect('javascript')}>JavaScript</div>
      <div className="topic-card" onClick={() => handleTopicSelect('react')}>React</div>
      <div className="topic-card add-quiz" onClick={() => handleTopicSelect('add')}>
        <span className="add-symbol">+</span> Add Quiz
      </div>
    </div>
  );
}

export default TopicSelection;
