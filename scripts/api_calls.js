/*


var getResourceCategoriesEndPoint = "http://127.0.0.1:5000/getResourceCategories";
var updateResourceCategoriesEndPoint = "http://127.0.0.1:5000/updateResourceCategories";
var getResourceCategoryOptionsEndPoint = "http://127.0.0.1:5000/getResourceCategoryOptions";
var updateResourceCategoriesOptionsEndPoint = "http://127.0.0.1:5000/updateResourceCategoryOptions";
var getResourceInformationEndPoint = "http://127.0.0.1:5000/getResourceInformation";
var updateResourceInformationEndPoint = "http://127.0.0.1:5000/updateResourceInformation"
var userLogingEndPoint = "http://127.0.0.1:5000/login";

*/


var getResourceCategoriesEndPoint = "https://byteanalytica.com/getResourceCategories";
var updateResourceCategoriesEndPoint = "https://byteanalytica.com/updateResourceCategories";
var getResourceCategoryOptionsEndPoint = "https://byteanalytica.com/getResourceCategoryOptions";
var updateResourceCategoriesOptionsEndPoint = "https://byteanalytica.com/updateResourceCategoryOptions";
var getResourceInformationEndPoint = "https://byteanalytica.com/getResourceInformation";
var updateResourceInformationEndPoint = "https://byteanalytica.com/updateResourceInformation"
var userLogingEndPoint = "https://byteanalytica.com/login";

var ERROR_FLAG = "ERROR";

function endpointCall(endpoint=null, params={}, callBack=null)
{
    let endpointLink = identifyEndPoint(endpoint);
    const Http = new XMLHttpRequest();
    var params = JSON.stringify(params);
    Http.open( "POST", endpointLink );
    Http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    Http.send(params);
    Http.onreadystatechange = ( e ) => 
    {
        //If the request was successful then populate everything
        if (Http.readyState == 4 && Http.status == 200) 
        {
            //parse the response from power automate to make it readable for the functions
            callBack(JSON.parse( Http.responseText ));
            
        }else
        {
            callBack(ERROR_FLAG);
        }
    }
}

function identifyEndPoint(endpoint=null)
{
    switch(endpoint)
    {
        case "getResourceCategories":
            return getResourceCategoriesEndPoint;
        case "updateResourceCategories":
            return updateResourceCategoriesEndPoint;
        case "getResourceCategoryOptions":
            return getResourceCategoryOptionsEndPoint;
        case "updateResourceCategoriesOptions":
            return updateResourceCategoriesOptionsEndPoint;
        case "getResourceInformation":
            return getResourceInformationEndPoint;
        case "updateResourceInformation":
            return updateResourceInformationEndPoint;
        case "login":
            return userLogingEndPoint;
    }
}