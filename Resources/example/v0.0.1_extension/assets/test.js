
    function changeBackgroundColor() {
        document.body.style.backgroundColor = "red";
        alert("test");
      }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          function: changeBackgroundColor
        });
      });