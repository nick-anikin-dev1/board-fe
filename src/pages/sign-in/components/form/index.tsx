import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import { SignInDto } from '../../../../types';
import { WrappedIcon } from '../../../../components/wrapped-icon';


const SignInSchema = Yup.object().shape({
    email: Yup.string().required('Required field!').email('Incorrect email'),
    password: Yup.string().required('Required field!').min(6, 'Too short!')
});

export const SignInForm = () => {
    const navigate = useNavigate();
    const [ showPassword, setShowPassword ] = useState(false);
    const initialValues = {
        email: '',
        password: '',
    }
    const signInHandler = async (dto: SignInDto) => {
        //
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values) => signInHandler(values)}>
            {({
                  errors,
                  handleChange,
                  touched,
                  setFieldValue,
                  values,
                  isSubmitting,
                  handleSubmit
              }: FormikProps<SignInDto>) => {
                return (
                    <Form>
                        <Stack spacing={3}>
                            <TextField
                                error={Boolean(touched.email && errors.email)}
                                onChange={handleChange('email')} value={values.email} name="email"
                                label="Email address"
                                helperText={errors.email}
                            />
                            <TextField
                                name="password"
                                label="Password"
                                value={values.password}
                                onChange={handleChange('password')}
                                type={showPassword ? 'text' : 'password'}
                                error={Boolean(touched.password && errors.password)}
                                helperText={errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                <WrappedIcon container={{width: 20}}
                                                             icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <LoadingButton loading={false} fullWidth size="large" type="submit" variant="contained">
                                Sign in
                            </LoadingButton>
                        </Stack>
                    </Form>)
            }}
        </Formik>
    )
}
