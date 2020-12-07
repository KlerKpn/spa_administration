import React, { Component } from 'react'
import './UserAdd.css'
import { isValid, lastValue } from './../validation/validation'

class UserAdd extends Component {

    state = {
        disabled: true,
        data: {
            name: '',
            lastName: '',
            patronymic: '',
            email: '',
            password: '',
            phone: '',
            status: '',
            creationDate: ''
        }
    }

    handleChange = (target, value) => {
        let arrayCopy = { ...this.state.data }
        console.log(this.state.data)
        arrayCopy[target] = value
        arrayCopy['creationDate'] = this.state.data.creationDate
        this.setState({ data: arrayCopy })

        let toggle = Object.entries(arrayCopy).every(([key, value]) => { return isValid(key, value) })
        toggle ? this.setState({ disabled: false }) : this.setState({ disabled: true })

        if (lastValue) {
            document.querySelector(`[data-tag="name"]`).style.border = ''
            document.querySelector(`[data-tag="lastName"]`).style.border = ''
            document.querySelector(`[data-tag="patronymic"]`).style.border = ''
            document.querySelector(`[data-tag="email"]`).style.border = ''
            document.querySelector(`[data-tag="password"]`).style.border = ''
            document.querySelector(`[data-tag="phone"]`).style.border = ''
            document.querySelector(`[data-tag="status"]`).style.border = '  '
            if(lastValue !== 'creationDate'){
                document.querySelector(`[data-tag="${lastValue}"]`).style.border = '2px solid red'
            }
        } 
    }

    clearState = () => {
        this.setState({
            disabled: true,
            data: {
                name: '',
                lastName: '',
                patronymic: '',
                email: '',
                password: '',
                phone: '',
                status: '',
                creationDate: '',
            }
        })
    }

    componentDidMount() {
        if (this.props.user) {
            const el = this.props.user
            this.setState({
                data: {
                    name: el.name,
                    lastName: el.lastName,
                    patronymic: el.patronymic,
                    email: el.email,
                    password: el.password,
                    phone: el.phone,
                    status: el.status,
                    creationDate: el.creationDate
                }
            })
        }
    }

    render() {

        return (
            <div className='wrapper'>
                <div className='UserAdd'>
                    <div>
                        <div className='name'>
                            firstName
                        </div>
                        <input type='text' value={this.state.data.name} data-tag='name' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            lastName
                        </div>
                        <input type='text' value={this.state.data.lastName} data-tag='lastName' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            patronymic
                        </div>

                        <input type='text' data-tag='patronymic' value={this.state.data.patronymic} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            email
                        </div>
                        <input type='email' value={this.state.data.email} data-tag='email' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            phone
                        </div>
                        <input data-tag='phone' type='number' value={this.state.data.phone} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>

                    <div>
                        <div className='name'>
                            password
                        </div>
                        <input data-tag='password' type='text' value={this.state.data.password} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>

                    <div>
                        <div className='name'>
                            status
                        </div>
                        <select data-tag='status' value={this.state.data.status} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)}>
                            <option value='null' hidden=''>Выберите статус</option>
                            <option value="client">client</option>
                            <option value="partner">partner</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <div style={{ paddingTop: '20px' }}>
                        <button
                            style={{ marginRight: '5px' }}
                            className='btn btn-dark'
                            onClick={() => { this.props.close(); this.clearState() }}
                        >
                            Отмена
                        </button>

                        {
                            this.props.user
                                ?
                                <>
                                    <button
                                        style={{ marginRight: '5px' }}
                                        className='btn btn-danger'
                                        onClick={() => { this.props.delete(); this.clearState() }}
                                    >
                                        Удалить
                                    </button>
                                    <button
                                        className='btn btn-primary'
                                        disabled={this.state.disabled}
                                        onClick={() => { this.props.change(this.state.data); this.clearState() }}
                                    >
                                        Сохранить
                                    </button>
                                </>
                                : <button
                                    className='btn btn-primary'
                                    disabled={this.state.disabled}
                                    onClick={() => { this.props.toggle(this.state.data); this.clearState() }}
                                >
                                    Добавить в таблицу
                                </button>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default UserAdd