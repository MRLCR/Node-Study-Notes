
let isLoading = false;

window.onload = function() {
    this.bindAction();
}

/**
 * 获取dom节点
 * @param {string} selectors 节点选择器
 * @returns {Element}
 */
function getDom(selectors) {
    return document.querySelector(selectors);
}

/**
 * 记录结果
 * @param {string} res 结果内容
 */
function recordResult(res) {
    if (res) {
        const {
            userActionDec,
            computerActionDec,
            result,
        } = res;
        // `你出${userActionDec}，电脑出${computerActionDec}，结果：你${result}`
        const dom = getDom('#record');
        const text = `
            <div class="result-record-row">
                <span class="result-record-label">你出：</span>
                <span class="result-record-directive">${userActionDec}</span>
                <span class="result-record-label">电脑出：</span>
                <span class="result-record-directive">${computerActionDec}</span>
                <span class="result-record-label">结果：</span>
                <span class="result-record-directive">${result}</span>
            </div>
        `.trim()
        if (dom.innerHTML) {
            dom.innerHTML += text;
        } else {
            dom.innerHTML = text;
        }
    }
}

/**
 * 获取游戏结果
 * @param {number} action 玩家出的内容
 */
function getResult(action) {
    if (isLoading) {
        return;
    }
    changeLoadingStatus();

    // 设置超时时间
    const timeout = (time) => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: false,
                message: '请求超时，请检查网络状况',
            })
        }, time);
    });
    Promise.race([
        fetch(`${window.location.origin}/api/getResut?action=${action}`),
        timeout(1000),
    ])
        .then((res) => {
            const {status} = res;
            if ([200, 304].includes(status)) {
                return res.json();
            } else {
                throw Error(res);
            }
        })
        .then((res) => {
            if (res.success) {
                recordResult(res.data);
            } else {
                alert(res.message);
            }
            changeLoadingStatus();
        })
        .catch((res) => {
            console.log(res.json());
            alert('系统被你玩坏了');
            changeLoadingStatus();
        });
}

/**
 * 清空内容
 */
function clearResult() {
    getDom('#record').innerHTML = '';
}

/**
 * 绑定响应事件
 */
function bindAction() {
    window.addEventListener('click', function(e) {
        const btn = e.path[0];
        if (btn.tagName === 'BUTTON') {
            const value = btn.value;
            if (Number(value) >= 0) {
                getResult(value);
            } else {
                clearResult();
            }
        }
    });
}

/**
 * 切换加载状态
 */
function changeLoadingStatus() {
    isLoading = !isLoading;
    if (isLoading) {
        showLoadingText();
    } else {
        hideLoadingText();
    }
}

/**
 * 显示加载文案
 */
function showLoadingText() {
    getDom('#loadingText').style.display = 'inline';
}

/**
 * 隐藏加载文案
 */
function hideLoadingText() {
    getDom('#loadingText').style.display = 'none';
}
