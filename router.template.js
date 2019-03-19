import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import components here for the router

class RouterFile extends React.Component {
   render() {
      return (
         <Router>
            <div>
               <nav>
                  <ul>
                      {/* Add links for the header here.*/}
                     {/* <li>
                        <Link to="/">Home</Link>
                     </li> */}
                  </ul>
               </nav>
               <Switch>
                   {/* Import components and generate routes here */}
                  {/* <Route path="/" component={Index} />
                  <Route component={Noroute} /> */}
               </Switch>
            </div>
         </Router>
      );
   }
}

export default RouterFile;