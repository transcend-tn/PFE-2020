import React from 'react';
import { useHistory } from 'react-router-dom';



const PageIntrouvable =() =>{
    const history = useHistory();
    return(
        <>
        <h2>404 Page</h2>
        <p>rediriger vers <span style={{color:'dodgerblue'}} onClick={() =>history.push('/')}>la page d'accueil </span></p>
</>

    )
}


export default PageIntrouvable ;