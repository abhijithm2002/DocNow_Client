import React from 'react'

const TypingAnimation = () => {
    return (
      <div className="inline-block">
        <span className="animate-pulse">T</span>
        <span className="animate-pulse delay-150">y</span>
        <span className="animate-pulse delay-300">p</span>
        <span className="animate-pulse delay-450">i</span>
        <span className="animate-pulse delay-600">n</span>
        <span className="animate-pulse delay-750">g</span>
        <span className="animate-pulse delay-900">.</span>
        <span className="animate-pulse delay-[1050ms]">.</span>
        <span className="animate-pulse delay-[1200ms]">.</span>
      </div>
    );
  };
  

export default TypingAnimation
