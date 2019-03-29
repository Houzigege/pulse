let itemData = {
  "code": 200,
  "message": "SUCCESS",
  "data": []
};


let openchatData = {"code":200,"message":"SUCCESS","data":[{"displayType":"default","elementId":"3e832652-4be0-4221-bd61-02925574ca1b","value":"Hi, welcome back to Babylon. I'm here to guide you to get the help you need.","timestamp":"2019-01-23T08:15:16.404556+00:00"},{"displayType":"default","elementId":"06a6f57c-2546-4efe-b392-bc7cbfe2bbc2","value":"Please remember that I am a chatbot and not for emergency use. I'm also still learning about pregnancy, skin problems, and mental health issues, so for these please speak to a clinician.","timestamp":"2019-01-23T08:15:16.404629+00:00"}]};
let sendmessageData = itemData;
let data = {"code":200,"message":"SUCCESS","data": null};
let data2 = {"code":200,"message":"SUCCESS","data": [
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2281240910,2402829662&fm=27&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=402480602,3944397354&fm=27&gp=0.jpg,',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2662960265,2324371746&fm=27&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1483167337,3287691891&fm=27&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3380082812,3728092157&fm=26&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2274281566,822097023&fm=26&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2438895226,149550575&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2831878093,4220023681&fm=26&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1900053530,1624471995&fm=26&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3114695120,1170545901&fm=26&gp=0.jpg'
  ]
};
export default {
  'POST /openchat': (req, res) => {
    res.send(openchatData);
  },
  'POST /sendmessage': (req, res) => {
    res.send(sendmessageData);
  },
  'POST /likemoment': (req, res) => {
    res.send(data);
  },
  'POST /sharemoment': (req, res) => {
    res.send(data);
  },
  'POST /images': (req, res) => {
    res.send(data2);
  },
};

