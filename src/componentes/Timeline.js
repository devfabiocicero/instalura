
import React, { Component } from 'react';
import Foto from './Foto';
import ReactCSSTransitionGroup from 'react-transition-group/TransitionGroup';
import TimelineApi from '../logicas/TimelineApi';

export default class Timeline extends Component {

	constructor(props) {

		super(props);
		this.state = { fotosLista: [] };
		this.login = this.props.login;
	}

	componentWillMount() {

		this.props.store.subscribe(() => {

			this.setState({ fotosLista: this.props.store.getState() });
		});
	}

	componentDidMount() {

		this.carregaFotos();
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.login !== undefined) {
			this.login = nextProps.login;
			this.carregaFotos();
		}
	}

	carregaFotos() {

		let urlPerfil;

		if (this.login === undefined) {

			urlPerfil = `https://instalura-api.herokuapp.com//api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
		} else {

			urlPerfil = `https://instalura-api.herokuapp.com//api/public/fotos/${this.login}`;
		}

		this.props.store.dispatch(TimelineApi.lista(urlPerfil));
	}

	like(fotoId) {

		this.props.store.dispatch(TimelineApi.like(fotoId));
	}

	processaComentario(fotoId, comentario) {

		this.props.store.dispatch(TimelineApi.comentario(fotoId, comentario));
	}

	render() {
		return (
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