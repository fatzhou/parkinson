module.exports = [
    {
      name: 'doctor-name',
      desc: '主治医生姓名：',
      status: '',
      logo: '../static/image/data_icon_name.png',
      placeholder: '请输入主治医生姓名'
    },
    {
      name: 'doctor-tel',
      desc: '医生手机号码：',
      status: '',
      logo: '../static/image/data_icon_phone.png',
       validate: "telephone",
       placeholder: '请输入医生手机号码'
     }
]
