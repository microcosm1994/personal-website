import React, {Component} from 'react'
import {Router, Switch, Link, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {Button, message, Tooltip} from 'antd'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'js-cookie'
import '../css/Login-form.css'
import Logo from '../img/logo20180627-04.png'
import 'antd/lib/button/style/css'
import 'antd/lib/message/style/css'
import 'antd/lib/tooltip/style/css'

const history = createBrowserHistory()

class Login_form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bgStyle: {},
            checked: false,
            data: {
                username: '',
                password: '',
                verify_img: ''
            },
            code_svg: ''
        }
    }

    componentDidMount() {
        this.getcode()
    }

    // 双向数据绑定
    handleChange = (key, event) => {
        let form = this.state.data
        for (let item in this.state.data) {
            if (item === key) {
                form[item] = event.target.value
                this.setState({form: form})
            }
        }
    }
    // 获取图片验证码
    getcode = () => {
        let t = new Date()
        axios.get('/api/users/getcode?type=1&t=' + t.getTime()).then((response) => {
            if (response.data.status === 0) {
                this.setState({code_svg: response.data.data})
            }
        })
    }
    remberLogin = () => {
        this.setState({
            checked: !this.state.checked
        })
    }

    login = () => {
        console.log(this.state.data);
        let data = {
            username: this.state.data.username,
            password: this.state.data.password,
            verify_img: this.state.data.verify_img,
            checked: this.state.checked// 是否保持登录
        }
        let arr = {
            username: '账号',
            password: '密码',
            verify_img: '图片验证码'
        }
        for (let key in data) {
            if (data[key] === '') {
                message.error(arr[key] + '不能为空')
                return false
            }
        }
        //验证验证码是否正确
        axios.get('/api//users/verify_code?type=1&code=' + data.verify_img).then((response) => {
            if (response.data.status === 0) {
                //登录
                data.password = md5(data.password)// 加密密码
                axios.post('/api/users/login', data).then((response) => {
                    if (response.data.status === 0) {
                        let deadline = data.checked ? 30 : 1
                        for (let key in response.data.data) {
                            Cookies.set(key, response.data.data[key], {
                                path: '/',
                                expires: deadline,
                                domain: 'localhost'
                            })
                        }
                        history.push('/admin', { some: 'state' })
                        window.location  = window.location
                    }
                })
            } else {
                message.error('验证码错误，请重试。')
                this.getcode()
            }
        })
    }

    render() {
        const {checked, data, code_svg} = this.state
        return (
            <div>
                <div className='Login-logo'>
                    <img src={Logo} alt=""/>
                </div>
                <div className='Login-des'>
                    <p>个人博客</p>
                </div>
                <div className='Login-form'>
                    <div className='form-input'>
                        <input type="text" value={data.username} placeholder='请输入账号'
                               onChange={this.handleChange.bind(this, 'username')}/>
                    </div>
                    <div className='form-input'>
                        <input type="password" value={data.password} placeholder='请输入密码'
                               onChange={this.handleChange.bind(this, 'password')}/>
                    </div>
                    <div className='form-input'>
                        <input type="text" value={data.verify_img} placeholder='请输验证码'
                               onChange={this.handleChange.bind(this, 'verify_img')}/>

                        <Tooltip placement="top" title='点击更换新的验证码'>
                            <span onClick={this.getcode} dangerouslySetInnerHTML={{__html: code_svg}}></span>
                        </Tooltip>
                    </div>
                    <div className='form-remember'>
                        <div className="form-remember-radio" onClick={this.remberLogin}>
                            <input type="checkbox" checked={checked} name='remember'/>
                            <span>30天内免登录</span>
                        </div>
                    </div>
                    <div className="from-btn" onClick={this.login}>
                        立即登录
                    </div>
                    <div className="container-footer">
                        <Link to='/login/register'>注册</Link>
                        <Link to='/login/find'>找回密码</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login_form