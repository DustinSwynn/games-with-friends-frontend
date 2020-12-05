// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Card from './Card';

const useStyles = () => ({
	wrapper: css({
		display: 'grid',
		width: 'auto',
		height: 'auto',
		margin: '10px 10px',
		gridTemplateColumns: '100px 100px 100px 100px 100px',
		gridGap: '5px'
	})
});

const Board = ({cards, handleClick}) => {

	const styles = useStyles();

	return (
		<div css={styles.wrapper} >
			{cards.map((card, i) => (
				<Card key={i} word={card.word} chosen={false} color={card.chosen ? card.colour : 'None'} onClick={() => handleClick(card.word)} />
			))}
		</div>
	)

}

export default Board;