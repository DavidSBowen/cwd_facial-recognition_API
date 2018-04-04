TODO:
-----

API:

[x] 2018-04-03 - Alter database statements to contact appropriate server based on whether the database is running locally or on heroku

[x] 2018-04-03 - Add a GET for /image which returns list of images posted by logged in user

[x] 2018-04-03 - Add a POST for /image which puts each image URL in an images table and returns a new list of images entered by logged in user

APP:

[x] 2018-04-03 - Alter fetch statements to contact appropriate server based on whether the api is running locally or on heroku

[ ]Create a new section below image to hold a list of images posted by the logged in user

[ ] Add a GET fetch contacting api /image to retrieve list of images entered by logged in user

[ ] Add a POST fetch contacting api /image to the image submit button which posts the submitted image and retrieves a new list of images with the current image included

DB:

[x] 2018-04-01 - Add new table for images

    [x] Columns:
    
        [x] email > string/varchar/text
        
        [x] image_url > string/varchar/text
        
        [x] number_of_faces > integer


# cwd_facial-recognition_API
Backend for the facial-recognition app
