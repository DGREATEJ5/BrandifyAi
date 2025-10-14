#!/bin/bash

# Remove old container if it exists
docker rm -f layer-container || true

# Build the image for x86_64 Linux (Lambda-compatible)
docker build --platform linux/amd64 -t base-layer .

# Run the container
docker run --name layer-container base-layer

# Copy the generated zip artifact
docker cp layer-container:/opt/layer.zip .
echo "✅ Created layer.zip compatible with Lambda Python 3.11 (x86_64)"
