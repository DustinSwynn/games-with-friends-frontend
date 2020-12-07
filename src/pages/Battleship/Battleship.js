import { Redirect } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const Battleship = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    // console.log(user.sub);
    // console.log(isLoading);
    // console.log(isAuthenticated);

    let userId ='';
    if (!isLoading && isAuthenticated) {
        userId = user.sub;
        console.log(userId);
        //alert(userId);
    } else {
        console.log("no user id");
        //alert("no user id");
    }

    let Url = "0; URL='https://backend-dot-second-folio-294223.nn.r.appspot.com/battleship?userid=" + userId + "'";

    //?userid=" + userId + "'"; 
    

    return (
    //<Redirect to={`http://localhost:8080/battleship?${userId}`} />
    //<meta http-equiv="refresh" content="0; URL='{`http://localhost:8080/battleship?${userId}`}'" />
    <meta http-equiv="refresh" content={Url} />
    // <div>
    //     <a href="localhost:8080/battleship/battleship.html" class="btn splash-btn">Battleship</a>
    // </div>
    // <div>
    //     <a> Battleship</a>
    // </div>
    )
};

export default Battleship;
