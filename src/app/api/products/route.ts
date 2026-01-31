import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Parse the request body
    const body = await request.json();

    // Validate required fields
    const { name, fabric, color, price, stock } = body;

    if (!name || !fabric || !color || !price || !stock) {
      return NextResponse.json(
        { error: 'Missing required fields: name, fabric, color, price, stock' },
        { status: 400 }
      );
    }

    // Extract hashtags from description for tags
    const tags = body.description
      ? body.description.match(/#\w+/g)?.map((tag: string) => tag.slice(1).toLowerCase()) || []
      : [];

    // Create new product
    const product = new Product({
      name: name.trim(),
      fabric: fabric.trim(),
      color: color.trim(),
      price: price.trim(),
      stock: stock.trim(),
      shipping: body.shipping || 'All India',
      description: body.description || '',
      images: body.images || [],
      tags,
    });

    // Save to database
    const savedProduct = await product.save();

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: savedProduct,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);

    // Handle duplicate key error (MongoDB error code 11000)
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};

    // Filter by tags if provided
    const tags = searchParams.get('tags');
    if (tags) {
      query.tags = { $in: tags.split(',').map(tag => tag.trim().toLowerCase()) };
    }

    // Search by name or description
    const search = searchParams.get('search');
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Get products
    const products = await Product
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count
    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
