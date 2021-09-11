import {useContext, useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import {AuthContext} from "../contexts/auth.context";
import M from "materialize-css/dist/js/materialize.min.js";

const GuardedRoute = ({ component: Component, ...rest }) => {
    let userCtx = useContext(AuthContext);
    console.log(userCtx,"auth guard invoked");
    useEffect(() => {
        if(userCtx && userCtx.auth === false){
            M.toast({html: `Not Authenticated`},500);
        } else if(userCtx && userCtx.auth === true){
            M.toast({ html: `Enjoy the Game`}, 500);
        } 
    }, [])


    return(
        <Route {...rest} render={(props) => (
            userCtx && userCtx.auth === true 
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )


}
export default GuardedRoute;
