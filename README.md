TODO:
-----

API:
Alter database statements to contact appropriate server based on whether the database is running locally or on heroku
Add a GET for /image which returns list of images posted by logged in user
Add a POST for /image which puts each image URL in an images table and returns a new list of images entered by logged in user

APP:
Alter fetch statements to contact appropriate server based on whether the api is running locally or on heroku
Create a new section below image to hold a list of images posted by the logged in user
Add a GET fetch contacting api /image to retrieve list of images entered by logged in user
Add a POST fetch contacting api /image to the image submit button which posts the submitted image and retrieves a new list of images with   the current image included

# cwd_facial-recognition_API
Backend for the facial-recognition app
