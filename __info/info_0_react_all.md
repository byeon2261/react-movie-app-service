# 5 Create React App

#### [React]

create-react-app을 사용하여 react를 설치한다. 해당 설치에는 많은 스크립트와 사전설정이되어 있기 때문이다.
개발서버에 접근한다든가 자동으로 새로고침하는 기능과 즉각적으로 어플리케이션에 css를 포함시켜주는 등 기능들이 있다.

nodeJS와 npx 설치를 확인한다.

    $ node -v
    $ npx

react앱을 설치한다.

<https://github.com/facebook/create-react-app>

    $ npx create-react-app [프로젝트명]

리엑트 프로젝트를 실행할 수 있다.

    $ npm start

src에 index, App을 제외한 파일은 삭제한다.

index에서는 어플리케이션을 렌더링해주며 app파일에서 실제 기능들을 구현하여 렌더링한다.
그외의 기본기능들은 react설치될때 설정되어있다.
