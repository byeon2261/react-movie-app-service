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

# 7 Practice Movie App

## 7.0 To Do List Part One

#### [React]

App_1_toDoList.js를 생성하여 App1 컴포넌트를 생성한다. 해당 컴포넌트를 index.js에 호출추가를 해준다.

    function App1() {
        return (
            <input
                type={"text"}
                placeholder="Write your to do.."
            />
        )
    }

    export default App1;

toDo값을 받아보겠다.

    const [toDo, setToDo] = useState("");  // state 변수. setToDo()를 통해 toDo값을 변경한다.
    const onChange = (event) => setToDo(event.target.value);  // input값을 toDo에 넣어준다.
    console.log(toDo);
    ...
        <input
          onChange={onChange}
          value={toDo}
          ...
        />

버튼을 통해 데이터 submit기능을 구현한다.

    const onSubmit = (event) => {
        event.preventDefault();  // submit시 페이지 새로고침되는 기능 삭제.
        console.log(toDo);
        if (toDo === "") {
            return;
        }
    }
    ...
        <form onSubmit={onSubmit}>
            <input .../>
            <button>Add to do</button>
        </form>

해당 데이터를 toDos 리스트 state를 생성하여 담아 본다.

    ...
    const [toDos, setToDos] = useState([]);
    ...
    const onSubmit = (event) => {
        ...
        // [1, array] >>>: [1, Array(n)]. [1, ...array]  >>>: [1, 2,3,4]
        setToDos((currentArray) => [toDo, ...currentArray]);  // '...'를 붙이면 기존 array값들이 뜯어져 같이 리스트에 포함된다.
        setToDo("");
    }
    ...

## 7.1 To Do List Part two

todo list를 list로 표기되도록 적용한다.

    <hr />  // 가로로 라인을 만들어서 절취선과같은 모양을 생성
      <ul>
        {toDos.map((item, index) => (  // (value: never, index: number, array: never[])
          // 같은 컴포넌트의 리스트를 render할 때 key라는 props를 넣어줘야한다. react가 list의 item들을 전부 인식해서 발생하는 오류
          <li key={index}>{item}</li>  // key값을 넣어주지 않아도 실행에는 문제가 발생하지않지만 콘솔에 에러가 발생한다.
        ))}
      </ul>

## 7.2 Coin Tracker

코인을 보여주는 화면을 생성한다. App2를 생성한다.

@src/App_2_CoinTracker.js

    function App2() {
        const [loadin, setLoading] = useState(true);
        return (
            <div>
                <h1>The Coin!</h1>
                {loagin ? <strong>Loading...</strong> : null}
            </div>
        );
    }

    export default App2;

useEffect를 사용하여 코인데이터를 fetch한다.

    useEffect(()=> {
        fetch("https://api.coinpaprika.com/v1/tickers")
    }, [])  // 아무것도 주시하고 있지않으면 한번만 실행된다.

브라우져에 network에 데이터를 받는 것을 확인할 수 있다. # #7.2 Coin Tracker_1.png 참조

해당 json데이터를 console에서 확인 가능하다.

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => console.log(json));
    }, []);

해당 데이터를 coins state에 저장한다. 저장하면서 loading값을 false로 변경해준다.

    const [coins, setCoins] = useState([]);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
            });
    }, []);

리스트로 표기한다.

    <ul>
        {coins.map((coin) => (
            <li>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </li>
        ))}
    </ul>

리스트를 select로 구현해본다. 로딩시 값이 비어있는 표현을 수정하여 로딩이후 표현하도록 변경한다.

      <h1>The Coin! {loading ? "" : "({coins.length})"}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}

### ! CodeChallenge

select한 코인단위로 코인가격을 출력해보자

## 7.3 Movie App part One

영화를 소개해주는 프로젝트를 진행한다. yst에서 무료 api를 가져와서 사용가능하다.

<https://yts.mx/>

평점이 8.8점 이상이며 year sort로 api를 받겠다. https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year

기본데이터를 가져오는 로직을 작성한다.

    import { useEffect, useState } from "react";

    function App() {
        const [loading, setLoading] = useState(true);
        const [movies, setMovies] = useState([]);

        useEffect(() => {
            fetch(
                "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
            )
                .then((response) => response.json())
                .then((json) => {
                    setMovies(json.data.movies);
                    setLoading(false);
                });
        }, []);
        console.log(movies);
        return <div>{loading ? <h1>Loading...</h1> : null}</div>;
    }

    export default App;

then함수대신에 async-await함수를 사용하여 구성해본다.

    const getMovies = async () => {
        const json = await (
            await fetch(
                "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
            )
        ).json();
        setMovies(json.data.movies);
        setLoading(false);
    };

    useEffect(() => {
        getMovies();
    }, []);

함수를 따로 생성하여 async-await함수를 이용하였다.

표시할 데이터를 가져와서 간략하게 구성한다.

    <div>
        {movies.map((movie) => (
            <div key={movie.id}>
                <img src={movie.medium_cover_image} />
                <h2>{movie.title}</h2>
                <span>rating: {movie.rating}</span>
                <p>{movie.summary}</p>
                <ul>
                    {movie.genres.map((p) => (  # 임의의 변수를 지정. map으로 데이터 넣을시 key를 부여하자
                        <li key={p}>{p}</li>
                ))}
                </ul>
            </div>
        ))}
    </div>

## 7.4 Movie App part Two

위에 생성한 영화 관련 코드를 컴포넌트를 생성하여 옮기도록 한다. Movie.js를 생성한다.
@src/Movie.js

    function Movie({ coverImg, title, rating, summary, genres }) {
        return (
            <div>
                <img src={coverImg} alt={title} />
                <h2>{title}</h2>
                <span>rating: {rating}</span>
                <p>{summary}</p>
                // genres를 리스트로 생성할때 값이 없는 리스트가 들어오면서 typeerror가 발생한다.
                // 그전에는 에러가 발생하지 않았다 (property에서 map을 한거여서 에러가 발생.)
                <ul>{genres && genres.map((g) => <li key={g}>{g}</li>)}</ul>
            </div>
        );
    }

property에 null 또는 undefinded 데이터를 보낼경우 에러. 해당 type은 property에 전송이 안된다.

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/No_properties>

component에 데이터를 보내준다.

    {movies.map((movie) => (
        <Movie
            key={movie.id}  // key는 react에서만 map안에서 component들을 render할 때 사용된다.
            coverImg={movie.medium_cover_image}
            title={movie.title}
            rating={movie.rating}
            summary={movie.summary}
            genres={movie.generes}
        />
    ))}

property의 type을 지정할 수 있다.
@Movie.js

    Movie.propType = {
        coverImg: propType.string.isRequired,
        title: propType.string.isRequired,
        rating: propType.number.isRequired,
        summary: propType.string.isRequired,
        genres: propType.arrayOf(propType.string),
    };

TypeScript props구현과 같은 기능인거 같다.

movie detail페이지를 구현한다.
react router로 페이지를 이동기능을 구현한다. 설치를 진행
<https://reactrouter.com/en/6.7.0/start/tutorial#setup>

    $ npm install react-router-dom

모든 컴포넌트를 페이지 별로 분리하겠다. routes 폴더를 생성하여 Home.js 파일을 생성한다. components폴더도 생성한다.
Movie.js파일을 components폴더로 이동한다. App.js파일의 return이후의 코드를 Home.js 파일에 옮겨준다.

detail.js파일을 생성하여 기본 hello world를 구현해준다.

App에서 router기능을 구현한다. router는 URL을 보는 컴포넌트이며 url에 따라 컴포넌트를 보여준다.

# ! 현재 react-router-dom 문법이 6버젼과 5버젼과 차이가 있다.

    6버젼에서 5버젼 코드를 사용하면 오류가 발생한다. 기존 문법을 버린듯 하다.
    이번 프로젝트 강의는 5버젼에서 이뤄졌기때문에 5버젼으로 다운그레이드하여 작업을 진행하였다.
    ! 6버젼도 화인 및 사용연습이 필요하다.
    6버젼 사용법은 지금 react-router-dom페이지를 확인해보자. nomadcoder 댓글 정보도 적극 활용하자.
    https://reactrouter.com/en/main/start/tutorial

    $ npm i react-router-dom@5.2.0
    기존에 설치가 되어있어도 다운그래이드하여 설치된다.

# react-router-dom 5버전 -> 버전6 바뀐 부분

    1. Switch컴포넌트가 Routes컴포넌트로 대체되었습니다.
    Switch -> Routes

    2. Route컴포넌트 사이에 자식 컴포넌트를 넣지 않고, element prop에 자식 컴포넌트를 할당하도록 바뀌었습니다.
    Route path="/" element={< Home / >}

## 7.5 React Router

5버젼 quick start
<https://v5.reactrouter.com/web/guides/quick-start>

기본구성을 구현한다.

    import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
    import Home from "./routes/Home";

    function App() {
        return (
            <Router>
                <Switch>  // route를 찾아서 컴포넌트를 랜더링해준다.
                    <Route path="/hello">
                        <h1>Hello</h1>
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );
    }

홈페이지에 화면이 나온다. Detail도 추가해준다.

이제 home에서 movie를 선택했을때 detail로 이동하는 link를 만들고 싶다.
html <a>를 사용하면 페이지가 재실행된다. html태그 대신 react에서 지원하는 Link 컴포넌트가 있다.

@components/Movie.js

    import { Link } from "react-router-dom";
    ...
        <h2>
            <Link to="/movie">{title}</Link>
        </h2>

## 7.6 Parameters

Link to를 통해 변수값을 파라미터롤 전송이 가능하다.

    ...
    <Route path={"/movie/:id"}>
    ...

router에 id쪽에 오는 값이 무엇인지 알고 싶다는 의미이다.

기존에 id를 property에 전달하지 않았다.
home에 매개변수에 id를 추가해주며 movie 인수에 추가해줘서 Link에 해당 id를 추가해준다.

@routes/Home

    ...
    <Movie
        id={movie.id}
        ...
    />
    ...

@components/Movie

    function Movie({ id, ... }) {
        ...
        <Link to={`movie/${id}`}>
        ...
    }

    Movie.propType = {
        id: propType.number.isRequired,
        ...
    }

브라우져에서 Link 클릭으로 페이지를 이동하면 router(URL)에 id가 추가되는 것을 확인 할 수 있다.

url에 있는 파라미터를 제공해주는 useParams 함수가 있다.
@Detail

    import { useParams } from "react-router-dom";

    ...
        const x = useParams();
        console.log(x);  // >>>: id: "48017". id는 변수명

해당 id로 데이터를 fetch하겠다.

    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        console.log(json);
    };
    useEffect(() => {
        getMovie();
    }, []);

# ! 강의에서는 에러가 발생하지 않지만 실제로 테스트를 해보면 에러가 발생한다.

    React Hook useEffect has a missing dependency: 'getMovie'. Either include it or
    remove the dependency array  react-hooks/exhaustive-deps

    경고가 발생합니다. 해당 에러는 강의 댓글에서 해결 방법들이 나와 있다. 다른 사용자는 에러로 분류되는건가 실행에는 문제가 없다.

<https://nomadcoders.co/react-for-beginners/lectures/3292>

    !! 나같은 경우에는 useParams변수를 중괄호를 치지않아서 발생한 오류이다.

        const { id } = useParams();  //  id -> { id }

detail화면을 구성한다. loadging기능 및 state를 구현한다.

## 7.7 Publishing

gh-pages를 설치한다. (이것도 설치해서 사용하는구나)

    $ npm i gh-pages

배포하기전에 package.json의 scripts를 확인한다.

    script: {
        ...
        "build": "react-scripts build",
        ...
    }
    ...

scripts의 build 스크립트를 실행하면 우리 웹사이트의 production ready code를 생성한다.
production ready란 코드가 압축되고 모든게 최적화된다는 의미이다.

    $ npm run build

build라는 폴더가 생성된다. 해당 폴더에 압축된 js파일들이 생성된다.(build/static/js/main.04bc97d5.js)
해당 파일을 github페이지에 push해야한다.

package.json 에 homepage를 추가해준다.

    ...
    "homepage": "https://ghbyeon2261.github.io/react"  // github에 있는 레퍼지토리 이름을 넣어줘야한다.

git에 원격 연결을 해준다.

    $ git remote -v

package.json 에 해당 페이지를 실행시켜줄 script를 추가해준다.

    script : {
        ...
        "deploy": "gh-pages build"
    }
    ...

먼저 build를 하고 난 다음에 deploy를 해야한다는것을 기억하고 싶지 않기때문에 predeploy 커멘드를 생성한다.??

    "predeploy": "npm run build"

이제 deploy커맨드를 실행하면 predeploy가 실행된 후 실행한다.

    $ npm run deploy

해당 페이지는 url로 이동하여 확인할 수 있다. 페이지가 올라오는데는 5분정도 시간이 걸린다.

# ! github repository에 여러 프로젝트가 있을경우 github-pages제대로 나올까

    지금 derectory구조가 이중이다.

    react / react-for-beginner-app
          / react-for-beginner

    github에는 react로 올라가 있으면 해당 폴더에 한개의 프로젝트만 있지도 않다.

    이때 github-page로 생성할 수 있는 방법은 어떤거일까?

    1. react-for-beginner-app으로 새로 repository를 생성한다.
        해당 방법은 react repository와 충돌이 발생할 것으로 예상됨.

    2. ...

    !! 레파지토리(Repository)의 하위 디렉토리를 다른 레파지토리로 분리할 수가 있다.

<https://ashortday.tistory.com/58>
