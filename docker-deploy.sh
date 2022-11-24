echo -e "
********************
Removing existing image...
********************
"
docker rmi baec/vocab-virtuoso-front-end
echo -e "
********************
Building...
********************
"
docker build -t baec/vocab-virtuoso-front-end .
echo -e "
********************
Logging in...
********************
"
docker login --username baec
echo -e "
********************
Pushing...
********************
"
docker push baec/vocab-virtuoso-front-end
echo -e "
********************
Done!
********************
"