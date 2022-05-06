import PropTypes from "prop-types";

export default function SubTitle({ subtitle }) {
	return <h5>{subtitle}</h5>;
}

SubTitle.propTypes = {
	title: PropTypes.string,
};
