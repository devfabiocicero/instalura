
import React, { Component } from 'react';
import TimelineApi from '../logicas/TimelineApi';

export default class Header extends Component {

    constructor() {
        super();
        this.state = { msg: '' };
    }

    componentDidMount() {
        this.props.store.subscribe(() => {
            this.setState({ msg: this.props.store.getState().header });
        });
    }

    pesquisa(ev) {

        ev.preventDefault();
        console.log(this.loginPesquisado.value);
        this.props.store.dispatch(TimelineApi.pesquisa(this.loginPesquisado.value));
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
                <span>{this.state.msg}</span>
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