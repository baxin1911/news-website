if (!window.location.hash) history.replaceState(null, '', `#${document.querySelector('[data-mdb-tab-init].active').id}`);

document.querySelectorAll('[data-mdb-tab-init]').forEach(tabElement => {
    tabElement.addEventListener('shown.mdb.tab', (e) => {
        history.replaceState(null, '', `#${e.target.id}`);
    });
});