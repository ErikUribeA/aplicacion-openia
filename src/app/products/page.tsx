
'use client'
import React, { useState, useEffect } from 'react';

interface products {
    id: number;
    name: string;
    image: string;
    price: number;
}

export default function Products() {
    const [products, setProducts] = useState([]); // Inicializamos como un arreglo vacío
    const [loading, setLoading] = useState(true); // Estado para indicar que se están cargando los datos

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products'); // Asegúrate de que la ruta sea correcta
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data); // Guardamos los productos obtenidos en el estado
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // Detenemos el estado de carga
        }
    };

    // useEffect para realizar la llamada a la API al montar el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Mostramos un mensaje mientras se cargan los datos
    }

    return (
        <div>
            <h1>Lista de Productos</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product: products) => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <img src={product.image} alt={product.name} style={{ width: '150px' }} />
                            <p>Precio: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
}
