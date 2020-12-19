import React from 'react';
import Conf from "../img/confetti.png";

const Contetti = (props) => {
    const {size} = props;
    return (
        <div>
            <div className="confetti">
                <img src={Conf} width={size} alt="confetti"/>
                <b>
                    Super. There is nothing to do.
                </b>
            </div>
        </div>
    );
};

export default Contetti;