import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { PresetType } from './PresetButtons';
import { generateZip, mmToPx } from '../utils/shapeUtils';

type ShapeFormProps = {
    preset: PresetType | null;
};

export default function ShapeForm({ preset }: ShapeFormProps) {
    const [shapeType, setShapeType] = useState('');
    const [frameCount, setFrameCount] = useState(1);
    const [shapeCount, setShapeCount] = useState(1);
    const [frameWidth, setFrameWidth] = useState(100);
    const [frameHeight, setFrameHeight] = useState(100);
    const [shapeWidth, setShapeWidth] = useState(20);
    const [shapeHeight, setShapeHeight] = useState(20);

    useEffect(() => {
        if (preset) {
            setShapeType(preset.shapeType);
            setFrameCount(preset.frameCount);
            setShapeCount(preset.shapeCount);
            setFrameWidth(preset.frameWidth);
            setFrameHeight(preset.frameHeight);
            setShapeWidth(preset.shapeWidth);
            setShapeHeight(preset.shapeHeight);
        }
    }, [preset]);

    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    const handleGenerate = async () => {
        const blob = await generateZip(
            shapeType,
            frameCount,
            shapeCount,
            frameWidth * mmToPx,
            frameHeight * mmToPx,
            shapeWidth * mmToPx,
            shapeHeight * mmToPx,
            colors
        );
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'shapes.zip';
        link.click();
    };

    return (
        <Box component="form" display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth>
                <InputLabel>Shape Type</InputLabel>
                <Select value={shapeType} onChange={(e) => setShapeType(e.target.value)} label="Shape Type">
                    <MenuItem value="rectangle">Rectangle</MenuItem>
                    <MenuItem value="circle">Circle</MenuItem>
                    <MenuItem value="triangle">Triangle</MenuItem>
                </Select>
            </FormControl>

            <Divider sx={{ my: 1 }}>Frame Settings</Divider>
            <Box display="flex" gap={2}>
                <TextField
                    label="Frame Count"
                    type="number"
                    value={frameCount}
                    onChange={(e) => setFrameCount(+e.target.value)}
                    fullWidth

                />
                <TextField
                    label="Shape Count"
                    type="number"
                    value={shapeCount}
                    onChange={(e) => setShapeCount(+e.target.value)}
                    fullWidth
                />
            </Box>
            <Box display="flex" gap={2}>
                <TextField
                    label="Frame Width (mm)"
                    type="number"
                    value={frameWidth}
                    onChange={(e) => setFrameWidth(+e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Frame Height (mm)"
                    type="number"
                    value={frameHeight}
                    onChange={(e) => setFrameHeight(+e.target.value)}
                    fullWidth
                />
            </Box>

            <Divider sx={{ my: 1 }}>Shape Size</Divider>
            <Box display="flex" gap={2}>
                <TextField
                    label={shapeType === 'circle' ? 'Diameter (mm)' : 'Shape Width (mm)'}
                    type="number"
                    value={shapeWidth}
                    onChange={(e) => setShapeWidth(+e.target.value)}
                    fullWidth
                />
                {shapeType !== 'circle' && (
                    <TextField
                        label="Shape Height (mm)"
                        type="number"
                        value={shapeHeight}
                        onChange={(e) => setShapeHeight(+e.target.value)}
                        fullWidth
                    />
                )}
            </Box>
            <Divider sx={{ my: 1 }} />

            <Button
                variant="contained"
                size="large"
                sx={{
                    mt: 1,
                    alignSelf: 'center',
                    width: '100%',
                    maxWidth: 300,
                    transition: 'all 0.25s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    },
                    '&:active': {
                        transform: 'translateY(1px)',
                        boxShadow: 'none',
                    },
                }}
                onClick={handleGenerate}
            >
                Generate & Download
            </Button>
        </Box>
    );
}
