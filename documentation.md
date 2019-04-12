
# PROJECT NAME The worst Basketball Website :) 

---

Name: Eric Wang

Date: April 11th, 2019 

Project Topic: Basketball Games

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: TeamName    `Type: String` 
- `Field 2`: TotalWins   `Type: Int `
- `Field 3`: score       `Type: String` 
- `Field 4`: location    `Type: String` 
- `Field 5`: summary     `Type: String ` 
- `Field 6`: players     `Type: Int` 
- `Field 7`: Stats       `Type: [Strings]` 

Schema:
```javascript
{
   TeamName: String;
   TotalWins: Int;
   score: String;
   location: String;
   summary: String;
   players: Int;
   Stats: [Strings]
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       TeamName: "Eric's Team";
       TotalWins: 10;
       score: 11-2;
       location: Epply;
       Stats: 5Threes 1Rebound 1TwoPointer;
       players: 2 
       summary: "This is for the documentation for my midterm"
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/json`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. Games Played at Ritchie -> `/api/gamesPlayedAtRichie`
2. Playoff Teams -> `api/playoffTeams`
3. Alphabetical by Names-> `/api/abc`
4. Random Game -> `/api/randomGame`
5. Games Played at Epply -> `api/gamesPlayedAtEpply`

