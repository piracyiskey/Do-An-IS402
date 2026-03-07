// src/components/CardSection.jsx
import React from "react";
import Card from "./Card"; 

export default function CardSection({ sectionTitle, data }) {
    // Nếu data chưa kịp về (loading), có thể hiện một khung trống hoặc null
    if (!data) return null; 
    return (
        <section className="bg-white py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-12 uppercase tracking-tighter">
                    {sectionTitle}
                </h2>
            </div>
            
            <div className="w-full">
                <div className="mx-auto px-4 flex flex-wrap justify-center gap-10">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((product) => (
                            <Card
                                key={product.product_id}
                                productId={product.product_id}
                                title={product.product_name}
                                // Theo API của bạn, image_url là "/images/products/..."
                                imageSrc={product.image_url} 
                                className="w-[380px] flex-shrink-0"
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 italic">No products found in this category.</p>
                    )}
                </div>
            </div>
        </section>
    );
}