<template>
    <div class="list">
        <div v-if="!hasValidData" class="data-error">
            <p class="data-error-text">服务器故障，请稍后重试~~</p>
        </div>
        <div v-else class="filter">
            <div class="filter-item sort">
                <button type="button" class="btn" @click.stop="handleClickSort">{{sortText}}</button>
            </div>
            <div class="filter-item type">
                <select class="select" v-model="selectedType" @change.stop="handleChangeType">
                    <option
                        v-for="(item, index) in TYPES"
                        :key="`${item.type}${index}`"
                        :value="item.type"
                    >{{item.label}}</option>
                </select>
            </div>
        </div>
        <list-item
            v-for="(item, index) in preData"
            :key="`${item.id}${index}`"
            :data="item"
        />
        <p class="no-more">- 没有更多数据了 -</p>
    </div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
    components: {
        ListItem,
    },
    props: {
        data: { // 默认数据
            type: Array,
            required: true,
            default: () => [],
        },
        sort: { // 排序 0: 升序 1：降序
            type: Number,
            required: false,
            default: 0,
        },
        filt: { // 过滤
            type: Object,
            required: false,
            default: () => {}
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
        hasValidData() { // 是否有有效数据
            return Array.isArray(this.preData);
        },
        sortText() { // 排序文案
            return this.preSort === 0 ? '升序' : '降序';
        },
    },
    data() {
        return {
            TYPES: [ // 所有类型 mock 数据
                {type: 0, label: '全部'},
                {type: 1, label: '疫情'},
                {type: 2, label: '娱乐'},
                {type: 3, label: '技术'},
            ],
            selectedType: this.filt.type, // 被选择的类型
            preSort: this.sort, // 当前的排序方式
            preData: this.data, // 当前数据
        };
    },
    methods: {
        handleClickSort() { // 点击排序
            this.sortFn.call(this, this.preSort === 0 ? 1 : 0);
        },
        handleChangeType(event) { // 切换过滤类型
            const type = event.target.value;
            this.selectedType = type;
            this.filtFn.call(this, {type});
        },
    },
}
</script>

<style scoped>
.list {
    width: 700px;
    background-color: #fff;
    color: #1a1a1a;
}
.filter {
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #f0f2f7;
}
.btn, .select{
    height: 30px;
    padding: 0 12px;
    line-height: 30px;
    border-radius: 3px;
    text-align: center;
    border-color: transparent;
    background-color: rgba(0, 132, 255, .1);
    font-size: 14px;
    color: #0084ff;
    cursor: pointer;
}
.btn:focus, .select:focus {
    outline: 0;
}
.type {
    margin-left: 24px;
}
.no-more {
    padding: 10px 0;
    text-align: center;
    font-size: 16px;
    color: #646464;
}
</style>