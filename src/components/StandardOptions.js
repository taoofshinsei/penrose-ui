import React, { useState } from "react";

export function StandardOptions({baseOptions, onUpdate}) {
    const [scale, setScale] = useState(baseOptions['scale']);

    function updateScale(e) {
        var newScale = parseInt(e.target.value, 10);
        setScale(newScale);
        onUpdate('scale', newScale);
    };

    return (
        <div className="scale-slider-container">
            <input
                type="range"
                className="vertical-range"
                id="scale"
                min="1"
                max="50"
                step="1"
                value={scale}
                onChange={updateScale}
            />
            <label htmlFor="scale" className="scale-label">Scale: {scale}</label>
            <style jsx>{`
                .scale-slider-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 300px;
                    padding: 25px 0;
                }
                .vertical-range {
                    -webkit-appearance: none;
                    width: 300px;
                    height: 60px;
                    background: transparent;
                    transform: rotate(-90deg);
                    transform-origin: 150px 150px;
                }
                .vertical-range::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 60px;
                    cursor: pointer;
                    background: #3d3d3d;
                    border-radius: 30px;
                }
                .vertical-range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 60px;
                    width: 60px;
                    border-radius: 50%;
                    background: #4a90e2;
                    cursor: pointer;
                    margin-top: 0px;
                }
                .vertical-range::-moz-range-track {
                    width: 100%;
                    height: 60px;
                    cursor: pointer;
                    background: #3d3d3d;
                    border-radius: 30px;
                }
                .vertical-range::-moz-range-thumb {
                    height: 60px;
                    width: 60px;
                    border-radius: 50%;
                    background: #4a90e2;
                    cursor: pointer;
                }
                .scale-label {
                    color: white;
                    font-size: 1.0em;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
};

export default StandardOptions;