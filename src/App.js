import React, { Component } from 'react'
import Search from './components/Search/Search'
import Table from './components/Table/Table'
import UserAdd from './components/userAdd/UserAdd'

class App extends Component {
  state = {
    data: [
      {
        name: 'tret',
        lastName: 'tret',
        patronymic: 'tert',
        email: 'president@mail.ru',
        password: 'president',
        phone: '88005553535',
        status: 'admin',
        creationDate: 'gfd',
        lastChange: 'gdf'
      },
      {
        name: 'tert',
        lastName: 'trete',
        patronymic: 'tret',
        email: 'president@mail.ru',
        password: 'president',
        phone: '88005553535',
        status: 'client',
        creationDate: 'tert',
        lastChange: 'tret'
      },
      {
        name: 'gdf',
        lastName: 'gdfg',
        patronymic: 'dfgdf',
        email: 'nett@mail.ru',
        password: 'president',
        phone: '94735',
        status: 'partner',
        creationDate: 'gdf',
        lastChange: 'gdf'
      }
    ],
    sort: 'asc',
    sortItem: '',
    seachValue: '',
    showModal: false,
    fixUserIndex: '',
    fixUser: null
  }

  componentDidMount() {
    this.handleSort('status')
  }

  compareBy = (key, sort) => {
    return (a, b) => {
      if (sort === 'asc') {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
      } else {
        if (a[key] > b[key]) return -1
        if (a[key] < b[key]) return 1
        return 0
      }
    }
  }

  handleSort = async field => {
    const cloneData = [...this.state.data]
    const data = await cloneData.sort(this.compareBy(field, this.state.sort))
    if (!data) throw new Error('Не получилось загрузить данные')
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    this.setState({
      sort,
      data,
      sortItem: field
    })
  }

  handleSearch = (value) => {
    this.setState({
      seachValue: value
    })
  }

  getSearchData = () => {
    const { data, seachValue } = this.state
    if (!seachValue) return data
    return data.filter(el => {
      return el['email'].toString().toLowerCase().includes(seachValue.toLowerCase()) ||
        el['phone'].toString().toLowerCase().includes(seachValue.toLowerCase())
    })
  }

  modalHandler = newUser => {
    newUser['creationDate'] = this.getDate()
    newUser['lastChange'] = this.getDate()
    let data = [...this.state.data]
    data.unshift(newUser)
    this.setState({
      data,
      showModal: false
    })
  }

  handleSelect = (el, index) => {
    this.setState({
      showModal: true,
      fixUser: el,
      fixUserIndex: index
    })
  }

  handleDelete = () => {
    let arrayCopy = [...this.state.data]
    arrayCopy.splice(this.state.fixUserIndex, 1)
    this.setState({
      data: arrayCopy
    })
    this.handleClose()
  }

  handleChange = (data) => {
    let arrayCopy = [...this.state.data]
    data['lastChange'] = this.getDate()
    arrayCopy[this.state.fixUserIndex] = data
    this.setState({
      data: arrayCopy
    })
    this.handleClose()
  }

  handleClose = () => {
    this.setState({
      showModal: false,
      fixUser: null,
      fixUserIndex: ''
    })
  }

  getDate() {
    const date = new Date()
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = date.getFullYear()
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)
  }

  render() {
    return (
      <div>

        {
          this.state.showModal
            ? <UserAdd
              toggle={this.modalHandler}
              close={this.handleClose}
              user={this.state.fixUser}
              delete={this.handleDelete}
              change={this.handleChange}
            />
            : null
        }

        <Search search={this.handleSearch} />
        <button onClick={() => this.setState({ showModal: true })}>
          Добавить пользователя
        </button>
        <Table
          data={this.getSearchData()}
          sorted={this.handleSort}
          sortItem={this.state.sortItem}
          sortVal={this.state.sort}
          handleSelect={this.handleSelect}
        />

      </div>
    )
  }
}

export default App