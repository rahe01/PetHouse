import About from "../components/Home/Home/AvoutUs/About";
import CallToAction from "../components/Home/Home/CallToAction/CallToAction";
import Categories from "../components/Home/Home/Categories/Categories";
import Slider from "../components/Home/Home/Slider/Slider";
import Team from "../components/Home/Home/Team/Team";


const SecondLay = () => {
    return (
        <div className="container mx-auto">
            <Slider></Slider>
            <Categories></Categories>
            <CallToAction></CallToAction>
            <About></About>
            <Team></Team>
        </div>
    );
};

export default SecondLay;