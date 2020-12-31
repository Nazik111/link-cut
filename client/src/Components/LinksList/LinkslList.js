import React from 'react'
import {Table} from "semantic-ui-react";
import s from './LinksList.module.css'
import {Link} from 'react-router-dom'


export const LinksList = ({ links }) => {
    if(!links.length) {
        return <p className="noLink" style={{textAlign: 'center', marginTop: '5vh', fontSize:'3vh'}}>There has not been links yet...</p>
    }
    return (
        <div className={s.tableWrapper}>
            <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>№</Table.HeaderCell>
                        <Table.HeaderCell>Your</Table.HeaderCell>
                        <Table.HeaderCell>Shorten</Table.HeaderCell>
                        <Table.HeaderCell>Open</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {   links.map((link, index) => {
                        return (
                    <Table.Row key={link._id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{link.from}</Table.Cell>
                        <Table.Cell>{link.to}</Table.Cell>
                        <Table.Cell>
                        <Link to={`/detail/${link._id}`}>Open</Link>
                        </Table.Cell>
                    </Table.Row>
                        )
                    })}

                </Table.Body>
            </Table>
        </div>
        </div>
    )
}