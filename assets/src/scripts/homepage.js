import $ from "jquery";
import domReady from 'domready';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Global from "./components/GlobalSettings";


class Homepage {
    constructor() {
        this.init();
    };
    
    init() {
        new Header;
        new Footer;
        new Global;
    }
}

domReady(() => {
    new Homepage;
});


