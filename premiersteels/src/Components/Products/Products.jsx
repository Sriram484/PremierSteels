import React, { useDebugValue, useEffect, useState } from 'react'
import "../Home/Home.css"
import ProductButton from './Product-Buttons'
import ProductTable from './ProductTable'
import ProductTable1 from './ProductTable1'
const Products = ({ options, categoryData }) => {
    const [selectOption, setSelectedOption] = useState(options[0] || '');
    const [userTypingData, setUserTypingData] = useState('');
    const [products, setProducts] = useState([]);


    useEffect(() => {
        if (categoryData && categoryData.length > 0) {
            let extractedOptions = [];

            categoryData.forEach(category => {
                if (category.id === selectOption) {
                    Object.keys(category).forEach(key => {
                        if (key !== 'id') {
                            const diameterObject = {
                                categoryType: category.id,
                                diameter: key,
                                ...category[key]
                            };
                            extractedOptions.push(diameterObject);
                        }
                    });
                }
            });

            setProducts(extractedOptions);
        }
    }, [selectOption]);
    useEffect(() => {
        console.log(products);
    }, [products])

    return (
        <div className='Product-MainBody hidden'>
            <div className='Product-Heading hidden'>
                <h1>
                    Our Products

                </h1>
            </div>

            <div className='Product-Buttons'>
                <ProductButton userTypingData={userTypingData} setUserTypingData={setUserTypingData} selectOption={selectOption} setSelectedOption={setSelectedOption}
                    options={options} />
            </div>
            <ProductTable1 userTypingData={userTypingData} products={products} />
            {/* <ProductTable userTypingData={userTypingData} products={products}/> */}

        </div>
    )
}

export default Products
