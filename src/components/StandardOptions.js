import React, { useState } from "react";
import { Input, Slider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
  
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
        <Grid container spacing={2}>
            <Grid size={8}>
                <Typography id="scale-slider" gutterBottom>Scale</Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center', flexGrow: 1 }} size="grow">
                    <Grid size="grow">
                        <Slider defaultValue={baseOptions['scale']} value={scale} onChange={updateScale} aria-labelledby="scale-slider" max={50} min={1}/>
                    </Grid>
                    <Grid>
                        <Input value={scale} size="small" onChange={updateScale} inputProps={{ step: 1, min: 1, max: 50, type: 'number', 'aria-labelledby': 'scale-slider', }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid size={8}>
                <Typography id="size-slider" gutterBottom>Size</Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid size="grow">
                        <Slider defaultValue={baseOptions['size']} value={size} onChange={updateSize} aria-labelledby="size-slider" max={16} min={1}/>
                    </Grid>
                    <Grid>
                        <Input value={size} size="small" onChange={updateSize} inputProps={{ step: 1, min: 1, max: 16, type: 'number', 'aria-labelledby': 'size-slider', }} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default StandardOptions;
