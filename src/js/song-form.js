{
    let view = {
        el: '.page > main',
        init(){
            this.$el = $(this.el)
        },
        template: `
        <form class="form">
            <div class="row">
            <label>
            歌名
            </label>
            <input name="name" type="text" value="__name__">
            </div>
            <div class="row">
            <label>
            歌手
            </label>
            <input name="singer" type="text" value="__singer__">
            </div>
            <div class="row">
            <label>
            外链
            </label>
            <input name="url" type="text" value="__url__">
            </div>
            <div class="row actions">
            <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data = {}){ 
            // ES6 语法，如果用户没传data，或者传来的data事undefined，就执行data = {}（空对象）
            let placeholders = ['name', 'url', 'singer', 'id']
            let html = this.template
            placeholders.map((string)=>{
                html = html.replace(`__${string}__`, data[string] || '') // 兼容，以免显示undefined
            })
            $(this.el).html(html)
            if(data.id) {
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            } else {
                $(this.el).prepend('<h1>新建歌曲</h1>')
            }
        },
        reset(){
            this.render({})
        }
    }
    let model = {
        data: {
            name: '', singer: '', url: '', id: ''
        },
        create(data){
            var Song = AV.Object.extend('Song');
            var song = new Song();
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('url',data.url);
            return song.save().then((newSong) =>{
                let {id, attributes} = newSong
                Object.assign(this.data, { id, ...attributes })
                // 上面一句等同下面注释几句

                // this.data.id = id
                // this.data.name = attributes.name
                // this.data.singer = attributes.singer
                // this.data.url = attributes.url

            }, (error) =>{
                console.error(error);
            });    
        }
    }
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload', (data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('select', (data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new', ()=>{
                this.model.data = {
                    name: '', url: '', id: '', singer: ''
                }
                this.view.render(this.model.data)
            })
        },
        bindEvents(){
            // 事件委托
            this.view.$el.on('submit', 'form', (e)=>{
                e.preventDefault()
                let needs = 'name singer url'.split(' ') // 通过空格得到数组
                let data = {}
                needs.map((string)=>{
                    data[string] = this.view.$el.find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                .then(()=>{
                    this.view.reset()
                    //this.model.data === 'ADDR 108'
                    let string = JSON.stringify(this.model.data)
                    let object = JSON.parse(string)
                    window.eventHub.emit('create', object)
                })
            })
        }
    }
    controller.init(view, model)
}