import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { BASE_URL } from "../../constants/api";
import FormError from "../common/FormError";

import ErrorMessage from "../common/ErrorMessage";
import Messages from "../common/Messages";
import { useNavigate } from "react-router-dom";

import {
	MINIMUM_NAME_CHARACTERS,
	MINIMUM_SUBJECT_CHARACTERS,
	MINIMUM_MESSAGE,
	EMAIL_REGEX,
} from "../../constants/registration";

const schema = yup.object().shape({
	name: yup
		.string()
		.required("Please enter your name")
		.min(
			MINIMUM_NAME_CHARACTERS,
			`Your First name must be at least ${MINIMUM_NAME_CHARACTERS} characters`
		),
	subject: yup
		.string()
		.required("Please enter your subject")
		.min(
			MINIMUM_SUBJECT_CHARACTERS,
			`Subject is required! Must be at least ${MINIMUM_SUBJECT_CHARACTERS} characters`
		),
	email: yup
		.string("Please enter your email")
		.matches(EMAIL_REGEX, "Your email is not valid"),
	message: yup
		.string("Please enter your message here")
		.min(
			MINIMUM_MESSAGE,
			`Your message is required! Must be at least ${MINIMUM_MESSAGE} characters`
		),
});

export default function ContactForm() {
	const [submitted, setSubmitted] = useState(false);
	const [serverError, setServerError] = useState(null);
	const [showMsg, setShowMsg] = useState(false);
	const url = BASE_URL + "api/contacts";

	let navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	async function onSubmit(data) {
		console.log(data);

		const formData = new FormData();

		const inputData = {
			name: data.name,
			email: data.email,
			subject: data.subject,
			message: data.message,
		};

		formData.append("data", JSON.stringify(inputData));

		try {
			const response = await axios.post(url, formData);
			console.log("response", response.data);
			setShowMsg(true);
			setTimeout(() => {
				navigate("/");
			}, 5000);
		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitted(false);
		}
	}

	if (serverError) {
		return (
			<ErrorMessage message="Something went wrong! Please try again later" />
		);
	}

	if (showMsg) {
		return (
			<Messages>
				Thank you for your contact.We will reply you as soon as
				possible.
			</Messages>
		);
	}

	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				className="form form__contact"
			>
				<fieldset disabled={submitted}>
					<Form.Group className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control
							name="name"
							placeholder="Your Name"
							{...register("name")}
						/>
						<Form.Text className="text-muted">
							Your name must be at least &nbsp;
							{MINIMUM_NAME_CHARACTERS} characters.
							{errors.name && (
								<FormError>{errors.name.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							name="email"
							placeholder="Email"
							{...register("email")}
						/>
						<Form.Text className="text-muted">
							Please enter en valid email address
							{errors.email && (
								<FormError>{errors.email.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Subject</Form.Label>
						<Form.Control
							name="subject"
							placeholder="Subject"
							{...register("subject")}
						/>
						<Form.Text className="text-muted">
							Your subject must be at least &nbsp;
							{MINIMUM_SUBJECT_CHARACTERS} characters.
							{errors.subject && (
								<FormError>{errors.subject.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Your Message</Form.Label>
						<Form.Control
							as="textarea"
							name="message"
							rows={5}
							aria-label="With textarea"
							placeholder="Write Your Message Here"
							{...register("message")}
						/>
						<Form.Text className="text-muted">
							Your message must be at least &nbsp;
							{MINIMUM_MESSAGE} characters
							{errors.message && (
								<FormError>{errors.message.message}</FormError>
							)}
						</Form.Text>
					</Form.Group>

					<Button type="submit" className="mb-2">
						Send
					</Button>
				</fieldset>
			</Form>
		</>
	);
}

ContactForm.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	subject: PropTypes.string,
	message: PropTypes.string,
	email: PropTypes.string,
};
