import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStyles } from "./styles";
import Home from "./screens/Home";
import Block from "./screens/Block";
import Blocks from "./screens/Blocks";
import Explorer from "./screens/Explorer";
import Transactions from "./screens/Transactions";
import Transaction from "./screens/Transaction"
import Wallet from "./screens/Wallet";
import routes from "./routes";


function App() {
    return (
        <HelmetProvider>
            <GlobalStyles />
            <Router>
                <Switch>
                    <Route path={ routes.home } exact>
                        <Home />
                    </Route>
                    <Route path={ routes.explorer } exact>
                        <Explorer />
                    </Route>
                    <Route path={ routes.wallet } exact>
                        <Wallet />
                    </Route>
                    <Route path={ routes.block } exact>
                        <Block />
                    </Route>
                    <Route path={ routes.blocks } exact>
                        <Blocks />
                    </Route>
                    <Route path={ routes.transaction } exact>
                        <Transaction />
                    </Route>
                    <Route path={ routes.transactions } exact>
                        <Transactions />
                    </Route>


                </Switch>
            </Router>
        </HelmetProvider>
    );
}

export default App;
