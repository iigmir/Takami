echo Takami: Building list files...
# Delete files
mkdir -p output
echo > output/song_url.js
echo > output/output_list.js

echo Takami: Requesting song list...
node ./getlist.js
echo Takami: Accessing song list...
node ./readlist.js
echo Takami: Song list created in output_list.js