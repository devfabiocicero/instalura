
import React, { Component } from 'react';
import Foto from './Foto';
import ReactCSSTransitionGroup from 'react-transition-group/TransitionGroup'; 

export default class Timeline extends Component {

    constructor(props) {

        super(props);
        this.state = {fotosLista: []};
        this.login = this.props.login;
    }

    componentWillMount() {

        this.props.store.subscribe(() => {

            this.setState({fotosLista: this.props.store.getState()});
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

        const listaFixa = [{"urlPerfil":"https://instagram.fcgh9-1.fna.fbcdn.net/vp/960227fa1524bee9e36610f8da71889c/5B6F42E1/t51.2885-19/11199408_569104449895751_1837574990_a.jpg","loginUsuario":"alots","horario":"23/04/2018 19:33","urlFoto":"https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2","id":1,"likeada":false,"likers":[],"comentarios":[],"comentario":"comentario da foto"},{"urlPerfil":"https://instagram.fcgh9-1.fna.fbcdn.net/vp/960227fa1524bee9e36610f8da71889c/5B6F42E1/t51.2885-19/11199408_569104449895751_1837574990_a.jpg","loginUsuario":"alots","horario":"23/04/2018 19:33","urlFoto":"https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2","id":2,"likeada":false,"likers":[],"comentarios":[],"comentario":"comentario da foto"}];

        this.props.store.dispatch({type: 'LISTAGEM', fotos: listaFixa});   

        // this.props.store.lista(urlPerfil);
    }

    like(fotoId) {

        // this.props.store.like(fotoId);
    }

    processaComentario(fotoId, comentario) {

        // this.props.store.comentario(fotoId, comentario);
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
                                <Foto key={fotoItem.id} fotoItem={fotoItem} like={this.like.bind(this)} processaComentario={this.processaComentario.bind(this)} />
                            );
                        })
                    }   
                {/* </ReactCSSTransitionGroup>+++++++++++++++ */}
            </div>
        );
    }
}