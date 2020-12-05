// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Card from './Card';

const useStyles = () => ({
	wrapper: css({
		display: 'grid',
		width: '500px',
		height: '250px',
		margin: '10px 10px',
		gridTemplateColumns: 'auto auto auto auto auto',
		gridGap: '5px'
	})
});

const Board = ({cards, handleClick}) => {

	const styles = useStyles();

	return (
		<div css={styles.wrapper} >
			{cards.map((card, i) => (
				<Card key={i} word={card.word} color={card.chosen ? card.colour : 'None'} onClick={() => handleClick(card.word)} />
			))}
		</div>
	)

}

export default Board;