// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require('uuid/v1');

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Create
app.post("/users", (req, res) => {
  const usersList = readJSONFile();
  const newUser = req.body;
  //newUser.id = uuidv1();
  const newUserList = [...usersList, newUser];
  writeJSONFile(newUserList);
  res.json(newUser);
});

// Read One
app.get("/users/:id", (req, res) => {
  const usersList = readJSONFile();
  const id = req.id;
  let idFound = false;
  let founduser;

  usersList.forEach(user => {
    if (id === user.id) {
      idFound = true;
      founduser = user
    }
  });

  if (idFound) {
    res.json(founduser);
  } else {
    res.status(404).send(`user ${id} was not found`);
  }
});

// Read All
app.get("/users", (req, res) => {
  const usersList = readJSONFile();
  res.json(usersList);
});

// Update
app.put("/users/:id", (req, res) => {
  const usersList = readJSONFile();
  const id = req.params.id;
  const newuser = req.body;
  newuser.id = id;
  idFound = false;

  const newusersList = usersList.map((user) => {
     if (user.id === id) {
       idFound = true;
       return newuser
     }
    return user
  })
  
  writeJSONFile(newusersList);

  if (idFound) {
    res.json(newuser);
  } else {
    res.status(404).send(`user ${id} was not found`);
  }

});

// Update 
app.put("/users", (req, res) => {
    const usersList = readJSONFile();
    const newUsers = req.body;
    writeJSONFile(newUsers);
    res.json(newUser);
  });

// Delete 
app.delete("/users/:id", (req, res) => {
  const usersList = readJSONFile();
  const id = req.params.id;
  const newusersList = usersList.filter((user) => user.id !== id)

  if (usersList.length !== newusersList.length) {
    res.status(200).send(`user ${id} was removed`);
    writeJSONFile(newusersList);
  } else {
    res.status(404).send(`user ${id} was not found`);
  }
});

// Functia de citire din fisierul db.jso
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["users"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ users: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}


// Part two















// Create
app.post("/user", (req, res) => {
    const usersList2 = readJSONFile2();
    const newUser2 = req.body;
    //newUser.id = uuidv1();
    const newUserList2 = [...usersList2, newUser2];
    writeJSONFile2(newUserList2);
    res.json(newUser2);
  });
  
  
  // Read All
  app.get("/user", (req, res) => {
    const userList2 = readJSONFile2();
    res.json(userList2);
  });
  
  // Update 2
app.put("/user", (req, res) => {
    const newUser2 = req.body;
    writeJSONFile2(newUser2);
    res.json(newUser2);
  });
  
  
  // Functia 2 de citire din fisierul db.json
  function readJSONFile2() {
    return JSON.parse(fs.readFileSync("db.json"))["user"];
  }
  
  // Functia 2 de scriere in fisierul db.json
  function writeJSONFile2(content) {
    fs.writeFileSync(
      "db.json",
      JSON.stringify({ user: content }),
      "utf8",
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);