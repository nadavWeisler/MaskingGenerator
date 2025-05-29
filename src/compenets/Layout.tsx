import Navbar from './Navbar';
import { Box, Container } from '@mui/material';
import type { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="#f5f6fa">
            <Navbar />
            <Container
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {children}
            </Container>
        </Box>
    );
}
