import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ bgcolor: '#2f3542' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Mask Generator</Typography>
                <div>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/about">
                        About
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}
