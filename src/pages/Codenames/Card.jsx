// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {blue, red, grey} from '@material-ui/core/colors';

const useStyles = (color) => ({
	wrapper: css({
		width: '100px',
		height: '50px',
		fontSize: 'large',
		borderRadius: '5px',
		backgroundColor: (color === 'Black') ? grey[900] : (color === 'Blue' ? blue[500] : red[700]),
		color: color === 'Black' ? grey[50] : grey[900]
	})
});

const Card = ({word, color, onClick}) => {

	const styles = useStyles(color);

	return (
		<div>
			<button css={styles.wrapper} onClick={() => onClick()}>{word}</button>
		</div>
	)
	
}

export default Card;