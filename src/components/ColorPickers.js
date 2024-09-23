import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
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
        <Grid container spacing={2}>
            <Grid size={6}>
                <Typography id="color1" gutterBottom>Color #1</Typography>
                <ColorPicker r={r1} g={g1} b={b1} onChange={onChange1} presetColors={presetColors}/>
            </Grid>
            <Grid size={6}>
                <Typography id="color2" gutterBottom>Color #2</Typography>
                <ColorPicker r={r2} g={g2} b={b2} onChange={onChange2} presetColors={presetColors}/>
            </Grid>
        </Grid>
    );
};

export default ColorPickers;