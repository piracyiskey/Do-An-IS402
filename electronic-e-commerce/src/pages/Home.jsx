import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Home_Phone from "../components/Home_Phone.jsx";
import CardSection from "../components/CardSection.jsx";
import RecommendedCardSection from "../components/RecommendedCardSection.jsx";
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
function Home() {
    const [mobiles, setMobiles] = useState([]);
    const [tvs, setTvs] = useState([]);
    const [computing, setComputing] = useState([]);
    const [loading, setLoading] = useState(true);

    
    // Link đúng của bạn: http://localhost:8000/images/products/1.webp
    const IMAGE_PATH = `/images/products`;

    useEffect(() => {
        const fetchHomeProducts = async () => {
            try {
                const params = { limit: 4 };
                const [resMobile, resTv, resComp] = await Promise.all([
                    axios.get(`${BASE_URL}/mobile/galaxy-smartphone`, { params }), 
                    axios.get(`${BASE_URL}/tv-av/premium-flagship-tvs`, { params }), 
                    axios.get(`${BASE_URL}/computing-displays/galaxy-book-laptop`, { params })
                ]);
                setMobiles(Array.isArray(resMobile.data) ? resMobile.data : []);
                setTvs(Array.isArray(resTv.data) ? resTv.data : []);
                setComputing(Array.isArray(resComp.data) ? resComp.data : []);
                
            } catch (error) {
                console.error("Lỗi fetch dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeProducts();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar isTransparent={true} />
            
            <main className="flex-grow overflow-x-hidden">
                {/* Ảnh Hero - Kiểm tra xem file này tên là hero-main.jpg hay hero-main.webp */}
                <HeroSection 
                    bgImage={`${IMAGE_PATH}/hero-main.jpg`} 
                    title="Galaxy Z Fold7" 
                    subTitle="Galaxy AI ✨"
                />
                
                {loading ? (
                    <div className="py-32 flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-black text-black">Galaxy Loading...</p>
                    </div>
                ) : (
                    <>
                        <Home_Phone
                          bgImage={`${IMAGE_PATH}/galaxy-z-fold7-features-kv.jpg`} // Đúng link bạn đưa
                          title=""
                          subTitle=""
                        />
                        <CardSection sectionTitle="Mobile Galaxy" data={mobiles} />
                
                        <CardSection sectionTitle="Smart TV & Audio" data={tvs} />

                        <CardSection sectionTitle="Computing & Displays" data={computing} />
                    </>
                )}
                <RecommendedCardSection />
            </main>
            <Footer />
        </div>
    );
}
export default Home;