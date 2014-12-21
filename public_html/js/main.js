function initMboxOverlay() {
    var body = document.getElementsByTagName("body")[0],
        mb,
        domElm,
        domElmId = "fullscreen-modal-mbox";

    try {
        /* add an overlay to the entire page */
        domElm = document.createElement("div");
        domElm.className = "fullscreen-modal-mbox";
        domElm.id = domElmId;
        domElm.style.width = body.clientWidth + "px";
        domElm.style.height = body.clientHeight + "px";

        body.appendChild(domElm);

        /* init the mysterybox */
        mb = new window.MYSTERYBOX({
            "domElmId": domElmId
        });
        mb.renderMsg();
        mb.dissolve({
            "charactersPerThread":500,
            "callbackDelayMilliseconds": 2000,
            "callback": function() {
                displaycontent(body);
                mb.resolveByColumn({
                    "threads": Math.ceil(mb.cols/75),
                    "intervalMilliseconds": Math.ceil(1000/mb.rows),
                    "callback": function() {
                        body.removeChild(domElm);
                    }
                });
            }       
        });
    } catch(e) {
        /* If something goes wrong make sure the content is displayed */
        displaycontent(body);
    }
};

function displaycontent(elm) {
    elm.className += " display-context";   
}
