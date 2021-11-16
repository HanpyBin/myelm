// 父组件
async beforeMount()
{
    console.log('father beforemount');
    console.log('before');
    await something...;
    console.log('after');
}

//子组件
methods:{
    async a(){
        ...
    }
}

mounted(){
    console.log('child');
    a();
}

//打印结果
father beforemount
before
child
after