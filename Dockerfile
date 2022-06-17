FROM node:16.15

WORKDIR /app/
COPY . .

RUN yarn install
RUN yarn run build

EXPOSE 3000 3000

CMD [ "npm" , "run" , "run" ]