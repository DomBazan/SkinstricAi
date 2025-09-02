import React, { useRef, useEffect, useState } from 'react';

const Camera = ({ onCapture, onBack }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        });
        setStream(mediaStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            setIsReady(true);
          };
        }
      } catch (err) {
        setError('Could not access camera. Please ensure camera permissions are granted.');
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      onCapture(imageData);
    }
  };

  return (
    <div className="camera-container">
      <div className="camera-header">
        <h2>Take a Selfie</h2>
        <button className="back-btn" onClick={onBack}>← Back</button>
      </div>



      <div className="camera-view">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="video-container">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video"
                style={{ 
                  width: '100%', 
                  maxWidth: '400px', 
                  height: '300px',
                  borderRadius: '10px',
                  objectFit: 'cover'
                }}
              />
              <div className="face-guide">
                <div className="face-outline"></div>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>

      <div className="camera-controls">
        <button 
          className="capture-btn"
          onClick={handleCapture}
          disabled={!isReady}
        >
          📸 Take Photo
        </button>
      </div>
    </div>
  );
};

export default Camera;
