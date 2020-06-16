const Slack = require('slack-node');  // 슬랙 모듈 사용
const schedule = require('node-schedule');  // 스케줄러 모듈 사용

apiToken = process.env.SLACK_TOKEN||'SLACK_API_TOKEN'; // 슬랙에서 발급받은 api_token (type : string)

const slack = new Slack(apiToken);

const send = async(message) => {
  slack.api('chat.postMessage', {
	  username: 'tester',  // 슬랙에 표시될 봇이름
	  text:message,
   	  channel:'channel_name',  // 전송될 채널 및 유저
		icon_url:'http://example.jpg'
	}, function(err, response){
	  console.log(response);
	});
}


// heroku를 이용하여 시차를 위해 -9시간을 해주었습니다. 서버 상황에 맞게 스케줄러 시간 변경 바랍니다.

schedule.scheduleJob('50 23 * * sun,mon,tue,wed,thu', function(){
	send('출근하세요');
});

schedule.scheduleJob('5 9 * * 1-5', function(){
	send('퇴근하세요');
});
