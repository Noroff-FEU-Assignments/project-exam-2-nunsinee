import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import AuthContext from "../../context/AuthContext";
import { useTitlePage } from "../../utils/useTitlePage";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Heading from "../layout/Heading";
import { BASE_URL } from "../../constants/api";

const url = BASE_URL + "api/auth/local";

const headers = {
	"Content-Type": "application/json",
};

const schema = yup.object().shape({
	identifier: yup.string().required("Please enter your username"),
	password: yup.string().required("please enter your password"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const navigate = useNavigate();

	useTitlePage(
		"Login | Hotels, Accommodation, Apartment, GuestHouse in Bergen"
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [, setAuth] = useContext(AuthContext);

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		try {
			const response = await axios.post(url, data, headers);
			setAuth(response.data);
			navigate("/admin");
		} catch (error) {
			console.log("error", error);
			setLoginError(
				"Sorry, We could´t find an account with that username or maybe your password is not corrected!"
			);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<Container className="container__form">
				<Row>
					<Col sm className="mt-5 text-center">
						<Heading title="Login" />
					</Col>
				</Row>
				<Row>
					<Col sm>
						<Form
							className="form form__login"
							onSubmit={handleSubmit(onSubmit)}
						>
							{loginError && <FormError>{loginError}</FormError>}
							<fieldset disabled={submitting}>
								<Form.Group className="mb-3">
									<Form.Label>Username:</Form.Label>
									<Form.Control
										name="identifier"
										placeholder="Username"
										{...register("identifier", {
											required: true,
										})}
									/>
									{errors.identifier && (
										<FormError>
											{errors.identifier.message}
										</FormError>
									)}
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type="password"
										name="password"
										placeholder="Password"
										autoComplete="on"
										{...register("password", {
											required: true,
										})}
									/>
									{errors.password && (
										<FormError>
											{errors.password.message}
										</FormError>
									)}
								</Form.Group>
								<Button variant="primary" type="submit">
									{submitting ? "Login in..." : "Login"}
								</Button>
							</fieldset>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}
