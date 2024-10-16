import React from "react";
import ColorPicker from "./ColorPicker";

export function ColorPickers({r1, g1, b1, onChange1, r2, g2, b2, onChange2}) {
    const presetColors = [
        { r: 205, g: 147, b: 35  },
        { r: 26,  g: 83,  b: 216 },
        { r: 154, g: 33,  b: 81  },
        { r: 13,  g: 100, b: 22  },
        { r: 141, g: 40,  b: 8   },
    ];

    return (
        <div className="color-pickers-container">
            <div className="color-picker-wrapper">
                <h3>Color #1</h3>
                <ColorPicker r={r1} g={g1} b={b1} onChange={onChange1} presetColors={presetColors}/>
            </div>
            <div className="color-picker-wrapper">
                <h3>Color #2</h3>
                <ColorPicker r={r2} g={g2} b={b2} onChange={onChange2} presetColors={presetColors}/>
            </div>
            <style jsx>{`
                .color-pickers-container {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    margin-top: 20px;
                }
                .color-picker-wrapper {
                    flex: 1;
                    min-width: 200px;
                    max-width: 300px;
                    margin: 0 10px;
                }
                h3 {
                    color: white;
                    text-align: center;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default ColorPickers;