import { like, lista, comenta } from '../actions/actionCreator';

export default class TimelineApi {

    static lista(urlPerfil) {

        return dispatch => {

            fetch(urlPerfil)

                .then(response => response.json())
                .then(fotos => {

                    dispatch(lista(fotos));
                    return fotos;
                });
        }
    }

    static like(fotoId) {

        return dispatch => {

            fetch(`https://instalura-api.herokuapp.com//api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
                
                {
                    method: 'POST'
                })
                
                .then(response => {
                    
                    if(response.ok) {
                        
                        return response.json();
                    }
                    
                    else {
                        
                        throw new Error('Não foi possível realizar o like da foto')
                    }
                })

                .then(liker => {    
                    dispatch(like(fotoId, liker));
                    return liker;
                })
        }
    }

    static comentario(fotoId, comentario) {

        return dispatch => {

            const requestInfo = {

                method: 'POST',
                body: JSON.stringify({texto: comentario}),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };

            fetch(`https://instalura-api.herokuapp.com//api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)

                .then(response => {

                    if(response.ok) {

                        return response.json();
                    } else {

                        throw new Error('Não foi possível comentar');
                    }
                })

                .then(comentario => {
                    dispatch(comenta(fotoId, comentario));
                    return comentario;
                })
        }
    }

    static pesquisa(login) {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com//api/public/fotos/${login}`)

                .then(response =>{

                    if(response.ok) {

                        return response.json();
                    } else {

                        throw new Error('Não foi possível pesquisar o usuário');
                    }
                })

                .then(fotos => {
                    
                    if(fotos.length === 0) {
                        dispatch({ type: 'ALERT', msg: 'Usuário não encontrado!' });
                    } else {
                        dispatch({ type: 'ALERT', msg: '' });
                    }

                    dispatch({ type: 'LISTAGEM', fotos });
                })

                .catch(() => dispatch({ type: 'ALERT', msg: 'Usuário não encontrado!' }));
        }
    }
}