<template>
    <div>
        <div class="topbar-item fl">
            <span class="topbar-item-btn">
                <el-badge :value="notifyList.length" :max="99" class="" :hidden="notifyList.length === 0">消息</el-badge>
            </span>
            <div class="topbar-dropdown-memu">
                <div class="topbar-notice-header">
                    <h3>站内消息通知</h3>
                </div>
                <div class="topbar-notice-body">
                    <ul class="topbar-notice-list">
                        <template v-if="notifyList.length === 0">
                            <li><a href="javascript:;" class="clearfix" style = "color:#ccc"> <br/> <p class="topbar-notice-item-name">暂没有新的消息！</p> <br/></a></li>
                        </template>
                        <template>
                            <li v-for="(item, index) in notifyList" :key="index">
                                <a href="javascript:;" class="clearfix">
                                    <p class="topbar-notice-item-name" title="item.title">{{item.title}}</p>
                                    <p class="topbar-notice-item-time">{{item.createTime}}</p>
                                </a>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="topbar-notice-footer">
                    <a href="javascript:;">更多消息</a>
                </div>
            </div>
        </div>
        <div class="topbar-item fl">
            <span class="topbar-item-btn">权限设置</span>
        </div>
        <div class="topbar-item fl">
            <span class="topbar-item-btn">支持与服务</span>
        </div>
        <div class="topbar-item fl">
            <span class="topbar-item-btn"><img src="@/assets/images/user.png"></span>
            <div class="topbar-dropdown-memu">
                <div class="topbar-user-header">
                    <h3><img class="topbar-user-img" src="@/assets/images/user.png"><span class="topbar-username">(123)123</span></h3>
                    <ul class="topbar-user-entrance-list">
                        <li class="topbar-user-entrance"><a href="javascript:;" title="基本资料">站内信</a></li>
                        <li class="topbar-user-entrance"><a href="javascript:;" title="实名认证">基本资料</a></li>
                        <li class="topbar-user-entrance"><a href="javascript:;" title="安全设置">安全设置</a></li>
                    </ul>
                </div>
                <div class="topbar-user-footer">
                    <a href="javascript:;" @click.stop="logout">退出系统</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            notifyList: [
                { 'title': '嘿！孙砸，我是你爷爷', 'createTime': '2019-02-20 13:45:48' },
                { 'title': '嘿！孙砸，我是你爷爷', 'createTime': '2019-02-19 12:55:33' },
                { 'title': '嘿！孙砸，我是你爷爷', 'createTime': '2019-02-18 11:15:23' },
                { 'title': '嘿！孙砸，我是你爷爷', 'createTime': '2019-02-17 10:25:17' }
            ]
        }
    }
}
</script>
<style lang="scss">
    .topbar a, .topbar li, .topbar p, .topbar span{
        margin: 0;
        padding: 0;
        text-decoration: none;
        letter-spacing: .02em;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    .topbar-item{
        position: relative;
        display: inline-block;
        transition: all 0.3s;
        -webkit-transition: all 0.3s;
        &:hover{
            background-color: rgba(255 ,255 ,255 ,.1);
        }
        &:hover .topbar-dropdown-memu{
            display: block;
        }
        &[checked = checked]{
            background-color: rgba(0, 0, 0, 0.08);
        }
        .topbar-item-btn{
            z-index: 2;
            display: block;
            padding: 0 11pt;
            height: 50px;
            color: #fff;
            font-size: 14px;
            line-height: 50px;
            cursor: pointer;
            position: relative;
            text-decoration: none;
            img{
                margin-top: 9pt;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                -webkit-box-shadow: 0 0 0 3px #ebebeb;
                box-shadow: 0 0 0 3px #ebebeb;
            }
            .el-badge{
                vertical-align: inherit;
                line-height: 1;
            }
            .el-badge__content{
                border: none;
                &.is-fixed{ right: 2px }
            }
        }
        .topbar-dropdown-memu{
            position: absolute;
            top: 100%;
            right: 0;
            z-index: 999;
            float: left;
            display: none;
            margin: 0;
            border: none;
            background-color: #fff;
            background-clip: padding-box;
            -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            color: #666;
            list-style: none;
            white-space: nowrap;
            font-size: 9pt;
            -webkit-transition: opacity .3s,visibility 0s .3s;
            transition: opacity .3s,visibility 0s .3s;
            li a{
                clear: both;
                display: block;
                padding: 10px 15px;
                min-width: 250px;
                white-space: nowrap;
                font-weight: 400;
                line-height: 1.5;
                cursor: pointer;
                -webkit-transition: all .15s;
                transition: all .15s;
                color: #666;
                &:hover{
                    color: #008de1
                }
            }
            .topbar-user-header{
                padding: 15px;
                border-bottom: 1px solid #ebebeb;
                h3{
                    margin: 0;
                    padding: 0;
                    font-weight: 400;
                    font-size: 10pt;
                    .topbar-user-img{
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                        -webkit-box-shadow: 0 0 0 3px #ebebeb;
                        box-shadow: 0 0 0 3px #ebebeb;
                        vertical-align: middle;
                    }
                    .topbar-username{
                        font-size: 12px;
                        color: #666;
                        margin-left: 10px;
                        vertical-align: middle;
                    }
                }
                .topbar-user-entrance-list{
                    overflow: hidden;
                    margin: 20px 0 0 0;
                    padding: 0;
                    min-width: 230px;
                    list-style: none;
                    li{
                        &:first-child{
                            border-left: none;
                        }
                        float: left;
                        width: 33.333333%;
                        border-left: 1px solid #ebebeb;
                        text-align: center;
                        a{
                            overflow: hidden;
                            padding: 0;
                            width: 100%;
                            min-width: 0;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            opacity: .85;
                        }
                    }
                }
            }
            .topbar-user-footer a{
                display: block;
                height: 40px;
                text-align: center;
                line-height: 40px;
                color: #666;
                &:hover{
                    color: #008de1
                }
            }
            .topbar-notice-header{
                position: relative;
                padding: 0 15px;
                height: 45px;
                border-bottom: 1px solid #ebebeb;
                line-height: 45px;
                h3{
                    margin: 0;
                    padding: 0;
                    font-weight: 400;
                    font-size: 10pt;
                }
            }
            .topbar-notice-body .topbar-notice-list{
                max-height: 200px;
                overflow: auto;
                li {
                    a{
                        clear: both;
                        display: block;
                        padding: 10px 15px;
                        min-width: 250px;
                        white-space: nowrap;
                        font-weight: 400;
                        line-height: 1.5;
                        cursor: pointer;
                        -webkit-transition: all .15s;
                        transition: all .15s;
                        border-bottom: 1px solid #ebebeb;
                        .topbar-notice-item-name{
                            overflow: hidden;
                            max-width: 260px;
                            min-width: 200px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .topbar-notice-item-time{
                            color: #ccc;
                            opacity: .85;
                        }
                    }
                    &:last-child{
                        a{
                            border: none
                        }
                    }
                }
            }
            .topbar-notice-footer{
                display: block;
                height: 40px;
                text-align: center;
                line-height: 40px;
                border-top: 1px solid #ebebeb;
                a{
                    color: #666;
                    &:hover{
                        color: #008de1;
                    }
                    .topbar-notice-item-name{
                        overflow: hidden;
                        max-width: 260px;
                        min-width: 200px;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>
