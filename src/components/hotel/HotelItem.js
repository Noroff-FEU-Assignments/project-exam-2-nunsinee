import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";

export default function HotelItem({ id, title, price, featuredImage }) {
	return (
		<Link to={`/detail/${id}`}>
			<Card>
				<Card.Img variant="top" src={featuredImage} />
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{price} Kr. per Night</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	);
}

HotelItem.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	featuredImage: PropTypes.string.isRequired,
};
