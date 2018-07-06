import React, {Component} from 'react'
import {createBrowserHistory} from 'history'
import '../css/Login-form.css'
import Logo from '../img/logo20180627-04.png'
const history = createBrowserHistory()

class Login_form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bgStyle: {}
        }
    }

    componentDidMount() {
        // 视频背景尺寸
        window.onresize = () => {
            const windowWidth = document.body.clientWidth
            const windowHeight = document.body.clientHeight
            const windowAspectRatio = windowHeight / windowWidth
            let videoWidth
            let videoHeight
            if (windowAspectRatio < 0.5625) {
                videoWidth = windowWidth
                videoHeight = videoWidth * 0.5625
                this.setState({
                    bgStyle: {
                        height: windowWidth * 0.5625 + 'px',
                        width: windowWidth + 'px',
                        'bottom': (windowHeight - videoHeight) / 2 + 'px',
                        'left': 'initial'
                    }
                })
            } else {
                videoHeight = windowHeight
                videoWidth = videoHeight / 0.5625
                this.setState({
                    bgStyle: {
                        height: windowHeight + 'px',
                        width: windowHeight / 0.5625 + 'px',
                        'left': (windowWidth - videoWidth) / 2 + 'px',
                        'bottom': 'initial'
                    }
                })
            }
        }
        window.onresize()
    }

    render() {
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
                        <input type="text" placeholder='请输入账号'/>
                    </div>
                    <div className='form-input'>
                        <input type="password" placeholder='请输入密码'/>
                    </div>
                    <div className='form-remember'>
                        <div className="form-remember-radio">
                            <input type="checkbox" name='remember'/>
                            <span>保持登录</span>
                        </div>
                    </div>
                    <div className="from-btn">
                        立即登录
                    </div>
                </div>
            </div>
        )
    }
}

export default Login_form