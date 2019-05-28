function FillSelectListFood() {

    var options = [];

    function callback(tx, results)
    {
        var htmlCode = "";

        /*
        for (var i = 0; i < results.rows.length; i++)
        {
            var row = results.rows[i];
            var option = $('<option></option>').attr("value",i.toString()).text(row['Description']);
            $("#addFoodSelect").append(option);
        }
        */
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            htmlCode += "<option value=" + row['id'].toString() + ">" + row['Description'] + "</option>";
        }
        var select = $("#addFoodSelect");

        select = select.html(htmlCode);
        select.selectmenu("refresh");


    }
    Food.selectAll(options,callback);
}

function addFood() {

    var today = new Date();
    // var description = $("#addFoodSelect:selected").val();//$('#dropDownId:selected').text()
    var description = $("#addFoodSelect").prop('selectedIndex') + 1;
    var weight = $("#foodWeight").val();

    var options = [description, weight, today];

    function callback() {
        console.info("food record inserted");
    }

    UserFood.insert(options, callback);

}

function profileShowManager(){
    try{
        profileShow();
    }
    catch{
        console.error("no profile set");
    }
}

function profileShow() {

    var options = [];

    function callback(tx, results)
    {
        var last = results.rows.length - 1;
        var row = results.rows[last];
        $("#radioGenreWoman").prop("checked", true);
        $("#userName").val(row['UserName']);

        if (row['Genre'] == "man")
        {
            $("#radioGenreMan").prop("checked", true);
            $("#profileFrm :radio").checkboxradio('refresh');
        }
        else
        {
            $("#radioGenreWoman").prop("checked", true);
            $("#profileFrm :radio").checkboxradio('refresh');
        }
        $("#userWeight").val(row['Weight']);
        $("#userHeight").val(row['Height']);

        var result = IBM(row['Height'], row['Weight']).toFixed(2);
        $("#userBMI").val(result);

    }
    User.selectAll(options, callback);

}

function updateProfile() {

    var name = $("#userName").val();
    if ($("#radioGenreMan").prop("checked"))
    {
        var genre = $("#radioGenreMan").val();
    }
    else
    {
        var genre = $("#radioGenreWoman").val();
    }
    var weight = $("#userWeight").val();
    var height = $("#userHeight").val();

    var options = [name, genre, weight, height];

    User.update(options, ()=>{console.info("Profile Updated");});

}

function updateBMI() {
    var h =$("#userHeight").val();
    var w = $("#userWeight").val();
    if (h != "" && w != "")
    {
        var result = IBM(h, w).toFixed(2);
        $("#userBMI").val(result);
    }
}

function createFood() {

    var name = $("#foodName").val();
    var cals = $("#foodCal").val();
    var Carbohydrates = $("#foodCarbohydrates").val();
    var Sugar = $("#foodSugar").val();
    var Water = $("#foodWater").val();
    var Protein = $("#foodProtein").val();
    var Lipid = $("#foodLipid").val();
    var Fiber = $("#foodFiber").val();
    var Calcium = $("#foodCalcium").val();
    var IroN = $("#foodIron").val();
    var Magnesium = $("#foodMagnesium").val();
    var Phosphorus = $("#foodPhosphorus").val();
    var Potassium = $("#foodPotassium").val();
    var Sodium = $("#foodSodium").val();
    var Zinc = $("#foodZinc").val();
    var Copper = $("#foodCopper").val();
    var Manganese = $("#foodManganese").val();
    var Selenium = $("#foodSelenium").val();
    var Ash = $("#foodAsh").val();
    var NBO = "1234";


    var options = [NBO, name, Water, cals, Protein, Lipid, Ash, Carbohydrates, Fiber, Sugar, Calcium, IroN, Magnesium,
        Phosphorus, Potassium, Sodium, Zinc, Copper, Manganese, Selenium];

    for (var i = 0; i < options.length; i++)
    {
        if(options[i]== null)
        {
            options[i] = "0";
        }
    }
    Food.insert(options, ()=>{console.info("Food Created")});
}

function readContentHome() {
    $("#dailyFoodHome").empty();
    var options = [];
    var currentDay = new Date();
    function callback(tx, results)
    {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var opt = [row['Description']];
            var selectedDay = new Date(row['ChoseDay']);
            if (selectedDay.getDate() == currentDay.getDate())
            {
                Food.select(opt, callback2);
            }
        }
    }
    function callback2(tx, results){
        var htmlCode = "";
        var row = results.rows[0];
        htmlCode += "<tr><td>" + row['Description'] + "</td></tr>";
        $("#dailyFoodHome").append(htmlCode);
    }
    UserFood.selectAll(options,callback);

}

function monthShow() {
    var options = [];
    function callback(tx, results)
    {
        var today = new Date();
        var month = today.getMonth();
        var days = [];

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var recordData = new Date( row['ChoseDay']);
            var currentDay;
            var htmlCode = "";

            if (month == recordData.getMonth())
            {
                if (i == 0){
                    days[0] = recordData.getDate();
                   // currentDay = days[0];
                }
                else{
                    var equal = false;
                    for (var j = 0; j < days.length; j++)
                    {
                        if (days[j] == recordData.getDate())
                        {
                            equal = true;
                        }
                    }
                    if (!equal)
                    {
                       // var newDay = new Date(row['ChoseDay']);
                        currentDay = recordData.getDate();//newDay.getDate();
                        var index = days.length;
                        days[index] = currentDay;
                    }
                }
            }
        }

        for(var k = 0; k < days.length; k++)
        {
             htmlCode += "<li><a data-role='button' data-row-id=" + days[k] + " href='#dailyFood'> Day:" + days[k] + "</a></li>";
        }

        var lv = $("#lvViewMonth");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#lvViewMonth a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("rowId", $(this).attr("data-row-id"));
            $(location).prop('href', '#kkEditFeedbackPage');
        }

    }

    UserFood.selectAll(options,callback);

}

function getDailyFood(){
    var options = [];
    var weight = "";
    var selectedDay = localStorage.getItem('rowId');
    $("#dailyFoodTr").empty();

    function callback(tx, results)
    {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var opt = [row['Description']];
            weight = row['Weight'];
            var currentDay = new Date(row['ChoseDay']);

            if (selectedDay == currentDay.getDate()) {
                Food.select(opt, callback2);
            }
        }
    }
    function callback2(tx, results){
        var htmlCode = "";
        var row = results.rows[0];
        var localWeight = weight;

        htmlCode += "<tr><td>" + localWeight + "</td><td>" + row['Description']  + "</td>" +
            "<td>" + row['Energ_Kcal'] + "</td><td>"  + row['Protein_g'] + "</td>" +
            "<td>" + row['Lipid_Tot_g'] + "</td><td>" + row['Carbohydrt_g'] + "</td>" +
            "<td>" + row['Fiber_TD_g'] + "</td><td>" + row['Sugar_Tot_g'] + "</td>" +
            "<td>" + row['Calcium_mg'] + "</td><td>" + row['Iron_mg'] + "</td>" +
            "<td>" + row['Magnesium_mg'] + "</td><td>" + row['Phosphorus_mg'] + "</td></tr>" ;

        $("#dailyFoodTr").append(htmlCode);
    }
    UserFood.selectAll(options,callback);

}

function readDailyElements() {
    var options = [];
    var weight = "";
    var selectedDay = new Date();

    var energy = 0;
    var Protein = 0;
    var Lipid = 0;
    var carbo = 0;
    var fiber = 0;
    var sugar = 0;
    var calcium = 0;
    var iron = 0;
    var magnesium = 0;
    var phosphorus = 0;
    var water = 0;

    function callback(tx, results)
    {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var opt = [row['Description']];
            weight = row['Weight'];
            var currentDay = new Date(row['ChoseDay']);

            if (selectedDay.getDate() == currentDay.getDate()) {
                Food.select(opt, callback2);
            }
        }
    }
    function callback2(tx, results){
        var row = results.rows[0];
        var localWeight = weight;
        var w = parseInt(localWeight)/100;

        energy =+ (w*parseFloat(row['Energ_Kcal'])).toFixed(2);
        Protein =+ (w*parseFloat(row['Protein_g'])).toFixed(2);
        Lipid =+ (w*parseFloat(row['Lipid_Tot_g'])).toFixed(2);
        carbo =+ (w*parseFloat(row['Carbohydrt_g'])).toFixed(2);
        fiber =+ (w*parseFloat(row['Fiber_TD_g'])).toFixed(2);
        sugar =+ (w*parseFloat(row['Sugar_Tot_g'])).toFixed(2);
        calcium =+ (w*parseFloat(row['Calcium_mg'])).toFixed(2);
        iron =+ (w*parseFloat(row['Iron_mg'])).toFixed(2);
        magnesium =+ (w*parseFloat(row['Magnesium_mg'])).toFixed(2);
        phosphorus =+ (w*parseFloat(row['Phosphorus_mg'])).toFixed(2);
        water =+ (w*parseFloat(row['Water_g'])).toFixed(2);

        $("#homeEnergy").val(energy);
        $("#homeProtein").val(Protein);
        $("#homeCarbohydrates").val(carbo);
        $("#homeFiber").val(fiber);
        $("#homeCalcium").val(calcium);
        $("#homeSugar").val(sugar);
        $("#homeIron").val(iron);
        $("#homeMagnesium").val(magnesium);
        $("#homePhosforus").val(phosphorus);
        $("#homeLipid").val(Lipid);
        $("#homeWater").val(water);


    }
    UserFood.selectAll(options,callback);
}

function createFoodValidation(){
    if (doValidation())
    {
        createFood();
    }
}

function addFoodValidation(){
    if(doFoodValidation())
    {
        addFood();
    }
}

function changeProfileValidation(){
    if(doProfileValidation())
    {
        updateProfile();
    }
}

function createProfile() {

    var name = $("#userName").val();
    if ($("#radioGenreMan").prop("checked"))
    {
        var genre = $("#radioGenreMan").val();
    }
    else
    {
        var genre = $("#radioGenreWoman").val();
    }
    var weight = $("#userWeight").val();
    var height = $("#userHeight").val();

    var options = [name, genre, weight, height];
    User.insert(options, ()=>{console.info("new user added")});
}

function profileManager(){
    /*
    if(isProfileSet())
    {
        //update
        if (doProfileValidation()) {
            updateProfile();
        }
    }
    else{
        if (doProfileValidation()) {

        }
    }
    */

    if (doProfileValidation()) {
        createProfile();
    }

}
