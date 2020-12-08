import React, { Component } from 'react'

class Search extends Component {

    state = {
        value: ''
    }

    onChangeHandler = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return (
            <div className="input-group mb-3" style={{ marginTop: '1rem' }}>
                <div className="input-group-prepend">
                    <button onClick={() => this.props.search(this.state.value)} className="btn btn-dark" id="inputGroup-sizing-default">Search</button>
                </div>
                <input placeholder='Поиск по почте и номеру телефона' type="text" value={this.state.value} onChange={event => this.onChangeHandler(event)} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
        )
    }
}

export default Search
