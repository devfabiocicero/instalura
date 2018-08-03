
export default class TimelineApi {

    static lista(urlPerfil) {

        return dispatch => {

            fetch(urlPerfil)

                .then(response => response.json())
                .then(fotos => {

                    dispatch({ type: 'LISTAGEM', fotos });
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
                    dispatch({ type: 'LIKE', fotoId, liker })
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
                    dispatch({ type: 'COMENTARIO', fotoId, comentario });
                    return comentario;
                })
        }
    }
}