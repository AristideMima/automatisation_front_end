FROM node:12.22.4
RUN mkdir /reactFront
WORKDIR reactFront
COPY . .
RUN yarn run build