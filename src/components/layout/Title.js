import PropTypes from "prop-types";

export default function Title({ title }) {
	return <h3>{title}</h3>;
}

Title.propTypes = {
	title: PropTypes.string,
};
