
import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Header extends Component {

    pesquisa(ev) {

        ev.preventDefault();
        fetch(`https://instalura-api.herokuapp.com//api/public/fotos/${this.loginPesquisado.value}`)

            .then(response =>{

                if(response.ok) {

                    return response.json();
                } else {

                    throw new Error('Não foi possível pesquisar o usuário');
                }
            })

            .then(fotos => {
                
                PubSub.publish('timeline', fotos);
            });
    }
    
    render() {
        return(
            <header className="header container">
                <h1 className="header-logo">
                Instalura
                </h1>

                <form onSubmit={this.pesquisa.bind(this)} className="header-busca">
                <input ref={input => this.loginPesquisado = input} type="text" name="search" placeholder="Pesquisa" className="header-busca-campo"/>
                <input type="submit" value="Buscar" className="header-busca-submit"/>
                </form>


                <nav>
                <ul className="header-nav">
                    <li className="header-nav-item">
                    <a href="#">
                        ♡
                        {/*                 ♥ */}
                        {/* Quem deu like nas minhas fotos */}
                    </a>
                    </li>
                </ul>
                </nav>
            </header>
        );
    }
}