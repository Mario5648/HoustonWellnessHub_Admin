function getResourceCategoriesCall(callBack = null)
{

    let params = {};

    endpointCall("getResourceCategories", params, function(data)
                {
                    if(data["status"] == "success")
                    {
                        RCID = data['resourceCategoriesData'][0]
                        resourceCategoriesPageTextDict['title'] = data['resourceCategoriesData'][1]
                        resourceCategoriesPageTextDict['description'] = data['resourceCategoriesData'][2]
                        buttonOptions = JSON.parse(data['resourceCategoriesData'][3])

                        return callBack(data);
                    }else if(data["status"] == "failed")
                    {
                        alert(`Failed! ${data["message"]}`);
                        return callBack(null); 
                    }
                });
}


function updateResourceCategoriesCall(addedButtonFlag = false, resourceOptionName = null, deleteButtonFlag = false)
{
    let userToken = localStorage.getItem("HWH_TOKEN_A");
    let username = localStorage.getItem("HWH_USERNAME_A");

    let params = {
                    "rcid" : RCID,
                    "title": resourceCategoriesPageTextDict['title'],
                    "description": document.getElementById('resourceCategoriesPageDescription').value,
                    "options": JSON.stringify(buttonOptions),
                    "addedButtonFlag":addedButtonFlag,
                    "resourceOptionName": resourceOptionName,
                    "userToken":userToken, 
                    "username":username
                 };

    endpointCall("updateResourceCategories", params, function(data)
                {
                    if(data["status"] == "success")
                    {

                        displayOptionButtons("renderResourceCategoryOptions");
                        alert(data["message"]);
                        return;

                    }else if(data["status"] == "failed")
                    {
                        if(addedButtonFlag == true)
                        {
                            buttonOptions = buttonOptions.filter(v => v !== resourceOptionName); 
                        }else if(deleteButtonFlag == true)
                        {
                            buttonOptions.push(resourceOptionName);
                        }
                        alert(`Failed! ${data["message"]}`);
                        return; 
                    }
                });
}


function getResourceCategoryOptionsCall(callBack = null)
{
    let params = { "parentResource": SELECTED_RESOURCE };
    endpointCall("getResourceCategoryOptions", params, function(data)
                {
                    if(data["status"] == "success")
                    {
                        resourceCategoriesOptionsPageTextDict['title'] = data['resourceCategoryOptionsData'][0]
                        resourceCategoriesOptionsPageTextDict['description'] = data['resourceCategoryOptionsData'][1]
                        buttonOptions = JSON.parse(data['resourceCategoryOptionsData'][2])

                        return callBack(data);
                    }else if(data["status"] == "failed")
                    {
                        alert(`Failed! ${data["message"]}`);
                        return callBack(null); 
                    }
                });
}

function updateResourceCategoryOptionsCall(addedButtonFlag = false, resourceOptionName = null, deleteButtonFlag = false)
{
    let userToken = localStorage.getItem("HWH_TOKEN_A");
    let username = localStorage.getItem("HWH_USERNAME_A");

    let params = {
        "parentResource" : SELECTED_RESOURCE,
        "title": resourceCategoriesOptionsPageTextDict['title'],
        "description": document.getElementById('resourceCategoriesOptionsPageDescription').value,
        "options": JSON.stringify(buttonOptions),
        "addedButtonFlag":addedButtonFlag,
        "resourceOptionName": resourceOptionName,
        "userToken":userToken, 
        "username":username
     };

    endpointCall("updateResourceCategoriesOptions", params, function(data)
        {
            if(data["status"] == "success")
            {
                displayOptionButtons("renderResourceInfoPage");

                alert(data["message"]);
                return;

            }else if(data["status"] == "failed")
            {
                if(addedButtonFlag == true)
                {
                    buttonOptions = buttonOptions.filter(v => v !== resourceOptionName); 
                }else if(deleteButtonFlag == true)
                {
                    buttonOptions.push(resourceOptionName);
                }
                alert(`Failed! ${data["message"]}`);
                return; 
            }
        });
}

function getResourceInformationCall(callBack = null)
{
    let params = { "resource": SELECTED_RESOURCE_INFORMATION };
    endpointCall("getResourceInformation", params, function(data)
                {
                    if(data["status"] == "success")
                    {
                        resourceInformationPageTextDict['title'] = data['resourceInformationData'][0];
                        resourceInformationPageTextDict['description'] = data['resourceInformationData'][1];
                        linksDict['button'] = data['resourceInformationData'][2];
                        stepsDict['steps'] = data['resourceInformationData'][3];
                        linksDict['video'] = data['resourceInformationData'][4];
                        return callBack(data);
                    }else if(data["status"] == "failed")
                    {
                        alert(`Failed! ${data["message"]}`);
                        return callBack(null); 
                    }
                });
}

function updateResourceInformationCall()
{
    let userToken = localStorage.getItem("HWH_TOKEN_A");
    let username = localStorage.getItem("HWH_USERNAME_A");

    let params = {
        "resource" : SELECTED_RESOURCE_INFORMATION,
        "title": resourceInformationPageTextDict['title'],
        "description": document.getElementById('resourceInformationPageDescription').value,
        "resourceLink": document.getElementById('buttonLink').value,
        "steps": document.getElementById('stepsText').value,
        "video": document.getElementById('videoLink').value,
        "userToken":userToken, 
        "username":username
     };

    endpointCall("updateResourceInformation", params, function(data)
        {
            if(data["status"] == "success")
            {
                alert(data["message"]);
                return;

            }else if(data["status"] == "failed")
            {
                alert(`Failed! ${data["message"]}`);
                return; 
            }
        });
}