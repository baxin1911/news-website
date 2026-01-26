if (!window.location.hash) history.replaceState(null, '', `#${document.querySelector('[data-mdb-tab-init].active').id}`);

document.querySelectorAll('[data-mdb-tab-init]').forEach(tabElement => {
    tabElement.addEventListener('shown.mdb.tab', (e) => {
        history.replaceState(null, '', `#${e.target.id}`);
    });
});

const activeTabFromHash = () => {
    const hash = window.location.hash;

    if (!hash) return;

    const tabButton = document.querySelector(`${ hash }`);

    if (!tabButton) return;

    if (window.mdb) {

        const tabInstance = mdb.Tab.getOrCreateInstance(tabButton);
        tabInstance.show();

    } else if (window.bootstrap) {

        const tabInstance = new bootstrap.Tab(tabButton);
        tabInstance.show();
    }
}

activeTabFromHash();

window.addEventListener('hashchange', activeTabFromHash);