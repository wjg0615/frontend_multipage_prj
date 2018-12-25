/**
 * cookie操作方法
 */
class Cookies {

    get(name) {
        if (document.cookie.length > 0) {
            let start = document.cookie.indexOf(name + '=');
            if (start != -1) {
                start = start + name.length + 1;
                let end = document.cookie.indexOf(';', start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }

    set(name, value, expiredays) {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + ';path=/';
    }

}

export default Cookies;