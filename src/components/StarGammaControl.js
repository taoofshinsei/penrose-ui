import React, { useState, useEffect, useRef } from 'react';

const StarGammaControl = ({ initialValues, onChange }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [gammaValues, setGammaValues] = useState(initialValues);
    const svgRef = useRef(null);
  
    const starPoints = initialValues.map((_, index) => {
      const angle = (2 * Math.PI * index) / 5 - Math.PI / 2;
      const x = Math.cos(angle) * 100;
      const y = Math.sin(angle) * 100;
      return { x, y };
    });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const svg = svgRef.current;
        const rect = svg.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        let x = event.clientX - rect.left - centerX;
        let y = event.clientY - rect.top - centerY;

        const constrainedPosition = constrainToStar(x, y);
        setPosition(constrainedPosition);
        updateGammaValues(constrainedPosition.x, constrainedPosition.y);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const constrainToStar = (x, y) => {
    if (isPointInStar(x, y)) {
      return { x, y };
    }

    // Find the closest edge and project the point onto it
    let closestEdgeStart, closestEdgeEnd, minDistance = Infinity;

    for (let i = 0; i < starPoints.length; i++) {
      const start = starPoints[i];
      const end = starPoints[(i + 1) % starPoints.length];
      const projectedPoint = projectPointOnLine(x, y, start.x, start.y, end.x, end.y);
      const distance = Math.hypot(x - projectedPoint.x, y - projectedPoint.y);

      if (distance < minDistance) {
        minDistance = distance;
        closestEdgeStart = start;
        closestEdgeEnd = end;
      }
    }

    return projectPointOnLine(x, y, closestEdgeStart.x, closestEdgeStart.y, closestEdgeEnd.x, closestEdgeEnd.y);
  };

  const isPointInStar = (x, y) => {
    let inside = false;
    for (let i = 0, j = starPoints.length - 1; i < starPoints.length; j = i++) {
      const xi = starPoints[i].x, yi = starPoints[i].y;
      const xj = starPoints[j].x, yj = starPoints[j].y;

      const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const projectPointOnLine = (px, py, x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
    const clampedT = Math.max(0, Math.min(1, t));
    return {
      x: x1 + clampedT * dx,
      y: y1 + clampedT * dy
    };
  };

  const updateGammaValues = (x, y) => {
    const newValues = initialValues.map((_, index) => {
      const angle = (2 * Math.PI * index) / 5 - Math.PI / 2;
      const pointX = Math.cos(angle) * 100;
      const pointY = Math.sin(angle) * 100;
      const distance = Math.sqrt((x - pointX) ** 2 + (y - pointY) ** 2) / 200;
      return parseFloat((10 * (1 - distance) - 5).toFixed(2));
    });

    setGammaValues(newValues);
    onChange(newValues);
  };

  const getTextPosition = (point, index) => {
    const angle = (2 * Math.PI * index) / 5 - Math.PI / 2;
    const textDistance = 1.3; // Adjust this value to move text further from or closer to the star points
    return {
      x: point.x * textDistance,
      y: point.y * textDistance + (angle > Math.PI / 2 || angle < -Math.PI / 2 ? 5 : -5) // Adjust vertical position
    };
  };

  return (
    <svg ref={svgRef} width="300" height="300" viewBox="-150 -150 300 300">
      <defs>
        <radialGradient id="starGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#4a90e2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4a90e2" stopOpacity="0.2" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polygon 
        points={starPoints.map(p => `${p.x},${p.y}`).join(' ')} 
        fill="url(#starGradient)" 
        stroke="#4a90e2" 
        strokeWidth="2" 
      />
      {starPoints.map((point, index) => {
        const textPos = getTextPosition(point, index);
        return (
          <React.Fragment key={index}>
            <line
              x1="0"
              y1="0"
              x2={point.x}
              y2={point.y}
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="bold"
            >
              {gammaValues[index].toFixed(2)}
            </text>
          </React.Fragment>
        );
      })}
      <circle
        cx={position.x}
        cy={position.y}
        r="10"
        fill="#ffffff"
        stroke="#4a90e2"
        strokeWidth="2"
        filter="url(#glow)"
        onMouseDown={() => setIsDragging(true)}
        style={{ cursor: 'grab' }}
      />
    </svg>
  );
};

export default StarGammaControl;