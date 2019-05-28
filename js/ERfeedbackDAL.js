
var Food = {
    insert: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "INSERT INTO food(NDB_No, Description, Water_g, Energ_Kcal, Protein_g, Lipid_Tot_g," +
                "Ash_g, Carbohydrt_g, Fiber_TD_g,Sugar_Tot_g,Calcium_mg, Iron_mg, Magnesium_mg, Phosphorus_mg," +
                "Potassium_mg, Sodium_mg, Zinc_mg, Copper_mg, Manganese_mg, Selenium_ug) " +
                "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Insert food transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM food WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM food;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
};

var UserFood = {
    insert: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "INSERT INTO foodUser(Description, Weight, ChoseDay) " +
                "VALUES(?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Insert review transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM foodUser;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
};

var User = {
    insert: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "INSERT INTO user(UserName, Genre, Weight, Height) " +
                "VALUES(?,?,?,?);";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Create user transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "UPDATE user SET UserName=?, Genre=?, Weight=?, Height=? WHERE id=1;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("Update user transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback)
    {
        function txFunction(tx)
        {
            var sql = "SELECT * FROM user;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction()
        {
            console.info("SelectAll transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
