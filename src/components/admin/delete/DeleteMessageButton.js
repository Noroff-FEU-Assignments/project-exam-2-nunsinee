import { useState } from "react";
import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function DeleteMessageButton({ id }) {
	const [error, setError] = useState(null);

	const http = useAxios();
	const navigate = useNavigate();
	const url = `api/contacts/${id}`;

	async function handleDelete(e) {
		e.preventDefault();
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this message?"
		);

		if (confirmDelete) {
			try {
				await http.delete(url);
				window.location.reload(false);
				navigate("/admin/message");
			} catch (error) {
				setError(error);
				console.log(error);
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

DeleteMessageButton.propTypes = {
	id: PropTypes.number.isRequired,
};
