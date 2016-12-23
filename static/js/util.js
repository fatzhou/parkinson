var validator = {
  email: function(str) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  },
  telephone: function(str) {
    var re = /^0?1[3|4|5|8][0-9]\d{8}$/;
    return re.test(str);
  }
};

var checkForm = function(data, attr) {
  attr = attr || 'status';
    var flag = data.every(function(item, index) {
      var desc = (item.desc||item.question).replace('：','');
      // console.log(item.status)
      if(!item.status && !item.notneed) {
        alert('请填写' + desc);
        return false;
      } else if(item.validate) {
        if(validator[item.validate] && !validator[item.validate](item.status)) {
          alert('请填写正确的' + desc);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    });
    return flag;
}

var storeData = {
  storage: window.localStorage || null,
  set: function(key, items, attr) {
    attr = attr || 'status';
    if(this.storage) {
      var data = [];
      items.forEach(function(item) {
        data.push(item[attr]);
      });
      this.storage.setItem(key, JSON.stringify(data));
    }
  },
  get: function(key, items, attr) {
    if(this.storage) {
      attr = attr || 'status';
      var data = this.storage.getItem(key);
      if(data) {
        try {
          data = JSON.parse(data);
        } catch(e) {
          data = eval('(' + data + ')');
        }
        items.forEach(function(item, index) {
          item[attr] = data[index];
        })
        // console.log(items,attr)
      }
    }
  },
  clear: function() {
    this.storage.clear();
  }
};

module.exports = {
  validator: validator,
  checkForm: checkForm,
  storeData: storeData
}
