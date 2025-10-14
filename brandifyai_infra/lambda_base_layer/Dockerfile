FROM public.ecr.aws/lambda/python:3.11

WORKDIR /opt

RUN yum install -y gcc gcc-c++ make zip
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt -t python

RUN zip -r layer.zip python
