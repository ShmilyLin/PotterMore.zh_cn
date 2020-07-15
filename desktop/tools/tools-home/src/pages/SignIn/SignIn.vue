<template>
    <div class="signin">
        <div class="signin-header">
            <div class="signin-header-button" @click="closeButtonClickEvent"></div>
        </div>
        <div class="signin-view">
            <div class="signin-view-display"></div>
            <div class="signin-view-line"></div>
            <div class="signin-view-content">
                <div class="signin-view-content-container">
                    <div class="signin-view-content-container-header">密码登录</div>
                    <div class="signin-view-content-container-line"></div>
                    <div class="signin-view-content-container-text">
                        <input type="text" placeholder="输入账号">
                    </div>
                    <div class="signin-view-content-container-text">
                        <input type="password" placeholder="输入密码">
                    </div>
                    <div class="signin-view-content-container-line"></div>
                    <div class="signin-view-content-container-button">登 录</div>
                    <div class="signin-view-content-container-actions">
                        <div class="signin-view-content-container-actions-item">找回密码</div>
                        <div class="signin-view-content-container-actions-item">忘记账号</div>
                        <div class="signin-view-content-container-actions-item">注册</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SignIn from './SignIn';
export default SignIn;
</script>

<style lang="scss" scoped>
@import './SignIn';
</style>