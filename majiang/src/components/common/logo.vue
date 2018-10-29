<template>
    <div class="xmbti-logo">
        <router-link to="/">
            <h1>XMBTI</h1>
            <ul>
                <li>X</li>
                <li>MBTI</li>
            </ul>
        </router-link>
    </div>
</template>
<style lang="less">
.xmbti-logo>a {
    h1 {
        display:block;
        height:0;
        width:0;
        overflow: hidden;
    }
    ul {
    display:flex;
    overflow: hidden;
    // font-family: 'Gulim';
    font-family: 'NSimSun';
        // border:1px solid #1b6eb2;
        li {
            white-space:nowrap;
        }
        li:first-child {
            color:#ffaf4b;
            // font-family:'Gabriola';
            font-size:25px;
            font-weight:700;
        }
        li:last-child {
            // background-color: #1b6eb2;
            // color:#fff;
            font-size:25px;
            font-weight:700;
            color:#70a9e5;
        }
    }
}
</style>
