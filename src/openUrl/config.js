var ipconfi = {
	fx: 'http://192.168.23.79:8086/marketing', //费新伟
	zhf: 'http://192.168.23.47:8086/marketing', //张秀芳
	test: 'http://172.16.10.176:8082/marketing/',
	
}

var cfg = {
    dev: '/', //测试服--代理
    dev: '/microcredit', //测试服--代理
    pro: '/microcredit',
    //dev_download: 'http://puhui8888.6655.la:8081/eqpt',
    dev_download: ipconfi.test, //dev_download登录图形验证码地址
    dev_download: ipconfi.zhf, //dev_download登录图形验证码地址
    pro_download: '/microcredit',
    dev_baseurlVerifyImg: 'http://puhui8888.6655.la:8081',
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
//新页面在新窗口打开
let open_url = {
	commonDetail: baseURL + '/#/detail/custDetail',
	investDetail: baseURL + '/#/investDetail',
	commonDetailInvest: baseURL + '/#/commonDetailInvest',
}

export default { 
	openCommonDetail() {
		window.open(open_url.commonDetail)
	},
	openDetail() {
//		window.location.href = open_url.investDetail
		window.open(open_url.investDetail)
	},
	commonDetailInvest() {
		window.open(open_url.commonDetailInvest)
	},
}
