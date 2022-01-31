# Today I Learned

--------------------------

## 계획서
+ 회원가입, 로그인 
+ 게시글 목록 조회
+ 게시글 등록
+ 게시글 상세 보기(클릭시)
+ 게시글 수정
+ 게시글 삭제
+ 로그아웃

--------------------------

### SPA - Single Page Application

react-route-dom 을 이용하여 뷰 랜더링을 통해 웹을 구성한다. 

+ 기본 라우트 설정 - > Route exact path = "/" component = {Home}/
와 같다. localhost:3000/ 의 위치에 component Home을 위치시켰다고 생각하면 된다.

만약 위처럼 위치시킨 곳으로 이동하려면
a href = ~ -> 이런식으로 홈페이지를 구성할 경우 페이지가 계속 새로고침이 되어서 옳지 않다. 
Link or NavLink를 통해 새로고침을 막아주고, 원하는 뷰로 화면을 이동시켜준다.

--------------------------

### NavLink와 Link의 차이점

비슷하지만 NavLink는 특정 스타일 혹은 클래스를 지정가능하다.    

--------------------------

### react-bootstrap 을 이용한 부분

부트스트랩을 이용하여 css을 조금 더 보기 좋게 하였다.
Form, Button, Table 을 이용

--------------------------

### 생각을 필요로 했던 부분

BoardForm.js 에서 react-bootstrap에서 가져온 
Table 형식으로 서버에서 받은 리스트를 하나씩 보여줘야 했기에
getBoardList function에서 서버에 파라미터를 보내서 list를 받아오고
받아온 리스트를 map 함수를 이용해서 변수에 따로 만든 클래스(BoardRow)
형식으로 createdAt 과 title값을 보여줄수 있게 넣어준다.
넣어주게 되면 BoardRow 컴포넌트에서는 this.props.값을 이용하여 
받은 값들을 이용하여 뷰를 Table 형식으로 보여줄 수 있게 된다.

--------------------------