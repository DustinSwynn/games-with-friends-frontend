// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import {blue, red, grey, yellow} from '@material-ui/core/colors';

const colourDict = {
	'Black': grey[900],
	'White': grey[50],
	'Blue': blue[500],
	'Red': red[700],
	'Beige': yellow[100],
	'None': grey[100] 
};

const useStyles = (color) => ({
	wrapper: css({
		width: '100px',
		height: '50px',
		fontSize: 'large',
		borderRadius: '5px',
		backgroundColor: colourDict[color],
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