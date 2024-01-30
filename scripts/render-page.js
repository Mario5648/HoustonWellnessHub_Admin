var buttonOptions = [];
var resourceCategoriesPageTextDict = {"title": null, "description": null, "options": null};
var resourceCategoriesOptionsPageTextDict = {"title": null, "description": null, "options": null};
var resourceInformationPageTextDict = {"title": null, "description": null}

var linksDict = {"button":"", "video":""}
var stepsDict = {"steps":""}
var RCID = "" 
var SELECTED_RESOURCE = "";
var SELECTED_RESOURCE_INFORMATION = "";
var resourcePage = 1;

function checkUserLogin()
{
    let userToken = localStorage.getItem("HWH_TOKEN_A");

    if(userToken)
    {
        renderHomescreen();
    }else
    {
        window.open('./login.html','_self')
    }
}

function displayOptionButtons(openFunction)
{
    let buttonsHtml = ``;

    let numOfButtons = buttonOptions.length;

    for(let buttonIndex = 0; buttonIndex < numOfButtons; buttonIndex+=1)
    {
        buttonsHtml += `<br><br><div class="option-button" onclick="${openFunction}('${buttonOptions[buttonIndex]}')"><p class="normal-text">${buttonOptions[buttonIndex]}</p></div>`;
    }

    document.getElementById("options-section").innerHTML = buttonsHtml;
}

function renderHomescreen()
{
    resourcePage = 1;
    getResourceCategoriesCall(function(){
        /* Render the home page button with all resource categories as options */
        let homeScreenHtml = `
                                <div class="menu-section">
                                    <button class="save-button" onclick="updateResourceCategoriesCall()">Save Changes</button>
                                </div>
                                
                                <div class="description-section">
                                    <br><br>
                                    <h3>${resourceCategoriesPageTextDict['title']}</h3><br><br><br>
                                    <textarea class="text-area-styles" id="resourceCategoriesPageDescription">${resourceCategoriesPageTextDict['description']}</textarea>
                                </div>
                                <br>
                                <br>
                                <div class="menu-section">
                                    <button class="add-button" id="addButton" onclick="addButtonResource()">Add Button</button>
                                    <button class="delete-button" onclick="deleteButtonResource()">Delete Button</button>
                                </div>
                                <br>
                                <br>
                                <div id="options-section" class="options-section"></div>
                            `;

        document.getElementById('main-container').innerHTML = homeScreenHtml;
        displayOptionButtons("renderResourceCategoryOptions");
    })
}

function renderResourceCategoryOptions(selectedResource)
{
    /* Render the page that shows all the resources based on the selected category */
    resourcePage = 2;
    SELECTED_RESOURCE = selectedResource;

    getResourceCategoryOptionsCall(function(){

        let resourceCategoryOptionsHtml = `
                                            
                                                <div class="menu-section">
                                                    <a onclick="renderHomescreen()"><i class="fa fa-arrow-circle-o-left" style="font-size:30px"></i></a>
                                                    <button class="save-button" onclick="updateResourceCategoryOptionsCall()">Save Changes</button>
                                                </div>

                                                <div class="description-section">
                                                    <br><br>
                                                    <h3>${resourceCategoriesOptionsPageTextDict['title']}</h3><br><br><br>
                                                    <textarea class="text-area-styles" id="resourceCategoriesOptionsPageDescription">${resourceCategoriesOptionsPageTextDict['description']}</textarea>
                                                </div>
                                                <br>
                                                <br>
                                                <div class="menu-section">
                                                    <button class="add-button" id="addButton" onclick="addButtonResource()">Add Button</button>
                                                    <button class="delete-button" onclick="deleteButtonResource()">Delete Button</button>
                                                </div>
                                                <br>
                                                <br>
                                                <div id="options-section" class="options-section"></div>

                                            `;
        goToTopPage();
        document.getElementById('main-container').innerHTML = resourceCategoryOptionsHtml;
        displayOptionButtons("renderResourceInfoPage");
    })



}

function renderResourceInfoPage(selectedResource)
{
    resourcePage = 3;
    /* Render the page that shows all the resources based on the selected category */
    SELECTED_RESOURCE_INFORMATION = selectedResource;

    getResourceInformationCall(function(){
        let renderResourceInfoPageHtml = `
                                            
                                        <div class="menu-section">
                                            <a onclick="renderResourceCategoryOptions('${SELECTED_RESOURCE}')"><i class="fa fa-arrow-circle-o-left" style="font-size:30px"></i></a>
                                            <button class="save-button" onclick="updateResourceInformationCall()">Save Changes</button>
                                        </div>

                                        <div class="description-section">
                                            <br><br>
                                            <h3>${resourceInformationPageTextDict['title']}</h3><br><br><br>
                                            <textarea class="text-area-styles" id="resourceInformationPageDescription">${resourceInformationPageTextDict['description']}</textarea><br><br>
                                        </div>
                                        <p>Button Link :</p><br>
                                        <input class="editField" id="buttonLink" name="buttonLink" type="text" value="${linksDict['button']}">
                                        <br>
                                        <br>
                                        <div class="information-section">
                                            <div class="steps-section">
                                                <p>Steps :</p><br>

                                                <textarea class="text-area-styles" id="stepsText">${stepsDict['steps']}</textarea><br><br>
                                            </div>
                                            <br><br> 
                                            <div class="video-section">
                                                <p>Video :</p><br>
                                                <input id="videoLink" class="editField" type="text" value="${linksDict['video']}">
                                            </div>
                                        </div>

                                    `;

        goToTopPage();
        document.getElementById('main-container').innerHTML = renderResourceInfoPageHtml;
    })

}


function addButtonResource(resourcePage)
{

    let addButtonModalHtml = `
                            <!-- The Modal -->
                            <div id="myModal" class="modal">
                                <!-- Modal content -->
                                <div class="modal-content">
                                <span class="close">&times;</span>
                                <label for="resourceTitleField">Resource Title :</label>
                                <input type="text" id="resourceTitleField" name="resourceTitleField"></input>
                                <br>
                                <br>
                                <button onclick="submitAddNewButton()" class="add-button">Add Button</button>
                                </div>
                            </div>
                         `;

    document.getElementById('modalSection').innerHTML += addButtonModalHtml;


    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById('modalSection').innerHTML = ``;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('modalSection').innerHTML = ``;
        }
    }
}

function submitAddNewButton()
{
    buttonOptions.push(document.getElementById("resourceTitleField").value);
    switch(resourcePage)
    {
        case 1:
            updateResourceCategoriesCall(addedButtonFlag = true, resourceOptionName = document.getElementById("resourceTitleField").value);
            break;
        case 2:
            updateResourceCategoryOptionsCall(addedButtonFlag = true, resourceOptionName = document.getElementById("resourceTitleField").value);
            break;
    }
}

function deleteButtonResource(resourcePage)
{

    let addButtonModal = `
                            <!-- The Modal -->
                            <div id="myModal" class="modal">
                                <!-- Modal content -->
                                <div class="modal-content">
                                <span class="close">&times;</span>
                                <label for="resourceTitleField">Resource Title :</label>
                                <input type="text" id="resourceTitleField" name="resourceTitleField"></input>
                                <br>
                                <br>
                                <button onclick="submitDeleteNewButton()" class="delete-button">Delete Button</button>
                                </div>
                            </div>
                         `;

    document.getElementById('modalSection').innerHTML += addButtonModal;


    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById('modalSection').innerHTML = ``;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('modalSection').innerHTML = ``;
        }
    }
}

function submitDeleteNewButton()
{

    buttonOptions = buttonOptions.filter(v => v != document.getElementById("resourceTitleField").value); 

    switch(resourcePage)
    {
        case 1:
            updateResourceCategoriesCall(addedButtonFlag = false, resourceOptionName = document.getElementById("resourceTitleField").value, deleteButtonFlag = true)
            break;
        case 2:
            updateResourceCategoryOptionsCall(addedButtonFlag = false, resourceOptionName = document.getElementById("resourceTitleField").value, deleteButtonFlag = true);
            break;
    }


}





