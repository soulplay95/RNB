# # # ./Dockerfile 
# # FROM python:3
# # WORKDIR /usr/src/app

# # ## Install packages
# # COPY requirements.txt ./
# # RUN pip install -r requirements.txt

# # ## Copy all src files
# # COPY . .

# # ## Run the application on the port 8080
# # EXPOSE 8088

# # # gunicorn 배포 명령어
# # # CMD ["gunicorn", "--bind", "허용하는 IP:열어줄 포트", "project.wsgi:application"]
# # CMD ["gunicorn", "--bind", "0.0.0.0:8088", "rnb.wsgi:application"]

# # FROM sjoh0704/django:latest
# # RUN pip3 install django
# # WORKDIR /usr/src/app
# # COPY . .
# # WORKDIR ./
# # CMD ["python3", "manage.py", "runserver", "0.0.0.0:8088"]
# # EXPOSE 8088

# FROM python:latest
# # 컨테이너 내에서 코드가 실행될 경로 설정
# WORKDIR /usr/src/app
# # requirements.txt에 명시된 필요한 packages 설치
# COPY requirements.txt ./
# RUN pip install --upgrade pip
# RUN pip install -r requirements.txt
# # Project를 /usr/src/app으로 복사
# COPY . .
# # 포트 설정
# EXPOSE 8088
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8088"]
# # gunicorn 실행
# # CMD ["gunicorn", "--bind", "0.0.0.0:8088", "backend.wsgi:application"]
# # EXPOSE, CMD는 docker-compose에서 작성할 것이기 때문에, 동작하는지만 확인 후 주석or삭제 하도록 하자.