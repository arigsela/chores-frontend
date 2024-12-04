#!/bin/sh

# Replace API URL placeholder with environment variable
find /usr/share/nginx/html -type f -exec sed -i "s|__API_URL_PLACEHOLDER__|$API_URL|g" {} \;

# Execute CMD
exec "$@"