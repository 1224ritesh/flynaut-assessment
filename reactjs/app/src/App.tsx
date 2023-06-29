// This is the main file of the project. This file is responsible for rendering all the components and passing data between them.
// The main file is also responsible for rendering the loader component for 2 seconds and then hiding it.
// The main file is also responsible for passing data between components using Context API (using functional components).
// The main file is also responsible for scrolling to a particular component using refs and window.scrollBy() method.
// The main file is also responsible for passing data between components using props and state (using class based components).
// The main file is also responsible for passing data between components using refs (using class based components).
import React from "react";
import Loader from "./components/Loader";
import CompOne from "./components/CompOne";
import CompTwo from "./components/CompTwo";
import CompThree from "./components/CompThree";

interface myProps {} // type of props is empty because this class doesnt receive any props from any other component
interface myState {
  name: string; // type of state is string because we are storing the name of the user
}
export const nameContext = React.createContext("");

// this is the main class of the project. This class is responsible for rendering all the components and passing data between them.
class App extends React.PureComponent<{}, myState> {
  private loaderRef;
  private timeOut: any;
  private compThreeRef;

  constructor(props: myProps) {
    super(props);

    this.state = {
      name: "",
    };
    this.loaderRef = React.createRef<HTMLDivElement>();
    this.compThreeRef = React.createRef<HTMLDivElement>();

    this.passData = this.passData.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  private hideLoader() {
    var x = this.loaderRef.current;
    x!!.style.transition = "all 500ms ease";
    x!!.style.transform = "translateY(-100%)";
  }

  private showLoader() {
    var x = this.loaderRef.current;
    x!!.style.transition = "none";
    x!!.style.transform = "translateY(0)";
  }

  componentDidMount(): void {
    this.timeOut = setTimeout(() => {
      this.hideLoader();
    }, 2000);
  }

  passData(name: string) {
    this.setState({ name: name });
  }

  scroll() {
    var x = this.compThreeRef.current!.getBoundingClientRect();
    var displacement = x.top || x.y;

    window.scrollBy({
      top: displacement,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <div className="App">
        <Loader ref={this.loaderRef} />

        <CompOne passingHandler={this.passData} />
        <CompTwo name={this.state.name} scroller={this.scroll} />

        {/* Example of Context */}

        <nameContext.Provider value={this.state.name}>
          <CompThree ref={this.compThreeRef} />
        </nameContext.Provider>
      </div>
    );
  }
}

export default App;
