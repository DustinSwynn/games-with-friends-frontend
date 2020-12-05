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
		gridGap: '5px 5px'
	})
});

const AgentMap = ({cards}) => {

	const styles = useStyles();

	return (
		<div css={styles.wrapper} >
			{cards.map((card, i) => (
				<Card key={i} chosen={card.chosen} word={card.word} color={card.colour} onClick={() => null} />
			))}
		</div>
	)

}

export default AgentMap;