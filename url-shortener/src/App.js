import './App.css';
import { useState} from 'react';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkResult from './LinkResult';

function App() {
  const [inputValue, setInputValue] = useState("");
  
  return (
    <div className="container">

      <div className="header">
        <img src="https://uploads-ssl.webflow.com/60d45974277c668d0adff732/6172846901fb514dbd27161d_Bytexl%20logo.png" alt="logo" /> 
      </div>

      <InputShortener setInputValue = {setInputValue} />
      <BackgroundAnimate />
      <LinkResult inputValue = {inputValue} />
    </div>
  );
}

export default App;


// function App() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8000/message")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//     </div>
//   );
// }

// import React , {Component} from 'react';
// import "bootstrap/dist/css/bootstrap.min.css"
// import { useState, useEffect } from 'react';
//  import BackgroundAnimate from './BackgroundAnimate';
//  import InputShortener from './InputShortener';
//  import LinkResult from './LinkResult';


// class App extends Component {
//   constructor(){
//     super()
//     this.state = {
//        longurl:'',
      
//     }
//   }
//   changelongurl(event){
//    this.setState ({ 
//         longurl:event.target.value
//    })
//   }
//   render(){
//     return (
//       <div>
//              <div className = 'container'>
//               <div className = 'form-div'>
//                 <form>
//                   <input type = 'text'
//                   placeholder = 'long url'
//                   onChange = {this.changelongurl}
//                   value = {this.state.longurl}
//                   className = 'form-control form-group'
//                    />
//                   <input type = 'submit' className = 'btn btn-danger btn-block' value= 'Submit'/>
//                 </form>
//               </div>
//       </div>
//       </div>
//       </div>

//        <InputShortener setInputValue = {setInputValue} />
//          <BackgroundAnimate />
//            <LinkResult inputValue = {inputValue} />
//            </div>
//          );
//       }
      
//      export default App;
//     )
//   }
// }