import React, {Component} from 'react'
import {Router, Switch, Link, Route} from 'react-router-dom'
import {Button, message, Tooltip} from 'antd'
import {createBrowserHistory} from 'history'
import axios from 'axios'
import md5 from 'md5'
import Logo from '../img/logo20180627-04.png'
import '../css/Register.css'
import 'antd/lib/button/style/css'
import 'antd/lib/message/style/css'
import 'antd/lib/tooltip/style/css'

const history = createBrowserHistory()

class Register extends Component {
    constructor(props) {
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
                message: ''
            },
            form_style: {
                display: 'block'
            },
            verify_style: {
                display: 'none'
            },
            email_code: '',
            code_svg: '',
            loading: false,
            countdown: '获取验证码'
        }
    }

    componentDidMount() {
        this.getcode()
    }

    // 数据双向绑定
    handleChange = (key, event) => {
        let form = this.state.form
        for (let item in this.state.form) {
            if (item === key) {
                form[item] = event.target.value
                this.setState({form: form})
            }
        }
    }
    // 邮箱验证码双向绑定
    emailChange = (event) => {
        this.setState({
            email_code: event.target.value
        })
    }
    // 保存表单、验证账号唯一
    handleForm = () => {
        let form = this.state.form
        let arr = {
            invite: '邀请码',
            nickname: '昵称',
            username: '邮箱地址',
            password: '密码',
            password_test: '确认密码',
            verify_img: '图片验证码'
        }
        // 验证表单是否为空
        for (let item in form) {
            if (form[item] === '') {
                this.setState({
                    error: {
                        status: {display: 'block'},
                        message: arr[item] + '不能为空'
                    }
                })
                return false
            }
        }
        // 验证邮箱格式
        if (form.username.indexOf('@') === -1) {
            this.setState({
                error: {
                    status: {display: 'block'},
                    message: '邮箱格式不正确'
                }
            })
            return false
        }
        // 验证密码
        if (form.password.length > 5 && form.password.length < 31) {
            if (form.password !== form.password_test) {
                this.setState({
                    error: {
                        status: {display: 'block'},
                        message: '俩次输入的密码不一样，请重新输入。'
                    }
                })
                return false
            }
        } else {
            this.setState({
                error: {
                    status: {display: 'block'},
                    message: '密码长度保持在6-30之间'
                }
            })
            return false
        }
        // 验证图片验证码是否正确
        axios.get('/api//users/verify_code?code=' + this.state.form.verify_img).then((response) => {
            if (response.data.status === 0) {
                // 验证邮箱是否可被注册
                axios.get('/api/users/validate?username=' + this.state.form.username).then((response) => {
                    if (response.data.status === 0) {
                        this.setState({
                            error: {
                                status: {display: 'none'},
                                message: ''
                            }
                        })
                        this.setState({form_style: {display: 'none'}})
                        this.setState({verify_style: {display: 'block'}})
                        this.getemail()
                    } else {
                        message.error('邮箱已被注册')
                    }
                })
            } else {
                // 如果验证码错误就重新获取验证码
                this.setState({
                    error: {
                        status: {display: 'block'},
                        message: '验证码错误,请重试!'
                    }
                })
                this.getcode()
            }
        })
    }
    // 表单显示隐藏
    verifyBack = () => {
        this.setState({form_style: {display: 'block'}})
        this.setState({verify_style: {display: 'none'}})
    }
    // 获取图片验证码
    getcode = () => {
        let t = new Date()
        axios.get('/api/users/getcode?type=2&t=' + t.getTime()).then((response) => {
            if (response.data.status === 0) {
                this.setState({code_svg: response.data.data})
            }
        })
    }
    // 获取邮箱验证码
    getemail = () => {
        let self = this
        axios.get('/api/users/getemail?username=' + this.state.form.username).then((response) => {
            if (response.data.status === 0) {
                let s = 60
                this.setState({
                    countdown: s + 's',
                    loading: true
                })
                this.timerID = setInterval(() => {
                    s--
                    this.setState({countdown: s + 's'})
                    if (s < 0 || s === 0) {
                        s = 60
                        this.setState({
                            countdown: '获取验证码',
                            loading: false
                        })
                        clearInterval(self.timerID)
                    }
                }, 1000)
            }
        })
    }
    // 注册
    register = () => {
        let code = this.state.email_code
        let form = {
            invite: '',
            nickname: '',
            username: '',
            password: '',
            createTime: Date.now()
        }
        // 验证验证码是否为空
        if (code === '') {
            message.error('请输入你获得的6位数邮箱验证码')
            return false
        }
        // 验证验证码是否为6位数
        if(code.length !== 6){
            message.error('邮箱验证码格式错误')
            return false
        }
        // 验证邮箱验证码是否正确，如果正确保存注册信息到数据库
        axios.get('/api/users/verify_email?code=' + code).then((response) => {
            if (response.data.status === 0) {
                // 发送邮件成功之后清楚定时器，初始化邮箱验证码倒计时
                clearInterval(this.timerID)
                this.setState({
                    countdown: '获取验证码',
                    loading: false
                })
                for (let key in form) {
                    for (let key2 in this.state.form) {
                        if (key === key2) {
                            form[key] = this.state.form[key2]
                        }
                    }
                }
                // 对数据进行加密
                form.invite = md5(form.invite)
                form.password = md5(form.password)
                // 发送注册信息
                axios.post('/api/users/register', form).then((response) => {
                    if (response.data.status === 0) {
                        message.success(response.data.message)
                        history.push('/login', { some: 'state' })
                        window.location  = window.location
                    }
                })
            } else {
                message.error(response.data.message)
            }
        })
    }

    render() {
        const {error, form, code_svg, countdown, loading, email_code} = this.state
        return (
            <div className='Register'>
                <div className='Register-logo'>
                    <img src={Logo} alt=""/>
                </div>
                <div className='Register-des'>
                    <p>个人博客</p>
                </div>
                <div className='Register-form' style={this.state.form_style}>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入邀请码' value={form.invite}
                               onChange={this.handleChange.bind(this, 'invite')}/>
                    </div>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入昵称' value={form.nickname}
                               onChange={this.handleChange.bind(this, 'nickname')}/>
                    </div>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入邮箱地址' value={form.username}
                               onChange={this.handleChange.bind(this, 'username')}/>
                    </div>
                    <div className='form-input'>
                        <input type="text" placeholder='请输入图片验证码' value={form.verify_img}
                               onChange={this.handleChange.bind(this, 'verify_img')}/>
                        <Tooltip placement="top" title='点击更换新的验证码'>
                            <span onClick={this.getcode} dangerouslySetInnerHTML={{__html: code_svg}}></span>
                        </Tooltip>
                    </div>
                    <div className='form-input'>
                        <input type="password" placeholder='请输入密码' value={form.password}
                               onChange={this.handleChange.bind(this, 'password')}/>
                    </div>
                    <div className='form-input'>
                        <input type="password" placeholder='请确认密码' value={form.password_test}
                               onChange={this.handleChange.bind(this, 'password_test')}/>
                    </div>
                    <div className="from-error" style={error.status}>
                        <p>{error.message}</p>
                    </div>
                    <div className="from-btn" onClick={this.handleForm}>
                        立即注册
                    </div>
                    <div className="container-footer">
                        <Link to='/login'>返回登录</Link>
                        <Link to='/login/find'>找回密码</Link>
                    </div>
                </div>
                <div className='Register-verify' style={this.state.verify_style}>
                    <div className='verify-input'>
                        <input type="text" placeholder='请输入邮箱验证码' onChange={this.emailChange} value={email_code}/>
                        <Button type="primary" loading={loading} onClick={this.getemail}>{countdown}</Button>
                    </div>
                    <div className='verify-btn' onClick={this.register}>
                        确认
                    </div>
                    <div className='verify-back' onClick={this.verifyBack}>返回重新填写注册信息</div>
                    <div className='verify-back'>
                        <Link to='/login'>登录</Link>>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
