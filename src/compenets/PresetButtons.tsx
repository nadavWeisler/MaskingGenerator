import { Box, Button, Tooltip } from '@mui/material';
import { useState } from 'react';

export type PresetType = {
    shapeType: string;
    frameCount: number;
    shapeCount: number;
    frameWidth: number;
    frameHeight: number;
    shapeWidth: number;
    shapeHeight: number;
};

type PresetProps = {
    onApply: (preset: PresetType) => void;
};

export type PresetKey = 'standardCircle' | 'bigRectangle' | 'random';

export default function PresetButtons({ onApply }: PresetProps) {
    const [selected, setSelected] = useState<string | null>(null);

    const presets: Record<PresetKey, {
        label: string;
        description: string;
        config: PresetType | (() => PresetType);
    }> = {
        standardCircle: {
            label: 'Standard Circle',
            description: 'Circle shape, 5 frames, 3 shapes.',
            config: {
                shapeType: 'circle',
                frameCount: 5,
                shapeCount: 3,
                frameWidth: 100,
                frameHeight: 100,
                shapeWidth: 30,
                shapeHeight: 30,
            },
        },
        bigRectangle: {
            label: 'Big Rectangle',
            description: 'Large rectangles, few frames.',
            config: {
                shapeType: 'rectangle',
                frameCount: 3,
                shapeCount: 2,
                frameWidth: 120,
                frameHeight: 120,
                shapeWidth: 60,
                shapeHeight: 40,
            },
        },
        random: {
            label: 'Random',
            description: 'Randomized values for exploration.',
            config: (): PresetType => {
                const types = ['circle', 'rectangle', 'triangle'];
                const shapeType = types[Math.floor(Math.random() * types.length)];
                const common: PresetType = {
                    shapeType,
                    frameCount: Math.floor(Math.random() * 10) + 1,
                    shapeCount: Math.floor(Math.random() * 6) + 1,
                    frameWidth: Math.floor(Math.random() * 100) + 80,
                    frameHeight: Math.floor(Math.random() * 100) + 80,
                    shapeWidth: Math.floor(Math.random() * 50) + 10,
                    shapeHeight: Math.floor(Math.random() * 50) + 10,
                };
                if (shapeType === 'circle') {
                    common.shapeHeight = common.shapeWidth;
                }
                return common;
            },
        },
    };

    const handleClick = (key: PresetKey) => {
        setSelected(key);
        const preset = presets[key];
        const config = typeof preset.config === 'function' ? preset.config() : preset.config;
        onApply(config);
    };

    return (
        <Box display="flex" gap={2} mb={2} flexWrap="wrap" justifyContent="center">
            {(Object.entries(presets) as [PresetKey, typeof presets[PresetKey]][]).map(
                ([key, { label, description }]) => (
                    <Tooltip key={key} title={description} arrow>
                        <Button
                            variant={selected === key ? 'contained' : 'outlined'}
                            onClick={() => handleClick(key)}
                            color={selected === key ? 'primary' : 'inherit'}
                        >
                            {label}
                        </Button>
                    </Tooltip>
                )
            )}
        </Box>
    );
}