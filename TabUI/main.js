const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy ra các phần tử có class "tab-item" và "tab-pane"
const tabItems = $$('.tab-item');
const tabPanes = $$('.tab-pane');

// Lấy ra phần tử "line" trong .tabs
var line = $('.tabs .line');

// Hàm để cập nhật vị trí và kích thước của line
function updateLine(tab, line) {
    line.style.left = tab.offsetLeft + 'px';
    line.style.width = tab.offsetWidth + 'px';
}

// Duyệt qua từng tab và lắng nghe sự kiện click
tabItems.forEach((tab, index) => {
    const pane = tabPanes[index];

    tab.onclick = function () {
        // Xóa class "active" nếu có trước đó
        $('.tab-item.active').classList.remove('active');
        $('.tab-pane.active').classList.remove('active');

        // Cập nhật vị trí và kích thước của line dựa trên tab mới
        updateLine(tab, line);

        // Thêm class "active" cho tab và pane mới
        tab.classList.add('active');
        pane.classList.add('active');
    };
});
