
import React, { Component } from 'react';
import Foto from './Foto';
import {Redirect} from 'react-router-dom';

export default class Timeline extends Component {

    constructor() {

        super();
        this.state = {fotosLista: []};
    }

    componentDidMount() {

        fetch(`https://instalura-api.herokuapp.com//api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)

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
                            <Foto fotoItem={fotoItem} />
                        );
                    })
                }
            </div>
        );
    }
}