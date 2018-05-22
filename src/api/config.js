var ipconfi = {
	fx: 'http://192.168.23.79:8086/marketing/', //费新伟
	//zhf: 'http://192.168.23.47:8086/marketing/', //张秀芳
	test: 'http://172.16.10.176:8081/marketing/',
    //zhf:'http://192.168.21.225:8086/marketing' //
    huang: '/microcredit'
}

var cfg = {
    dev: 'http://192.168.21.178:8080/microcredit', //huang--代理
//  dev: 'http://192.168.21.145:8080/microcredit',//陶辉
//  dev: 'http://172.16.10.179:8081/microcredit', //test
//  dev: 'http://192.168.21.39:8080/microcredit', //张琪
//     dev: 'http://192.168.23.79:8080/microcredit', //费新伟
//     dev: 'http://116.236.220.213:18881/microcredit',    //sit

//
//http://172.16.10.179:8081
    pro: '/microcredit',
    //dev_download: 'http://puhui8888.6655.la:8081/eqpt',
    dev_download: ipconfi.huang, //dev_download登录图形验证码地址
//  dev_download: ipconfi.fx, //dev_download登录图形验证码地址
    pro_download: '/microcredit',
    dev_baseurlVerifyImg: ipconfi.huang,
    pro_baseurlVerifyImg: '/',
};

var base_url = '';
var base_url_download = '';
var baseurlVerifyImg = '';
switch (process.env.NODE_ENV) {
    case "development":
        base_url = cfg.dev;
        base_url_download = cfg.dev_download;
        baseurlVerifyImg = cfg.dev_baseurlVerifyImg
        break;
    case "testing":
        base_url = cfg.dev;
        base_url_download = cfg.dev_download;
        baseurlVerifyImg = cfg.dev_baseurlVerifyImg
        break;
    case "production":
        base_url = cfg.pro;
        base_url_download = cfg.pro_download;
        baseurlVerifyImg = cfg.pro_baseurlVerifyImg
        break;
}

export const baseURL = base_url
export const baseURLDownload = base_url_download
export const baseURLVerifyImg = baseurlVerifyImg
