// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const useStyles = (color) => ({
	wrapper: css({
		width: '100px',
		height: '50px',
		backgroundColor: `${color}`,
		borderRadius: '5px'
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