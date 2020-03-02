import { createApp } from './helper';
import { getData } from '../web/common/api/index';

const { app } = createApp({
    list: initData,
    sort: initSort,
    type: initType,
    sortFn(sort) {
        getData(sort, this.selectedType)
            .then(res => {
                this.preData = res;
                this.preSort = sort;
            });
    },
    filtFn({ type } = {}) {
        getData(this.preSort, type)
            .then(res => {
                this.preData = res;
                this.selectedType = type;
            });
    },
});

app.$mount('#app');
