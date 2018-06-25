import React, {Component} from 'react';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import { Input, Avatar, Menu, Dropdown, Icon } from 'antd'
import Resume from './Resume'
import Blog from './Blog'
import Work from './Work'
import '../css/Home.css'
import 'antd/lib/input/style/css'
import 'antd/lib/avatar/style/css'
import 'antd/lib/menu/style/css'
import 'antd/lib/dropdown/style/css'
import 'antd/lib/icon/style/css'
const Search = Input.Search
const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/home/resume">个人信息</Link>
        </Menu.Item>
    </Menu>
)

class Home extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="Home">
                    <div className="Home-header">
                        <div className="Home-header-box">
                            <Search
                                placeholder="请输入要搜索的内容"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                            <div className="Home-menu">
                                <ul>
                                    <li>
                                        <Link to="/home/blog" activeStyle={{ color: 'red' }}>Blog</Link>
                                    </li>
                                    <li><Link to="/home/work" activeStyle={{ color: 'red' }}>Works</Link></li>
                                    <li><Link to="/home/tool" activeStyle={{ color: 'red' }}>Tool</Link></li>
                                    <li><Link to="/home/disk" activeStyle={{ color: 'red' }}>Blog</Link></li>
                                </ul>
                            </div>
                            <Avatar shape="square" size="large" icon="user" />
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" href="#">
                                    dubo<Icon type="down" />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                    <div className='Home-container'>
                       <Switch>
                           <Route path='/home/blog' component={Blog}></Route>
                           <Route path='/home/work' component={Work}></Route>
                           <Route path='/home/resume' component={Resume}></Route>
                       </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Home;
