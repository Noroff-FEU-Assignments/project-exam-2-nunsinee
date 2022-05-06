import PropTypes from "prop-types";

export default function Wrapper(props) {
	return <div className="wrapper">{props.children}</div>;
}

Wrapper.propTypes = {
	children: PropTypes.node,
};
