
import PubSub from 'pubsub-js';

export default class logicaTimeline {

    constructor(fotos) {

        this.fotosLista = fotos;
    }

    lista(urlPerfil) {

        fetch(urlPerfil)

            .then(response => response.json())
            .then(fotosLista => {

                this.fotosLista = fotosLista;
                PubSub.publish('timeline', fotosLista);
            });
    }

    like(fotoId) {

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

                    const fotoAchada = this.fotosLista.find(foto => foto.id === fotoId);

                    const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);
                    
                    if(possivelLiker === undefined) {

                        fotoAchada.likers.push(liker);
                    } else {

                        fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    }

                    fotoAchada.likeada = !fotoAchada.likeada;
                    
                    PubSub.publish('timeline', this.fotosLista);
                })
    }

    comentario(fotoId, comentario) {

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
                const fotoAchada = this.fotosLista.find(foto => foto.id === fotoId);
                fotoAchada.comentarios.push(comentario);
                PubSub.publish('timeline', this.fotosLista);
            })
    }

    subscribe(callback) {

        PubSub.subscribe('timeline', (topico, fotos) => {

            callback(fotos);
        });
    }
}