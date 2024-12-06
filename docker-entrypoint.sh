#!/bin/sh

# Replace API URL placeholder
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|__API_URL_PLACEHOLDER__|$API_URL|g" {} \;

# Print verification of the change
echo "Verifying API_URL configuration..."
echo "Current API_URL setting:"
find /usr/share/nginx/html -type f -name "*.js" -exec grep -l "$API_URL" {} \; | while read -r file; do
    echo "Found in: $file"
    grep -A 1 -B 1 "$API_URL" "$file"
done

# Execute CMD
exec "$@"