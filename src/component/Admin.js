import React, {Component} from 'react'
import {Router, Switch, Link, Route} from 'react-router-dom'
import {createBrowserHistory} from 'history'
//引入组件
import {Input, Avatar, Menu, Dropdown, Icon} from 'antd'
import AdminHome from './Admin-home'
import Addblog from './Admin-blog'
import Home from './Home'
// 引入css
import 'antd/lib/input/style/css'
import 'antd/lib/avatar/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/dropdown/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/modal/style/css'
import '../css/global.css'
import '../css/Admin.css'
// 引入img
import Logo from '../img/db.png'
const history = createBrowserHistory()
// 搜索输入框组件
const Search = Input.Search
// 下拉菜单列表组件
const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="/home">返回网站</a>
        </Menu.Item>
    </Menu>
)

class Admin extends Component {
    render() {
        return(
            <Router history={history}>
                <div className='Admin'>
                    <div className='Admin-sidebar'>
                        <div className='Admin-logo'>
                            <img src={Logo} alt=""/>
                        </div>
                        <div className="Admin-sidebar-list">
                            <ul>
                                <li className='sildebar-item'><Link to='/admin'>💒HOME</Link></li>
                                <li className='sildebar-item'><Link to='/admin/addblog'>📝写博客</Link></li>
                                <li className='sildebar-item'><Link to='/admin/addblog'>🎫添加作品</Link></li>
                                <li className='sildebar-item'><Link to='/admin/addblog'>🔨上传工具</Link></li>
                                <li className='sildebar-item'><Link to='/admin/addblog'>📂网盘</Link></li>
                                <li className='sildebar-item'><Link to='/admin/addblog'>🔧设置</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="Admin-header">
                        <div className='search'>
                            <Search placeholder="请输入要搜索的内容"
                                    onSearch={value => console.log(value)}/>
                        </div>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link Home-dropdown" href="#">
                                dubo<Icon type="down"/>
                            </a>
                        </Dropdown>
                        <Avatar shape="square" size="large" icon="user"/>
                    </div>
                    <div className='Admin-container'>
                        <Route path='/' exact component={AdminHome}></Route>
                        <Route path='/admin' exact component={AdminHome}></Route>
                        <Route path='/admin/addblog' exact component={Addblog}></Route>
                    </div>
                </div>
            </Router>
        )
    }
}


export default Admin