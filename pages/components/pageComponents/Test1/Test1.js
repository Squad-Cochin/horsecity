//////////////////////////////////////////////////////////////
///                                                         //
///          Test component page to learn                   //
///                                                         //
//////////////////////////////////////////////////////////////

import ButtonType from "../../elementComponents/Button/Button";
import Link from "next/link";
import React,{useState} from "react";

const Test1 = () => {

    return(
        <div>
            <h1>Test page 1</h1>
            <Link href={
                {
                    pathname: '/test2'
                }}
                >
                <ButtonType name="Page 2" />
            </Link>
        </div>
    )
}

export default Test1;