(async function() {
    try {
        const response = await fetch(document.getElementsByClassName("select-grid")[0].attributes.url.value);
        const cards = await response.json();

        document.querySelector('.select-grid').innerHTML = cards.map(card => `
            <a href="${card.href}" class="select-card" target="_blank">
                <div class="select-content">
                    <h2 class="truncate-text">${card.title}</h2>
                    <p>${card.desc}</p>
                </div>` + (card.imgSrc ? `
            <div class="select-image">
                <img src="${card.imgSrc}" alt="${card.alt}" />
            </div>` : '') +
            `</a>
    `).join('');
    } catch (error) {
        console.error('加载卡片失败:', error);
        // 可以显示错误提示或默认内容
    }
})()