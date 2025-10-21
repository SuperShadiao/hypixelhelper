document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
        fetch('/sitesources/html/header.html'),
        fetch('/sitesources/html/footer.html')
    ]).then(([headerResponse, footerResponse]) => {
        if (!headerResponse.ok || !footerResponse.ok) {
            throw new Error('Network response was not ok');
        }
        return Promise.all([headerResponse.text(), footerResponse.text()]);
    }).then(([headerData, footerData]) => {
        document.body.innerHTML = `<div id='main-content'>${document.body.innerHTML}</div><div id='foot-placeholder'></div>`;

        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerData;
        }
        const footPlaceholder = document.getElementById('foot-placeholder');
        if (footPlaceholder) {
            footPlaceholder.innerHTML = footerData;
        }

        getFooterHeight(true);
    }).catch(error => {
        console.error('Error loading header:', error);
    }).finally(() => {
        const funcCallback = window.headerLoadedCallback
        if (funcCallback && typeof funcCallback === 'function') {
            funcCallback();
        }
    });
});
window.addEventListener('resize', () => getFooterHeight(false));

// ======================================================

function getFooterHeight(checkCSS) {
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('foot-placeholder');

    if (!mainContent || !footer) return;

    if (checkCSS && !isFooterCSSLoaded()) {
        try {
            requestAnimationFrame(() => getFooterHeight(true));
        } catch (error) {
            console.error('无法通过调用样式表获取页脚高度 :(', error);
            setTimeout(() => getFooterHeight(false), 100);
        }
        return;
    }
    // 计算页脚高度
    const footerHeight = footer.offsetHeight;

    // 设置main-content的最小高度
    mainContent.style.minHeight = `calc(100vh - ${footerHeight}px)`;

    if(document.styleSheets)

    return footerHeight;
}

function isFooterCSSLoaded() {
    for (let sheet of document.styleSheets) {
        if (sheet.href && sheet.href.includes('footer.css')) {
            return true;
        }
    }
    return false;
}