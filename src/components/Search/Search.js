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
            <div>
                <button onClick={() => this.props.search(this.state.value)}>
                    Search
                </button>
                <input value={this.state.value} onChange={event => this.onChangeHandler(event)} />
            </div>
        )
    }
}

export default Search
