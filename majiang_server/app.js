var express = require('express'); 
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname + '/public')); 


app.set('port',process.env.PORT || 7002)

server.listen(app.get('port'),function(){
    console.log("Express server running! 启动端口:"+app.get('port'));
})



let Room = require('./controllers/room.js')
let Majiang = require('./controllers/majiang.js')
let myUtils = require('./controllers/myUtils.js')
let rooms = ['r555','r222']
let currentRooms = {} //room:{user:[],mj:mj}
let countUser = 4


//socket部分
io.on('connection', function(socket) {
    let roomCode = ''
    let uid = ''

    socket.on('room', function(data) { //{room:'',uid:'',msgid:''}
        if(rooms.indexOf(data.roomCode)===-1){
            socket.emit('roomMessage',{action:'into', uid:data.uid||'not uid', code:502, msg:'无效的roomCode'})
            return
        }
        roomCode = data.roomCode
        if(!data.uid){
            socket.emit('roomMessage',{action:'into', code:200, msg:'参数无uid'})
            return
        }
        // 进入room
        if( data.action === 'into'){
            let user = {
                uid:data.uid,
                name:data.name || '',
                ready:false
            }
            console.log(currentRooms[data.roomCode]);
            if(currentRooms[data.roomCode]){
                if(currentRooms[data.roomCode]['user'].length===countUser) {
                    socket.emit('roomMessage',{action:'into', uid:data.uid||'not uid', code:3002, msg:'人员已满 '+countUser})
                    return
                }
                for(let i=0;i<currentRooms[data.roomCode]['user'].length;i++){
                    // 清除重复用户
                    if(currentRooms[data.roomCode]['user'][i].uid === data.uid){
                        currentRooms[data.roomCode]['user'].splice(i,1)
                        i--
                    }
                }
                currentRooms[data.roomCode]['user'].push(user)
                // currentRooms[data.roomCode]['total'] = currentRooms[data.roomCode]['user'].length
            }else{
                currentRooms[data.roomCode] = {
                    roomCode: data.roomCode,
                    user:[user],
                }
            }
            socket.emit('roomMessage',{action:'into', uid:data.uid||'not uid', code:200, msg:'成功进入room'})
            socket.join(data.roomCode);  
            uid = data.uid
            // io.sockets.in(data.roomCode).emit('roomMessage',data.uid+ '加入了房间');
            // socket.broadcast.to(data.roomCode).emit('roomMessage',{type:''});//不包括自己
            io.to(data.roomCode).emit('roomMessage',{action:'into',code:200,player:currentRooms[data.roomCode],msg:data.uid+ '加入了房间'});//包括自己
            // 退出room
        }else if(data.action==='out'){
            // socket.leave(data.roomCode); 
            socket.disconnect()
        }else if(data.action==='ready'){
            let count = 0
            let player = []
            for(let i=0;i<currentRooms[data.roomCode]['user'].length;i++){
                if(currentRooms[roomCode]['user'][i].uid===data.uid){
                    currentRooms[roomCode]['user'][i].ready=true
                    io.to(data.roomCode).emit('roomMessage',{action:'ready',code:200,player:currentRooms[data.roomCode],msg:data.uid+ '准备就绪',status:0});
                }
                if(currentRooms[roomCode]['user'][i].ready){
                    count ++
                    player.push({
                        name: 'Name'+currentRooms[roomCode]['user'][i].uid,
                        uid: currentRooms[roomCode]['user'][i].uid,
                        chip:20,
                        zhuang:false
                    })
                }
            }
            if(count===countUser){
                console.log('准备完毕');
                let randomIndex = myUtils.randomNumber(0,countUser-1)
                console.log('randomindex:',randomIndex);
                player[randomIndex]['zhuang'] = true
                let mj = new Majiang(player,player.length)
                currentRooms[roomCode]['mj'] = mj
                io.to(roomCode).emit('roomMessage',{action:'ready',code:200,data:null,status:1,zhuang:currentRooms[roomCode]['mj'].player[randomIndex].uid});
            }
        }else if(data.action==='pai'){
            if(data.code==='a0'){
                 let randomIndex = myUtils.randomNumber(0,countUser)
                 currentRooms[roomCode]['mj'].player[randomIndex].active = true
            }else if(data.code==='a1'){
                currentRooms[roomCode]['mj'].player.forEach((v,i)=>{
                    if(v.uid===data.uid){
                        socket.emit('roomMessage',{action:'pai',code:'a1', msg:'init pai',data:v})
                        // setTimeout(()=>{
                        //     currentRooms[roomCode]['mj'].sortPai(data.uid) 
                        //     socket.emit('roomMessage',{action:'pai',code:'a1', msg:'init pai',data:v})
                        // },4000)
                    }
                })
            }else if(data.code==='a2'){
                let success = currentRooms[roomCode]['mj'].moPai(data.uid)
                if(success){
                    currentRooms[roomCode]['mj'].check( data.uid )
                    let player = currentRooms[roomCode]['mj'].getPalyer(data.uid)
                    socket.emit('roomMessage',{action:'pai',code:'a2', msg:'mo pai', data: player})
                }
            }else if(data.code==='a3'){
                let params = data.data
                let success = currentRooms[roomCode]['mj'].startAction(params)   
                // let params = {
                //     uid:this.account.uid,
                //     activeAction:{
                //         actionType: "da",
                //         actionPai: pai,
                //         ctrl_uid:this.account.uid
                //     }
                // }
                let player = currentRooms[roomCode]['mj'].getPalyer(data.uid)
                socket.emit('roomMessage',{action:'pai',code:'a3',to:'self', msg:'mo pai hou', data: player})
                if(success){
                    currentRooms[roomCode]['mj'].check( params.uid , params.activeAction.actionPai )
                    socket.broadcast.emit('roomMessage',{action:'pai',code:'a3',to:'all', msg:'dapai', data: params.activeAction.actionPai }); // everyone gets it but the sender
                }else{
                    console.log('not success');
                }

            }else if(data.code==='a4'){ //获check后数据
                let player = currentRooms[roomCode]['mj'].getPalyer(data.uid)
                socket.emit('roomMessage',{action:'pai',code:'a4', msg:'mo pai', data: player})
            }
        }
    })
    // socket.on('leave', function () {
    //     socket.emit('disconnect');
    // });

    socket.on('disconnect', function () {    // 从房间名单中移除    
        console.log('dis了');
        socket.leave(roomCode); 
        if(currentRooms[roomCode]){
            let outed = false
            console.log(currentRooms[roomCode]);
            for(let i=0;i<currentRooms[roomCode]['user'].length;i++){
                if(currentRooms[roomCode]['user'][i].uid===uid){
                    currentRooms[roomCode]['user'].splice(i,1)
                    outed = true
                    i--
                }
            }
            console.log('outed:',outed);
            console.log('uid:',uid);
            // if(outed){
                // currentRooms[roomCode]['total'] = currentRooms[roomCode]['user'].length
                io.to(roomCode).emit('roomMessage',{action:'into',code:200,player:currentRooms[roomCode],msg:uid+ '退出了房间'});//包括自己
            // }
        }
    });  
    //  // 接收用户消息,发送相应的房间  
    //  socket.on('message', function (msg) {    // 验证如果用户不在房间内则不给发送    
    //     if (rooms[roomID].indexOf(user) === -1) {
    //         return false;
    //     }    
    //     socketIO.to(roomID).emit('msg', user, msg);  
    // });
    

    // socket.on('addRoom', function(data) {
    //     console.log(data);
    //     if(data.roomCode === '12345'){
    //         //有效的roomcode
    //         let room = new Room(roomCode)
    //         rooms.push(room)
    //     }

    // })
    // socket.on('addPlayer', function(data) {
    //     console.log(data);
    //     if(data.roomCode === '12345'){
    //         let room = rooms[data.roomCode]
    //         if(room){
    //             if(room.player.length<4){
    //                 room.addPlayer({name:'name123',id:'id123'})
    //                 socket.emit('addPlayer',{code:200,msg:'你已加入'})
    //                 io.sockets.in('group1').emit('event_name', data);
    //             }else{
    //                 console.log('已满');
    //                 socket.emit('addPlayer',{code:30001,msg:'房间人数已满'})
    //             }
    //         }
    //     }

    // })


    // socket.on('daPai', function(data) {
    //     console.log(data);

    // })
    // setInterval(()=>{

    //     //触发客户端事件c_hi
    //     socket.emit('c_hi','hello too!')
    // },5555)

    // //断开事件
    // socket.on('disconnect', function(data) {
    //     console.log('断开',data)
    //     socket.emit('c_leave','离开');
    //     //socket.broadcast用于向整个网络广播(除自己之外)
    //     //socket.broadcast.emit('c_leave','某某人离开了')
    // })

});