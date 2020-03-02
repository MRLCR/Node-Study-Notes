import { createApp } from './helper';

export default (context) => new Promise((resolve, reject) => {
    try {
        const { app } = createApp(context.data);
        resolve(app);
    } catch(err) {
        reject(err)
    }
});
