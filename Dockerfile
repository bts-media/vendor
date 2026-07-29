######### Build #########
FROM node:lts-alpine AS build
WORKDIR /home/app/
ARG VITE_APP_MODE
ENV VITE_APP_MODE=$VITE_APP_MODE
COPY . .
RUN echo "VITE_API_DEVELOPMENT_URL=https://api.dev.bts-media.uz/" >> .env && \
    echo "VITE_API_PRODUCTION_URL=https://api.bts-media.uz/" >> .env && \
    echo "VITE_APP_MODE=${VITE_APP_MODE}" >> .env
RUN npm ci
RUN npm run build

######### Production #########
FROM node:lts-alpine
WORKDIR /home/app/
COPY --from=build /home/app/dist ./dist
COPY --from=build /home/app/node_modules node_modules
COPY --from=build /home/app/package.json package.json
COPY --from=build /home/app/index.html index.html
COPY --from=build /home/app/vite.config.ts vite.config.ts
COPY --from=build /home/app/.env .env
EXPOSE 4174
CMD ["npm", "run", "preview", "--", "--host"]
