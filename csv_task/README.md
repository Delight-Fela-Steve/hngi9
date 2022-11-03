## Description
This script is used to conver the contents of a csv file to a json file
The json file is formatted into a chip-0007 file
The json file is then taken and a sha256 hash is generated for it
A new csv file based on the original is created and a sha256 column is added where the generated hash is appended for each respective row

### How To Use
>run the command **node index.js path_to_filename secret [Optional]**

>The result of this command generates a jsons folder that contains all the formatted rows in a json file

>It also gives a **filename_output.csv** which contains the included sha56 hashes