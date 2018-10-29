
module.exports =  {
        verifyNum(num){
            return /^[1-9]\d{0,}$/.test(num)
        },
        // 随机字符串
        randomString : function(num) {
            // var possibleCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            var possibleCode = "abcdeimnorstuvwxz1234567890";
            var randStr = "";
            for( var i = 0; i < num; i++ )  randStr += possibleCode.charAt(Math.floor(Math.random() * possibleCode.length));
            
            return randStr;
        },
        // 随机数字字符
        randomNumberString : function(num) {
            var possibleCode = "1234567890";
            var randStr = "";
            for( var i = 0; i < num; i++ )  randStr += possibleCode.charAt(Math.floor(Math.random() * possibleCode.length));
            return randStr;
        },
        // 随机字母字符
        randomLowercaseString : function(num) {
            var possibleCode = "abcdefghijklmnopqrstuvwxyz";
            var randStr = "";
            for( var i = 0; i < num; i++ )  randStr += possibleCode.charAt(Math.floor(Math.random() * possibleCode.length));
            return randStr;
        },
        // 验证用户名
        verifyEmail(email){
            if(!email) return false;
            return email && /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) ? true:false;
        },
        // 验证密码  特殊符号、大写、小写、数字 至少两种 6-20位
        verifyPassword(password){
                if(!password) return false;
                //验证密码强度
                var reg = /^(\d|\w|[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]){6,20}$/
                if(!(reg.test(password))) return false;
                var regArr = [];
                var count = 0;
                regArr.push(/[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/); //匹配半角符号
                regArr.push(/[a-z]/);
                regArr.push(/[A-Z]/);
                regArr.push(/[0-9]/);
                regArr.forEach((v,i)=>{
                    if(v.test(password)){
                        count++;
                    }
                })
                if(count<2) {
                    return false;
                } else {
                    return true;
                }
        },
            // 生成用户角色名
        getRoleName(){
                var word = '';
                var number = '';
                for(var i=0;i<2;i++){
                    var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
                    word += (String.fromCharCode(97+ranNum)); //65=A
                }
                for(var i=0;i<7;i++){
                    number += Math.ceil(Math.random()*9); //65=A
                }
                return  word + number;
        },
        //检测vote是否符合格式
        testVote(vote){
                let reg = /^[ei][sn][tf][jp]$/
                return vote && reg.test(vote) ? true:false
        },
        //处理r_name 去空白 1~12位的中文、英文、数字、下划线
        roleName(r_name){
                // var reg = /^[\w\u4e00-\u9fa5]{1,12}$/
                var reg = /^[\u4e00-\u9fa5A-Za-z0-9-_]{1,12}$/
                return r_name && reg.test(r_name) ? true:false
        },
        // 去除两端空白 中间空白合并..
        strTrim(str){
            if(str && typeof(str)==='string'){
                str = str.replace(/[\s\r\n]+/g,' ')
                return str.trim()
            }else{
                return ''
            }
        },
        // 判断字节数(utf8)
        strLength(s) { 
            var totalLength = 0; 
            var charCode; 
            for (let i = 0; i < s.length; i++) { 
                charCode = s.charCodeAt(i); 
                if (charCode <= 127) { 
                    totalLength = totalLength + 1; 
                } else if ((charCode>127) && (charCode <= 2047)) { 
                    totalLength += 2; 
                } else if ((charCode>2047) && (charCode <= 65535)) { 
                    totalLength += 3; 
                } else if ((charCode>65535) && (charCode <= 2097152)) { 
                    totalLength += 4; 
                }  
            } 
            return totalLength; 
        } ,
        // 验证标签合法性  法定格式：'tag,tag'
        verifyTags(s){
            var reg = /^[\u4e00-\u9fa5A-Za-z0-9]+$/
            if(!s || typeof s!=='string') return false
            s = s.trim()
            if(  s[s.length-1]===',' || s[0]===',') return false
            let tags = s.split(',')
            if(tags.length>9) return false //最多可添加9个
            for(let i=0;i<tags.length;i++){
                if( this.strLength(tags[i])>24 || !(reg.test(tags[i])) ){   //最大24个字符
                    return false
                }
            }
            return true
        },
        // 切割指定字节长度的字符串
        splitStr(s,bytes=365){
            if(typeof s !=='string') return
            var totalLength = 0; 
            var charCode; 
            for (let i = 0; i < s.length; i++) { 
                charCode = s.charCodeAt(i); 
                if (charCode <= 127) { 
                    totalLength = totalLength + 1; 
                } else if ((charCode>127) && (charCode <= 2047)) { 
                    totalLength += 2; 
                } else if ((charCode>2047) && (charCode <= 65535)) { 
                    totalLength += 3; 
                } else if ((charCode>65535) && (charCode <= 2097152)) { 
                    totalLength += 4; 
                }  
                if(totalLength>bytes){
                    return s.substr(0,i)+'...'
                }
            } 
            return s; 

        }

}