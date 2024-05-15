import React, { useState } from "react";
import { CCol, CFormRange, CContainer, CRow } from "@coreui/react";

export function GammaSettings({baseOptions, onUpdate}) {
    const [gamma0, setGamma0] = useState(baseOptions['gamma'][0]);
    const [gamma1, setGamma1] = useState(baseOptions['gamma'][1]);
    const [gamma2, setGamma2] = useState(baseOptions['gamma'][2]);
    const [gamma3, setGamma3] = useState(baseOptions['gamma'][3]);
    const [gamma4, setGamma4] = useState(baseOptions['gamma'][4]);

    function updateGamma(e, func) {
        func(parseFloat(e.target.value));
        onUpdate('gamma', [gamma0, gamma1, gamma2, gamma3, gamma4]);
        console.log([gamma0, gamma1, gamma2, gamma3, gamma4]);
    }

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CFormRange id="gamma0" label={"Gamma 1: " + gamma0 * 10} min={-1} max={1} defaultValue={gamma0} onChange={e => updateGamma(e, setGamma0)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma1" label={"Gamma 2: " + gamma1 * 10} min={-1} max={1} defaultValue={gamma1} onChange={e => updateGamma(e, setGamma1)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma2" label={"Gamma 3: " + gamma2 * 10} min={-1} max={1} defaultValue={gamma2} onChange={e => updateGamma(e, setGamma2)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma3" label={"Gamma 4: " + gamma3 * 10} min={-1} max={1} defaultValue={gamma3} onChange={e => updateGamma(e, setGamma3)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma4" label={"Gamma 5: " + gamma4 * 10} min={-1} max={1} defaultValue={gamma4} onChange={e => updateGamma(e, setGamma4)} step={0.1} />
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default GammaSettings;
