## Description
>This script is used to conver the contents of a csv file to a json file.

>The json file is formatted into a chip-0007 file.

>The json file is then taken and a sha256 hash is generated for it.

>A new csv file based on the original is created and a sha256 column is added where the generated hash is appended for each respective row.

### How To Use
>start by cloning this repository

>In your terminal/command line, run the command **cd csv_task**.

>run the command **npm install**, this installs all the necessary dependencies.

>run the command **node index.js path_to_filename secret [Optional]** (where path_to_filename is the route to your csv file).

>The result of this command generates a jsons folder that contains chip-0007 compatible json files of the respective rows in the csv file.

>It also gives a **filename_output.csv** which contains the included sha56 hashes (where filename is the original name of the csv file).
