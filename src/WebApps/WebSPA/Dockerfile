# base image
FROM node:9.6.1 as builder

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY /src/WebApps/WebSPA/package.json /usr/src/app/package.json

RUN npm install
RUN npm install react-scripts@1.1.1 -g

COPY /src/WebApps/WebSPA/ /usr/src/app

# start app
CMD ["npm", "start"]