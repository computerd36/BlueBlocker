function styler(div) {
    div.style.color = 'black';
    div.style.width = '100%';
    div.style.height = '3rem';
    div.style.textAlign = 'center';
    div.style.fontWeight = 'bold';
    div.style.fontSize = '0.75rem';
    div.style.fontFamily = 'sans-serif';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.opacity = '0.8';
    div.style.backgroundColor = '#e5e5f7';
    div.style.backgroundImage = 'repeating - linear - gradient(45deg, #444cf7 25 %, transparent 25 %, transparent 75 %, #444cf7 75 %, #444cf7), repeating - linear - gradient(45deg, #444cf7 25 %, #e5e5f7 25 %, #e5e5f7 75 %, #444cf7 75 %, #444cf7)';
    div.style.backgroundPosition = '0 0, 10px 10px';
    div.style.backgroundSize = '20px 20px';
}


function noBlueTweets() {
    browser.storage.local.get('enabled').then((res) => {
        if (res.enabled === true) {

            let count = 0;
            if (window.location.href.includes('/status/')) {

                let divsWithSvgTemp = document.querySelectorAll('div[data-testid="cellInnerDiv"]:not([style*="transition: transform 0.3s ease-out 0s"])');

                // let divsWithSvgTemp = document.querySelectorAll('div[data-testid="cellInnerDiv"]:not([style*="transition: transform 0.3s linear 0s"])');


                let divsWithIconVerifiedTemp = Array.from(divsWithSvgTemp).filter((div) => {
                    if (div.getAttribute("style").includes('transform: translateY(0px);')) {
                        return false;
                    }

                    let svgElement = div.querySelector(':scope svg[data-testid="icon-verified"]');
                    if (svgElement) {
                        let pathElement = svgElement.querySelector('path');
                        if (pathElement && getComputedStyle(pathElement).color === 'rgb(29, 155, 240)') {
                            return true;
                        }
                    }
                    return false;
                });

                for (let i = 0; i < divsWithIconVerifiedTemp.length; i++) {
                    divsWithIconVerifiedTemp[i].innerHTML = "There was Twitter blue tweet here, but we'll spare you that";
                    divsWithIconVerifiedTemp[i].setAttribute('data-testid', 'cellInnerDivEdited');
                    styler(divsWithIconVerifiedTemp[i]);
                    count++;
                }
                browser.storage.local.get('count').then((res) => {
                    let currentCount = res.count;
                    if (currentCount === undefined) {
                        browser.storage.local.set({ "count": 0 });
                    }
                    let newCount = currentCount + count;
                    if (newCount > res.count) {
                        browser.storage.local.set({ "count": newCount });
                    }
                });
            }

            divsWithSvgTemp = null;
            divsWithIconVerifiedTemp = null;
        }
    });
}






window.addEventListener('locationchange', function (event) {
    noBlueTweets();
});

// setInterval(noBlueTweets, 1000);

document.addEventListener('scroll', function (event) {
    setInterval(noBlueTweets, 200);
});

document.addEventListener("load", noBlueTweets(), false);


