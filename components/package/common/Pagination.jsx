///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                     File using for search to pagination in LISTING page                           //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filter_page } from "../../../features/listingFilter/listingFilter";
import listingDataApi from "../../../pages/api/listingDataApi";
import { add_list_data } from "../../../features/listData/listData";

// Function for pagination in listing
const Pagination = () => {
  const { list_data } = useSelector((state) => state.listData) || {};
  const { price_from, price_to, sort, limit, page, suppliers } = useSelector((state) => state.listingFilter) || {};
  const dispatch = useDispatch();

  useEffect(()=>{
    initialLoad()
  },[price_from, price_to, sort, limit, suppliers])
  

  // Function for work only at the initial load of the page
  async function initialLoad(){
    if(page == "" || !page || page != null){
      dispatch(filter_page(1))
    }
    
  }

  // Function for onclick in pagination numbers
  const handlePageClick = async (pageNumber) => {
    let search = await JSON.parse(localStorage.getItem('searchObject'));
    dispatch(filter_page(pageNumber))
    updateListData(pageNumber, search);
  };

  // Function for listing packages with new page number
  async function updateListData(pageNumber, search){
    let reqObj = {
      "trip_type": search.trip_type,
      "number_of_horses": search.number_of_horses,
      "price_from": price_from,
      "price_to" : price_to,
      "suppliers" : suppliers,
      "sort" : sort,
      "page" : pageNumber,
      "limit" : limit
    }
    let packageList = await listingDataApi(reqObj)
    dispatch(add_list_data(packageList))
  }

  // Function for style page numbers
  const renderPage = (symbol, pageNumber, isActive = false, index) => {
    const className = `size-40 flex-center rounded-full cursor-pointer ${
      isActive ? "bg-dark-1 text-white" : ""
    }`;

    return (
      <div key={index} className="col-auto">
        <div className={className} onClick={() => handlePageClick(pageNumber)} >
          {symbol}
        </div>
      </div>
    );
  };

  // Function for loop page numbers
  const renderPages = () => {

    let totalPages =  Math.ceil(list_data?.totalCount / limit); // Change this to the actual total number of pages
    let pageNumbers = [];
    pageNumbers.push("<<");
    for (let i = 1; i <= totalPages; i++) {
      if (page === 1) {
        // If page is the first page, remove the first value
        pageNumbers.splice(0, 1);
      }
      //CASE-1 totalPage <= 10
     if(totalPages <= 10){
          for(let j=1; j <= totalPages ;j++){
            pageNumbers.push(j);
          }
          break;
      }else{
        //If the page no:  less than 6 
        if(page<6){
            for(let j=1; j <= 6 ;j++){
                pageNumbers.push(j);
            }
            let lastV = totalPages
            let lastBeforeV =totalPages-1
            pageNumbers.push("...",lastBeforeV,lastV)
            break;
          }else if (page === totalPages || page === (totalPages -1) || page === (totalPages-4) || page === (totalPages-3) || page === (totalPages-2) ){
            //If the page less than last 5 value
                let lastIndex = totalPages -1;
                let firstV = totalPages -lastIndex   
                let secondV =  firstV + 1
                pageNumbers.push(firstV,secondV,"...",(totalPages-5),(totalPages-4),(totalPages-3),(totalPages-2),(totalPages-1),(totalPages))
                break;
          }else{
            // If they are selecting greater than 5 page
            let array = [];
              for (let i = 1; i <= totalPages; i++) {
                array.push(i);
              }
              let firstV = array[0]  //1
              let secondV = array[1] //2

 
              let selectindex = array.indexOf(page); //selectedValue index
              let selctValue = array[selectindex]
              let before2SelectValue = array[selectindex-2]
              let before1SelectValue = array[selectindex-1]

              let after1SelectValue = array[selectindex+1]
              let after2SelectValue = array[selectindex+2]

              let lastIndex = array.length-1
              let lastV = array[lastIndex] //lastValue
              let lastBeforeV =array[lastIndex-1]; //lastValue-1

              pageNumbers.push(firstV,secondV,"...",before2SelectValue,before1SelectValue,selctValue,after1SelectValue,after2SelectValue,"...",lastBeforeV,lastV);
              break;
          }
      }
    }
    
    pageNumbers.push(">>");

    // If page is the last page, remove the last value
    if (page === totalPages) {
      pageNumbers.pop();
    }

    const pages = pageNumbers.map(
      (pageNumber,index) =>{
        let symbol = ""
        if(pageNumber == "<<"){
          symbol = "<<"
          pageNumber = page - 1
        } else if(pageNumber == ">>"){
          symbol = ">>"
          pageNumber = page + 1
        } else if(pageNumber == "..."){
         
          let num1 = pageNumbers[index-1]
          let num2 = pageNumbers[index+1]
   
          pageNumber = Math.round((num1+num2) / 2);
          symbol = "..."
          
        } else {
          symbol = pageNumber
        }
        let response = renderPage(symbol, pageNumber, pageNumber === page, index)
        return response
      }
    );
    return pages;
  };
  

  return (
    <div className="border-top-light mt-30 pt-30">
      <div className="row x-gap-10 y-gap-20 justify-between md:justify-center">
        <div className="col-auto md:order-1">
        </div>

        <div className="col-md-auto md:order-3">
          <div className="row x-gap-20 y-gap-20 items-center md:d-none">
            {renderPages()}
          </div>

          <div className="row x-gap-10 y-gap-20 justify-center items-center d-none md:d-flex">
            {renderPages()}
          </div>
        </div>

        <div className="col-auto md:order-2">
        </div>
      </div>
    </div>
  );
};

export default Pagination;
