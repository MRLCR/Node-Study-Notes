const fs = require('fs');
const vm = require('vm');

// 模板缓存
const templateCache = {};

// node api link: "https://nodejs.cn/api/vm.html#vm_vm_createcontext_sandbox_options"
const templateContext = vm.createContext({
    include: function (name, data) {
        const template = templateCache[name] || createTemplate(name);
        return template(data);
    }
});

/**
 * 创建模板
 * @param {string} templatePath 模板路径
 */
function createTemplate(templatePath) {
    templateCache[templatePath] = vm.runInContext(
        `(function (data) {
            with (data) {
                return \`${fs.readFileSync(templatePath, 'utf-8')}\`
            }
        })`,
        templateContext,
    );

    return templateCache[templatePath];
}

module.exports = createTemplate;
