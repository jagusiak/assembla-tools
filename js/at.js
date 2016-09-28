(function() {
  
  var that = {
    toolbar : null,
    hideEmptyButton : null,
    showAllButton: null,
    clickHideButton: null,
    clickHide: false,
    tooltip : null
  };
  
  that.init = function() {
    var pointer = $('.float-right .text-icon'),
      offset = pointer.offset();
      
    if (pointer.length) {
    
      offset.left += pointer.outerWidth() - 130;
      
      that.toolbar = $('<div id="acm-toolbar"></div>'); 
      $(document.body).append($(that.toolbar));
      that.toolbar.offset(offset);
    
      $(window).resize(function() {
        var offset = pointer.offset();
        offset.left += pointer.outerWidth() - 130;
        that.toolbar.offset(offset);
      });
    
      that.initHideEmptyButton();
      that.initShowAllButton();
      that.initClickHideButton();
      that.initTooltip();
      that.initHeaderClick();
    };
    
    
    that.initDOMListener();
  };
  
  that.initHideEmptyButton = function() {
    that.hideEmptyButton = $('<div alt="Hide all empty columns" class="acm-button">▢</div>');
    that.toolbar.append(that.hideEmptyButton);
    that.hideEmptyButton.click(function() {
      $('.cw-content').each(function(i, e) {
        var element = $(e);
        if (!(element.find('div').length)) {
          element.parent().hide();
          element.addClass('acm-hidden');
          that.showAllButton.removeClass('inactive');
        }
      });
    });  
  };
  
  that.initShowAllButton = function() {
    that.showAllButton = $('<div alt="Show all columns (unhide)" class="acm-button">▣</div>');
    that.toolbar.append(that.showAllButton);
    that.showAllButton.addClass('inactive');
    that.showAllButton.click(function() {
      $('.acm-hidden').each(function(i, e) {
        var element = $(e);
        element.parent().show();
        $(e).addClass('acm-hidden');
      });
      that.showAllButton.addClass('inactive');
    });
  };
  
  that.initClickHideButton = function() {
    that.clickHideButton = $('<div alt="Hide by clicking header" class="acm-button">↖</div>');
    that.toolbar.append(that.clickHideButton);
    that.clickHideButton.click(function() {
      that.clickHide = !that.clickHide;
      if (that.clickHide) {
        that.clickHideButton.addClass('active');
      } else {
        that.clickHideButton.removeClass('active');
      }
    });
  };
  
  that.initHeaderClick = function() {
    $('.cw-header').click(function() {
      if (that.clickHide) {
        var element = $(this); 
        element.parent().hide();
        element.addClass('acm-hidden');
        that.showAllButton.removeClass('inactive');
      }
    });
  };
  
  that.initTooltip = function() {
    that.tooltip = $('<div class="acm-tooltip"></div>');
    that.toolbar.append(that.tooltip);
    that.tooltip.hide();
    $('.acm-button').mouseover(function() {
      var offset = $(this).offset(),
        text = $(this).attr('alt');
      offset.top += 28;
      that.tooltip.show();
      that.tooltip.offset(offset);
      that.tooltip.html(text);
    });
    $('.acm-button').mouseout(function() {
      that.tooltip.hide();
    });
  };
  
  that.initDOMListener = function() {
    $("body").bind("DOMSubtreeModified", function() {
      if($("#ticket_description_toolbar").length) {
        if (!$("#ticket_description_toolbar #acm-dc").length) {
          var dcButton = $('<a href="#" id="acm-dc" title="Developer\'s comments">💉</a>');
          dcButton.click(function() {
            var textArea = $(this).parent().parent().find('textarea');
            at.getTemplate(function(template) {
              textArea.text(textArea.text() + template);  
            });
            return false;
          });
          $("#ticket_description_toolbar").append(dcButton);
        }
      }
      
    });
  };

  $(document).ready(function() {
    that.init();
  });  
  
})();