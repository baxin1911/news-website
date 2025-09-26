const input = document.getElementById('textSearchOffcanvasInput');
const btn = document.getElementById('searchOffcanvasBtn');

input.addEventListener('input', () => {
    btn.disabled = input.value.trim() === '';
});

const input2 = document.getElementById('textSearchHeaderInput');
const btn2 = document.getElementById('searchHeaderBtn');

input2.addEventListener('input', () => {
    btn2.disabled = input2.value.trim() === '';
});