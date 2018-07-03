import React, {Component} from 'react';
import {
    Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import {Input, Avatar, Menu, Dropdown, Icon} from 'antd'
import Resume from './Resume'
import Blog from './Blog'
import Work from './Work'
import '../css/Home.css'
import '../css/global.css'
import 'antd/lib/input/style/css'
import 'antd/lib/avatar/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/dropdown/style/css'
import 'antd/lib/icon/style/css'
import Logo from '../img/logo20180627-04.png'

// 搜索输入框组件
const Search = Input.Search
// 下拉菜单列表组件
const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/home/resume">个人信息</Link>
        </Menu.Item>
        <Menu.Item key="0">
            <a href="/admin">后台管理</a>
        </Menu.Item>
    </Menu>
)
// 创建history对象
const history = createBrowserHistory()
// 监听history对象
history.listen((location, action) => {
    console.log(location.pathname);
    console.log(location.search);
    console.log(location.state);
})

class Home extends Component {
    componentDidMount() {
        
    }

    componentWillUnmount() {
        console.log(1);
    }

    componentDidUpdate() {
        console.log(2);
    }

    render() {
        return (
            <Router history={history}>
                <div className="Home">
                    <div className="Home-header">
                        <div className="Home-header-box">
                            <div className="Home-logo">
                                <img src={Logo} alt=""/>
                            </div>
                            <div className="Home-search">
                                <Search
                                    placeholder="请输入要搜索的内容"
                                    onSearch={value => console.log(value)}/>
                            </div>
                            <div className="Home-menu">
                                <ul>
                                    <li>
                                        <Link to="/home">Blog</Link>
                                    </li>
                                    <li><Link to="/home/work">Works</Link></li>
                                    <li><Link to="/home/tool">Tool</Link></li>
                                    <li><Link to="/home/disk">Disk</Link></li>
                                </ul>
                            </div>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link Home-dropdown" href="#">
                                    dubo<Icon type="down"/>
                                </a>
                            </Dropdown>
                            <Avatar shape="square" size="large" icon="user"/>
                        </div>
                    </div>
                    <div className='Home-container'>
                            <Route path='/' exact component={Blog}></Route>
                            <Route path='/home' exact component={Blog}></Route>
                            <Route path='/home/work' component={Work}></Route>
                            <Route path='/home/resume' component={Resume}></Route>
                    </div>
                    <div className="footer">
                        <div className='concat'>
                            <a href="https://github.com/microcosm1994" target="_blank" className='concat-logo'>github</a>
                            <a href="https://blog.csdn.net/qq_39081974?ref=toolbar" target="_blank" className='concat-logo'>csdn</a>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Home;
