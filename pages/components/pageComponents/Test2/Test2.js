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
            <h1>Test page 2</h1>
            <Link href={
                    {
                      pathname: '/'
                    }}
                  >
                  <ButtonType className="btntype1" name="Page 1" />
                </Link>
        </div>
    )
}

export default Test1;