var ossParam = {}

// /*
// accessid= 'LTAIXtzzxKiWP3By';
// accesskey= 'S0AhvjObf3DlKjIsfgY5UNgnTrBMTZ';
// host = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com';
//
//
// var policyBase64 = Base64.encode(JSON.stringify(policyText));
// message = policyBase64;
// var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
// var signature = Crypto.util.bytesToBase64(bytes)  */
function setParam (signature, policyBase64, accessid, host, dir) {
  ossParam.signature = signature
  ossParam.policyBase64 = policyBase64
  ossParam.accessid = accessid
  ossParam.host = host
  ossParam.dir = dir
}

function setUpload (browse_button, container, fileList, postfiles, resultPath) {
  var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: browse_button,
    // runtimes : 'flash',
    container: document.getElementById(container),
    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
    url: ossParam.host,
    rename: true,
    multipart_params: {
      'Filename': '/photo/',
      'key': ossParam.dir + '/' + timestamp() + '_${filename}',
      'policy': ossParam.policyBase64,
      'OSSAccessKeyId': ossParam.accessid,
      'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
      'signature': ossParam.signature
    },
    filters: {
      mime_types: [ // 只允许上传图片和zip文件
        {title: 'Image files', extensions: 'jpg,gif,png'}

      ],
      max_file_size: '10mb' // 最大只能上传400kb的文件
//            prevent_duplicates : true //不允许选取重复文件
    },
    /*   filters : [ {
           title : 'Image files',
           extensions : 'jpg,gif,png'
       }],  */
    multipart: true,
    multi_selection: false,
    unique_names: false, // 生成唯一文件名

    init: {
      PostInit: function () {
        document.getElementById(fileList).innerHTML = ''
        document.getElementById(postfiles).onclick = function () {
          if (uploader.files.length > 1) {
            uploader.files.splice(0, uploader.files.length - 1)
          }
          uploader.start()
          return false
        }
      },
      FilesAdded: function (up, files) {
        var file = files[files.length - 1]
        var file_list = document.getElementById(fileList)
        var chileDiv = file_list.getElementsByTagName('div')
        $(chileDiv).remove()
        file_list.innerHTML +=
          '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
          + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
          + '</div>'
        // file.name=timestamp()+'_'+file.name
        !function () {
          previewImage(file, function (imgsrc) {
            // console.log("previewImage......"+imgsrc);
            var fileObj = document.getElementById(file.id)
            $(fileObj).append('<img src=\'' + imgsrc + '\' />')
          })
        }(1)
        files.slice(0, files.length)
      },
      UploadProgress: function (up, file) {
        var d = document.getElementById(file.id)
        d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + '%</span>'

        var prog = d.getElementsByTagName('div')[0]
        var progBar = prog.getElementsByTagName('div')[0]
        progBar.style.width = 2 * file.percent + 'px'
        progBar.setAttribute('aria-valuenow', file.percent)
      },
      FileUploaded: function (up, file, info) {
        // alert(info.status)
        if (info.status >= 200 || info.status < 200) {
          document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'success'
          var resultUrl = up.settings.multipart_params.key
          // console.log(resultUrl+"------------------------------"+file.name);
          // var resUrl[]=resultUrl.split("_");
          var resUrl = resultUrl.replace('${filename}', file.name)
          // console.log(resUrl+"------------------------------");
          $('#' + resultPath).val(ossParam.host + '/' + resUrl)

        }
        else {
          document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response
        }
      },
      Error: function (up, err) {
        // console.log(err.response);
        document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'fail'
      }
    }
  })
  uploader.init()
}

// plupload中为我们提供了mOxie对象
// 有关mOxie的介绍和说明请看：https://github.com/moxiecode/moxie/wiki/API
// 如果你不想了解那么多的话，那就照抄本示例的代码来得到预览的图片吧
function previewImage (file, callback) { // file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
  if (!file || !/image\//.test(file.type)) return // 确保文件是图片
  if (file.type === 'image/gif') { // gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
    var fr = new mOxie.FileReader()
    fr.onload = function () {
      callback(fr.result)
      fr.destroy()
      fr = null
    }
    fr.readAsDataURL(file.getSource())
  } else {
    var preloader = new mOxie.Image()
    preloader.onload = function () {
      preloader.downsize(300, 300)// 先压缩一下要预览的图片,宽300，高300
      var imgsrc = preloader.type === 'image/jpeg' ? preloader.getAsDataURL('image/jpeg', 80) : preloader.getAsDataURL() //得到图片src,实质为一个base64编码的数据
      callback && callback(imgsrc) // callback传入的参数为预览图片的url
      preloader.destroy()
      preloader = null
    }
    preloader.load(file.getSource())
  }
}

/**
 * 生成文件名
 * @returns
 */
function timestamp () {
  var time = new Date()
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  var mil = time.getMilliseconds()

  // console.log(y);
  var timeTamp = '' + y + add0(m) + add0(d) + add0(h) + add0(mm) + add0(s) + add10(mil)
  return timeTamp
}

function add0 (m) {
  return m < 10 ? '0' + m : m
}

function add10 (m) {
  if (m < 10) {
    return '00' + m
  } else if (m < 100) {
    return '00' + m
  } else {
    return m
  }
}

