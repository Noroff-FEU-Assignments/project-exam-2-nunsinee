import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../../../constants/api";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { GoSearch } from "react-icons/go";
import EnquiryItem from "../enquiries/EnquiryItem";
import Loader from "../../layout/Loader";
import ErrorMessage from "../../common/ErrorMessage";

export default function FilterEnquiries() {
	const [enquiries, setEnquiries] = useState([]);
	const [text, setText] = useState("");
	const [guidence, setGuidence] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [resFound, setResFound] = useState(true);

	const http = BASE_URL + "api/enquiries";

	useEffect(() => {
		const loadEnquiries = async () => {
			try {
				const response = await axios.get(http);
				setEnquiries(response.data.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		};
		loadEnquiries();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorMessage message=" We are sory, something went wrong!" />;
	}

	const guidenceHandle = (text) => {
		setText(text);
		setGuidence([]);
	};

	const onChangeHandle = (text) => {
		let matches = [];

		if (text.length > 0) {
			matches = enquiries.filter((enquiry) => {
				const regex = new RegExp(`${text}`, "gi");
				return enquiry.attributes.refHotelTitle.match(regex);
			});

			setResFound(matches.length !== 0 ? true : false);
		}

		setGuidence(matches);
		setText(text);
	};

	const NoFoundResult = (text) => {
		if (text !== "" && !resFound) {
			return (
				<div className=" search search__suggest search__suggest--nofound">
					<h6 style={{ color: "darkblue", fontWeight: "bold" }}>
						Sorry, This hotel name is not on our hotel list!
					</h6>
				</div>
			);
		}
	};

	return (
		<>
			<Row className="align-items-center">
				<Form.Group className="mb-5 mt-3 ">
					<Col md={{ span: 6, offset: 3 }}>
						<div className="search">
							<GoSearch
								style={{
									color: "grey",
									fontSize: "20px",
									position: "absolute",
									top: "10px",
									right: "20px",
									zIndex: "3",
								}}
							/>
							<Form.Control
								type="text"
								placeholder="Find by Hotel Ref./Hotel Name"
								onChange={(e) => onChangeHandle(e.target.value)}
								value={text}
								className="search search__input"
							/>
							{guidence &&
								guidence.map((guide, index) => (
									<div
										key={index}
										className=" suggest col-md-12 justify-content-md-center"
										onClick={() =>
											guidenceHandle(
												guide.attributes.refHotelTitle
											)
										}
									>
										<Col
											xs={12}
											key={guide.id}
											className="filter__container"
										>
											<EnquiryItem
												key={guide.id}
												id={guide.id}
												date={
													guide.attributes.createdAt
												}
												refHotelTitle={
													guide.attributes
														.refHotelTitle
												}
												firstName={
													guide.attributes.firstName
												}
												lastName={
													guide.attributes.lastName
												}
												checkInDate={
													guide.attributes.checkInDate
												}
												checkOutDate={
													guide.attributes
														.checkOutDate
												}
												subject={
													guide.attributes.subject
												}
												email={guide.attributes.email}
												message={
													guide.attributes.message
												}
											/>
										</Col>
									</div>
								))}

							{<NoFoundResult />}
						</div>
					</Col>
				</Form.Group>
			</Row>
		</>
	);
}

FilterEnquiries.propTypes = {
	id: PropTypes.number,
	refHotelTitle: PropTypes.string,
	subject: PropTypes.string,
	email: PropTypes.string,
	message: PropTypes.string,
	checkInDate: PropTypes.string,
	checkOutDate: PropTypes.string,
	date: PropTypes.string,
};
