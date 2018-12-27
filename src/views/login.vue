<style lang="less">
    @import '~sendinfo-admin-ui/src/views/login.less';
    .login-code-img {
        margin-top: 2px;
        width: 100px;
        height: 32px;
        background-color: #fdfdfd;
        border: 1px solid #f0f0f0;
        color: #333;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 5px;
        line-height: 32px;
        text-indent: 5px;
        text-align: center;
    }
</style>

<template>
    <div class="login" :style="{backgroundImage: 'url(' +loginBgImg + ')'}" @keydown.enter="handleSubmit">
        <div class="login-con">
            <el-card class="box-card">
                <p slot="header">
                    <i class="el-icon-circle-check"></i>
                    欢迎登录
                </p>
                <div class="form-con">
                    <el-form ref="loginForm" :model="form" :rules="rules">
                        <el-form-item prop="username">
                            <el-input v-model.trim="form.username" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <i class="el-icon-my-user"></i>
                                </span>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model.trim="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <i :size="14" class="el-icon-my-wodemima"></i>
                                </span>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="verifyCode">
                            <el-row :span="24">
                                <el-col :span="14">
                                    <el-input size="small"
                                              :maxlength="6"
                                              v-model="form.verifyCode"
                                              auto-complete="off"
                                              placeholder="请输入验证码">
                                        <i slot="prefix"
                                           class="icon-yanzhengma"></i>
                                    </el-input>
                                </el-col>
                                <el-col :span="10">
                                    <div class="login-code">
                                        <img :src="verifyCodeUrl"
                                             class="login-code-img"
                                             @click="refreshCode"/>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-form-item>
                            <el-button size="medium" type="primary" @click="handleSubmit" style="width: 100%">立即登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import loginBgImg1 from 'sendinfo-admin-ui/src/assets/images/login_bg.jpg'
import loginBgImg2 from 'sendinfo-admin-ui/src/assets/images/login-bg2.jpg'
import verifyCode from 'sendinfo-admin-ui/src/core/plugins/mixins/verify-code.js'
import util from 'sendinfo-admin-ui/src/core/util'

export default {
    created(){
        this.refreshCode();
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
                verifyCode: '',
                rememberMe: false
            },
            verifyCodeUrl:'',
            rules: {
                username: [
                    {required: true, message: '账号不能为空', trigger: 'blur'},
                    {pattern:  /^[_'.@A-Za-z0-9-]*$/g, message: '请输入合法字符', trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    { min: 4, max: 18, message: '长度在 4 到 18 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    mixins:[verifyCode],
    computed: {
        loginBgImg(){
            const loginBgArrays = [loginBgImg1,loginBgImg2]
            let index = Math.round(Math.random());
            return loginBgArrays[index];
        }
    },
    methods: {
        ...mapMutations([
            'setToken',
            'setUserInfo'
        ]),
        refreshCode () {
            this.verifyCodeUrl = this.getVerifyCodeUrl('checkCode')
        },
        handleSubmit() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    let params = {
                        checkcode: this.form.verifyCode,
                        username: this.form.username,
                        password: this.form.password
                    }
                    let formParams = [];
                    for(let key in params) {
                        formParams.push(key + '=' + params[key]);
                    }
                    // params.password = util.encodeBase64(params.password)
                    this.$http.post('/api/v3/admin/logining', formParams.join('&'), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }
                    }).then(res => {
                        if(res.success){
                            this.setToken(res.data)
                            this.$http.get('/api/userinfo').then(response => {
                                this.setUserInfo(response.data);
                                //动态添加路由
                                const routes = this.$store.getters.getRoutes
                                this.$router.addRoutes(routes);
                                this.$router.push('/');
                            })
                        }
                    }).catch(res=>{
                        // 登录失败刷新验证码
                        this.refreshCode();
                    });
                }
            });
        }
    }
};
</script>
