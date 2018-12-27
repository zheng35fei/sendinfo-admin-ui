const c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//系数
const b = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];//校验码对照表
const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;

function IdentityCodeValid(id) {
    let tip = '';
    let pass = true;
    try {
        //号码规则校验
        if (!format.test(id)) {
            tip = '身份证号码不合规';
            pass = false;
        }
        //出生年月日校验，前正则限制起始年份为1900;
        let year = id.substr(6, 4),//身份证年
            month = id.substr(10, 2),//身份证月
            date = id.substr(12, 2),//身份证日
            time = Date.parse(month + '-' + date + '-' + year),//身份证日期时间戳date
            now_time = Date.parse(new Date()),//当前时间戳
            dates = (new Date(year, month, 0)).getDate();//身份证当月天数
        if (time > now_time || date > dates) {
            tip = '出生日期不合规';
            pass = false;
        }
        //校验码判断
        const id_array = id.split('');
        let sum = 0;
        for (let k = 0; k < 17; k++) {
            sum += parseInt(id_array[k]) * parseInt(c[k]);
        }
        if (id_array[17].toUpperCase() !== b[sum % 11].toUpperCase()) {
            tip = '身份证校验位不合规';
            pass = false;
        }
    } catch (e) {
        tip = '身份证格式错误';
        pass = false;
    }
    //if (!pass) alert(tip);
    return pass ? pass : tip;
}

/**
 * 通过身份证获取年龄
 * @return {number}
 */
function GetAge(identityCard) {
    let len = (identityCard + '').length;
    if (len === 0) {
        return;
    } else {
        if ((len !== 15) && (len !== 18))//身份证号码只能为15位或18位其它不合法
        {
            return;
        }
    }
    let strBirthday = '';
    if (len === 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + '/' + identityCard.substr(10, 2) + '/' + identityCard.substr(12, 2);
    }
    if (len === 15) {
        strBirthday = '19' + identityCard.substr(6, 2) + '/' + identityCard.substr(8, 2) + '/' + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
 *  非法数据校验
 * @param val
 */
function illegalChar(val) {
    let tip = '';
    let pass = true;
    let illegalStr = /select|update|delete|exec|count|’|"|=|;|>|<|%|script/i;
    if (illegalStr.test(val)) {
        tip = '输入数据非法';
        pass = false;
    }
    return pass ? pass : tip;
}

/**
 *  手机号码校验
 * @param val
 */
function mobileValid(val) {
    let tip = '';
    let pass = true;
    let mobileStr = '^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\\\d{8}$';
    if (mobileStr.test(val)) {
        tip = '输入的手机号码有误';
        pass = false;
    }
    return pass ? pass : tip;
}

export default {
    IdentityCodeValid,
    illegalChar,
    GetAge,
    mobileValid
}
