import { Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AnimatedPage from '../compenets/AnimatedPage';


export default function NotFound() {
    return (
        <AnimatedPage>
            <Box textAlign="center" py={10}>
                <Typography variant="h3" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" mb={4}>
                    The page you're looking for doesn’t exist or has been moved.
                </Typography>
                <Button variant="contained" component={RouterLink} to="/">
                    Go to Home
                </Button>
            </Box>
        </AnimatedPage>
    );
}
