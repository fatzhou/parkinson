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
        function checkEmoji(str) {
          var reg = /[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|\uD83C\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uD83C\uDDFE\uD83C[\uDDEA\uDDF9]|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDFC\uD83C[\uDDEB\uDDF8]|\uD83C\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uD83C\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF8\uDDFE\uDDFF]|\uD83C\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uD83C\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uD83C\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uD83C\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uD83C\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uD83C\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uD83C\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uD83C\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uD83C\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uD83C\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uD83C\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uD83C\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uD83C\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uD83C\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uD83C\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uD83C\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|[#\*0-9]\u20E3/g;
          return reg.test(str);
        };
        if(checkEmoji(item[attr])) {
          alert('您输入的' + desc + '含有表情符号');
          $('li').get(index).scrollIntoView(true);
          return false;
        }
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
    'host': 'http://ruiyun.gyenno.com',
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
    storage: window.sessionStorage || null,
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
