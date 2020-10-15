import React, { useState } from 'react';
import Media from 'react-bootstrap/esm/Media';
import { FaStar } from "react-icons/fa";

function Favoris(props: any) {
    const [color, setColor] = useState(props.star?"#f5bf42":"gray");

    function toggleColor(){
        setColor(props.star?"gray":"#f5bf42")
    }

    return (
        <div className="d-flex bd-highlight">
            <div className="p-2 w-100 bd-highlight">
                <Media>
                    <Media.Body>
                        <h5 className="text-primary"> {props.document} </h5>
                        <p className="text-secondary"> {props.timeEdit} </p>
                    </Media.Body>
                </Media>
            </div>
            <div className="p-2 flex-shrink-1 bd-highlight">
                <FaStar color={color} onClick={toggleColor}/>
            </div>
        </div>          
    );
}

export default Favoris;