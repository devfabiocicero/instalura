
import React, { Component } from 'react';
import Foto from './Foto';
import ReactCSSTransitionGroup from 'react-transition-group/TransitionGroup';
import TimelineApi from '../logicas/TimelineApi';
import { connect } from 'react-redux';

class Timeline extends Component {

	constructor(props) {

		super(props);
		this.login = this.props.login;
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

		this.props.lista(urlPerfil);
	}

	processaComentario(fotoId, comentario) {

		this.props.comenta(fotoId, comentario);
	}

	render() {
		return (
			<div className="fotos container">
				{
					this.state.fotosLista.map(fotoItem => {

						return (
							<Foto key={fotoItem.id} fotoItem={fotoItem} like={this.props.like} processaComentario={this.props.comenta} />
						);
					})
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { fotos: state.timeline };
};

const mapDispatchToProps = dispatch => {
	return {
		like: fotoId => {
			dispatch(TimelineApi.like(fotoId));
		},
		comenta: (fotoId, comentario) => {
			dispatch(TimelineApi.comentario(fotoId, comentario));
		},
		lista: urlPerfil => dispatch(TimelineApi.lista(urlPerfil)),
	};
};

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;