<template>
  <div class="login_wrap">
    <div class="login_container">
      <div class="login-info">
        <div class="logo-panel">
          <h1>宜创办公</h1>
        </div>
        <h3>
          欢迎使用
          <strong>宜创办公管理系统</strong>
        </h3>
        <ul>
          <li>
            <i class="fa-fw fa fa-check-square-o"></i>
            <span>快速、精准、开放</span>
          </li>
          <li>
            <i class="fa-fw fa fa-check-square-o"></i>
            <span>共创、共享、共赢</span>
          </li>
          <li>
            <i class="fa-fw fa fa-check-square-o"></i>
            <span>让办公系统更简便、更高效</span>
          </li>
        </ul>
      </div>
      <div class="login-form">
        <el-form :model="passport" :rules="rules" ref="passport">
          <dl>
            <dt>
              <h3>用户登录</h3>
              <p>登录宜创办公管理系统</p>
            </dt>
            <dd>
              <el-form-item prop="username">
                <el-input class="dn"></el-input>
                <el-input
                  v-model="passport.username"
                  autocomplete="off"
                  placeholder="用户名"
                  type="text"
                  prefix-icon="fa fa-user-o"
                ></el-input>
              </el-form-item>
            </dd>
            <dd>
              <el-form-item prop="password">
                <el-input class="dn"></el-input>
                <el-input
                  v-model="passport.password"
                  autocomplete="off"
                  placeholder="密码"
                  type="password"
                  prefix-icon="fa fa-keyboard-o"
                ></el-input>
              </el-form-item>
            </dd>
            <dd>
              <el-checkbox v-model="passport.remember" label="记住账号"></el-checkbox>
            </dd>
            <dd>
              <el-button
                type="primary"
                :loading="loading"
                class="loginBtn"
                @click="handleLogin"
              >{{ buttonName }}</el-button>
            </dd>
            <dd>
              <br />
              <br />
              <br />
            </dd>
          </dl>
        </el-form>
      </div>
      <hr />
      <div class="bot_des">
        © 2018
        <a href="https://www.yicnt.com" target="blank">www.yicnt.com</a> 宜创网络版权所有 | 苏州宜创网络科技有限公司 | 苏ICP备18070891号
      </div>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/login'
export default {
  data () {
    return {
      self: this,
      loading: false,
      buttonName: '立即登录',
      passport: {
        username: '',
        password: '',
        remember: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created () {
    let auth = localStorage.getItem('auth')
    if (auth != null) {
      auth = JSON.parse(auth)
      this.passport.username = auth.username
      this.passport.password = auth.password
      this.passport.remember = auth.remember
    }
  },
  mounted () {
    var self = this
    document.onkeydown = function (e) {
      const ev = document.all ? window.event : e
      if (ev.keyCode === 13) {
        self.handleLogin()
      }
    }
  },
  methods: {
    handleLogin () {
      const _self = this
      _self.$refs['passport'].validate(valid => {
        if (valid) {
          _self.loading = true
          _self.buttonName = '正在登录...'
          // _self.$store.dispatch('Login', this.passport)
          // .then((res) => {
          //     if(_self.passport.remember){
          //         localStorage.setItem('auth', JSON.stringify(_self.passport))
          //     }else{
          //         localStorage.removeItem('auth')
          //     }
          //     _self.$router.push('/')// 未登陆
          // }).catch(() => {
          //     _self.loading = false
          //     _self.buttonName = '立即登录'
          // })
          setTimeout(() => {
            localStorage.userInfo = 123
            _self.$router.push('/')
          }, 1000)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
hr {
  border: 0;
  height: 1px;
  clear: both;
  margin: 20px 0px;
  background-color: #e2e2e2;
}
.login_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url(../assets/images/login/backg.jpg) no-repeat center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.login_container {
  margin: 12% auto 0 auto;
  color: #ffffff;
  font-size: 13px;
  @media screen and (min-width: 1200px) {
    width: 912px;
  }
  p {
    color: #ccc;
    font-size: 13px;
  }
  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: #1e9fff;
    }
  }
  .login-info {
    float: left;
    width: 60%;
    h1 {
      font-size: 40px;
      font-weight: 400;
    }
    h3 {
      color: #fff;
      font-size: 24px;
      margin-top: 30px;
      font-weight: 400;
    }
    ul {
      padding: 0;
      margin: 30px 0;
      font-size: 18px;
      li {
        display: list-item;
        text-align: -webkit-match-parent;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
        vertical-align: middle;
        i {
          font-size: 22px;
          margin-top: 3px;
          float: left;
        }
      }
    }
  }
  .login-form {
    overflow: hidden;
    h3 {
      font-size: 24px;
      color: #666;
      font-weight: 400;
    }
    p {
      margin: 8px 0;
    }
    dl {
      overflow: hidden;
      margin: 0px auto;
      padding: 40px 30px 30px 30px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      background: url(../assets/images/login/slogan.png) no-repeat 95% 97% #fff;
      background-size: 160px;
    }
    dd {
      margin: 0px 0;
      overflow: hidden;
      position: relative;
    }
    .loginBtn {
      width: 100%;
      margin-top: 20px;
    }
  }
  .el-input__inner {
    font-size: 14px;
  }
}
</style>
