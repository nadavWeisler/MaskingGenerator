import { Box, Paper, Typography } from '@mui/material';
import PresetButtons, {type PresetType } from './PresetButtons';
import ShapeForm from './ShapeForm';
import { useState } from 'react';

export default function ShapeFormWithSidebar() {
    const [preset, setPreset] = useState<PresetType | null>(null);

    return (
        <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={4}
            width="100%"
            justifyContent="center"
            alignItems={{ xs: 'center', md: 'flex-start' }}
        >
            {/* Form Panel */}
            <Paper
                elevation={6}
                sx={{
                    flex: 1,
                    p: 4,
                    borderRadius: 3,
                    width: '100%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                }}
            >
                <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
                    Generate Shape Masks
                </Typography>
                <ShapeForm preset={preset} />
            </Paper>

            {/* Preset Panel */}
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 2,
                    // width: { xs: '100%', md: 280 },
                    // maxHeight: '600px',
                    overflowY: 'auto',
                    backgroundColor: '#fafafa',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold" mb={2} textAlign="center">
                    Presets
                </Typography>
                <PresetButtons onApply={setPreset} />
            </Paper>
        </Box>
    );
}
