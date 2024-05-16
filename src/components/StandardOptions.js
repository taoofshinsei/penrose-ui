import React, { useState } from "react";
import { CCol, CFormRange, CContainer, CRow } from "@coreui/react";

export function StandardOptions({baseOptions, onUpdate}) {
    const [scale, setScale] = useState(baseOptions['scale']);
    const [size, setSize] = useState(baseOptions['size']);

    function updateScale(e) {
        var newScale = e.target.value;
        setScale(newScale);
        onUpdate('scale', newScale);
    };

    function updateSize(e) {
        var newSize = e.target.value;
        setSize(newSize);
        onUpdate('size', newSize);
    };

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CFormRange id="scale" label={"Scale: " + scale} min={1} max={50} defaultValue={baseOptions['scale']} onChange={updateScale} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="size" label={"Size: " + size} min={1} max={16} defaultValue={baseOptions['size']} onChange={updateSize} />
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default StandardOptions;
