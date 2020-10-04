db.createCollection("patients");
db.createCollection("appointments");

db.patients.insert([
    {
        _id: "1",
        firstName: "Zdzisław",
        lastName: "Zdzisławski",
        birthdate: new Date("1955-12-12")
    },
    {
        _id: "2",
        firstName: "Władysław",
        lastName: "Włodarczyk",
        birthdate: new Date("1966-06-15")
    }
])

db.appointments.insert([
    {
        title: "konsultacja",
        patient: "1",
        startDate: new Date("2020-10-04T12:00:00"),
        endDate: new Date("2020-10-04T13:00:00"),
    },
    {
        title: "wyciski",
        patient: "1",
        startDate: new Date("2020-10-04T16:00:00"),
        endDate: new Date("2020-10-04T19:00:00"),
    }
])