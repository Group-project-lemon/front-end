const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./config/db.js');
require('dotenv').config(); // 환경변수 dotenv모듈 사용

const app = express();
const PORT = 4000;

//뷰엔진 사용하기 위한 설정
// app.set('view engine', 'ejs');
// app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true })); // post 방식으로 데이터가 들어올때 json 형태로 데이터를 로드
app.use(express.static('public'));
app.use(
  session({
    secret: process.env.session_key, // secret 키 값들은 외부에 노출이 되면 보안 상 문제가 발생할 수 있다.
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  }),
);

//cors문제 해결
const cors = require('cors'); // CORS 미들웨어 추가
app.use(
  cors({
    origin: 'http://localhost:3000', // 허용할 도메인을 여기에 지정
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  }),
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 클라이언트 도메인
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
//
app.use((req, res, next) => {
  res.locals.email = '';
  res.locals.password = '';

  if (req.session.member) {
    res.locals.user_id = req.session.user.email;
    res.locals.name = req.session.user.password;
  }
  next();
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    // 이메일 또는 비밀번호가 누락된 경우
    console.log('이메일 또는 비밀번호가 누락');
    return res.send('이메일 또는 비밀번호가 누락');
  }

  var sql = `select * from user where email=? and password=?`;
  var values = [email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.logr('데이터베이스 오류');
      return res.send('데이터베이스 오류');
    }
    if (result.length === 0) {
      // 로그인 실패: 사용자가 없음
      console.log('사용자가 없음');
      return res.send('사용자가 없음');
    } else {
      // 로그인 성공: 사용자 정보를 세션에 저장
      console.log('로그인 성공');
      console.log(result);
      const user = {
        id: result[0].id, // 새로 생성된 사용자 ID
        email: email,
        password: password,
      };
      req.session.user = user;
      console.log(req.session.user);
      return res.json({
        user: user,
        success: '로그인 성공',
      });
    }
  });
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    // 이메일 또는 비밀번호가 누락된 경우
    console.log('이메일 또는 비밀번호가 누락');
    return res.send('이메일 또는 비밀번호가 누락');
  }

  var sql = 'INSERT INTO ICT_TEAM.user(email, password) VALUES(?, ?)';
  var values = [email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.logr('데이터베이스 오류');
      return res.send('데이터베이스 오류');
    } else {
      // 로그인 성공: 사용자 정보를 세션에 저장
      console.log('로그인 성공');
      console.log(result);
      const user = {
        id: result.insertId, // 새로 생성된 사용자 ID
        email: email,
        password: password,
      };
      req.session.user = user;
      console.log(req.session.user);
      return res.json({
        user: user,
        success: '로그인 성공',
      });
    }
  });
});

// 모든 상품 #all
app.get('/shopall', (req, res) => {
  //res.send(dummyData)
  console.log('root');
  db.query('SELECT * FROM ICT_TEAM.items', (err, data) => {
    if (!err) {
      console.log(data);
      res.json(data); //응답을 클라이언트에 보낸다.
    } else {
      console.log(err);
    }
  });
});

// 카테고리별 상품 localhost:4000/products/bag
app.get('/products/:productID', (req, res) => {
  const category = req.params.productID; // 요청 URL에서 productID를 가져옵니다.
  db.query(
    'SELECT * FROM ICT_TEAM.items WHERE category = ?',
    [category],
    (err1, data1) => {
      if (!err1) {
        console.log(data1);
        res.json(data1); // 클라이언트에 응답을 보냅니다.
      } else {
        console.log(err1);
        res
          .status(500)
          .send('데이터베이스에서 정보를 가져오는 동안 오류가 발생했습니다.'); // 에러 응답을 보냅니다.
      }
    },
  );
});

// goods 제품상세 페이지 localhost:4000/goods/1
app.get('/goods/:goodID', (req, res) => {
  const good = req.params.goodID; // 요청 URL에서 goodID를 가져옵니다.
  db.query(
    'SELECT * FROM ICT_TEAM.items WHERE id = ?',
    [good],
    (err2, data2) => {
      if (!err2) {
        console.log(data2);
        res.send(data2); // 클라이언트에 응답을 보냅니다.
      } else {
        console.log(err2);
        res
          .status(500)
          .send('데이터베이스에서 정보를 가져오는 동안 오류가 발생했습니다.'); // 에러 응답을 보냅니다.
      }
    },
  );
});

// 상세페이지에서 장바구니 담기 localhost:4000/goods/1
app.post('/goods/:productID', (req, res) => {
  console.log('root');
  db.query(
    'INSERT INTO ICT_TEAM.cart(id, user_id, quantitiy, items_id) VALUES(?, ?, ?, ?)',
    (err3, data3) => {
      if (!err3) {
        console.log(data3);
        res.send(data3); //응답을 클라이언트에 보낸다.
      } else {
        console.log(err3);
      }
    },
  );
});

//cart 장바구니 페이지
//상세페이지에 담았던 정보 가져오기
app.get('/cart', (req, res) => {
  console.log('root');
  db.query('SELECT * FROM ICT_TEAM.items.cart = ?', (err4, data4) => {
    if (!err4) {
      console.log(data4);
      res.send(data4); //응답을 클라이언트에 보낸다.
    } else {
      console.log(err4);
    }
  });
});

// 결제페이지로 정보 가져가기
app.post('/cart', (req, res) => {
  console.log('root');
  db.query(
    'INSERT INTO ICT_TEAM.orders_detail(id, orders_id, items_id, quantity, unit_price, total_price) VALUES(?, ?, ?, ?, ?, ?)',
    (err5, data5) => {
      if (!err5) {
        console.log(data5);
        res.send(data5); //응답을 클라이언트에 보낸다.
      } else {
        console.log(err5);
      }
    },
  );
});

//delivery 주문페이지
// 주문할 물건 정보 가져오기
app.get('/delivery', (req, res) => {
  console.log('root');
  db.query('SELECT * FROM ICT_TEAM.orders_detail = ?', (err6, data6) => {
    if (!err6) {
      console.log(data6);
      res.send(data6); //응답을 클라이언트에 보낸다.
    } else {
      console.log(err6);
    }
  });
});

// 배송정보입력 후 주문완료
app.post('/delivery', (req, res) => {
  console.log('root');
  db.query(
    'INSERT INTO ICT_TEAM.delivery(id, fullname, address, phone, request) VALUES(?, ?, ?, ?, ?)',
    (err7, data7) => {
      if (!err7) {
        console.log(data7);
        res.send(data7); //응답을 클라이언트에 보낸다.
      } else {
        console.log(err7);
      }
    },
  );
});

//order 주문목록 조회
app.get('/order', (req, res) => {
  console.log('root');
  db.query('SELECT * FROM ICT_TEAM.delivery = ?', (err, data) => {
    if (!err) {
      console.log(data);
      res.send(data); //응답을 클라이언트에 보낸다.
    } else {
      console.log(err);
    }
  });
});

// 주문취소 쿼리문 조건에 유저 정보 확인이 필요
app.post('/cancel', (req, res) => {
  console.log('root');
  db.query(
    'DELETE * FROM ICT_TEAM.delivery WHERE order_status = Processing',
    (err, data) => {
      if (!err) {
        console.log(data);
        res.send(data); //응답을 클라이언트에 보낸다.
      } else {
        console.log(err);
      }
    },
  );
});

// 포트접속
app.listen(PORT, () => {
  console.log(`Server run : Server:${PORT}/ Start`);
});
