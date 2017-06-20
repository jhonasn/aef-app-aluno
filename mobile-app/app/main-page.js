const MainViewModel = require("./main-view-model").MainViewModel

class MainPage {
  constructor() {
    this.page = null
  }

  init(args) {
    this.page = args.object
    let viewModel = new MainViewModel()
    this.page.bindingContext = viewModel
  }
}

let mainPage = new MainPage()

exports.onNavigatingTo = mainPage.init
