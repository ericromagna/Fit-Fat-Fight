
function init() {

    $("#addFood").on("pageshow", FillSelectListFood);
    $("#monthFood").on("pageshow", monthShow);
    $("#dailyFood").on("pageshow",getDailyFood);
    $("#addFoodBtn").on("click", addFoodValidation);
    $("#profile").on("pageshow", profileShowManager);
    $("#profileSaveBtn").on("click", profileManager);
    $("#userWeight").on("change", updateBMI);
    $("#userHeight").on("change", updateBMI);
    $("#createBtn").on("click", createFoodValidation);
    $("#homePage").on("pageshow", homePageEvents);

}

function homePageEvents()
{
    readContentHome();
    readDailyElements();

}

function initDB() {
    try
    {
        DB.CreateDatabase();
        if (db)
        {
            DB.createTables();
        }
        else
        {
            console.error("Error: Cannot create tables: Database does not exist");
        }
    }
    catch (e)
    {
        console.error("Error: (Fatal) Error in initDB(). Cannot proceed");
    }

}

$(document).ready(
    function () {
        init();
        initDB();
    }
);
