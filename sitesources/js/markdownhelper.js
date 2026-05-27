window.xsdMarkdown = {
    parse: function (markdownText) {
        const rawHtml = marked.parse(markdownText); // 将 Markdown 转换为 HTML 字符串
        const cleanHtml = DOMPurify.sanitize(rawHtml); // 过滤掉潜在的 XSS 攻击代码

        const temp = document.createElement('div');
        temp.innerHTML = cleanHtml;

        // 高亮 code
        temp.querySelectorAll('code').forEach(block => {
            const lang = block.className.replace('language-', '');
            if (hljs.getLanguage(lang)) {
                block.innerHTML = hljs.highlight(block.textContent, {
                    language: lang
                }).value;
            }
        });

        return temp.innerHTML;
    },

    attachToElement: function (element, markdownText) {
        if(typeof(element) === 'string' || element instanceof String) {
            element = document.getElementById(element);
        }
        const html = xsdMarkdown.parse(markdownText);
        element.innerHTML = html;
    }
}