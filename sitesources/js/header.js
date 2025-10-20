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

        setTimeout(() => {
            getFooterHeight();
        }, 100);
    }).catch(error => {
        console.error('Error loading header:', error);
    });
});
window.addEventListener('resize', getFooterHeight);

// ======================================================

function getFooterHeight() {
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('foot-placeholder');

    if (!mainContent || !footer) return;

    // 计算页脚高度
    const footerHeight = footer.offsetHeight;
    console.log(footerHeight);

    // 设置main-content的最小高度
    mainContent.style.minHeight = `calc(100vh - ${footerHeight}px)`;
}