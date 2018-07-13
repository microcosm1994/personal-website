import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import '../css/Start.css';

class Start extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cmd: '[root@host ~]#'
        }
        this.clearIn = this.clearIn.bind(this)
    }
    componentDidMount() {
        let order = '[root@host ~] # wget https://nodejs.org/dist/v8.9.3/node-v8.9.3-linux-x64.tar.xz\n[root@host ~] # tar -xvf node-v8.9.3-linux-x64.tar.xz\n[root@host ~] # cd node-v8.9.3-linux-x64\n[root@host node-v8.9.3-linux-x64] # ./configure\n'
        let install = order + 'Loaded plugins: fastestmirror\n' +
            'Setting up Group Process\n' +
            'Loading mirror speeds from cached hostfile\n' +
            ' * base: mirror.it.ubc.ca\n' +
            ' * elrepo-kernel: repos.lax-noc.com\n' +
            ' * extras: mirror.layeronline.com\n' +
            ' * updates: mirror.it.ubc.ca\n' +
            'Package automake-1.11.1-4.el6.noarch already installed and latest version\n' +
            'Package bison-2.4.1-5.el6.x86_64 already installed and latest version\n' +
            'Package libtool-2.2.6-15.5.el6.x86_64 already installed and latest version\n' +
            'Package autoconf-2.63-5.1.el6.noarch already installed and latest version\n' +
            'Package cvs-1.11.23-16.el6.x86_64 already installed and latest version\n' +
            'Package rcs-5.7-37.el6.x86_64 already installed and latest version\n' +
            'Package subversion-1.6.11-15.el6_7.x86_64 already installed and latest version\n' +
            '[root@host ~]# yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sq\n' +
            'Loaded plugins: fastestmirror\n' +
            'Setting up Install Process\n' +
            'Loading mirror speeds from cached hostfile\n' +
            ' * base: mirror.it.ubc.ca\n' +
            ' * elrepo-kernel: repos.lax-noc.com\n' +
            ' * extras: mirror.layeronline.com\n' +
            ' * updates: mirror.it.ubc.ca\n' +
            'Resolving Dependencies\n' +
            '--> Running transaction check\n' +
            '---> Package bzip2-devel.x86_64 0:1.0.5-7.el6_0 will be installed\n' +
            '---> Package ncurses-devel.x86_64 0:5.7-4.20090207.el6 will be installed\n' +
            '---> Package openssl-devel.x86_64 0:1.0.1e-57.el6 will be installed\n' +
            '--> Processing Dependency: libcom_err-devel for package: krb5-devel-1.10.3-65.el\n' +
            '--> Processing Dependency: keyutils-libs-devel for package: krb5-devel-1.10.3-65\n' +
            '---> Package libX11-devel.x86_64 0:1.6.4-3.el6 will be installed\n' +
            '--> Processing Dependency: pkgconfig(xcb) >= 1.11.1 for package: libX11-devel-1.\n' +
            '--> Processing Dependency: pkgconfig(xproto) for package: libX11-devel-1.6.4-3.e\n' +
            '--> Processing Dependency: pkgconfig(xcb) for package: libX11-devel-1.6.4-3.el6.\n' +
            '--> Processing Dependency: pkgconfig(kbproto) for package: libX11-devel-1.6.4-3.\n' +
            '---> Package libXft-devel.x86_64 0:2.3.2-1.el6 will be installed\n' +
            '---> Package xorg-x11-proto-devel.noarch 0:7.7-14.el6 will be installed\n' +
            '--> Running transaction check\n' +
            '---> Package libXau-devel.x86_64 0:1.0.6-4.el6 will be installed\n' +
            '---> Package libsepol-devel.x86_64 0:2.0.41-4.el6 will be installed\n' +
            '--> Finished Dependency Resolution\n' +
            '\n' +
            'Dependencies Resolved\n' +
            '\n' +
            '====================================================\n' +
            ' Package                                                    Arch\n' +
            '====================================================\n' +
            ' libXau-devel                                               x86_64\n' +
            ' libXft-devel                                               x86_64\n' +
            ' libXrender-devel                                           x86_64\n' +
            ' libcom_err-devel                                           x86_64\n' +
            ' libkadm5                                                   x86_64\n' +
            ' libselinux-devel                                           x86_64\n' +
            ' libsepol-devel                                             x86_64\n' +
            ' libxcb-devel                                               x86_64\n' +
            ' tcl                                                        x86_64\n' +
            ' tcl-devel                                                  x86_64\n' +
            ' tk                                                         x86_64\n' +
            ' xorg-x11-proto-devel                                       noarch\n' +
            '\n' +
            'Transaction Summary\n' +
            '==============================================\n' +
            'Install      24 Package(s)\n' +
            '\n' +
            'Total download size: 10 M\n' +
            'Installed size: 25 M\n' +
            'Is this ok [y/N]: y\n' +
            'Downloading Packages:\n' +
            '(1/24): bzip2-devel-1.0.5-7.el6_0.x86_64.rpm\n' +
            '(2/24): fontconfig-devel-2.8.0-5.el6.x86_64.rpm\n' +
            '(3/24): freetype-devel-2.3.11-17.el6.x86_64.rpm\n' +
            '(4/24): keyutils-libs-devel-1.4-5.el6.x86_64.rpm\n' +
            '(5/24): krb5-devel-1.10.3-65.el6.x86_64.rpm\n' +
            '(6/24): libX11-devel-1.6.4-3.el6.x86_64.rpm\n' +
            '(7/24): libXau-devel-1.0.6-4.el6.x86_64.rpm\n' +
            '(8/24): libXft-devel-2.3.2-1.el6.x86_64.rpm\n' +
            '(9/24): libXrender-devel-0.9.10-1.el6.x86_64.rpm\n' +
            '(10/24): libcom_err-devel-1.41.12-23.el6.x86_64.rpm\n' +
            '(11/24): libkadm5-1.10.3-65.el6.x86_64.rpm\n' +
            '(12/24): libselinux-devel-2.0.94-7.el6.x86_64.rpm\n' +
            '(13/24): libsepol-devel-2.0.41-4.el6.x86_64.rpm\n' +
            '(14/24): libxcb-devel-1.12-4.el6.x86_64.rpm\n' +
            '(15/24): ncurses-devel-5.7-4.20090207.el6.x86_64.rpm\n' +
            '(16/24): openssl-devel-1.0.1e-57.el6.x86_64.rpm\n' +
            '(17/24): readline-devel-6.0-4.el6.x86_64.rpm\n' +
            '(18/24): sqlite-devel-3.6.20-1.el6_7.2.x86_64.rpm\n' +
            '(19/24): tcl-8.5.7-6.el6.x86_64.rpm\n' +
            '(20/24): tcl-devel-8.5.7-6.el6.x86_64.rpm\n' +
            '(21/24): tk-8.5.7-5.el6.x86_64.rpm\n' +
            '(22/24): tk-devel-8.5.7-5.el6.x86_64.rpm\n' +
            '(23/24): xorg-x11-proto-devel-7.7-14.el6.noarch.rpm\n' +
            '(24/24): zlib-devel-1.2.3-29.el6.x86_64.rpm\n' +
            '-----------------------------------------------\n' +
            'Total\n' +
            'Running rpm_check_debug\n' +
            'Running Transaction Test\n' +
            'Transaction Test Succeeded\n' +
            'Running Transaction\n' +
            '  Installing : xorg-x11-proto-devel-7.7-14.el6.noarch\n' +
            '  Installing : zlib-devel-1.2.3-29.el6.x86_64\n' +
            '  Installing : 1:tk-devel-8.5.7-5.el6.x86_64\n' +
            '  Installing : bzip2-devel-1.0.5-7.el6_0.x86_64\n' +
            '  Installing : sqlite-devel-3.6.20-1.el6_7.2.x86_64\n' +
            '  Verifying  : readline-devel-6.0-4.el6.x86_64\n' +
            '  Verifying  : libXft-devel-2.3.2-1.el6.x86_64\n' +
            '  Verifying  : libX11-devel-1.6.4-3.el6.x86_64\n' +
            '  Verifying  : libXau-devel-1.0.6-4.el6.x86_64\n' +
            '  Verifying  : krb5-devel-1.10.3-65.el6.x86_64\n' +
            '  Verifying  : sqlite-devel-3.6.20-1.el6_7.2.x86_64\n' +
            '  Verifying  : 1:tcl-8.5.7-6.el6.x86_64\n' +
            '  Verifying  : freetype-devel-2.3.11-17.el6.x86_64\n' +
            '  Verifying  : bzip2-devel-1.0.5-7.el6_0.x86_64\n' +
            '  Verifying  : keyutils-libs-devel-1.4-5.el6.x86_64\n' +
            '  Verifying  : libxcb-devel-1.12-4.el6.x86_64\n' +
            '  Verifying  : zlib-devel-1.2.3-29.el6.x86_64\n' +
            '  Verifying  : ncurses-devel-5.7-4.20090207.el6.x86_64\n' +
            '  Verifying  : libselinux-devel-2.0.94-7.el6.x86_64\n' +
            '  Verifying  : 1:tk-8.5.7-5.el6.x86_64\n' +
            '  Verifying  : libXrender-devel-0.9.10-1.el6.x86_64\n' +
            '\n' +
            'Installed:\n' +
            '  bzip2-devel.x86_64 0:1.0.5-7.el6_0     ncurses-devel.x86_64 0:5.7-4.20090207.e\n' +
            '  tk-devel.x86_64 1:8.5.7-5.el6          zlib-devel.x86_64 0:1.2.3-29.el6\n' +
            '\n' +
            'Dependency Installed:\n' +
            '  fontconfig-devel.x86_64 0:2.8.0-5.el6     freetype-devel.x86_64 0:2.3.11-17.el\n' +
            '  libXau-devel.x86_64 0:1.0.6-4.el6         libXft-devel.x86_64 0:2.3.2-1.el6\n' +
            '  libselinux-devel.x86_64 0:2.0.94-7.el6    libsepol-devel.x86_64 0:2.0.41-4.el6\n' +
            '  tk.x86_64 1:8.5.7-5.el6                   xorg-x11-proto-devel.noarch 0:7.7-14\n' +
            '\n' +
            'Complete!\n'
        let make = install + '[root@host node-v8.9.3-linux-x64] # make && make install\n'
        let makeinstall = make + '- unsigned char *dtls1_set_message_header(SSL *s, unsigned char *p,\n' +
            '-                                         unsigned char mt, unsigned long len,\n' +
            '-                                         unsigned long frag_off,\n' +
            '-Index: openssl-1.0.2h/ssl/d1_clnt.c\n' +
            '-===================================================================\n' +
            '---- openssl-1.0.2h.orig/ssl/d1_clnt.c\n' +
            '-+++ openssl-1.0.2h/ssl/d1_clnt.c\n' +
            '-@@ -769,6 +769,7 @@ int dtls1_connect(SSL *s)\n' +
            '-             /* done with handshaking */\n' +
            '-             s->d1->handshake_read_seq = 0;\n' +
            '-             s->d1->next_handshake_write_seq = 0;\n' +
            '-+            dtls1_clear_received_buffer(s);\n' +
            '-             goto end;\n' +
            '-             /* break; */\n' +
            '- \n' +
            '-Index: openssl-1.0.2h/ssl/d1_lib.c\n' +
            '-===================================================================\n' +
            '---- openssl-1.0.2h.orig/ssl/d1_lib.c\n' +
            '-+++ openssl-1.0.2h/ssl/d1_lib.c\n' +
            '-@@ -170,7 +170,6 @@ int dtls1_new(SSL *s)\n' +
            '- static void dtls1_clear_queues(SSL *s)\n' +
            '- {\n' +
            '-     pitem *item = NULL;\n' +
            '--    hm_fragment *frag = NULL;\n' +
            '-     DTLS1_RECORD_DATA *rdata;\n' +
            '- \n' +
            '-     while ((item = pqueue_pop(s->d1->unprocessed_rcds.q)) != NULL) {\n' +
            '-@@ -191,28 +190,44 @@ static void dtls1_clear_queues(SSL *s)\n' +
            '-         pitem_free(item);\n' +
            '-     }\n' +
            '- \n' +
            '-+    while ((item = pqueue_pop(s->d1->buffered_Start_data.q)) != NULL) {\n' +
            '-+        rdata = (DTLS1_RECORD_DATA *)item->data;\n' +
            '-+        if (rdata->rbuf.buf) {\n' +
            '-+            OPENSSL_free(rdata->rbuf.buf);\n' +
            '-+        }\n' +
            '-+        OPENSSL_free(item->data);\n' +
            '-+        pitem_free(item);\n' +
            '-+    }\n' +
            '-+\n' +
            '-+    dtls1_clear_received_buffer(s);\n' +
            '-+    dtls1_clear_sent_buffer(s);\n' +
            '-+}\n' +
            '-+\n' +
            '-+void dtls1_clear_received_buffer(SSL *s)\n' +
            '-+{\n' +
            '-+    pitem *item = NULL;\n' +
            '-+    hm_fragment *frag = NULL;\n' +
            '-+\n' +
            '-     while ((item = pqueue_pop(s->d1->buffered_messages)) != NULL) {\n' +
            '-         frag = (hm_fragment *)item->data;\n' +
            '-         dtls1_hm_fragment_free(frag);\n' +
            '-         pitem_free(item);\n' +
            '-     }\n' +
            '-+}\n' +
            '-+\n' +
            '-+void dtls1_clear_sent_buffer(SSL *s)\n' +
            '-+{\n' +
            '-+    pitem *item = NULL;\n' +
            '-+    hm_fragment *frag = NULL;\n' +
            '- \n' +
            '-     while ((item = pqueue_pop(s->d1->sent_messages)) != NULL) {\n' +
            '-         frag = (hm_fragment *)item->data;\n' +
            '-         dtls1_hm_fragment_free(frag);\n' +
            '-         pitem_free(item);\n' +
            '-     }\n' +
            '--\n' +
            '--    while ((item = pqueue_pop(s->d1->buffered_Start_data.q)) != NULL) {\n' +
            '--        rdata = (DTLS1_RECORD_DATA *)item->data;\n' +
            '--        if (rdata->rbuf.buf) {\n' +
            '--            OPENSSL_free(rdata->rbuf.buf);\n' +
            '--        }\n' +
            '--        OPENSSL_free(item->data);\n' +
            '--        pitem_free(item);\n' +
            '--    }\n' +
            '- }\n'
        let node = makeinstall + '[root@host node-v8.9.3-linux-x64] # node\n> console.log("hello world")\n'
        let helloworld = node + 'hello world'
        console.log(helloworld.length);
        let num = 0
        let str = ''
        this.timerID = setInterval(() => {
            str = order.substr(0, num)
            this.setState({cmd: str})
            num++
            if (num === order.length) {
                clearInterval(this.timerID)
                this.timerID = setInterval(() => {
                    num++
                    str = install.substr(0, num)
                    this.setState({cmd: str})
                    this.refs.mycmd.scrollTop = this.refs.mycmd.scrollHeight + 100
                    if (num === install.length + 35) {
                        clearInterval(this.timerID)
                        this.timerID = setInterval(() => {
                            num++
                            str = make.substr(0, num)
                            this.setState({cmd: str})
                            this.refs.mycmd.scrollTop = this.refs.mycmd.scrollHeight + 100
                            if (num === make.length + 35) {
                                clearInterval(this.timerID)
                                this.timerID = setInterval(() => {
                                    num++
                                    str = makeinstall.substr(0, num)
                                    this.setState({cmd: str})
                                    this.refs.mycmd.scrollTop = this.refs.mycmd.scrollHeight + 100
                                    if (num === makeinstall.length + 35) {
                                        clearInterval(this.timerID)
                                        this.timerID = setInterval(() => {
                                            num++
                                            str = node.substr(0, num)
                                            this.setState({cmd: str})
                                            this.refs.mycmd.scrollTop = this.refs.mycmd.scrollHeight + 100
                                            if (num === node.length + 35) {
                                                clearInterval(this.timerID)
                                                this.timerID = setInterval(() => {
                                                    num++
                                                    str = helloworld.substr(0, num)
                                                    this.setState({cmd: str})
                                                    this.refs.mycmd.scrollTop = this.refs.mycmd.scrollHeight + 100
                                                    if ((num - 50) === helloworld.length) {
                                                        clearInterval(this.timerID)
                                                    }
                                                }, 50)
                                            }
                                        }, 100)
                                    }
                                }, 1)
                            }
                        },100)
                    }
                },1)
            }
        }, 30)
    }
    componentWillUnmount() {}
    clearIn () {
        clearInterval(this.timerID)
    }
    render() {
        return (
            <div className="Start">
               <div className='Start-container'>
                   <header className="Start-header">
                   </header>
                   <div className="cmd-box">
                       <textarea type='input' className='cmd' ref='mycmd' autoFocus='autoFocus' readOnly='readOnly' value={this.state.cmd}></textarea>
                   </div>
                   <div className='btn' onClick={this.clearIn}>
                       <Link to="/home">
                           进入主页
                       </Link>
                   </div>
               </div>
                <div className="footer">
                    <div className='concat'>
                        <a href="https://github.com/microcosm1994" target="_blank" className='concat-logo'>github</a>
                        <a href="https://blog.csdn.net/qq_39081974?ref=toolbar" target="_blank" className='concat-logo'>csdn</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Start;
