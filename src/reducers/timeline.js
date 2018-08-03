export function timeline(state = [], action) {

	if (action.type === 'LISTAGEM') {
		return action.fotos;
	}

	if(action.type === 'COMENTARIO') {
		const fotoAchada = state.find(foto => foto.id === action.fotoId);
		fotoAchada.comentarios.push(action.comentario);
	}

	if(action.type === 'LIKE') {
		const { liker } = action;
		const fotoAchada = state.find(foto => foto.id === action.fotoId);
		const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);
		
		if(possivelLiker === undefined) {

			fotoAchada.likers.push(liker);
		} else {

			fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
		}

		fotoAchada.likeada = !fotoAchada.likeada;

		return state;
	}

	return state;
}