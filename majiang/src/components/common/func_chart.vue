<template>
    <div class="my-func-chart" v-show="type">
            <div class="f-title">基本功能</div>
            <div class="f-sub-title">
                <div>内在呈现</div>
                <div>外在呈现</div>
            </div>
            <div class="f-chart">
                <div class="f-1" :style="'background-color:'+$mbti.color[$mbti.func[type][0][0]]+';left:'+($mbti.func[type][0][1]==='i'?'-26px;padding-right:.5em':'26px;padding-left:.5em')" v-html="f4($mbti.func[type][0][0])"></div>
                <div class="f-2" :style="'background-color:'+$mbti.color[$mbti.func[type][1][0]]+';left:'+($mbti.func[type][1][1]==='i'?'-27px;padding-right:.5em':'27px;padding-left:.5em')" v-html="f4($mbti.func[type][1][0])"></div>
                <div class="f-3" :style="'background-color:'+$mbti.color[$mbti.func[type][2][0]]+';left:'+($mbti.func[type][2][1]==='i'?'-18px;padding-right:.6em':'18px;padding-left:.8em')" v-html="f4($mbti.func[type][2][0])"></div>
                <div class="f-4" :style="'background-color:'+$mbti.color[$mbti.func[type][3][0]]+';left:'+($mbti.func[type][3][1]==='i'?'-5px;padding-right:.2em':'5px;padding-left:.2em')">{{$mbti.func[type][3][0]}}</div>
            </div>
            <div class="f-info">
                <div>
                    <p>主导功能：{{$mbti.func[type][0] | f8}}</p>
                    <p>辅助功能：{{$mbti.func[type][1] | f8}}</p>
                    <p>次等功能：{{$mbti.func[type][2] | f8}}</p>
                    <p>劣等功能：{{$mbti.func[type][3] | f8}}</p>
                </div>
            </div>
    </div>
</template>
<script>
export default {
  data(){
      return{
          mbti:''
      }
  },
  filters:{
      f8(val){
          val = val.toString().toLowerCase().substr(0,2)
          let _val
          switch(val){
              case 'ni':
              _val = 'Ni (内向直觉)'
              break
              case 'ne':
              _val = 'Ne (外向直觉)'
              break
              case 'si':
              _val = 'Si (内向感觉)'
              break
              case 'se':
              _val = 'Se (外向感觉)'
              break
              case 'ti':
              _val = 'Ti (内向思维)'
              break
              case 'te':
              _val = 'Te (外向思维)'
              break
              case 'fi':
              _val = 'Fi (内向情感)'
              break
              case 'fe':
              _val = 'Fe (外向情感)'
              break
          }
          return _val
      },
  },
  methods:{
        f4(val){
            val = val.toString().toLowerCase().substr(0,1)
            let _val
            switch(val){
                case 'n':
                _val = ['N','(直觉)']
                break
                case 's':
                _val = ['S','(感觉)']
                break
                case 't':
                _val = ['T','(思维)']
                break
                case 'f':
                _val = ['F','(情感)']
                break
                default:
                break
            }
            if(_val){
                return `${_val[0]}<sub style="font-size:.83em">${_val[1]}</sub>`
            }
        },

  },
  props:{
      type:{
          default: ''
      }
  },
  created(){
      this.type = this.type.toLowerCase()
  }
}
</script>

<style lang="less" scoped>
    .my-func-chart{
        box-sizing: border-box;
        max-width:370px;
        border:1px solid #eee;
        border-radius:8px;
        position: relative;
        text-align: center;
        padding:12px 0;
        height:100%;
        .f-title {
            height:30px;
            font-weight:700;
            font-size:16px;            
            margin:0 20%;
            border-bottom:1px dotted #f2f2f2;
            color:#444;
        }
        .f-sub-title {
            font-size:14px;
            font-weight:600;
            display:flex;
            justify-content: space-around;
            margin:10px 0;
            color:#656;
        }
        .f-chart {
            position:relative;
            &>div {
                border:2px solid #555;
                border-radius:50%;
                margin:0 auto;
                position: relative;
                font-weight:700;
                font-size:15px;
            }
            .f-1 {
                width:155px;
                height:45px;
                line-height:41px;
                font-size:16px;
            }
            .f-2 {
                width:98px;
                height:40px;
                line-height:36px;
                top:-9px;
            }
            .f-3 {
                width:80px;
                height:33px;
                line-height:27px;
                top:-19px;
            }
            .f-4 {
                width:24px;
                height:28px;
                line-height:25px;
                top:-25px;
                font-size:14px;
            }
            &:after {
                content:"";
                display:block;
                width:0px;
                height:150px;
                border-left:1px dashed #555;
                position:absolute;
                top:-18px;
                left:50%;
            }
        }
    }
</style>

