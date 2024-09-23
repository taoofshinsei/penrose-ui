import React, { useState } from "react";
import { Input, Slider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export function GammaSettings({baseOptions, onUpdate}) {
    const [gamma0, setGamma0] = useState(baseOptions['gamma'][0]);
    const [gamma1, setGamma1] = useState(baseOptions['gamma'][1]);
    const [gamma2, setGamma2] = useState(baseOptions['gamma'][2]);
    const [gamma3, setGamma3] = useState(baseOptions['gamma'][3]);
    const [gamma4, setGamma4] = useState(baseOptions['gamma'][4]);

    function updateGamma(e, index, func) {
        var newGamma = [gamma0, gamma1, gamma2, gamma3, gamma4];
        var newGammaVal = parseFloat(e.target.value);
        func(newGammaVal);
        newGamma[index] = newGammaVal;
        onUpdate('gamma', newGamma);
        console.log(newGamma);
    }

    return (
        <Grid container spacing={2} display="flex">
            <Grid size={10} display="flex">
                <Typography id="gamma0-slider" gutterBottom>Gamma 1</Typography>
                <Grid container spacing={2} sx={{alignItems: 'center', flexGrow: 1}} size="grow">
                    <Grid size="grow">
                        <Slider
                            id="gamma0"
                            defaultValue={gamma0}
                            value={gamma0}
                            onChange={e => updateGamma(e, 0, setGamma0)}
                            aria-labelledby="gamma0-slider"
                            max={1}
                            min={-1}
                            step={0.1}
                        />
                    </Grid>
                    <Grid>
                        <Input
                            value={gamma0}
                            defaultValue={gamma0}
                            size="small"
                            onChange={e => updateGamma(e, 0, setGamma0)}
                            inputProps={{ step: 0.1, min: -1, max: 1, type: 'number', 'aria-labelledby': 'scale-slider',}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={10} display="flex">
                <Typography id="gamma1-slider" gutterBottom>Gamma 2</Typography>
                <Grid container spacing={2} sx={{alignItems: 'center', flexGrow: 1}} size="grow">
                    <Grid size="grow">
                        <Slider
                            id="gamma1"
                            defaultValue={gamma1}
                            value={gamma1}
                            onChange={e => updateGamma(e, 1, setGamma1)}
                            aria-labelledby="gamma1-slider"
                            max={1}
                            min={-1}
                            step={0.1}
                        />
                    </Grid>
                    <Grid>
                        <Input
                            value={gamma1}
                            defaultValue={gamma1}
                            size="small"
                            onChange={e => updateGamma(e, 1, setGamma1)}
                            inputProps={{ step: 0.1, min: -1, max: 1, type: 'number', 'aria-labelledby': 'scale-slider',}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={10} display="flex">
                <Typography id="gamma2-slider" gutterBottom>Gamma 3</Typography>
                <Grid container spacing={2} sx={{alignItems: 'center', flexGrow: 1}} size="grow">
                    <Grid size="grow">
                        <Slider
                            id="gamma2"
                            defaultValue={gamma2}
                            value={gamma2}
                            onChange={e => updateGamma(e, 2, setGamma2)}
                            aria-labelledby="gamma2-slider"
                            max={1}
                            min={-1}
                            step={0.1}
                        />
                    </Grid>
                    <Grid>
                        <Input
                            value={gamma2}
                            defaultValue={gamma2}
                            size="small"
                            onChange={e => updateGamma(e, 2, setGamma2)}
                            inputProps={{ step: 0.1, min: -1, max: 1, type: 'number', 'aria-labelledby': 'scale-slider',}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={10} display="flex">
                <Typography id="gamma3-slider" gutterBottom>Gamma 4</Typography>
                <Grid container spacing={2} sx={{alignItems: 'center', flexGrow: 1}} size="grow">
                    <Grid size="grow">
                        <Slider
                            id="gamma3"
                            defaultValue={gamma3}
                            value={gamma3}
                            onChange={e => updateGamma(e, 3, setGamma3)}
                            aria-labelledby="gamma3-slider"
                            max={1}
                            min={-1}
                            step={0.1}
                        />
                    </Grid>
                    <Grid>
                        <Input
                            value={gamma3}
                            defaultValue={gamma3}
                            size="small"
                            onChange={e => updateGamma(e, 3, setGamma3)}
                            inputProps={{ step: 0.1, min: -1, max: 1, type: 'number', 'aria-labelledby': 'scale-slider',}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={10} display="flex">
                <Typography id="gamma4-slider" gutterBottom>Gamma 5</Typography>
                <Grid container spacing={2} sx={{alignItems: 'center', flexGrow: 1}} size="grow">
                    <Grid size="grow">
                        <Slider
                            id="gamma4"
                            defaultValue={gamma4}
                            value={gamma4}
                            onChange={e => updateGamma(e, 4, setGamma4)}
                            aria-labelledby="gamma4-slider"
                            max={1}
                            min={-1}
                            step={0.1}
                        />
                    </Grid>
                    <Grid>
                        <Input
                            value={gamma4}
                            defaultValue={gamma4}
                            size="small"
                            onChange={e => updateGamma(e, 4, setGamma4)}
                            inputProps={{ step: 0.1, min: -1, max: 1, type: 'number', 'aria-labelledby': 'scale-slider',}}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GammaSettings;
