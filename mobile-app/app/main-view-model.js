let observableModule = require("data/observable")

class MainViewModel extends observableModule.Observable {
  constructor() {
    super()
    this.contador = 21
    this.mensagem = 'clique no botão'
    this.texto = 'Digite'
  }

  obterMensagem() {
    if(this.contador <= 0) {
      return 'Beleza, vc é um clicador e tanto!'
    } else {
      return `faltam ${this.contador} cliques para acontecer algo majestoso!`
    }
  }

  clique() {
    this.contador--
    this.set('mensagem', this.obterMensagem())
    // this.mensagem = this.obterMensagem()
    // this.notifyPropertyChange('mensagem', this.mensagem)
  }

  logText() {
    console.log(this.texto)
  }
}

exports.MainViewModel = MainViewModel
