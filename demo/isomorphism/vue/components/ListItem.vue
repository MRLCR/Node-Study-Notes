<template>
    <div class="list-item">
        <div class="title">
            <span class="title-text">{{data.id}}: {{data.title || ''}}</span>
        </div>
        <p class="content">{{data.content}}</p>
        <div class="other">
            <div class="likes-num">
                <span>{{data.likesNum}}</span>
            </div>
            <div class="comment-num">
                <span>{{data.commentNum}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListItem',
    props: { // 数据内容
        data: {
            type: Object,
            required: true,
            default: () => {}
        },
    },
}
</script>

<style scoped>
.list-item {
    padding: 20px;
    border-bottom: 1px solid #f0f2f7;
}
.title {
    line-height: 1.6;
    font-size: 18px;
    font-weight: 600;
}
.content {
    margin-top: 16px;
    cursor: pointer;
    transition: color .14s ease-out;
}
.content:hover {
    color: #646464;
}
.other {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.comment-num {
    margin-left: 24px;
    font-size: 14px;
    color: #646464;
}
</style>