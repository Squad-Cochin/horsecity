///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//            File using for checking the both the text are matching page(not using now)             //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// Function for checking the text is matching or not
export default function isTextMatched(tag, match) {
    if (tag !== undefined && match !== "") {
        if (tag.toLocaleLowerCase() === match.toLocaleLowerCase()) {
            return true;
        }
        return false;
    }
    return false;
}
