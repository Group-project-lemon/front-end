import CartList from '../components/CartList';
import MainBar from '../components/MainBar';
import Footer from '../components/Footer';

//data는 app.js에서 받아온 db 자료이다.
function App(data) {
  console.log(data);
  return (
    <>
      <MainBar />
      <CartList />
      <Footer />
    </>
  );
}
export default App;
