FROM node:latest

#Create the directory
RUN mkdir -p /usr/src/birthdaybot
WORKDIR /usr/src/birthdaybot

#Copy and install bot
COPY package.json /usr/src/birthdaybot
RUN npm install

#The bot
COPY . /usr/src/birthdaybot

#Start!
CMD ["node", "main.js"]