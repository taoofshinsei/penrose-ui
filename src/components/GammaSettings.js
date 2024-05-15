import React, { useState } from "react";
import { CCol, CFormRange, CContainer, CRow } from "@coreui/react";

export function GammaSettings({baseOptions, onUpdate}) {
    const [gamma, setGamma] = useState(baseOptions['gamma']);

    function updateGamma(e, index) {
        var newGamma = gamma;
        newGamma[index] = e.target.value;
        setGamma(newGamma);
        onUpdate('gamma', newGamma);
    }

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CFormRange id="gamma0" label={"Gamma 1: " + gamma[0] * 10} min={-1} max={1} defaultValue={gamma[0]} onChange={e => updateGamma(e, 0)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma1" label={"Gamma 2: " + gamma[1] * 10} min={-1} max={1} defaultValue={gamma[1]} onChange={e => updateGamma(e, 1)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma2" label={"Gamma 3: " + gamma[2] * 10} min={-1} max={1} defaultValue={gamma[2]} onChange={e => updateGamma(e, 2)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma3" label={"Gamma 4: " + gamma[3] * 10} min={-1} max={1} defaultValue={gamma[3]} onChange={e => updateGamma(e, 3)} step={0.1} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CFormRange id="gamma4" label={"Gamma 5: " + gamma[4] * 10} min={-1} max={1} defaultValue={gamma[4]} onChange={e => updateGamma(e, 4)} step={0.1} />
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default GammaSettings;
