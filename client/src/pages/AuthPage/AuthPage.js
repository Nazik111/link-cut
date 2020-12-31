import React, {useContext, useEffect, useState} from 'react'
import {Button, Form, Input, Segment} from "semantic-ui-react";
import s from '../AuthPage/AuthPage.module.css'
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {AuthContext} from "../../context/AuthContext";
export const AuthPage = () => {
const message = useMessage()
    const auth = useContext(AuthContext)
    const {loading,  request, clearError, error} = useHttp()
    const [form, setForm] = useState({
        email:'', password: ''
    })

    useEffect(()=> {
message(error)
clearError()
    }, [error,message,clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

const registerHandler = async () => {
    try {
        const data = await request('/api/auth/register', 'POST', {...form})
        message(data.message)
    } catch (e) {}
}

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }


    return (
        <div className={s.auth_wrapper}>
            <div/>
            <div className={s.item1}>
            <Segment placeholder>
                <Form>
                   <Form.Field>
                    <label htmlFor="email">Email</label>
                    <Input
                        placeholder='Enter an email'
                        id='email'
                        type='text'
                        name='email'
                        onChange={changeHandler}
                        value={form.email}
                    />
                </Form.Field>
                <Form.Field>

                    <label htmlFor="password">Password</label>
                    <Input
                        placeholder='Enter a password'
                        id='password'
                        type='password'
                        name='password'
                        value={form.password}
                        onChange={changeHandler}
                    />
                </Form.Field>
                <div className='s.card-action'>
                    <Button  disabled={loading} color='blue' onClick={loginHandler}>
Login
                    </Button>
                    <Button onClick={registerHandler} disabled={loading} color='green'>
                        Register
                    </Button>
                </div>
                </Form>
            </Segment>
            </div>
        </div>
    )
}