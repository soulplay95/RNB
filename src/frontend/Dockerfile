# # 사용할 Base Image 지정
# # node LTS 버전(12) 이미지로 빌드
# FROM node:lts-alpine AS builder

# # 이미지 내에서 명령어를 실행할(현 위치로 잡을) 디렉토리 설정
# WORKDIR /frontend

# # 환경 변수 지정
# # ENV PATH /home/node/app/node_modules/.bin:$PATH

# # 현재 파일을 Docker 이미지의 파일 시스템으로 복사
# COPY . .

# # 이미지 빌드 과정에서 필요한 커맨드를 실행. 보통 이미지 안에 특정 소프트웨어를 설치하기 위해 많이 사용
# # package.json에 명시된 의존성 설치
# RUN npm install
# # 빌드 시작!
# RUN npm run build

# # ------------------ nginx ------------------
# FROM nginx:stable-alpine
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./default.conf /etc/nginx/conf.d/
# # builder로부터 build 파일을 복사해옴
# COPY --from=builder /frontend/build /usr/share/nginx/html

# # 3000/TCP 포트로 리스닝
# EXPOSE 3000

# CMD ["nginx", "-g", "daemon off;"]
FROM node:lts-alpine as build-stage
WORKDIR /homepage

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage

RUN rm /etc/nginx/conf.d/default.conf
COPY ./homepage.conf /etc/nginx/conf.d/homepage.conf
COPY --from=build-stage ./homepage/build /usr/share/nginx/html/homepage
RUN ls -a /usr/share/nginx/html/homepage
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]