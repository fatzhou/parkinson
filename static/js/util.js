var validator = {
    email: function(str) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    },
    telephone: function(str) {
        var re = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
        return re.test(str);
    }
};

function filteremoji(str){
    var ranges = [
        '\ud83c[\udf00-\udfff]',
        '\ud83d[\udc00-\ude4f]',
        '\ud83d[\ude80-\udeff]'
    ];
    return  str.replace(new RegExp(ranges.join('|'), 'g'), '');
}

var checkForm = function(data, attr, style) {
    attr = attr || 'status';
    style = style || 1;
    var flag = data.every(function(item, index) {
        var desc = (item.desc || item.question).replace('：', '');
        if (!item[attr] && !item.notneed) {
            if (style == 1) {
                alert('请填写' + desc);
            } else {
                alert('第' + (index + 1) + '题尚未回答');
            }
            $('li').get(index).scrollIntoView(true);
            return false;
        } else if (item.validate) {
            if (validator[item.validate] && item[attr] && !validator[item.validate](item[attr])) {
                alert('请填写正确的' + desc);
                $('li').get(index).scrollIntoView(true);
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

var api = {
    'host': 'http://120.27.25.118:1080',
    'Login': {
        url: '/service_im/doctorConfirm'
    },
    'PatientInfo': {
        url: '/service_im/upsertPatient'
    },
    'SickStatus': {
        url: '/service_im/upsertQuiz'
    },
    'DrugStatus': {
        url: '/service_im/upsertMed'
    },
    'FamilyMember': {
        url: '/service_im/upsertFamily',
        verifyCodeUrl: '/service_im/getSmscode',
        updateUrl: '/service_im/updatePatient'
    }
};

var storeData = {
    isLocalStorageSupported: function(){
      var testKey = 'test',
          storage = window.sessionStorage;
      try {
          storage.setItem(testKey, 'testValue');
          storage.removeItem(testKey);
          return true;
      } catch (error) {
          return false;
      }
    }(),
    storage: window.localStorage || null,
    set: function(key, items, attr) {
        attr = attr || 'status';
        var data = [];
        if (Object.prototype.toString.call(items).toLowerCase().indexOf('array') > -1) {
            items.forEach(function(item) {
                data.push(item[attr]);
            });
        } else {
            data = items[attr];
        }
        data = JSON.stringify(data);
        if (this.isLocalStorageSupported) {
            this.storage.removeItem(key);
            this.storage.setItem(key, data);
        } else {
            var str = key + "=" + encodeURIComponent(data) + ";";
            document.cookie = str;
        }
    },
    get: function(key, items, attr) {
        var data = '';
        attr = attr || 'status';

        if (this.isLocalStorageSupported) {
            data = this.storage.getItem(key);
        } else {
          var cookie = document.cookie;
           var index = cookie.indexOf(key + "=");
           if(index > -1) {
             var start = index + key.length + 1,
                end = cookie.indexOf(";", start);
             end == -1 && (end = cookie.length);
             data = cookie.substring(start, end);
           }
           data = decodeURIComponent(data);
        }
        if (data) {
            try {
                data = JSON.parse(data);
                console.log(3,data)
            } catch (e) {
                data = eval('(' + data + ')');
                console.log(4, data)
            }

            if (Object.prototype.toString.call(data).toLowerCase().indexOf('array') > -1) {
                items.forEach(function(item, index) {
                    item[attr] = data[index];
                })
            } else {
                items[attr] = data;
            }
        }
    },
    clear: function() {
      if(this.isLocalStorageSupported) {
        this.storage.clear();
      } else {
        var cookie = document.cookie;
        var keys = cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (var i = keys.length; i--;) {
            document.cookie = keys[i]+'=0;expires=' + new Date( 0).toUTCString()
          }
        }
      }
    }
};

module.exports = {
    validator: validator,
    checkForm: checkForm,
    storeData: storeData,
    api: api,
    filteremoji: filteremoji
}
