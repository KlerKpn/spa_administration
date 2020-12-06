import React from 'react'


const Table = props => {

    function arrSort(sortVal) {
        if (sortVal === 'desc') {
            return (<i className="fas fa-sort-down" />)
        } else {
            return (<i className="fas fa-sort-up" />)
        }
    }

 

    return (
        <div style={{ overflowX: 'auto', width: "100%" }}>
            <table className='table' >
                <thead>
                    <tr style={{ userSelect: "none" }}>
                        <th>fullName</th>
                        <th >email</th>
                        <th >password</th>
                        <th >phone</th>
                        <th onClick={() => props.sorted('status')}>status {props.sortItem === 'status' ? arrSort(props.sortVal) : null}</th>
                        <th>creationDate</th>
                        <th >lastChange</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.data.map((el, index) => {
                            const id = Math.random()
                            return (
                                <tr key={id} onClick={() => props.handleSelect(el, index)}>
                                    <td>{el.name} {el.lastName} {el.patronymic}</td>
                                    <td>{el.email}</td>
                                    <td>{el.password}</td>
                                    <td>{el.phone}</td>
                                    <td>{el.status}</td>
                                    <td>{el.creationDate}</td>
                                    <td>{el.lastChange}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table