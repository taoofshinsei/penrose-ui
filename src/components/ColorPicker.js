import React, { useState } from "react";
import { RgbColorPicker } from "react-colorful";
import { CContainer } from '@coreui/react';

export default function ColorPicker({r, g, b, onChange, presetColors}) {
    const [color, setColor] = useState({ r: r, g: g, b: b });
    
    function onColorChange(rgb) {
        setColor(rgb);
        onChange(rgb['r'], rgb['g'], rgb['b']);
    }

    return (
        <CContainer>
            <RgbColorPicker color={color} onChange={onColorChange} />

            <div className="picker__swatches">
                {presetColors.map((presetColor) => (
                    <button
                        key={presetColor}
                        className="picker__swatch"
                        style={{ background: presetColor }}
                        onClick={() => onColorChange(presetColor)}
                    />
                ))}
            </div>
        </CContainer>
    );
};