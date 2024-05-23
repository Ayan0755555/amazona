import data from '@/lib/data';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';
import UserModel from '@/lib/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const { users, products } = data;

    // Connect to the database
    await dbConnect();

    // Seed Users
    console.log('Deleting existing users...');
    await UserModel.deleteMany();
    console.log('Inserting new users...');
    await UserModel.insertMany(users);

    // Seed Products
    console.log('Deleting existing products...');
    await ProductModel.deleteMany();

    // Remove duplicate products by 'slug'
    const uniqueProductsMap = new Map();
    for (const product of products) {
      uniqueProductsMap.set(product.slug, product);
    }
    const uniqueProducts = Array.from(uniqueProductsMap.values());

    console.log('Inserting new products...');
    await ProductModel.insertMany(uniqueProducts);

    console.log('Seeding completed successfully.');

    return NextResponse.json({
      message: 'seeded successfully',
      users,
      products: uniqueProducts,
    });
  } catch (error:any) {
    console.error('Error during seeding:', error);
    return NextResponse.json({
      message: 'Internal Server Error',
      error: error.message,
    }, {
      status: 500,
    });
  }
};
