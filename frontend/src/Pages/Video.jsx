import React from 'react';

const Video = () => {
  return (
    <div className="full-container">
   <video 
  width="100%" 
  height="auto" 
  autoPlay 
  muted 
  loop 
  playsInline
  style={{ display: 'block' }}
>
        <source src="https://www.zigram.tech/wp-content/uploads/2024/08/Regtechforthe-world_desktop.mp4"  />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
