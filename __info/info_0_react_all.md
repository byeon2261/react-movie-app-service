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
