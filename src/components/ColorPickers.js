import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from "@coreui/react";
import ColorPicker from "./ColorPicker";

export function ColorPickers({r1, g1, b1, onChange1, r2, g2, b2, onChange2}) {
    // TODO: Define a config file for these
    const presetColors = [
        { r: 205, g: 147, b: 35  },
        { r: 26,  g: 83,  b: 216 },
        { r: 154, g: 33,  b: 81  },
        { r: 13,  g: 100, b: 22  },
        { r: 141, g: 40,  b: 8   },
    ];
    // TODO: Do we want a different set of presets for color 2?

    return (
        <CAccordion>
            <CAccordionItem itemKey={1}>
                <CAccordionHeader>Color #1</CAccordionHeader>
                <CAccordionBody>
                    <ColorPicker r={r1} g={g1} b={b1} onChange={onChange1} presetColors={presetColors}/>
                </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
                <CAccordionHeader>Color #2</CAccordionHeader>
                <CAccordionBody>
                    <ColorPicker r={r2} g={g2} b={b2} onChange={onChange2} presetColors={presetColors}/>
                </CAccordionBody>
            </CAccordionItem>
        </CAccordion>
    );
};

export default ColorPickers;