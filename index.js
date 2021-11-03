const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const faker = require("faker");

const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "businessName", title: "businessName" },
    { id: "birthday", title: "birthday" },
    { id: "rfc", title: "rfc" },
    { id: "email", title: "email" },
    { id: "phone", title: "phone" },
    { id: "street", title: "street" },
    { id: "extno", title: "exterior number" },
    { id: "intno", title: "interior number" },
    { id: "zipcode", title: "zipcode" },
    { id: "town", title: "town" },
    { id: "colony", title: "colony" },
    { id: "city", title: "city" },
    { id: "state", title: "state" },
  ],
});

const N = 1000;
const data = [];

const formatDecimals = n => {
  return n < 10 ? `0${n || 1}` : n;
};

const getFixedNumber = fix => {
  return Math.random().toFixed(fix).replace(/0\./g, '');
};

const removeChars = s => {
  return s.replace(/[\"\,\-\'\(\)]/g, '').replace(/\s+/g, " ");
};

for (let i = 0; i < N; i++) {
  const companyName = removeChars(faker.company.companyName());
  const cityName = removeChars(faker.address.cityName());
  const email = faker.internet.email();
  const state = removeChars(faker.address.state());
  const item = {
    businessName: companyName,
    birthday: "19900101",
    rfc: "III900101II8",
    email,
    phone: getFixedNumber(10),
    street: removeChars(faker.address.streetName()),
    extno: getFixedNumber(2),
    intno: "",
    zipcode: getFixedNumber(5),
    town: cityName,
    colony: cityName,
    city: cityName,
    state,
  };
  data.push(item);
}

const main = () => {
  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
};

main();
