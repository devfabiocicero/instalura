
import React, { Component } from 'react';
import Foto from './Foto';

export default class Timeline extends Component {

    constructor(props) {

        super(props);
        this.state = {fotosLista: []};
        this.login = this.props.login;
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

    render() {
        return(
            <div className="fotos container">
                {
                    this.state.fotosLista.map(fotoItem => {

                        return (
                            <Foto key={fotoItem.id} fotoItem={fotoItem} />
                        );
                    })
                }
            </div>
        );
    }
}