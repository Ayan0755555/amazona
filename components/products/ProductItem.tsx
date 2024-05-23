import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Product {
  slug: string;
  image: string;
  name: string;
  brand: string;
  price: number;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="card bg-base-300 shadow-xl mb-4">
      <figure>
        <Link href={`/product/${product.slug}`}>
          <p>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover h-64 w-full"
            />
          </p>
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <p>
            <h2 className="card-title font-normal">{product.name}</h2>
          </p>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-2xl">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
