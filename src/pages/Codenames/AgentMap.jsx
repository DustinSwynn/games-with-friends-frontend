// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Card from './Card';

const useStyles = () => ({
	wrapper: css({
		display: 'grid',
		width: '500px',
		height: '250px',
		margin: '0 auto',
		gridTemplateColumns: 'auto auto auto auto auto',
		gridGap: '5px'
	})
});

const AgentMap = ({cards}) => {

	const styles = useStyles();

	return (
		<div css={styles.wrapper} >
			{cards.map((card, i) => (
				<Card key={i} word={card.type} color={card.colour === 'None' ? 'WhiteSmoke' : card.colour} onClick={() => null} />
			))}
		</div>
	)

}

export default AgentMap;