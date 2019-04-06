Vue.component('todo-item',{
    props:['todo'],
    template: '<li>compositores</li>'
})



var app = new Vue({
    el: '#template',
    data: {
        message: 'Hello Vue!',
        receptoresDados:[
            {id: 0, input: 'compositores'},
            {id: 1, input: 'estilo musical'},
            {id: 2, input: 'ultimo elemento que não lembro'}
        ]
    }

})