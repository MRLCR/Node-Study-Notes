<template>
    <div class="main">
        <list
            :data="list"
            :sort="sort"
            :filt="filt"
            :sortFn="sortFn"
            :filtFn="filtFn"
        />
    </div>
</template>

<script>
import List from './List.vue';
export default {
    components: {
        List,
    },
    props: {
        list: { // 默认数据
            type: Array,
            required: true,
            default: () => [],
        },
        sort: { // 排序 0: 升序 1：降序
            type: Number,
            required: false,
            default: 0,
        },
        type: { // 根据类型过滤
            type: Number,
            required: false,
            default: 0,
        },
        sortFn: { // 排序方法
            type: Function,
            required: false,
            default: () => null,
        },
        filtFn: { // 过滤方法
            type: Function,
            required: false,
            default: () => null,
        },
    },
    computed: {
        filt() { // 过滤条件
            return {
                type: this.type,
            };
        },
    },
}
</script>

<style scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
</style>