import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default function DeleteEnquiryButton({ id }) {
	const [error, setError] = useState(null);

	const http = useAxios();
	const navigate = useNavigate();
	const url = `api/enquiries/${id}`;

	async function handleDelete(e) {
		e.preventDefault();
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this enquiry?"
		);

		if (confirmDelete) {
			try {
				await http.delete(url);
				window.location.reload(false);
				navigate("/admin/enquiries");
			} catch (error) {
				setError(error);
			}
		}
	}

	return (
		<Button
			type="button"
			variant="danger"
			className="mb-2"
			onClick={handleDelete}
		>
			{error ? "Error" : "Delete"}
		</Button>
	);
}

DeleteEnquiryButton.propTypes = {
	id: PropTypes.number.isRequired,
};
