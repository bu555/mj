const verify = {
    // 验证用户名
    email(email){
        return email && /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email) ? true:false;
    },
    // 验证密码
    password(password){
            if(!password) return false;
            //验证密码强度
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
            if((password.length<6 || password.length>24) || count<2) {
                return false;
            } else {
                return true;
            }
    },
}

export default verify