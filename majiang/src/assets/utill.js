export default {
        // 去除两端空白 中间空白合并..
        strTrim(str){
            if(str && typeof(str)==='string'){
                str = str.replace(/[\s\r\n]+/g,' ')
                return str.trim()
            }else{
                return str +''
            }
        },
        reg:{
            tag:/<\/?.+?\/?>/g, //替换标签
            iframe:/<\s?iframe[^>]*><\/iframe>/, //匹配指定标签 [^>] 排除
        },
        // 超出字节数裁剪 params [string,number]
        tooLongTrim(s,num) { 
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
                if(totalLength>num){
                    return s.substr(0,i)
                }
            } 
            return s; 
        } , 
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
        // verifyTags(s){
        //     var reg = /^[\u4e00-\u9fa5A-Za-z0-9]{1,12}$/
        //     if( !s || typeof s!=='string' || s[s.length-1]!==',' || s[0]===',') return false
        //     let tags = s.split(',')
        //     for(let i=0;i<tags.length;i++){
        //         if( this.strLength(tags[i])>24 || !(ret.test(tags[i])) ){
        //             return false
        //         }
        //     }
        //     return true
        // }
} 