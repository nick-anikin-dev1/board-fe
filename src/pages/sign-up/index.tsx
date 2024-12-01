import { styled } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import { SignUpForm } from "./form";
import { Link } from "react-router-dom";

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledContent = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

const SignUp = () => {
    return (
        <StyledRoot>
            <Container maxWidth="sm">
                <StyledContent>
                    <Typography variant="h4" gutterBottom>
                        Sign up to Board App
                    </Typography>
                    <Typography variant="body2" sx={{mb: 5}}>
                        Already have an account?
                        <Link replace to='/sign-in'>Let's sign in</Link>
                    </Typography>
                    <SignUpForm/>
                </StyledContent>
            </Container>
        </StyledRoot>
    )
}

export default SignUp;
