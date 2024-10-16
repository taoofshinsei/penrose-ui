import React, { useState } from "react";
import { CContainer } from "@coreui/react";
import StarGammaControl from './StarGammaControl';

export function GammaSettings({baseOptions, onUpdate}) {
    const [gammaValues, setGammaValues] = useState(baseOptions['gamma'].map(Number));

    function updateGamma(newValues) {
        setGammaValues(newValues);
        onUpdate('gamma', newValues);
    }

    return (
        <CContainer>
            <StarGammaControl 
                initialValues={gammaValues}
                onChange={updateGamma}
            />
        </CContainer>
    );
}

export default GammaSettings;