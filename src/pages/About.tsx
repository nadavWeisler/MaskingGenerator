import { Box, Paper, Typography } from '@mui/material';
import AnimatedPage from '../compenets/AnimatedPage';

export default function About() {
    return (
        <AnimatedPage>
            <Box mt={6}>
                <Paper
                    elevation={2}
                    sx={{
                        padding: 3,
                        borderRadius: 2,
                        backgroundColor: '#fdfdfd',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        About This Tool
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The Mask Generator helps you quickly create randomized images of geometric shapes
                        for use in psychological experiments, visual masking, or computer vision projects.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can select the shape type, number of shapes and frames, and specify precise
                        sizes in millimeters. The tool then generates high-quality PNG images and packages
                        them into a downloadable ZIP file.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Developed by Nadav Weisler · Powered by React, MUI, and JSZip
                    </Typography>
                </Paper>
            </Box>
        </AnimatedPage>
    );
}
