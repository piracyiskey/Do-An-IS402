FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev $PHPIZE_DEPS \
    && apt-get clean

RUN docker-php-ext-install pdo_mysql mbstring bcmath gd zip

RUN pecl install redis \
    && docker-php-ext-enable redis

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Allow non-root fpm execution by removing user/group directives from www.conf
RUN sed -i 's/user = www-data/;/g' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/group = www-data/;/g' /usr/local/etc/php-fpm.d/www.conf \
    && chown -R www-data:www-data /usr/local/etc/php-fpm.d/ \
    && echo "[global]\npid = /tmp/php-fpm.pid" > /usr/local/etc/php-fpm.d/zz-pid.conf

WORKDIR /var/www

COPY --chown=www-data:www-data . .

USER www-data

RUN composer install --no-dev --optimize-autoloader
# The cache folders are already owned by www-data from the COPY step above,
# but composer might have updated things. `www-data` owns everything now!
