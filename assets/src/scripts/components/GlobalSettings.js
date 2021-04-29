export default class Global {
  constructor() {
    this.mainContainer = document.querySelector("#vb_page");
    this.navBar = document.querySelector(".vbMenu");
    this.navAbout = document.querySelector(".vbAbout");
    this.init();
  }

  init() {
    if (!this.mainContainer) return false;
    this.loadData();
  }

  loadData() {
    const url = "/api/v1/posts/"
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
         this.appenData(data.results)
      })
  }

  appenData (data) {
    // menu items
    const headerData = `
      ${data.map(item => 
        `
          <li><a href="syria.html">${item.title}</a></li>
        `
      ).join("")}
    `;
    this.navBar.innerHTML = headerData;
    
  }

}
