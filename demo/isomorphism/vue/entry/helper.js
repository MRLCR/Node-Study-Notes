import Vue from 'vue';
import App from '../components/App.vue';

export function createApp(data = {
    list: [],
    sort: 0,
    type: 0,
    sortFn: () => null,
    filtFn: () => null,
}) {
    const app = new Vue({
        render: h => h(App, {
            props: data,
        }),
    });

    return { app }
}