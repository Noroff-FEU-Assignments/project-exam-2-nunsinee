import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import { Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { GoSearch } from "react-icons/go";

export default function SearchForm() {
	const [hotels, setHotels] = useState([]);
	const [text, setText] = useState("");
	const [guidence, setGuidence] = useState([]);
	const http = BASE_URL + "api/hotels";

	useEffect(() => {
		const loadHotels = async () => {
			const response = await axios.get(http);
			setHotels(response.data.data);
		};
		loadHotels();
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		}

		setGuidence(matches);
		setText(text);
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
										className=" search search__suggest "
										onClick={() =>
											guidenceHandle(
												guide.attributes.title
											)
										}
									>
										<Link to={`detail/${guide.id}`}>
											{guide.attributes.title}
										</Link>
									</div>
								))}
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
