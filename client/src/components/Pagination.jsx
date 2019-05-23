import React, { Component } from 'react'

export default class Pagination extends Component {
    state = {
        pagination: {
            pages: Math.ceil(Number(this.props.total) / this.props.limit)
        }
    }

    render() {
        const { currentPage } = this.props.pagination;
        const backBtn = (currentPage > 1) ? <button type="button" onClick={this.props.previousPage} className="btn btn-success mr-2">&laquo; Anterior</button> : null;
        
        const { pages } = this.state.pagination;
        const nextBtn = (currentPage !== pages) ? <button type="button" onClick={this.props.nextPage} className="btn btn-success mr-2">Siguiente &raquo;</button> : null;

        return (
        <div className="mt-5 d-flex justify-content-center">
            { backBtn }
            { nextBtn }
        </div>
        )
    }
}
