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
        renderAccountArea();
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

// 账号服务地址：本地调试指向 localhost:3000，线上指向账号站域名
const PASSPORT_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://passport.xiaoshadiao.club';

function renderAccountArea() {
    const area = document.getElementById('account-area');
    if (!area) return;

    const base = area.dataset.passportBase || PASSPORT_BASE;
    const link = document.createElement('a');
    link.className = 'remove-decoration';

    fetch(base + '/api/auth/me', { credentials: 'include' })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
            const user = data && data.data && data.data.user;
            if (user) {
                const initial = (user.email || '?').charAt(0).toUpperCase();
                link.className = 'remove-decoration account-avatar';
                link.href = base + '/dashboard.html';
                link.title = user.email;
                if (user.avatarUrl) {
                    const img = document.createElement('img');
                    img.src = base + user.avatarUrl;
                    img.alt = '';
                    img.onerror = () => {
                        img.remove();
                        link.textContent = initial;
                    };
                    link.appendChild(img);
                } else {
                    link.textContent = initial;
                }
            } else {
                link.className = 'remove-decoration account-login';
                link.href = base + '/login.html';
                link.textContent = '登录';
            }
            area.appendChild(link);
        })
        .catch(() => {
            // 账号服务不可用时保持安静，不显示入口
        });
}