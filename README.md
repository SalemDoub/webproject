# webproject
This Project is done by : Salem Doub && George Bardaghji L3 Informatique Option Web

Notre projet est un pictionary game en ligne. Les joueurs peuvent créer un compte ensuite créer des salles,leurs amis peuvent joindre la salle et jouer ensemble en live.

Description technique:
Back-end : NodeJs  with Express, Socket IO, Mongoose for Database.
Front-end : React , UI, Axios for HTTP requests.
Database : MongoDB
Linting : ESlint
Deployment : Heroku

Prerequis:
For nodemon (a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.)

npm i -g nodemon
For ESlint

npm i -g eslint-cli

Installer les  Packages:


1) npm run install

Lancer les tests :

In the console, after installing eslint globally, run :

 2) eslint ./
 
Pour lancer le back-end (server) :
cd server && nodemon server

Pour lancer le  front-end:
cd client && npm start


Pour la  production : lancer the back and the front ensemble)
npm run dev

App Usage
Some already existing accounts:

normal user >> username : user | password : user
admin >> username : admin | password : admin

Author
Salem Doub
George Bardaghji
