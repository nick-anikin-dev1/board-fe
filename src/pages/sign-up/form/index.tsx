import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import { SignUpDto } from "../../../types";

const SignUpSchema = Yup.object().shape({
    first_name: Yup.string().required('Required field!').min(2, 'Too short!'),
    last_name: Yup.string().required('Required field!').min(2, 'Too short!'),
    email: Yup.string().required('Required field!').email('Incorrect email'),
    password: Yup.string().required('Required field!').min(6, 'Too short!'),
    role: Yup.string().required('Required field!')
});

export const SignUpForm = () => {
    const initialValues: SignUpDto = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    }

    const signUpHandler = async (dto: SignUpDto) => {
       //
    }


    return (<Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={(values) => signUpHandler(values)}>
            {({
                  errors,
                  handleChange,
                  touched,
                  setFieldValue,
                  values,
                  isSubmitting,
                  handleSubmit
              }: FormikProps<SignUpDto>) => {
                return (
                    <Form>
                        <Stack spacing={3}>
                            <TextField onChange={handleChange('first_name')} value={values.first_name} name="firstName"
                                       error={Boolean(touched.first_name && errors.first_name)}
                                       helperText={errors.first_name}
                                       label="First name"/>
                            <TextField
                                error={Boolean(touched.last_name && errors.last_name)}
                                helperText={errors.last_name}
                                onChange={handleChange('last_name')} value={values.last_name} name="lastName"
                                       label="Last name"/>
                            <TextField
                                error={Boolean(touched.email && errors.email)}
                                helperText={errors.email}
                                onChange={handleChange('email')} value={values.email} name="email"
                                       label="Email address"/>
                            <TextField
                                name="password"
                                label="Password"
                                value={values.password}
                                helperText={errors.password}
                                error={Boolean(touched.password && errors.password)}
                                onChange={handleChange('password')}
                            />
                            <LoadingButton loading={false} fullWidth size="large" type="submit" variant="contained">
                                Sign up
                            </LoadingButton>
                        </Stack>
                    </Form>
                )
            }}
        </Formik>
    )
}

