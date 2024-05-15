import React, { useState } from "react";
import { CCol, CFormRange, CContainer, CRow } from "@coreui/react";

export function StandardOptions({baseOptions, onUpdate}) {
    const [height, setHeight] = useState(baseOptions['height']);
    const [width, setWidth] = useState(baseOptions['width']);
    const [scale, setScale] = useState(baseOptions['scale']);
    const [size, setSize] = useState(baseOptions['size']);

    function updateHeight(e) {
        var newHeight = e.target.value;
        console.log(newHeight);
        setHeight(newHeight);
        onUpdate('height', newHeight);
    };

    function updateWidth(e) {
        var newWidth = e.target.value;
        setWidth(newWidth);
        onUpdate('width', newWidth);
    };

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
                    <CFormRange id="height" label={"Height: " + height} min={480} max={2160} defaultValue={baseOptions['height']} onChange={updateHeight} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="width" label={"Width: " + width} min={640} max={4096} defaultValue={baseOptions['width']} onChange={updateWidth} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="scale" label={"Scale: " + scale} min={25} max={100} defaultValue={baseOptions['scale']} onChange={updateScale} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="size" label={"Size: " + size} min={1} max={8} defaultValue={baseOptions['size']} onChange={updateSize} />
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default StandardOptions;
