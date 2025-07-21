DOMAIN="titleisundefined.ya-praktikum.tech"

docker compose -f ./proxy/docker-compose.proxy.init.yml run --rm certbot certonly --cert-name titleisundefined.ru --webroot --webroot-path /var/www/certbot --agree-tos -m admin@titleisundefined.ru --dry-run --domains "$DOMAIN" && \
docker compose -f ./proxy/docker-compose.proxy.init.yml run --rm certbot certonly --cert-name titleisundefined.ru --webroot --webroot-path /var/www/certbot --keep-until-expiring --agree-tos -m admin@titleisundefined.ru --domains "$DOMAIN" && \
docker compose -f ./proxy/docker-compose.proxy.init.yml run --rm --entrypoint /bin/sh certbot -c "chmod -R 750 /etc/letsencrypt && chown -R 0:1000 /etc/letsencrypt"
