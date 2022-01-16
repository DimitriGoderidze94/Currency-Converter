"use strict";
const BASE_URL = "https://any.ge/currency/api.php?info=yvela";

function getKeyValues(key, cb) {
  for (let i = 0; i < data.currency.length; i++) {
    Arr[i] = data.currency[i][key];
  }
  cb();
}

function bringJson(language) {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      function getKeyValues(key, cb) {
        for (let i = 0; i < data.currency.length; i++) {
          Arr[i] = data.currency[i][key];
        }
        cb();
      }

      getKeyValues(language, function () {
        for (let i = 0; i < Arr.length; i++) {
          document.getElementsByClassName("selectClass")[0].innerHTML +=
            "<option class='optionClass1'>" + Arr[i] + "</option>";
          document.getElementsByClassName("selectClass")[1].innerHTML +=
            "<option class='optionClass2'>" + Arr[i] + "</option>";
        }
      });

      getKeyValues("cur_value", function () {
        for (let i = 0; i < Arr.length; i++) {
          document
            .getElementsByClassName("optionClass1")
            [i].setAttribute("rate", Arr[i]);
        }
        for (let i = 0; i < Arr.length; i++) {
          document
            .getElementsByClassName("optionClass2")
            [i].setAttribute("rate", Arr[i]);
        }
      });
    });
}

let Arr = [];

class Language extends React.Component {
  render() {
    return (
      <div className="dropDown">
        <select className="chooseLanguage" onChange={this.props.languageChange}>
          <option>Geo</option>
          <option>En</option>
        </select>
      </div>
    );
  }
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }

  handleChange() {
    let yourSelect1 = document.getElementsByClassName("selectClass")[1];
    let rate1 =
      yourSelect1.options[yourSelect1.selectedIndex].getAttribute("rate");
    let yourSelect = document.getElementsByClassName("selectClass")[0];
    let rate0 =
      yourSelect.options[yourSelect.selectedIndex].getAttribute("rate");
    let totalValue = document.getElementsByClassName("input1")[0].value * rate0;
    document.getElementsByClassName("input1")[1].value = totalValue / rate1;
  }
  handleChange1() {
    let yourSelect1 = document.getElementsByClassName("selectClass")[1];
    let rate1 =
      yourSelect1.options[yourSelect1.selectedIndex].getAttribute("rate");
    let yourSelect = document.getElementsByClassName("selectClass")[0];
    let rate0 =
      yourSelect.options[yourSelect.selectedIndex].getAttribute("rate");
    let totalValue = document.getElementsByClassName("input1")[1].value * rate1;
    document.getElementsByClassName("input1")[0].value = totalValue / rate0;
  }
  render() {
    return (
      <div>
        <input
          onChange={this.handleChange}
          type="number"
          className="input1"
          totalvalue=""
        />
        <select onChange={this.handleChange} className="selectClass"></select>
        <br />
        <input
          onChange={this.handleChange1}
          type="number"
          className="input1"
          totalvalue=""
        />
        <select onChange={this.handleChange1} className="selectClass"></select>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { language: "cur_name" };
  }
  componentDidMount() {
    bringJson(this.state.language);
  }

  languageChange(e) {
    document.getElementsByClassName("selectClass")[0].innerHTML = "";
    document.getElementsByClassName("selectClass")[1].innerHTML = "";
    if (e.target.value === "Geo") {
      this.setState({
        language: "cur_code",
      });
      bringJson("cur_code");
    } else if (e.target.value === "En") {
      this.setState({
        language: "cur_name",
      });
      bringJson("cur_name");
    }

    document.getElementsByClassName("input1")[0].value = "";
    document.getElementsByClassName("input1")[1].value = "";
  }

  render() {
    return (
      <div id="container">
        <Language languageChange={this.languageChange.bind(this)} />
        <Row />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

