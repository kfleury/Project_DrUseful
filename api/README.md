# Project_DrUseful
Projet piscine software

# Database

- drug
  - id
  - description
  - story
  - consummation
  - danger
  - type (enum: soft, hard)

- drugEffect
  - DrogueID
  - EffectID

- effect
  - id
  - duration
  - power
  - type (enum chill, excitement, hallucination, euphoria)
  
 - user
   - id
   - username
   - password
   - bio
   
- userDrogueFav
  - drogueID
  - userID

  
# Routes  

### List drugs

Method: GET
Route: `/drugs`

returns an array of drugs

### Get specific drug

Method: GET
Route: `/drugs/:id`

return a specific drug with the id

### List effects

Method: GET
Route: `/effects`

returns an array of effects

### Get specific effect

Method: GET
Route: `/effects/:id`

return a specific effect with the id

### login user

Method: POST
Route: `/login`

Body:
    - username
    - password

returns the newly created user

### register user

Method: POST
Route: `/register`

Body:
   - username
   - password

### get user

Method: GET
Route: `/me`

return the user currently logged

### add drug to favorite user drug

Method: POST
Route: `/favorite/add`

Body:
   - drugID

> User must be logged in

### remove drug to favorite user drug

Method: DELETE
Route: `/favorite/delete`

Body:
 - drugID

> User must be logged in

### Modify bio

Method: POST
Route: `/bio`

Body:
  - bio
  
Modify the biography of the user

> User must be logged in
