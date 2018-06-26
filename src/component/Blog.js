import React, { Component } from 'react'
import {createBrowserHistory} from 'history'
const history = createBrowserHistory()
// 监听history对象
history.listen((location, action) => {
    console.log(location.pathname);
    console.log(location.search);
    console.log(location.state);
})

class Blog extends Component{
    render() {
        return(
            <div>
              blog
            </div>
        )
    }
}
export default Blog
