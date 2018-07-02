import React, {Component} from 'react'
import axios from 'axios'
import {Input, Icon, Button, Modal, Select, Radio, message} from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../css/Admin-blog.css'
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting button
];
const Option = Select.Option;
class Admin_blog extends Component {
    constructor (props) {
        super (props)
        this.state = {
            title: '',
            type: '',
            content: '',
            tags: [],
            visible: false
        }
    }
    // blog标题
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ title: '' });
    }

    onChangeUserName = (e) => {
        this.setState({ title: e.target.value });
    }
    // modal弹出层
    showModal = () => {
        let {title, content} = this.state
        if( title !== ''&& content !== ''){
            this.setState({
                visible: true,
            });
        } else {
            message.info('标题和内容不能为空')
        }
    }
    modalOk = (e) => {
        let blogResult = {}
        blogResult.title = this.state.title
        blogResult.type = this.state.type
        blogResult.tags = this.state.tags
        blogResult.content = this.state.content
        blogResult.date = new Date()
        axios.post('/api/save').then((res) => {
            console.log(res);
        })
        this.setState({
            visible: false,
        });
    }

    modalCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    // blog分类
    typeChange = (value) => {
        this.setState({type: value})
        console.log(`Selected: ${value}`);
    }
    typeBlur = () => {
        console.log('blur');
    }

    typeFocus = () => {
        console.log('focus');
    }
    // blog标签
    tagChange = (value) => {
        this.setState({tags: value})
    }
    render() {
        const { title, content, visible } = this.state
        const suffix = title ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const tagChildren = [];
        const tagList = ['node.js', 'html', 'css', 'js', 'express', 'egg.js', 'jquery', 'python', 'flask', 'mongodb', 'vue.js', 'react.js', 'antd', 'vuex', 'nginx', 'linux', 'less'];
        for( let i = 0; i < tagList.length; i++) {
            tagChildren.push(<Option style={{width: '30%',display: 'inline-block',}} key={tagList[i]}>{tagList[i]}</Option>)
        }
        return (
            <div className="Addblog">
                <h1>写博客</h1>
                <div className='blog-title'>
                    <Input
                        placeholder="请输入文章标题"
                        prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffix}
                        value={title}
                        onChange={this.onChangeUserName}
                        ref={node => this.userNameInput = node}
                    />
                </div>
                <ReactQuill
                    theme="snow"
                    placeholder="请输入文章内容"
                    value={ content }
                    modules={{toolbar: toolbarOptions}}
                    onChange={(val)=>{
                        this.setState({content: val})
                        console.log(val)
                    }}/>
                <div className="blog-save">
                    <Button type="primary" onClick={this.showModal}>保存</Button>
                </div>
                <Modal
                    title="选择分类"
                    maskClosable = {false}
                    visible={visible}
                    onOk={this.modalOk}
                    onCancel={(visible) => {
                        visible = false
                        this.setState({
                            visible: visible
                        })
                    }}>
                    <div className='blog-type'>
                        <span className='blog-type-title'>分类:</span>
                        <Select
                            showSearch
                            style={{ width: '40%' }}
                            placeholder="选择文章分类"
                            optionFilterProp="children"
                            onChange={this.typeChange}
                            onFocus={this.typeFocus}
                            onBlur={this.typeBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="前端">前端</Option>
                            <Option value="后端">后端</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    </div>
                    <div className='blog-type'>
                        <span className='blog-type-title'>标签:</span>
                        <Select
                            mode="tags"
                            style={{ width: '70%' }}
                            onChange={this.tagChange}
                            tokenSeparators={[',']}
                        >
                            {tagChildren}
                        </Select>,
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Admin_blog