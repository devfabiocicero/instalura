
import React, { Component } from 'react';
import Foto from './Foto';
import PubSub from 'pubsub-js';
import ReactCSSTransitionGroup from 'react-transition-group/TransitionGroup'; 

export default class Timeline extends Component {

    constructor(props) {

        super(props);
        this.state = {fotosLista: []};
        this.login = this.props.login;
    }

    componentWillMount() {

        PubSub.subscribe('timeline', (topico, fotos) => {

            this.setState({fotosLista: fotos});
        });

        PubSub.subscribe('atualiza-likers', (topico, infoLiker) => {

            const fotoAchada = this.state.fotosLista.find(foto => foto.id === infoLiker.fotoId);

            const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login);
            
            if(possivelLiker === undefined) {

                fotoAchada.push(infoLiker.liker);
            } else {

                fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
            }

            fotoAchada.likeada = !fotoAchada.likeada;
            
            this.setState({fotosLista: this.state.fotosLista});
        });

        PubSub.subscribe('novosComentarios', (topico, infoComentario) => {

            const fotoAchada = this.state.fotosLista.find(foto => foto.id === infoComentario.fotoId);

            fotoAchada.comentarios.push(infoComentario.comentario);
            this.setState({fotosLista: this.state.fotosLista});
        });
    }

    componentDidMount() {

        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }
    
    carregaFotos() {

        let urlPerfil;

        if(this.login === undefined) {

            urlPerfil = `https://instalura-api.herokuapp.com//api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {

            urlPerfil = `https://instalura-api.herokuapp.com//api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)

            .then(response => response.json())
            .then(fotosLista => {

                this.setState({fotosLista: fotosLista})
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

                PubSub.publish('atualiza-likers', {fotoId, liker});
            })
    }

    processaComentario(fotoId, comentario) {

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

                PubSub.publish('novosComentarios', {fotoId, comentario});
            })
    }

    render() {
        return(
            <div className="fotos container">
                {/* <ReactCSSTransitionGroup
                    classNames="timeline"
                    timeout={{ exit: 300, enter: 500 }}> */}

                    {
                        this.state.fotosLista.map(fotoItem => {

                            return (
                                <Foto key={fotoItem.id} fotoItem={fotoItem} like={this.like} processaComentario={this.processaComentario} />
                            );
                        })
                    }   
                {/* </ReactCSSTransitionGroup>+++++++++++++++ */}
            </div>
        );
    }
}