FROM amazonlinux:2

# Install Python and pip
RUN yum install -y python37 python3-pip zip && yum clean all

# Create directory for Lambda packages
RUN mkdir /python

# Copy requirements and install into /python
COPY requirements.txt .
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt -t /python

# Zip the contents for Lambda layer
RUN zip -r layer.zip /python

# Default command just keeps container alive (optional)
ENTRYPOINT ["/bin/bash"]
