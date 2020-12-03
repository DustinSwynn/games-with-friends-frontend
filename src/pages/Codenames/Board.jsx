// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { A200 } from '@material-ui/core/colors';
import Card from './Card';

const useStyles = (color) => ({
	wrapper: css({
		backgroundColor: 'gray',
		border: '4px solid black',
		width: '500px',
		height: '250px',
		margin: '0 auto',
		display: 'grid',
		gridTemplate: 'repeat(5, 1fr) / repeat(5, 1fr)'
	})
});

const Board = ({cards, onClick}) => {

	const styles = useStyles();

	return (
		<div>
			{cards.map((card, i) => (
				<Card key={i} word={card.word} color={card.color == 'None' ? A200 : card.color} onClick={() => onClick()} />
			))}
		</div>
	)

}