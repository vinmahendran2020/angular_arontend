ARG NODE_IMAGE=858209661462.dkr.ecr.us-east-2.amazonaws.com/node:10.18.0
ARG APACHE_IMAGE=858209661462.dkr.ecr.us-east-2.amazonaws.com/httpd:alpine

FROM $NODE_IMAGE as build-step

COPY . /app

WORKDIR /app


FROM $APACHE_IMAGE

COPY --from=build-step /app/dist/ion-app /usr/local/apache2/htdocs/

# Enable the rewrite module in apache2.
RUN sed -i \
    's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' \
    /usr/local/apache2/conf/httpd.conf
  
  # Fallback to index.html page.
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/a### Rewrite rule was written from the Dockerfile when building the image ###\n\
      DirectoryIndex index.html\n\
      RewriteEngine on\n\
      RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]\n\
      RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d\n\
      RewriteRule ^ - [L]\n\
      RewriteRule ^ index.html\n' \
    /usr/local/apache2/conf/httpd.conf
  
RUN chmod -R 755 /usr/local/apache2/htdocs/
