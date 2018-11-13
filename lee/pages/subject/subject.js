//获取应用实例
const app = getApp()

Page({
  data: {
    "questionArray": [{
      "question": "this is my first question",
      "answer": [{
        "desc": "A: this is answer A of first question",
        "value": 0,
        "checked": false
      }, {
        "desc": "B: this is answer B of first question",
        "value": 1,
        "checked": false
      }, {
        "desc": "C:this is answer C of first question",
        "value": 2,
        "checked": false
      }]
    }, {
      "question": "this is my second question",
      "answer": [{
        "desc":"A: this is answer A of second question",
        "value": 0,
        "checked":false
      },{
        "desc":"B: this is answer B of second question",
        "value": 1,
        "checked":false
      },{
        "desc":"C:this is answer C of second question",
        "value": 2,
        "checked":false
      }]
    }, {
      "question": "this is my third question",
      "answer": [{
        "desc":"A: this is answer A of third question",
        "value": 0,
        "checked":false
      },{
        "desc":"B: this is answer B of third question",
        "value": 1,
        "checked":false
      },{
        "desc":"C:this is answer C of third question",
        "value": 2,
        "checked":false
      }]
    }],
    "currentShow": 2
  },
  onLoad: function () {
    
  },
  changeCurrentShow: function(e){
    var change = parseInt(e.currentTarget.dataset.change);
    var currentShow = this.data.currentShow + change;
    console.log(currentShow);
    this.setData({
      "currentShow": currentShow
    })
  },
  radioChange: function(e){
    var questionIndex = parseInt(e.currentTarget.dataset.index);
    var answer = this.data.questionArray[questionIndex].answer;
    for(var i = 0; i < answer.length; i++){
      answer[i].checked = answer[i].value == e.detail.value
    }
    var key = "questionArray[" + questionIndex + "].answer";
    this.setData({
      [key] : answer
    })
    console.log(this.data)
  }
})

