import React from 'react'
import s from './LinkCard.module.css'
export const LinkCard = ({link}) => {
return (
    <div className={s.cardWrapper}>

        <div className={s.block_link}>
            <h1 className={s.header_link}>Link</h1>
        <p>Your link: <a href={link.to} target='_blank' rel="noopener noreferrer"> {link.to}</a></p>
        <p>From: <a href={link.from} target='_blank' rel="noopener noreferrer"> {link.from}</a></p>
        <p>Number of clicks: <strong>{link.clicks}</strong></p>
        <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    </div>
)
}