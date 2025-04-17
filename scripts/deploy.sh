#!/bin/bash

echo "start deploy"

echo "remove deploy branch"
git branch -D deploy

echo "create deploy branch"
git checkout -b deploy

echo "build app"
sudo docker run -v $PWD:/app sa:latest npm run build

echo "fix index.html"
sudo chmod -R -f +777 ./build/.
cat ./build/index.html | sed 's/\/sA/https:\/\/cuongph-0290.github.io\/sA\/build/g' > ./build/i.html
rm ./build/index.html
mv ./build/i.html ./build/index.html

echo "fix .gitignore"

cat .gitignore | sed 's/\/build/\/src\n\/scripts/g' > .gitignore.tmp

rm .gitignore
mv .gitignore.tmp .gitignore

echo "remove src folder"
rm -rf ./src
echo "remove scripts folder"
rm -rf ./scripts

echo "commit and push"
git add .
git commit -m "deploy"
git push origin deploy -f
