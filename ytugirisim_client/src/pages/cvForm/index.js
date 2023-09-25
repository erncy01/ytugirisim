import Layout from "@/hoc/Layout.jsx";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    return (
        <Layout>
			<center><iframe src="https://forms.monday.com/forms/embed/2766918b5f10d994028cb7e4f4046e63?r=euc1" 
				width="650" height="300" 
				style={{ color: 'blue', lineHeight : 10, padding: 20 ,display: 'inline',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
			</iframe></center>
		</Layout>
    );
}
