FROM nginx:stable

RUN rm /etc/nginx/conf.d/*

COPY proxy/nginx.conf /etc/nginx/nginx.conf
COPY proxy/common /etc/nginx/common
COPY proxy/conf.d /etc/nginx/conf.d

RUN openssl dhparam -out /etc/ssl/certs/dhparam-4096.pem 2048

CMD ["nginx", "-g", "daemon off;"]
