# ----- stage 0 -----
FROM node:20-alpine

COPY . /app
WORKDIR /app/

ENV NODE_ENV=production

RUN \
  npm ci --omit=dev && \ 
  npx prisma generate

# ----- stage 1 -----
FROM node:20-alpine 

COPY --from=0 /app/node_modules /app/node_modules
COPY --from=0 /app/src /app/src
COPY --from=0 /app/package.json /app/package.json
COPY --from=0 /app/tsconfig.json /app/tsconfig.json
COPY --from=0 /app/package-lock.json /app/package-lock.json
COPY --from=0 /app/prisma /app/prisma
COPY --from=0 /app/entrypoint.sh /app/entrypoint.sh
COPY --from=0 /app/schema/v1.yaml /app/schema/v1.yaml

WORKDIR /app/

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000

LABEL "image_type"="boilerplate"

CMD [ "sh", "entrypoint.sh" ]