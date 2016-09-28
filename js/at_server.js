(function() {
    
    
    function init() {   
        chrome.runtime.onMessage.addListener(callFunction);
    }
    
    function callFunction(message, sender, callback) {
      switch (message.action) {
        case 'setTemplate':
          console.log(message.template);
          window.localStorage.setItem('template', message.template);
          callback();
          break;
        case 'getTemplate':
          var template = window.localStorage.getItem('template');
          callback(template);
          break;
      }
    }
    
    init();
    
})();