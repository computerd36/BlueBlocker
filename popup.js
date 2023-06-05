browser.storage.local.get('count').then((res) => {
    let count = res.count;
    if (count > 1000) {
        document.getElementById('count').innerHTML = (Math.round((count / 1000)) + " tsd")
    } else if (count > 1000000) {
        document.getElementById('count').innerHTML = (Math.round((count / 1000000)) + " mil")
    } else {
        document.getElementById('count').innerHTML = res.count || 0;
    }
});



browser.storage.local.get('enabled').then((res) => {
    document.getElementById('enabler').checked = !res.enabled || false;
});

document.getElementById('enabler').addEventListener('change', function (event) {
    if (!event.checked) document.getElementById('reload').style.display = 'block';

    browser.storage.local.set({ "enabled": !event.target.checked });
    console.log(!event.target.checked);
});

document.getElementById('reload').addEventListener('click', function (event) {
    browser.tabs.reload();
    document.getElementById('reload').style.display = 'none';
});

// browser.storage.local.get('enabled').then((res) => {
//     document.getElementById('enabler').checked = res.enabled;
//     console.log(res.enabled);

// });


// document.getElementById('enabler').addEventListener('change', function (event) {
//     browser.storage.local.set({ "enabled": !event.target.checked });
//     console.log(!event.target.checked);
// });