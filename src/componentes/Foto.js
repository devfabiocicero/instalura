import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import PubSub from 'pubsub-js';

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.fotoItem.urlFoto} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <NavLink to={`/timeline/${this.props.fotoItem.loginUsuario}`}>
                    {this.props.fotoItem.loginUsuario}
                  </NavLink>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.fotoItem.horario}</time>
            </header>            
        );
    }
}

class FotoInfo extends Component {

    constructor(props) {

        super(props);
        this.state = {likers: this.props.fotoItem.likers, comentarios: this.props.fotoItem.comentarios};
    }

    componentWillMount() {

        PubSub.subscribe('atualiza-likers', (topico, infoLiker) => {

            if(this.props.fotoItem.id === infoLiker.fotoId) {

                const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
                
                if(possivelLiker === undefined) {

                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({likers: novosLikers});
                } else {

                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({likers: novosLikers});
                }
            }
        });

        PubSub.subscribe('novosComentarios', (topico, infoComentario) => {

            if(this.props.fotoItem.id === infoComentario.fotoId) {

                const novosComentarios = this.state.comentarios.concat(infoComentario.comentario);
                this.setState({comentarios: novosComentarios});
            }
        });
    }

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">

                    {
                        this.state.likers.map((liker, index) => {

                            return(
                                <NavLink key={index} to={`/timeline/${liker.login}`}>
                                    {liker.login}, 
                                </NavLink>
                            )
                        })
                    }


                 curtiram
             
              </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">Autor da Foto </a>
                {this.props.fotoItem.comentario}
              </p>

              <ul className="foto-info-comentarios">
                {
                    this.state.comentarios.map(comentario => {

                        return <li key={comentario.id} className="comentario">
                                    <NavLink to={`/timeline/${comentario.login}`} className="foto-info-autor">{comentario.login}</NavLink>
                                    {comentario.texto}
                                </li>;
                    })
                }
              </ul>
            </div>            
        );
    }
}

class FotoAtualizacoes extends Component {

    constructor(props) {

        super(props);
        this.state = {likeada: this.props.fotoItem.likeada};
    }


    like(ev) {

        ev.preventDefault();

        fetch(`https://instalura-api.herokuapp.com//api/fotos/${this.props.fotoItem.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
        
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

                this.setState({likeada: !this.state.likeada});
                PubSub.publish('atualiza-likers', {fotoId: this.props.fotoItem.id, liker});
            })
    }

    processaComentario(ev) {
        
        ev.preventDefault();

        const requestInfo = {

            method: 'POST',
            body: JSON.stringify({texto: this.comentario.value}),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch(`https://instalura-api.herokuapp.com//api/fotos/${this.props.fotoItem.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)

            .then(response => {

                if(response.ok) {

                    return response.json();
                } else {

                    throw new Error('Não foi possível comentar');
                }
            })

            .then(comentario => {

                PubSub.publish('novosComentarios', {fotoId: this.props.fotoItem.id, comentario});
            })
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} href="#" className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
              <form onSubmit={this.processaComentario.bind(this)} className="fotoAtualizacoes-form">
                <input ref={input => this.comentario = input} type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>
            </section>            
        );
    }
}

export default class Foto extends Component {
    render(){
        return (
          <div className="foto">
            <FotoHeader fotoItem={this.props.fotoItem} />
            <img alt="foto" className="foto-src" src="https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2"/>
            <FotoInfo fotoItem={this.props.fotoItem} />
            <FotoAtualizacoes fotoItem={this.props.fotoItem} />
          </div>            
        );
    }
}