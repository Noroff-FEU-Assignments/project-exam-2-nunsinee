import { useEffect } from "react";
import PropTypes from "prop-types";

export function useTitlePage(title) {
	useEffect(() => {
		const prevTitle = document.title;
		document.title = title;
		return () => {
			document.title = prevTitle;
		};
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
useTitlePage.propTypes = {
	title: PropTypes.string,
};
