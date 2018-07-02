import React, {Component} from 'react'
import {Input, Icon, Button, Modal} from 'antd'
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
class Admin_blog extends Component {
    constructor (props) {
        super (props)
        this.state = {
            title: '',
            content: '',
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
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const { title, content, visible } = this.state
        const suffix = title ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
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
                    title="Basic Modal"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={(visible) => {
                        visible = false
                        this.setState({
                            visible: visible
                        })
                    }}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}

export default Admin_blog