# Use Amazon Linux 2 as Lambda-compatible environment
FROM amazonlinux:2

# Install Python + pip + zip
RUN yum install -y python37 python3-pip zip && yum clean all

# Upgrade pip and install virtualenv
RUN python3.7 -m pip install --upgrade pip virtualenv

# Copy requirements
COPY requirements.txt .

# Install dependencies for Lambda architecture (x86_64)
RUN pip install --platform manylinux2014_x86_64 --only-binary=:all: -r requirements.txt -t ./python

# Zip the dependencies
RUN zip -r layer.zip ./python/

# Set entrypoint (not mandatory, keeps shell)
ENTRYPOINT ["/bin/bash", "-l"]
