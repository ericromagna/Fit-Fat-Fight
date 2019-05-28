
function doValidation() {
    var form = $("#createNewFood");

    form.validate({
        rules: {
            foodCal: {
                required: true,
                min: 0
            },
            foodCarbohydrates: {
                min: 0
            },
            foodName: {
                required: true
            },
            foodSugar: {
                min: 0
            },
            foodWater: {
                min: 0
            },
            foodProtein: {
                min: 0
            },
            foodLipid: {
                min: 0
            },
            foodFiber: {
                min: 0
            },
            foodCalcium: {
                min: 0
            },
            foodIron: {
                min: 0
            },
            foodMagnesium: {
                min: 0
            },
            foodPhosphorus: {
                min: 0
            },
            foodSodium: {
                min: 0
            },
            foodPotassium: {
                min: 0
            },
            foodZinc: {
                min: 0
            },
            foodCopper: {
                min: 0
            },
            foodManganese: {
                min: 0
            },
            foodSelenium: {
                min: 0
            },
            foodAsh: {
                min: 0
            }
        }
        ,
        messages: {
            foodCal: {
                required: "This field is required",
                min: "Minimum of 0"
            },
            foodCarbohydrates: {
                min: "Minimum of 0"
            },
            foodName: {
                required: "This field is required"
            },
            foodSugar: {
                min: "Minimum of 0"
            },
            foodWater: {
                min: "Minimum of 0"
            },
            foodProtein: {
                min: "Minimum of 0"
            },
            foodLipid: {
                min: "Minimum of 0"
            },
            foodFiber: {
                min: "Minimum of 0"
            },
            foodCalcium: {
                min: "Minimum of 0"
            },
            foodIron: {
                min: "Minimum of 0"
            },
            foodMagnesium: {
                min: "Minimum of 0"
            },
            foodPhosphorus: {
                min: "Minimum of 0"
            },
            foodSodium: {
                min: "Minimum of 0"
            },
            foodPotassium: {
                min: "Minimum of 0"
            },
            foodZinc: {
                min: "Minimum of 0"
            },
            foodCopper: {
                min: "Minimum of 0"
            },
            foodManganese: {
                min: "Minimum of 0"
            },
            foodSelenium: {
                min: "Minimum of 0"
            },
            foodAsh: {
                min: "Minimum of 0"
            }
        }
    });
    return form.valid();
}

function doFoodValidation() {
    var form = $("#addFoodFrm");

    form.validate({
        rules: {
            foodWeight: {
                required: true,
                min: 1,
                integersOnly : true
            }
        }
        ,
        messages: {
            ERBusinessName: {
                required: "This field is required",
                min: "Minimum amount is 1 gram",
                integersOnly: "Only integers allowed"
            }
        }
    });
    return form.valid();
}

function doProfileValidation() {
    var form = $("#profileFrm");

    form.validate({
        rules: {
            userName: {
                required: true,
                rangelength: [2, 20]
            },
            userWeight: {
                min: 0
            },
            userHeight: {
                min: 0
            }
        }
        ,
        messages: {
            userName: {
                required: "Name is Required",
                rangelength: "Name should be within 2 and 20 characters"
            },
            userWeight: {
                min: "Minimun weight is 0"
            },
            userHeight: {
                min: "Minimun height is 0"
            }
        }
    });
    return form.valid();
}


jQuery.validator.addMethod("integersOnly",
    function (value, element) {
        var regex = /^\d*$/;
        return this.optional(element) || regex.test(value);
    },
    "Only integers allowed");

/*
function isProfileSet(){
    var myReturn = true;
    function callback(tx, results)
    {
        try{
            var debubg =results.rows[0];
        }
        catch{
            myReturn = false;
        }

    }
    var opt = [];
    User.selectAll(opt, callback());
    alert(myReturn);
    return myReturn;
}
*/

function IBM(height, weight){

    var dH = parseFloat(height);
    var dW = parseFloat(weight);

    var result = dW/((dH)*(dH));

    return result;
}
