import React, { Component } from 'react';

class FotoAtualizacoes extends Component {
    render(){
        return (
            <section className="fotoAtualizacoes">
              <a href="#" className="fotoAtualizacoes-like">Likar</a>
              <form className="fotoAtualizacoes-form">
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>
            </section>            
        );
    }
}

class FotoInfo extends Component {
    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">

                <a href="#">
                    {
                        this.props.fotoItem.likers.map(liker => {

                            liker.login
                        })
                    }
                </a>

                ,

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
                                    <a className="foto-info-autor">{comentario.login}</a>
                                    {comentario.texto}
                                </li>;
                    })
                }
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={this.props.fotoItem.urlFoto} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <a href="#">
                    {this.props.fotoItem.loginUsuario}
                  </a>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.fotoItem.horario}</time>
            </header>            
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
            <FotoAtualizacoes/>
          </div>            
        );
    }
}