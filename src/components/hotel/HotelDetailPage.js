import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../layout/Loader";
import { useParams, useNavigate } from "react-router-dom";
import Heading from "../layout/Heading";
import Paragraph from "../layout/Paragraph";
import Title from "../layout/Title";
import Enquiry from "./enquiry/Enquiry";
import { BASE_URL } from "../../constants/api";
import {
	Container,
	Row,
	Breadcrumb,
	Col,
	Button,
	Modal,
} from "react-bootstrap";

export default function HotelDetailPage() {
	const [hotel, setHotel] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [show, setShow] = useState(false);

	const http = BASE_URL;

	const { id } = useParams();
	let navigate = useNavigate();

	if (!id) {
		navigate.push("/");
	}

	const url = http + `api/hotels/${id}?populate=*`;

	useEffect(function () {
		async function getDetailPage() {
			try {
				const response = await axios.get(url);
				setHotel(response.data.data);

				//get page title from hotel name
				const title = response.data.data.attributes.title;
				document.title = title;
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		getDetailPage();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorMessage message={`Error:${error}`} />;
	}

	const handleShowEnquiry = () => setShow(true);
	const handleClose = () => setShow(false);

	return (
		<Container className="container__content">
			<Breadcrumb>
				<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
				<Breadcrumb.Item href="/hotel">Hotels</Breadcrumb.Item>
				<Breadcrumb.Item active>
					{hotel.attributes.title}
				</Breadcrumb.Item>
			</Breadcrumb>

			<Row>
				<Col xs={12} md={8}>
					<Heading title={hotel.attributes.title} />
				</Col>
			</Row>
			<h6>
				<b>Address:</b> {hotel.attributes.address}
			</h6>
			<Row>
				<Col sm={12} className="mb-3">
					<img
						src={hotel.attributes.featuredImage.data.attributes.url}
						alt={hotel.attributes.title}
						className="image image__featuredImage"
					/>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={6} className="mb-3">
					<Title title="Description" />
					<Paragraph>{hotel.attributes.description}</Paragraph>
				</Col>
				<Col xs={12} md={6} className="mb-3">
					<Title title="Facilities" />
					<Paragraph>{hotel.attributes.facilities}</Paragraph>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={6} className="mb-3">
					<Title title="Room Types" />
					<Paragraph>{hotel.attributes.roomTypes}</Paragraph>
				</Col>
				<Col xs={12} md={6} className="mb-5">
					<Title title="Price/Night" />
					<Paragraph>{hotel.attributes.price}Kr.</Paragraph>
					<Paragraph>(**Price in Norwegian Krone**)</Paragraph>
					<Button
						variant="primary"
						type="submit"
						data-id={hotel.id}
						data-title={hotel.attributes.title}
						value={hotel.attributes.title}
						onClick={handleShowEnquiry}
						data-toggle="modal"
					>
						Send An Enquiry
					</Button>
				</Col>
			</Row>
			<Row className="image__container">
				<Title title="Room Photos" />
				<Col xs={12} md={6}>
					<img
						src={hotel.attributes.roomImage.data[0].attributes.url}
						alt={hotel.attributes.title}
						className="image image__roomImage"
					/>
				</Col>
				<Col xs={12} md={6}>
					<img
						src={hotel.attributes.roomImage.data[1].attributes.url}
						alt={hotel.attributes.title}
						className="image image__roomImage"
					/>
				</Col>
			</Row>
			<Row>
				<Col xs={12} md={6}>
					<Button
						variant="primary"
						type="submit"
						data-id={hotel.id}
						data-title={hotel.attributes.title}
						value={hotel.attributes.title}
						onClick={handleShowEnquiry}
						data-toggle="modal"
					>
						Send An Enquiry
					</Button>
				</Col>
			</Row>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h6>Send An Enquiry to {hotel.attributes.title}</h6>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Enquiry title={hotel.attributes.title} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

HotelDetailPage.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string.isRequired,
	address: PropTypes.string,
	facilities: PropTypes.string,
	description: PropTypes.string,
	roomTypes: PropTypes.string,
	price: PropTypes.number,
	featuredImage: PropTypes.string,
	roomImage: PropTypes.string,
};

HotelDetailPage.defaultProps = {
	title: "default name",
	price: 450,
};
