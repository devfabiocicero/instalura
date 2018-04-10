import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

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

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">

                    {
                        this.props.fotoItem.likers.map((liker, index) => {

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
                    this.props.fotoItem.comentarios.map(comentario => {

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

    like(ev) {

        ev.preventDefault();

        this.props.like(this.props.fotoItem.id);
    }

    processaComentario(ev) {
        
        ev.preventDefault();

        this.props.processaComentario(this.props.fotoItem.id, this.comentario.value);
        this.comentario.value = '';
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} href="#" className={this.props.fotoItem.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>Likar</a>
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
            <FotoAtualizacoes fotoItem={this.props.fotoItem} like={this.props.like} processaComentario={this.props.processaComentario} />
          </div>            
        );
    }
}