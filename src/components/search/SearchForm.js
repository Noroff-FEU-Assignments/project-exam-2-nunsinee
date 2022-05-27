import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { GoSearch } from "react-icons/go";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../layout/Loader";

export default function SearchForm() {
	const [hotels, setHotels] = useState([]);
	const [text, setText] = useState("");
	const [guidence, setGuidence] = useState([]);
	const [error, setError] = useState(null);
	const [resFound, setResFound] = useState(true);
	const [loading, setLoading] = useState(false);

	const http = BASE_URL + "api/hotels";

	useEffect(() => {
		const loadHotels = async () => {
			try {
				const response = await axios.get(http);
				setHotels(response.data.data);
			} catch (error) {
				console.log(error);
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		};
		loadHotels();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) {
		return <ErrorMessage message=" Sorry, there is something went wrong" />;
	}

	if (loading) {
		return <Loader />;
	}

	const guidenceHandle = (text) => {
		setText(text);
		setGuidence([]);
	};

	const onChangeHandle = (text) => {
		let matches = [];

		if (text.length > 0) {
			matches = hotels.filter((hotel) => {
				const regex = new RegExp(`${text}`, "gi");
				return hotel.attributes.title.match(regex);
			});
			setResFound(matches.length !== 0 ? true : false);
		}

		console.log("matches", matches);

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
								placeholder="Search by hotel name.."
								onChange={(e) => onChangeHandle(e.target.value)}
								value={text}
								className="search search__input"
							/>
							{guidence &&
								guidence.map((guide, index) => (
									<div
										key={index}
										onClick={() =>
											guidenceHandle(
												guide.attributes.title
											)
										}
									>
										<Link to={`detail/${guide.id}`}>
											<div className=" search search__suggest ">
												{guide.attributes.title}
											</div>
										</Link>
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

SearchForm.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
};
