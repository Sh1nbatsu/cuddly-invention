FROM nginx:stable

RUN rm /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY common/ /etc/nginx/common/
COPY conf.d/ /etc/nginx/conf.d/

RUN openssl dhparam -out /etc/ssl/certs/dhparam-4096.pem 2048

CMD ["nginx", "-g", "daemon off;"]
