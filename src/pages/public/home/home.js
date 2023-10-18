import Header from '../../../layout/user/header/header'
import Footer from '../../../layout/user/footer/footer'

function Home({child}){
    return(
        <div>
            <Header/>
            <div className='contents'>
                ${child}
            </div>
            <Footer/>
        </div>
    );
}

export default Home;
