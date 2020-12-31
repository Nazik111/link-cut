import React, {useContext, useState, useEffect} from 'react'
import {useHttp} from "../../hooks/http.hook";
import 'materialize-css'
import {AuthContext} from "../../context/AuthContext";
import {Input, Label} from "semantic-ui-react";
import s from "./Createpage.module.css"
import {useHistory} from "react-router";
export const CreatePage = () => {

   const history  = useHistory()
const auth = useContext(AuthContext)

     useEffect (() => {
    window.M.updateTextFields()},[])

    const{request} = useHttp()
const [link, setLink] = useState('')

  const pressHandler = async event => {
      if (event.key === 'Enter') {
          
          try {
            const data = await request('/api/link/generate', 'POST', {from: link}, {
                Authorization: `Bearer ${auth.token}`
            })
              console.log('Data',data)
history.push(`/detail/${data.link._id}`)

          }catch (e) {
              
          }
          
      }
  }

    return (
        <div className={s.create_wrapper}>
            <h1>Cut your link</h1>
                    <div className={s.input_field}>

                        <Input
                            label='Enter the link'
                        placeholder='Enter the link'
                        id='link'
                        type='text'
                        value={link}
                        onChange={e=>setLink(e.target.value)}
                        onKeyPress={pressHandler}
                        className={s.Link}
                        />

                    </div>
                </div>


    )
}