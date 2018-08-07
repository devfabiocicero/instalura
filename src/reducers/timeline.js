import { List } from 'immutable';

export function timeline(state = new List(), action) {

	if (action.type === 'LISTAGEM') {
		return action.fotos;
	}

	if(action.type === 'COMENTARIO') {
		const fotoEstadoAntigo = state.find(foto => foto.id === action.fotoId);

		const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.comentario);

		const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, { comentarios: novosComentarios });

		const fotoIndex = state.findIndex(foto => foto.id === action.fotoId);

		const novaListaFotos = state.set(fotoIndex, fotoEstadoNovo);

		return novaListaFotos;
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