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
