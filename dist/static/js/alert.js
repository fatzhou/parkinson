function myAlert(options) {
    if (!(this instanceof myAlert)) {
        return new myAlert(options);
    } else {
        this.init(options);
    }
}

myAlert.prototype = {
    init: function(opt) {
        if(!(opt instanceof Object)) {
          opt = {
            str: opt
          };
        }
        var self = this;
        var mask = $('.ui-dialog-mask');
        if (!mask.size()) {
            this.mask = $('<div class="ui-dialog-mask"/>');
            $('body').append(this.mask);
        } else {
          this.mask = mask;
        }
        var content = $('.ui-dialog-content');
        if (!content.size()) {
            var str = [
                '<div class="ui-dialog-content">',
                  '<p class="content" id="dialog-content">' + opt.str + '</p>',
                  '<div class="buttons">',
                  ' <div class="confirm-button" id="confirm-click-button">确定</div>',
                  '</div>',
                '</div>'
            ].join('');
            this.content = $(str);
            $('body').append(this.content);
            this.contentArea = $('#dialog-content');
            this.confirmBtn = $('#confirm-click-button');
            this.confirmBtn.click(function() {
              self.hide();
              opt.callback && opt.callback();
            });
        } else {
          this.content = content;
          this.contentArea = $('#dialog-content');
          this.contentArea.html(opt.str);
        }
        this.show();
    },
    show: function() {
      this.mask.show();
      this.content.show();
    },
    hide: function() {
      this.mask.hide();
      this.content.hide();
    }
}

module.exports = myAlert;
