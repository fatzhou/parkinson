module.exports = [{
    logo: '../static/image/data_icon_name.png',
    question: '真实姓名',
    type: 1,
    status: '',
    id: 'name',
    default: '某某某'
}, {
    logo: '../static/image/data_icon_born.png',
    question: '出生年月',
    type: 2,
    status: '',
    id: "birthday",
    default: '选择'
}, {
    logo: '../static/image/data_icon_born.png',
    question: '性别',
    type: 3,
    status: '',
    id: "sex",
    options: [
        ['男', 3],
        ['女', 4]
    ]
}, {
    logo: '../static/image/data_icon_born.png',
    question: '手机号码',
    type: 1,
    status: '',
    id: 'tel',
    validate: 'telephone',
    default: '填写'
}, {
    logo: '../static/image/data_icon_born.png',
    question: '居住地',
    type: 4,
    status: '',
    id: 'home',
    areaId: 'home-hidden-area',
    hiddenValue: '',
    default: '选择'
}, {
    logo: '../static/image/data_icon_born.png',
    question: '籍贯',
    type: 4,
    status: '',
    id: 'native',
    areaId: 'native-hidden-area',
    hiddenValue: '',
    default: '选择'
}, {
    logo: '../static/image/data_icon_born.png',
    question: '既往病史',
    type: 5,
    status: '',
    id: 'anamnesis',
    placeholder: '请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。请输入擅长及诊所介绍。'
}, {
    logo: '../static/image/data_icon_born.png',
    question: '家族是否有人患帕金森病',
    type: 6,
    status: '',
    id: 'familysick',
    options: [
        ['父亲/母亲', 1],
        ['兄/弟/姐/妹', 2],
        ['祖父母/外祖父母', 3],
        ['其他人', 4]
    ]
}, {
    logo: '../static/image/data_icon_born.png',
    question: '疾病类型',
    type: 6,
    status: '',
    id: 'sicktype',
    options: [
        ['帕金森病', 1],
        ['特发性震颤', 2],
        ['继发性帕金森综合症', 3],
        ['其他类型', 4]
    ]
}, {
    logo: '../static/image/data_icon_born.png',
    question: '发病时间',
    type: 2,
    status: '',
    id: "sicktime",
    default: '选择'
}, {
    logo: '../static/image/data_icon_born.png',
    question: '确诊时间',
    type: 2,
    status: '',
    id: "confirmtime",
    default: '选择'
}, ]
