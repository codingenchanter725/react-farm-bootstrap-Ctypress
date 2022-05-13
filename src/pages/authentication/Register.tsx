import React, { FC, ReactElement, useContext } from "react";
import "../../App.scss";
import { Button, Form, Card } from "react-bootstrap";
import LayoutComponent from "../../components/Layout/Layout";
import {
    Formik,
    Form as FormikForm,
    FormikHelpers,
    Field,
    FieldProps,
} from "formik";
import { register } from "../../services/auth";
import { AuthContext } from "../../context/authContext";

interface RegisterFormValue {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterFormError {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    passwordError?: string;
}

const passwordRegX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const Register: FC = (): ReactElement => {
    const authContext = useContext(AuthContext);

    const initialValues: RegisterFormValue = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const registerUser = async (values: RegisterFormValue) => {
        let data: RegisterFormValue = {
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            firstName: values.firstName,
            lastName: values.lastName,
        };

        return await register(data);
    };

    return (
        <LayoutComponent>
            <div className="auth-container" style={{ height: 'calc(100vh - 120px)' }} data-testid="register">
                <Card>
                    <h1>Register</h1>
                    <h6>Please tell us all about your self.</h6>
                    <Formik
                        initialValues={initialValues}
                        validate={(values) => {
                            let errors: RegisterFormError = {};
                            if (!values.firstName) {
                                errors.firstName = "First name required";
                            }
                            if (!values.lastName) {
                                errors.lastName = "Last name required";
                            }
                            if (values.password !== values.confirmPassword) {
                                errors.confirmPassword =
                                    "Password and Confirm password does not match";
                            }
                            if (!values.password) {
                                errors.password = "Password required"
                            }
                            if (!values.email) {
                                errors.email = "Email name required";
                            }

                            return errors;
                        }}
                        onSubmit={async (
                            values: RegisterFormValue,
                            {
                                setSubmitting,
                                resetForm,
                                setErrors,
                            }: FormikHelpers<RegisterFormValue>
                        ) => {
                            console.log(">>>>", values);
                            try {
                                if (
                                    values.firstName &&
                                    values.lastName &&
                                    values.password === values.confirmPassword &&
                                    values.email
                                ) {
                                    const response = await registerUser(values);
                                    console.log(response, "response");
                                    if (
                                        response &&
                                        response.data.validationErrors &&
                                        response.data.validationErrors.length
                                    ) {
                                        let error: any = {}; //: RegisterFormError = {}
                                        response.data.validationErrors.forEach(
                                            (validationError: any) => {
                                                error[validationError["property"].toLowerCase()] =
                                                    validationError.message;
                                            }
                                        );
                                        setErrors(error);

                                        return;
                                    }
                                    console.log(">>>>", response.data.farmApiKey, authContext);
                                    authContext.setToken(response.data.farmApiKey);
                                    localStorage.setItem("@token", response.data.farmApiKey);
                                    setSubmitting(false);
                                    resetForm();
                                }
                            } catch (error) {
                                setSubmitting(false);
                            }
                        }}
                        render={({
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            values,
                            errors,
                            validateForm,
                        }) => (
                            <FormikForm>
                                <div className="custom-form-control">
                                    <Field
                                        name="email"
                                        render={({ field }: FieldProps) => (
                                            <Form.Group controlId="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    autoFocus
                                                    data-testid="email-input"
                                                    type="email"
                                                    name="email"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </Form.Group>
                                        )}
                                    />
                                    {errors.email ? (
                                        <div className="error-message">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="custom-form-control">
                                    <Field
                                        name="password"
                                        render={({ field }: FieldProps) => (
                                            <Form.Group controlId="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    data-testid="password-input"
                                                    type="password"
                                                    name="password"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </Form.Group>
                                        )}
                                    />
                                    {errors.password ? (
                                        <div className="error-message">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="custom-form-control">
                                    <Field
                                        name="confirmPassword"
                                        render={({ field }: FieldProps) => (
                                            <Form.Group controlId="cpassword">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    data-testid="confirm-input"
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </Form.Group>
                                        )}
                                    />
                                    {errors.confirmPassword ? (
                                        <div className="error-message">
                                            {errors.confirmPassword}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="custom-form-control">
                                    <Field
                                        name="firstName"
                                        render={({ field }: FieldProps) => (
                                            <Form.Group controlId="fname">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    data-testid="first-name-input"
                                                    type="text"
                                                    name="firstName"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </Form.Group>
                                        )}
                                    />
                                    {errors.firstName ? (
                                        <div className="error-message">{errors.firstName}</div>
                                    ) : null}
                                </div>

                                <div className="custom-form-control">
                                    <Field
                                        name="lastName"
                                        render={({ field }: FieldProps) => (
                                            <Form.Group controlId="lname">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    data-testid="last-name-input"
                                                    type="text"
                                                    name="lastName"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </Form.Group>
                                        )}
                                    />
                                    {errors.lastName ? (
                                        <div className="error-message">{errors.lastName}</div>
                                    ) : null}
                                </div>
                                <div className="d-flex btn-container">
                                    <Button type="submit" data-testid="register-btn">
                                        Register
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        type="submit"
                                        data-testid="back-btn"
                                    >
                                        Back To Login
                                    </Button>
                                </div>
                            </FormikForm>
                        )}
                    >
                        {/* <FormikForm>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Field
                                    autoFocus
                                    type="email"
                                    name="email"
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                />
                            </Form.Group>
                            <Form.Group controlId="cpassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                />
                            </Form.Group>
                            <Form.Group controlId="fname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                />
                            </Form.Group>
                            <Form.Group controlId="lname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                />
                            </Form.Group>
                            <div className='d-flex btn-container'>
                                <Button type="submit">
                                    Register
                                </Button>
                                <Button variant="secondary" type="submit">
                                    Back To Login
                                </Button>
                            </div>
                        </FormikForm> */}
                    </Formik>
                </Card>
            </div>
        </LayoutComponent>
    );
};
export default Register;
