import { FC } from "react";
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { SignInForm } from "./components/form";
import { Link } from "react-router-dom";

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledContent = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

const SignIn: FC = () => {
    return (
        <StyledRoot>
            <Container maxWidth="sm">
                <StyledContent>
                    <Typography variant="h4" gutterBottom>
                        Sign in to Board App
                    </Typography>
                    <Typography variant="body2" sx={{mb: 5}}>
                        Don’t have an account?
                        <Link replace to='/sign-up'>Get started</Link>
                    </Typography>
                    <SignInForm/>
                </StyledContent>
            </Container>
        </StyledRoot>
    )
}

export default SignIn;
