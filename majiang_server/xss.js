var xss = require('xss');

var s = xss(
    `
    <script>alert('hahaha')</script>
    <p>我就认识几个这样的姑娘，家底平凡，还总是喜欢羡慕别人，常常会用“别人有的东西，我也要有。”这样的观念来安慰自己，在我看来，这只是自欺欺人。</p><p>她们还没有开始赚大钱，就已经有了庞大的物欲，还没有稳定的收入，就保持着高额的输出，落得负债累累，无力还款。<br></p><p>在我的朋友圈里，有一个这样的女孩子，收入一般，但很喜欢购物，有一次听她说为了买一个戒指，足足吃了三个月的泡面，我想象不到，她过着一种什么样的生活，看到自己喜欢的东西，连眼睛都不眨一下就买了，当时的她一定很爽快吧，但到了还款的时候，又会愁眉不展。</p><p>生活真的是充满了悔意啊！</p><p>她们把生活过得像书桌，只有乱的不行了才去收拾一下，而且只有面上会整洁，这其中的苦涩与煎熬，其实只有她们自己知道。</p><p>女孩子必须要有正确的消费观，学会把控自己的欲望，让欲望鞭挞自己，而不是被欲望反噬。

作者：暖箱小窝
链接：https://www.jianshu.com/p/3cab3196a1f5
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。&nbsp;&nbsp;</p>
    `
)
console.log(s);
console.log(s.replace(/<[^>]+>/g,""));