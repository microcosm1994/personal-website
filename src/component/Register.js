import React, {Component} from 'react'
import {Router, Switch, Link, Route} from 'react-router-dom'
import {Button, message} from 'antd'
import {createBrowserHistory} from 'history'
import axios from 'axios'
import Logo from '../img/logo20180627-04.png'
import '../css/Register.css'
import 'antd/lib/button/style/css'
import 'antd/lib/message/style/css'
const history = createBrowserHistory()

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            form: {
                invite: '',
                nickname: '',
                username: '',
                password: '',
                password_test: '',
                verify_img: ''
            },
            verify_email: '',
            error: {
                status: {display: 'none'},
                message: '昵称不能为空'
            },
            form_style: {
                display: 'block'
            },
            verify_style: {
                display: 'none'
            },
            code: {
              data: '',
              text: ''
            },
            loading: false
        }
        this.getcode()
    }
    handleChange = (key, event) => {
        let form = this.state.form
        for (let item in this.state.form) {
            if (item === key) {
                form[item] = event.target.value
                this.setState({form: form})
            }
        }
    }
    handleRegister = () => {
        let flag = true
        let form = {
            invite: '',
            nickname: '',
            username: '',
            password: '',
        }
        let keyvalue = ''
        for (let item in this.state.form){
            if(this.state.form[item] === '') {
                flag = false
                keyvalue = item
                break
            }
        }
        if (flag) {
            this.setState({
                error: {
                    status: {display: 'none'},
                    message: ''
                }
            })
            for (let key in form) {
                for (let key2 in this.state.form) {
                    if (key === key2) {
                        form[key] = this.state.form[key2]
                    }
                }
            }
            this.setState({form_style: {display: 'none'}})
            this.setState({verify_style: {display: 'block'}})
            console.log(form);
        } else{
            let arr = {
                invite: '邀请码',
                nickname: '昵称',
                username: '邮箱地址',
                password: '密码',
                password_test: '确认密码',
                verify_img: '图片验证码'
            }
            this.setState({
                error: {
                    status: {display: 'block'},
                    message: arr[keyvalue] + '不能为空'
                }
            })
        }
    }
    enterLoading = () => {
        this.setState({ loading: true });
    }
    verifyBack = () => {
        this.setState({form_style: {display: 'block'}})
        this.setState({verify_style: {display: 'none'}})
    }
    // 获取图片验证码
    getcode = () => {
        let t = new Date()
        axios.get('/api/users/code?t=' + t.getTime()).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                this.setState({
                    code: {
                        data: response.data.data,
                        text: response.data.text
                    }
                })
            }
        })
    }
    render() {
        const {error, form, code} = this.state
        return(
            <div className='Register'>
                <div className='Register-logo'>
                    <img src={Logo} alt=""/>
                </div>
                <div className='Register-des'>
                    <p>个人博客</p>
                </div>
                <div className='Register-form' style={this.state.form_style}>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入邀请码' value={form.invite} onChange={this.handleChange.bind(this, 'invite')}/>
                    </div>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入昵称' value={form.nickname} onChange={this.handleChange.bind(this, 'nickname')}/>
                    </div>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入邮箱地址' value={form.username} onChange={this.handleChange.bind(this, 'username')}/>
                    </div>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入图片验证码' value={form.verify_img} onChange={this.handleChange.bind(this, 'verify_img')}/>
                        <span onClick={this.getcode} dangerouslySetInnerHTML={{__html: code.data}}></span>
                    </div>
                    <div className='form-input'>
                        <input type="password" placeholder='请输入密码' value={form.password} onChange={this.handleChange.bind(this, 'password')}/>
                    </div>
                    <div className='form-input'>
                        <input type="password" placeholder='请确认密码' value={form.password_test} onChange={this.handleChange.bind(this, 'password_test')}/>
                    </div>
                    <div className="from-error" style={error.status}>
                        <p>{error.message}</p>
                    </div>
                    <div className="from-btn" onClick={this.handleRegister}>
                        立即注册
                    </div>
                    <div className="container-footer">
                        <Link to='/login'>返回登录</Link>
                        <Link to='/login/find'>找回密码</Link>
                    </div>
                </div>
                <div className='Register-verify' style={this.state.verify_style}>
                    <div className='verify-input'>
                        <input type="text" placeholder='请输入邮箱验证码'/>
                        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                            获取验证码
                        </Button>
                    </div>
                    <div className='verify-btn'>
                        确认
                    </div>
                    <div className='verify-back' onClick={this.verifyBack}>返回重新填写注册信息</div>
                </div>
            </div>
        )
    }
}

export default Register