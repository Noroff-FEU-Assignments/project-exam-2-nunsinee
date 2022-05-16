import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import AdminPage from "../AdminPage";
import Heading from "../../layout/Heading";
import AlertMessage from "../../../utils/AlertMessage";
import Paragraph from "../../layout/Paragraph";
import { BASE_URL } from "../../../constants/api";
import { useTitlePage } from "../../../utils/useTitlePage";

const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
	address: yup.string().required("Address is required"),
	facilities: yup.string().required("Facilities is required"),
	description: yup.string().required("Description is required"),
	roomTypes: yup.string().required("Room types is required"),
	price: yup
		.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.nullable()
		.required("Price is required"),

	featuredImage: yup
		.mixed()
		.test(
			"required",
			"Featured image is required (File Type: jpeg, png and jpg)",
			(value) => value.length > 0
		)
		.test("fileSize", "File Size is too large", (value) => {
			return value.length && value[0].size <= 3145728;
		})
		.test("fileType", "Unsupported File Format", (value) => {
			return (
				value.length &&
				["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
			);
		}),
	roomImage: yup
		.mixed()
		.test(
			"required",
			"Room image is required  2 photos/files (File Type: jpeg, png and jpg)",
			(value) => value.length > 0
		)
		.test("fileSize", "File Size is too large", (value) => {
			return value.length && value[0].size <= 2097152;
		})
		.test("fileType", "Unsupported File Format", (value) => {
			return (
				value.length &&
				["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
			);
		}),
});

export default function AddNewEstablishment() {
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	useTitlePage("Add new establishment| Admin Panel");
	const url = BASE_URL + "api/hotels";

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	console.log(errors);

	async function onSubmit(data) {
		console.log(data);
		setSubmitting(true);

		const formData = new FormData();

		if (data.featuredImage.length === 0) {
			return <AlertMessage message="Select an image" />;
		}

		if (data.roomImage.length === 0) {
			return <AlertMessage message="Select an image" />;
		}

		const file = data.featuredImage[0];

		for (let i = 0; i < 2; i++) {
			const filemulti = data.roomImage[i];
			formData.append(`files.roomImage`, filemulti, file.name);
		}

		const filemulti = data.roomImage[0];

		console.log(file);
		console.log(filemulti);

		const inputData = {
			title: data.title,
			address: data.address,
			price: data.price,
			description: data.description,
			roomTypes: data.roomTypes,
			maxGuest: data.maxGuest,
			facilities: data.facilities,
		};

		formData.append("files.featuredImage", file, file.name);
		formData.append("data", JSON.stringify(inputData));

		try {
			const response = await axios.post(url, formData);
			console.log("response", response.data);
			navigate("/admin/");
		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<AdminPage>
				<Row>
					<Col sm className="mt-5 mb-3 text-center">
						<Heading title="Add New Establishment Form" />
					</Col>
				</Row>

				<Form
					onSubmit={handleSubmit(onSubmit)}
					className="form form__add"
				>
					{serverError && <FormError>{serverError}</FormError>}
					<fieldset disabled={submitting}>
						<Form.Group className="mb-3">
							<Form.Label>Title</Form.Label>
							<Form.Control
								name="title"
								placeholder="Title"
								{...register("title")}
							/>
							<Form.Text className="text-muted">
								{errors.title && (
									<FormError>
										{errors.title.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Address</Form.Label>
							<Form.Control
								name="address"
								placeholder="Address"
								{...register("address")}
							/>
							<Form.Text>
								{errors.address && (
									<FormError>
										{errors.address.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows="6"
								aria-label="With textarea"
								name="description"
								placeholder="Description"
								{...register("description")}
							/>
							<Form.Text>
								{errors.description && (
									<FormError>
										{errors.description.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Room Types</Form.Label>
							<Form.Control
								name="roomTypes"
								placeholder="Room only, Room and Breakfast"
								{...register("roomTypes")}
							/>
							<Form.Text>
								{errors.roomTypes && (
									<FormError>
										{errors.roomTypes.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>
								Price per Night (Norwegian Krone)
							</Form.Label>
							<Form.Control
								name="price"
								placeholder="Price"
								{...register("price")}
							/>
							<Form.Text>
								{errors.price && (
									<FormError>
										{errors.price.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Facilities</Form.Label>
							<Form.Control
								as="textarea"
								rows="2"
								name="facilities"
								placeholder="e.g., free-wifi, free-parking, restaurant, spa etc."
								{...register("facilities")}
							/>
							<Form.Text>
								{errors.facilities && (
									<FormError>
										{errors.facilities.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mt-5 mb-3">
							<Form.Label>Upload Featured Image</Form.Label>
							<Paragraph>
								Image width must be 1400px and file-size should
								less than 200KB
							</Paragraph>
							<Form.Control
								className="form-control"
								name="featuredImage"
								type="file"
								{...register("featuredImage")}
							/>
							<Form.Text>
								{errors.featuredImage && (
									<FormError>
										{errors.featuredImage.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Form.Group className="mt-5 mb-3">
							<Form.Label>
								Upload Room Images(You must upload 2
								photos/files here**)
							</Form.Label>
							<Paragraph>
								**Image width must be 640px and file-size must
								less than 200KB <br />
								** You must upload 2 photos of bedrooms, It
								cannot be blank , 1 photo or more than 2 photos.
							</Paragraph>
							<Form.Control
								name="roomImage"
								type="file"
								multiple
								{...register("roomImage")}
							/>
							<Form.Text>
								{errors.roomImage && (
									<FormError>
										{errors.roomImage.message}
									</FormError>
								)}
							</Form.Text>
						</Form.Group>

						<Button type="submit" className="mt-3 mb-3">
							Add new establishment
						</Button>
					</fieldset>
				</Form>
			</AdminPage>
		</>
	);
}

AddNewEstablishment.propTypes = {
	title: PropTypes.string,
	address: PropTypes.string,
	description: PropTypes.string,
	facilities: PropTypes.string,
	roomTypes: PropTypes.string,
	price: PropTypes.number,
	featuredImage: PropTypes.string,
	roomtypeImage: PropTypes.string,
};
