import About from "./components/About";
import Appointment from "./components/Appointment";
import Intro from "./components/Intro";
import MyNavbar from "./components/Navbar";
import SectionDivider from "./components/SectionDivider";
import Services from "./components/Services";

export default function Home() {
    return (
        <>
            <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75]"></div>
            <div className="bg-[#dbd7fd] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-20rem] lg:left-[-28rem] xl:left-[5rem] 2xl:left-[-50rem]"></div>  
            <MyNavbar />  
            <Intro />
            <SectionDivider />
            <About/>
            <SectionDivider />
            <Services/>
            <SectionDivider />
            <Appointment/>
        </>
    );
}