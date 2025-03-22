console.log("popup.js");

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getMessage") {
        if (request.message) {
            alert("User is typing: " + request.message);
        } else {
            alert("No message found.");
        }
    }
});


chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "instagram DM opened") {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: function() {
                    // Find the Instagram message input field
                    var inputField = document.querySelector('.x3jgonx');

                    if (inputField) {
                        // Extract the text inside the input field
                        var typedMessage = inputField.innerText || inputField.value || "";
                        chrome.runtime.sendMessage({ action: "getMessage", message: typedMessage });
                    } else {
                        chrome.runtime.sendMessage({ action: "getMessage", message: null });
                    }
                }
            }).then(() => console.log("Script injected"));
        });
    }
});