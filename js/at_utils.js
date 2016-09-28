at = (function() {
  
  var DEFAULT_TEMPLATE = '\n\n*Od DEVELOPERA*\n\nBRAK\n\n*Dla TESTERA:*\n\nBRAK\n\n*XML/Settings:*\n\nBRAK\n\n*Tłumaczenia:*\n\nBRAK\n';
  
  function sendMessage(data, callback) {
    chrome.runtime.sendMessage(data, callback);
  }
  
  return {
    setTemplate: function(template, callback) {
      sendMessage({action: 'setTemplate', template: template}, callback);
    },
    getTemplate: function(callback) {
      sendMessage({action: 'getTemplate'}, function(template) {
        callback(template ? template : DEFAULT_TEMPLATE);
      });
    },
    
  };
  
})();