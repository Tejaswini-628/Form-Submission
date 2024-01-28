app.get("/search/registrationNumber", (req, res) => {
    const search = req.query.registrationNumber;

    if (!search) {
        res.status(400).send("Please enter a registration number.");
        return;
    }

    connection.query(
        'SELECT * FROM form WHERE TRIM(registration_number) = ?',
        [search],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error querying the database.");
            } else {
                res.render("search.hbs", { result: result });
            }
        }
    );
});

app.get("/fetchid/:registration_number", (req, res) => {
    const fetchid = req.params.registration_number;
    connection.query('select * from form where registration_number=?', fetchid, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const fetchedData = result.map(item => ({ name: item.name, registration_number: item.registration_number, date: item.date }));
            res.send(fetchedData);
        }
    });
});