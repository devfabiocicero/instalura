export function timeline(state = [], action) {

	if (action.type === 'LISTAGEM') {

		console.log('entrou na listagem');
		return action.fotos;
	}

	return state;
}