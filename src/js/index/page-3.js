{
  let view = {
    el: '.page-3',
    init(){
      this.$el = $(this.el)
    },
    show(){
      this.$el.addClass('active')
    },
    hide(){
      this.$el.removeClass('active')
    }
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view 
      this.view.init()
      this.model = model
      this.bindEventHub()
      this.loadModule1()
    },
    bindEventHub(){
      window.eventHub.on('selectTab', (tabName)=>{
        if(tabName === 'page-3'){
          this.view.show()
        }else{
          this.view.hide()
        }
      })
    },
    loadModule1(){
      let script1 = document.createElement('script')
      script1.src = './js/index/page-3-1.js' 
      document.body.appendChild(script1)
    },
  }
  controller.init(view, model)
}