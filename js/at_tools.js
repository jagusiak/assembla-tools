(function() {
  var that = this;
  
  that.init = function() {
    
    $('.menu').click(function() {
      var content = $(this).next(".content");
      content.css('display', content.css('display') == 'none' ? 'block' : 'none');
      at.getTemplate(function(template) {
        $('#template').text(template);  
      });
      
    });
    
    $('#save-template').click(function() {
      $('#menu-template').text("Szablon");
      at.setTemplate($('#template').val(), function() {
        $('#menu-template').text("Szablon (zapisano)");
      });
    });
  };
  
  
  $(document).ready(function() {
    that.init();
  });  
  
})();