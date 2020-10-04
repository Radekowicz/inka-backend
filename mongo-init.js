db.createCollection("patients");
db.createCollection("appointments");

db.patients.insertMany([
  {
    _id: "1",
    firstName: "Zdzisław",
    lastName: "Zdzisławski",
    birthdate: new Date("1955-12-12"),
    firstAppointment: new Date("2000-10-12"),
    email: "zz@.com",
    phoneNumber: "123456789",
    address: "Ul. Uzdziwsława",
  },
  {
    _id: "2",
    firstName: "Władysław",
    lastName: "Włodarczyk",
    birthdate: new Date("1966-06-15"),
    firstAppointment: new Date("2010-10-12"),
    email: "ww@.com",
    phoneNumber: "333333333",
    address: "Ul. UWładka",
  },
  {
    _id: "3",
    firstName: "Kaziemirz",
    lastName: "Zkaziemierza",
    birthdate: new Date("1977-01-10"),
    firstAppointment: new Date("2018-10-18"),
    email: "kz@.com",
    phoneNumber: "997",
    address: "Ul. Ukazmierza",
  },
]);

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
  },
]);
