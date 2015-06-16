var baseUrl = 'http://127.0.0.1:8080/code';
function handleClickGet(operation, form) {
    var url = baseUrl;
    if (undefined !== form.major.value && '' !== form.major.value) {
        url += '/' + form.major.value;
        if (undefined !== form.minor.value && '' !== form.minor.value) {
            url += '/' + form.minor.value;
            console.log(form.description.value)
            if (operation === 'PUT' && '' !== form.description.value) {
                url += '/' + form.description.value;
            }
            console.log(operation +' : ' + url);
        }
    }
    sendWithAjax(operation, url);
    return false; // prevent further bubbling of event
}

function sendWithAjax(operation, url) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() { processContents(httpRequest); };
    httpRequest.open(operation, url, true);
    httpRequest.send(null);
}
function processContents(httpRequest) {
    if (httpRequest.readyState == 4) {
        if ((httpRequest.status == 200) || (httpRequest.status == 0)) {
            document.getElementById('outputText').value = JSON.stringify(JSON.parse(httpRequest.responseText), null, 2);
        } else {
            document.getElementById('outputText').value = 'There was a problem with the request.\r\n' + httpRequest.status + ' : ' + httpRequest.responseText;
        }
    }
}