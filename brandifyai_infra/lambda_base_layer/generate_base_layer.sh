#!/bin/bash

# Remove the old container if it exists
docker rm -f layer-container 2>/dev/null || true

# Build Docker image with correct platform
docker build --platform linux/amd64 -t base-layer .

# Run container
docker run --name layer-container base-layer

# Copy the zip from container
docker cp layer-container:layer.zip ./layer.zip

echo "Created layer.zip with updated base layer."
