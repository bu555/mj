// var e = 0;
// var i = 0;
// var s = 0;
// var n = 0;
// var t = 0;
// var f = 0;
// var j = 0;
// var p = 0;
// var question = [];
// var answer=new Array(["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""],["",""]);
// // ★人的注意力集中所在和精力的来源：外向（E）和内向（I）***************************************************************//

// question[0] = "1、你倾向从何处得到力量:"
// 　　answer[0][0]="（A）别人"
// 　　answer[0][1]="（B）自己的想法。"

// question[1] = "2、当你参加一个社交聚会时，你会:"
// 　　answer[1][0] ="（A）在夜色很深时，一旦你开始投入，也许就是最晚离开的那一个。"
// 　　answer[1][1]="（B）在夜晚刚开始的时候，我就疲倦了并且想回家。"

// question[2]="3、下列哪一件事听起来比较吸引你？"
// 　　answer[2][0]="（A）与情人到有很多人且社交活动频繁的地方。"
// 　　answer[2][1]="（B）待在家中与情人做一些特别的事情，例如说观赏一部有趣的录影带并享用你最喜欢的外卖食物。"

// question[3]="4、在约会中，你通常："
// 　　answer[3][0]="（A）整体来说很健谈。"
// 　　answer[3][1]="（B）较安静并保留，直到你觉得舒服。"

// question[4]="5、过去，你遇见你大部分的情人是："
// 　　answer[4][0]="（A）在宴会中、夜总会、工作上、休闲活动中、会议上或当朋友介绍我给他们的朋友时。"
// 　　answer[4][1]="（B）通过私人的方式，例如个人广告、录影约会，或是由亲密的朋友和家人介绍。"

// question[5]="6、你倾向拥有："
// 　　answer[5][0]="（A）很多认识的人和很亲密的朋友。"
// 　　answer[5][1]="（B）一些很亲密的朋友和一些认识的人。"

// question[6]="7、过去，你的爱人和情人倾向对你说："
// 　　answer[6][0]="（A）你难道不可以安静一会儿吗？"
// 　　answer[6][1]="（B）可以请你从你的世界中出来一下吗？"


// // ★人获取信息的方式：感知（S）和直觉（N）***************************************************************//

// question[7]="8.你倾向通过以下哪种方式收集信息："
// 　　answer[7][0]="（A）你对有可能发生之事的想像和期望。"
// 　　answer[7][1]="（B）你对目前状况的实际认知。"

// question[8]="9.你倾向相信："
// 　　answer[8][0]="（A）你的直觉。"
// 　　answer[8][1]="（B）你直接的观察和现成的经验。"

// question[9]="10.当你置身于一段关系中时，你倾向相信："
// 　　answer[9][0]="（A）永远有进步的空间。"
// 　　answer[9][1]="（B）若它没有被破坏，不予修补。"

// question[10]="11.当你对一个约会觉得放心时，你偏向谈论："
// 　　answer[10][0]="（A）未来，关于改进或发明事物和生活的种种可能性。例如，你也许会谈论一个新的科学发明，或一个更好的方法来表达你的感受。"
// 　　answer[10][1]="（B）实际的、具体的、关于“此时此地”的事物。例如，你也许会谈论品酒的好方法，或你即将要参加的新奇旅程。"

// question[11]="12.你是这种人:"
// 　　answer[11][0]="（A）喜欢先纵观全局。"
// 　　answer[11][1]="（B）喜欢先掌握细节。"

// question[12]="13.你是这类型的人："
// 　　answer[12][0]="（A）与其活在现实中，不如活在想像里。"
// 　　answer[12][1]="（B）与其活在想像里，不如活在现实中。"

// question[13]="14.你通常："
// 　　answer[13][0]="（A）偏向于去想像一大堆关于即将来临的约会的事情。"
// 　　answer[13][1]="（B）偏向于拘谨地想像即将来临的约会，只期待让它自然地发生。"

// // ★人作决策的方式：思考（T）和感觉（F）***************************************************************//

// question[14]="15.你倾向如此做决定："
// 　　answer[14][0] = "（A）首先依你的心意，然后依你的逻辑。"
// 　　answer[14][1] = "（B）首先依你的逻辑，然后依你的心意。"

// question[15]="16.你倾向比较能够察觉到："
// 　　answer[15][0] = "（A）当人们需要情感上的支持时。"
// 　　answer[15][1] = "（B）当人们不合逻辑时。"

// question[16]="17.当和某人分手时："
// 　　answer[16][0] = "（A）你通常让自己的情绪深陷其中，很难抽身出来。"
// 　　answer[16][1] = "（B）虽然你觉得受伤，但一旦下定决心，你会直截了当地将过去恋人的影子甩开。"

// question[17]="18.当与一个人交往时，你倾向于看重："
// 　　answer[17][0] = "（A）情感上的相容性：表达爱意和对另一半的需求很敏感。"
// 　　answer[17][1] = "（B）智慧上的相容性：沟通重要的想法；客观地讨论和辩论事情。"

// question[18]="19.当你不同意情人的想法时："
// 　　answer[18][0] = "（A）你尽可能地避免伤害对方的感情；若是会对对方造成伤害的话，你就不会说。"
// 　　answer[18][1] = "（B）你通常毫无保留地说话，并且对情人直言不讳，因为对的就是对的。"

// question[19]="20.认识你的人倾向形容你为："
// 　　answer[19][0] = "（A）热情和敏感。"
// 　　answer[19][1] = "（B）逻辑和明确。"

// question[20]="21.你把大部分和别人的相遇视为："
// 　　answer[20][0] = "（A）友善及重要的。"
// 　　answer[20][1] = "（B）另有目的。"

// // ★人对待外界和处世的方式：计划性（J）和情绪型（P）

// question[21]="22.若你有时间和金钱，你的朋友邀请你到国外度假，并且在前一天才通知，你会："
// 　　answer[21][0] = "（A）必须先检查你的时间表。"
// 　　answer[21][1] = "（B）立刻收拾行装。"

// question[22]="23.在第一次约会中："
// 　　answer[22][0] = "（A）若你所约的人来迟了，你会很不高兴。"
// 　　answer[22][1] = "（B）一点儿都不在乎，因为你自己常常迟到。"

// question[23]="24.你偏好："
// 　　answer[23][0] = "（A）事先知道约会的行程：要去哪里、有谁参加、你会在那里多久、该如何打扮。"
// 　　answer[23][1] = "（B）让约会自然地发生，不做太多事先的计划。"

// question[24]="25.你选择的生活充满着："
// 　　answer[24][0] = "（A）日程表和组织。"
// 　　answer[24][1] = "（B）自然发生和弹性。"

// question[25]="26.哪一项较常见："
// 　　answer[25][0] = "（A）你准时出席而其他人都迟到。"
// 　　answer[25][1] = "（B）其他人都准时出席而你迟到。"

// question[26]="27.你是这种喜欢……的人："
// 　　answer[26][0] = "（A）下定决心并且做出最后肯定的结论。"
// 　　answer[26][1] = "（B）放宽你的选择面并且持续收集信息。"

// question[27]="28.你是此类型的人："
// 　　answer[27][0] = "（A）喜欢在一段时间里专心于一件事情直到完成。"
// 　　answer[27][1] = "（B）享受同时进行好几件事情。"


// $(document).ready(function(){ 
// 	change();
// }); 

// //切换题目
// var y= 0;
// function change()
// {
//   	$("#question").html(question[y]);
// 	$("#answer1").html(answer[y][0]);
// 	$("#answer2").html(answer[y][1]); 

// 	y++;
// 	if (y==28) {
// 		y=27;
// 	}

// }

// var z= 0;
// function sub(X)
// {
// 	// alert(X);
// 	if(z>=0&&z<=6)
// 	{
// 		switch(X)
// 		{
// 			case "A" : e++;
// 			break;
// 			case "B" : i++;
// 			break;
// 		}
		
// 	}
// 	else if (z>=7&&z<=13)
// 	{
// 		switch(X)
// 		{
// 			case "A" : n++;
// 			break;
// 			case "B" : s++;
// 			break;
// 		}
// 	}
// 	else if (z>=14&&z<=20)
// 	{
// 		switch(X)
// 		{
// 			case "A" : f++;
// 			break;
// 			case "B" : t++;
// 			break;
// 		}
// 	}
// 	else if (z>=21&&z<=27)
// 	{
// 		switch(X)
// 		{
// 			case "A" : j++;
// 			break;
// 			case "B" : p++;
// 			break;
// 		}				
// 	}
// 	z++;
// 	if (z==28) {
// 		end();
// 	}	
// } 

// function end()
// {
// 	var one;
// 	if(e>i){
// 		one = "E";
// 	}
// 	else
// 		one = "I";

// 	var two;
// 	if(s>n){
// 		two = "S";
// 	}
// 	else
// 		two = "N";

// 	var three;
// 	if(t>f){
// 		three = "T";
// 	}
// 	else
// 		three = "F";

// 	var four;
// 	if(j>p){
// 		four = "J";
// 	}
// 	else
// 		four = "P";

// 	if (one+two+three+four=="ISTJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(公务型)：内倾、感觉、思维和判断"+"</span>"+"<br/>"+"适宜职业：会计 侦探 教师 律师"+"<br/>"
// 		+"想知道关于ENFJ(公务型)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ISFJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(保护者)：内倾、感觉、情感和判断"+"</span>"+"<br/>"+"适宜职业：护士 幼师 律师助理 家政"+"<br/>"
// 		+"想知道关于ISFJ(保护者)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="INFJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(创造者)：内倾、感觉、情感和判断"+"</span>"+"<br/>"+"适宜职业：作家 艺术顾问 社会学家 心理学家"+"<br/>"
// 		+"想知道关于INFJ(创造者)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="INTJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(完美主义者)：内倾、直觉、思维和判断"+"</span>"+"<br/>"+"适宜职业：经济学家 企业家 医学专家 网络工程师"+"<br/>"
// 		+"想知道关于INTJ(完美主义者)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ISTP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(巧匠型)：内倾、感觉、思维和知觉"+"</span>"+"<br/>"+"适宜职业：药剂师 计算机程序员 经济学者 雕塑家"+"<br/>"
// 		+"想知道关于ISTP(巧匠型)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ISFP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(艺术家型)：内倾、感觉、情感和知觉"+"</span>"+"<br/>"+"适宜职业：时装设计 舞蹈员 美容师 演员"+"<br/>"
// 		+"想知道关于ISFP(艺术家型)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="INFP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(理想化诗人)：内倾、感觉、情感和知觉"+"</span>"+"<br/>"+"适宜职业：娱乐人士 演员 音乐家 编辑"+"<br/>"
// 		+"想知道关于INFP(理想化诗人)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="INTP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(学者型)：内倾、直觉、思维和知觉"+"</span>"+"<br/>"+"适宜职业：电脑工程师 天文工作者 物理学家 律师"+"<br/>"
// 		+"想知道关于INTP(学者型)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ESTP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(乐天派)：外倾、感觉、思维和知觉"+"</span>"+"<br/>"+"适宜职业：调查员 导游 主持人 摄影师"+"<br/>"
// 		+"想知道关于ESTP(乐天派)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ESFP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(天真的孩子)：外倾、感觉、情感和知觉"+"</span>"+"<br/>"+"适宜职业：演员 作家 导游 幼师"+"<br/>"
// 		+"想知道关于ESFP(天真的孩子)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ENFP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(公关型)：外倾、直觉、情感和知觉"+"</span>"+"<br/>"+"适宜职业：营销经理 宣传人员 开发总裁 演讲家"+"<br/>"
// 		+"想知道关于ENFP(公关型)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ENTP") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(大发明家)：外倾、直觉、思维和知觉"+"</span>"+"<br/>"+"适宜职业：政府官员 公关经理 经纪人 投资人"+"<br/>"
// 		+"想知道关于ENTP(大发明家)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ESTJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(有原则的监督者)：外倾、感觉、思维和判断"+"</span>"+"<br/>"+"适宜职业：安保人员 会计 药品监管 保险"+"<br/>"
// 		+"想知道关于ESTJ(有原则的监督者)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ESFJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(执政官)：外倾、感觉、情感和判断"+"</span>"+"<br/>"+"适宜职业：政府人员 证监 公关 教师"+"<br/>"
// 		+"想知道关于ESFJ(执政官)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ENFJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(教育家)：外倾、感觉、情感和判断"+"</span>"+"<br/>"+"适宜职业：作家 制片人 教师 新闻记者"+"<br/>"
// 		+"想知道关于ENFJ(教育家)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// 	else if (one+two+three+four=="ENTJ") {
// 		$('.result').show("6000");
// 		$('.result').html("<div class='span_style col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2 col-xs-12'>"+"您的性格类型为："
// 		+"<span style='color:red;'>"+one+two+three+four+"(领袖将军)：外倾、直觉、思维和判断"+"</span>"+"<br/>"+"适宜职业：高管 导演 创业者 经纪人"+"<br/>"
// 		+"想知道关于ENTJ(领袖将军)的更多内容，请关注黑鲸校园，输入："+"<span style='color:red;'>"+one+two+three+four+"</span>"+"，获取更多内容"+"</div>");
// 	}
// }

// // ★人的注意力集中所在和精力的来源：外向（E）和内向（I）***************************************************************//

// question[0] = "1、你倾向从何处得到力量:"
// 　　answer[0][0]="（A）别人"
// 　　answer[0][1]="（B）自己的想法。"

// question[1] = "2、当你参加一个社交聚会时，你会:"
// 　　answer[1][0] ="（A）在夜色很深时，一旦你开始投入，也许就是最晚离开的那一个。"
// 　　answer[1][1]="（B）在夜晚刚开始的时候，我就疲倦了并且想回家。"

// question[2]="3、下列哪一件事听起来比较吸引你？"
// 　　answer[2][0]="（A）与情人到有很多人且社交活动频繁的地方。"
// 　　answer[2][1]="（B）待在家中与情人做一些特别的事情，例如说观赏一部有趣的录影带并享用你最喜欢的外卖食物。"

// question[3]="4、在约会中，你通常："
// 　　answer[3][0]="（A）整体来说很健谈。"
// 　　answer[3][1]="（B）较安静并保留，直到你觉得舒服。"

// question[4]="5、过去，你遇见你大部分的情人是："
// 　　answer[4][0]="（A）在宴会中、夜总会、工作上、休闲活动中、会议上或当朋友介绍我给他们的朋友时。"
// 　　answer[4][1]="（B）通过私人的方式，例如个人广告、录影约会，或是由亲密的朋友和家人介绍。"

// question[5]="6、你倾向拥有："
// 　　answer[5][0]="（A）很多认识的人和很亲密的朋友。"
// 　　answer[5][1]="（B）一些很亲密的朋友和一些认识的人。"

// question[6]="7、过去，你的爱人和情人倾向对你说："
// 　　answer[6][0]="（A）你难道不可以安静一会儿吗？"
// 　　answer[6][1]="（B）可以请你从你的世界中出来一下吗？"
const type16 = [
	// E
	{ id:'e1', question:'与众人聚会过后你会感到精力充沛，并享受这种快乐。' },
	{ id:'e2', question:'在假期里你通常会参与一些集体活动，而不太喜欢待在家里。' },
	{ id:'e3', question:'旅游时你会优先选择著名的景点，对博物馆、名人故居之类的兴趣不大。' },
	{ id:'e4', question:'你在人群中通常是焦点人物，是气氛的激活者。' },
	{ id:'e5', question:'“独乐乐不如众乐乐!”，一起分享一起交流才最使人开心。' },
	// { id:'e4', question:'你喜欢在朋友圈分享日常生活。' },
	// I
	{ id:'i1', question:'若没有足够的独处时间，你会感到烦躁不安。' },
	{ id:'i2', question:'集体活动过后你通常会感到精力疲累，觉得需要一些自己的空间。' },
	{ id:'i3', question:'一本有趣的书或电子游戏往往比社交活动更吸引你。' },
	{ id:'i4', question:'你较少主动与人交谈，通常不会是话题的发起者。' },
	{ id:'i5', question:'在聚会中你通常听多于说。' },
	// S
	{ id:'s1', question:'相对理论性知识，你对实用性知识会更感兴趣。' },
	{ id:'s2', question:'相比哲学或历史，你对美食、时装、运动这些话题会更感兴趣。' },
	{ id:'s3', question:'一般来说你更依赖于你的经验，而不是某个理论。' },
	// { id:'s3', question:'从已知事物入手进行分析。' },
	// N
	{ id:'n1', question:'你对网络直播缺乏兴趣，并难以理解那些参与其中者。' },
	{ id:'n2', question:'你喜欢理论、概念本身，并享受想象意念的过程。' },
	{ id:'n3', question:'你常常花时间探索远离实际的但有趣的想法（比如：易学、占星...）。' },
	{ id:'n4', question:'你的头脑总是萦绕着未开发的想法和计划。' },
	// T
	{ id:'t1', question:'当进行谈判时，你会用自己的知识和技巧获胜，而不是拉拢他人来彰显力量。' },
	{ id:'t2', question:'你是公正客观、原则至上的，就算对待弱者也一视同仁。' },
	{ id:'t3', question:'做决策就要就事论事，过多考虑他人感受是会误入歧途的。' },
	// { id:'t4', question:'个人能力，才有可能获得认可。' },
	// F
	{ id:'f1', question:'你希望成为一个有亲和力的人。' },
	{ id:'f2', question:'你是善解人意的，希望能给别人给予更多关怀。' },
	{ id:'f3', question:'如果你的朋友对某件事感到难过，你更可能提供情感支持，而不是提出解决问题的方法。' },

	// J
	{ id:'j1', question:'如果有工作没完成你会觉得不安，哪怕加班也要尽力做完。' },
	{ id:'j2', question:'遇到不愉快的事，你习惯当时就处理完毕，而不是等待心情转好后再处理。' },
	{ id:'j3', question:'你总是要工作完成后才会谈玩的事。' },

	// P
	{ id:'p1', question:'相对于按部就班，你更喜欢灵活的、弹性的、即兴性的工作。' },
	{ id:'p2', question:'你擅长同时进行多件事情，一味的埋头做一件事太无趣了。' },
	// { id:'p3', question:'' },

]

const questions=[
	// 第一维度 人的注意力集中所在和精力的来源：外倾（E）和内倾（I）
	{
		qid:'ei1',
		question:'当你与朋友们聚会过后：',
		l:'A．我通常会很尽兴，会感到精力充沛，并会继续追求这种欢娱。',
		r:'B．我通常会感到精力疲累，觉得需要一些自己空间。',
		remark:28
	},
	{
		qid:'ei2',
		question:'你习惯于：',
		l:'A．经常边说话边思考。',
		r:'B．说话前通常会思考好要说的话。',
		remark:28
	},
	{
		qid:'ei3',
		question:'你是：',
		l:'A．认识我的人，一般都知道什么对我来说是重要的。',
		r:'B．除了我感觉亲近的人，我不会对人说出什么对我来说是重要的。',
		remark:28
	},
	{
		qid:'ei4',
		question:'独处时，你的感受是：',
		l:'A．独处得太久，便会感到厌烦和不安。',
		r:'B．若没有足够的独处时间，会感到烦躁不安。',
		remark:28
	},
	{
		qid:'ei5',
		question:'在放假期间：',
		l:'A．我喜欢与亲朋好友共度，参与集体活动。',
		r:'B．我喜欢在家自己阅读、上网或者静静的发发呆。',
		remark:28
	},
	{
		qid:'ei6',
		question:'旅游时，你会：',
		l:'A．更喜欢去游览著名的景点。',
		r:'B．更喜欢逛博物馆或一些较为幽静的地方。',
		remark:28
	},
	{
		qid:'ei7',
		question:'你是：',
		l:'A．直率的。',
		r:'B．内敛的。',
		remark:28
	},

	// 第二维度 人获取信息的方式：感知（S）和直觉（N）
	{
		qid:'sn1',
		question:'你对他人：',
		l:'A．我较有兴趣知道他人的经历，例如他们做过什么事？认识什么人？',
		r:'B．我较有兴趣知道他人的计划和理想，例如他们会往哪里去？憧憬什么？',
		remark:28
	},
	{
		qid:'sn2',
		question:'你认为：',
		l:'A．四周的实际环境对很重要，而且会影响自身的感受。',
		r:'B．如果喜欢所做的事情，环境气氛对自身而言并不是那么重要。',
		remark:28
	},
	{
		qid:'sn3',
		question:'你偏向于：',
		l:'A．如果我喜欢某种技术（或活动），我会一直参与下去。',
		r:'B．我一旦熟悉某种技术（或活动），便希望转而尝试其它新的。',
		remark:28
	},
	{
		qid:'sn4',
		question:'你是：',
		l:'A．我对一些没有实际用途的理论、意念、宏观构想不感兴趣。',
		r:'B．我喜欢意念、概念本身，并享受想象意念的过程，对宏观构想感兴趣。',
		remark:28
	},
	{
		qid:'sn5',
		question:'你是：',
		l:'A．我是实事求是的，注重一点一点积累起来的实际经验。',
		r:'B．我是富有想象力的，注重事物之间的关联和自认为的可能性。',
		remark:28
	},
	{
		qid:'sn6',
		question:'在别人眼里：',
		l:'A．我致力于追求当前生活相关的事情，比如美味佳肴、明丽服饰、高档住宅，别人都说我是有生活追求的。',
		r:'B．我致力于追求一些有长远价值的东西，比如哲学思想、学术理论，别人都说我是不食人间烟火的。',
		remark:28
	},
	{
		qid:'sn7',
		question:'对于新事物，你习惯于：',
		l:'A．先了解事物细节，再看整体。',
		r:'B．先了解事物整体，再探讨细节。',
		remark:28
	},
	{
		qid:'sn8',
		question:'对于“独乐乐不如众乐乐!”，你觉得：',
		l:'A．认同，相互分享、交流、热热闹闹才是真正快乐。',
		r:'B．不那么认同，快乐更多是源于内心的。',
		remark:28
	},

	// 第三维度 人作决策的方式：思考（T）和感觉（F）
	{
		qid:'tf1',
		question:'你是：',
		l:'A．我喜欢分析、推理，且心思缜密。',
		r:'B．我对人感兴趣，关心他们的心情和需求。',
		remark:28
	},
	{
		qid:'tf2',
		question:'当做决定时：',
		l:'A．我更多地考虑正反两面的观点，并且会推理与质证。',
		r:'B．我会更多地了解其他人的想法， 并希望能够达成共识。',
		remark:28
	},
	{
		qid:'tf3',
		question:'当进行谈判时：',
		l:'A．我会依靠自己的知识和技能。',
		r:'B．我会拉拢其他人至同一阵线。',
		remark:28
	},
	{
		qid:'tf4',
		question:'在放假期间：',
		l:'A．我会扩展一些有用的知识和技能。',
		r:'B．我会处理一些对自己重要的人际关系。',
		remark:28
	},
	{
		qid:'tf5',
		question:'在别人眼中你是：',
		l:'A．秉公处事，尊重他人的。',
		r:'B．别人有需要时，会在他们身边给与支持的。',
		remark:28
	},
	{
		qid:'tf6',
		question:'在别人眼中你是：',
		l:'A．是学识广博的。',
		r:'B．是善解人意的。',
		remark:28
	},
	{
		qid:'tf7',
		question:'你认为自己是：',
		l:'A．我是公正的、是非分明的。',
		r:'B．我是宽容的、讲究情面的。',
		remark:28
	},
	{
		qid:'tf8',
		question:'你认为：',
		l:'A．感情用事的人较容易犯错。',
		r:'B．逻辑思维会令人自以为是，因而容易犯错。',
		remark:28
	},

	// 第四维度 人对待外界和处事的方式：计划、行动性（J）和随性、犹豫性（P）
	{
		qid:'jp1',
		question:'你是：',
		l:'A．一旦定出计划，我便希望能依计行事。',
		r:'B．即使已出计划，我也喜欢探讨其他新的方案。',
		remark:28
	},
	{
		qid:'jp2',
		question:'你专注做某件事情时：',
		l:'A．不希望受到任何干扰。',
		r:'B．需要不时停下来休息一下。',
		remark:28
	},
	{
		qid:'jp3',
		question:'你在放假期间：',
		l:'A．我会想着假期过后要准备的事情。',
		r:'B．我会忘记平时发生的事情，专心享乐。',
		remark:28
	},
	{
		qid:'jp4',
		question:'你是：',
		l:'A．我喜欢流程化的事物，更擅长按规则、按计划去做事。',
		r:'B．我喜欢灵活的事物，更擅长随机应变地去处理一些突发事情。',
		remark:28
	},
	{
		qid:'jp5',
		question:'你习惯于：',
		l:'A．及时处理不愉快的事情，务求把它们抛诸脑后。',
		r:'B．暂时放下不愉快的事情，直至有心情时才处理。',
		remark:28
	},
	{
		qid:'jp6',
		question:'你喜欢的工作是：',
		l:'A．需要定出目标，然后逐步实现，井井有条的。',
		r:'B．需要迅速和即时做出反应，没有过多约束的。',
		remark:28
	},
]
export {
	type16
};
