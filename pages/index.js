///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                   File using for showing initial file contant of HOME page                        //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Wrapper from "./layout/wrapper";
import Home from "./home/home";

// Function for initial page
const MainRoot = () => {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
};

export default MainRoot;
