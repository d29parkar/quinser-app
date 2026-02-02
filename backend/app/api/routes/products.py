from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.schemas.submission import MessageResponse
from app.core.security import get_current_admin

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=List[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    """Get all products (public)."""
    products = db.query(Product).order_by(Product.id.asc()).all()
    return products


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get single product by ID (public)."""
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Product not found"}
        )

    return product


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Create a new product (protected)."""
    if not product_data.name or not product_data.category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"error": "Name and category are required"}
        )

    product = Product(
        name=product_data.name,
        category=product_data.category,
        description=product_data.description or ""
    )

    db.add(product)
    db.flush()
    db.refresh(product)

    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product_data: ProductUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Update a product (protected)."""
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Product not found"}
        )

    # Update fields if provided
    if product_data.name is not None:
        product.name = product_data.name
    if product_data.category is not None:
        product.category = product_data.category
    if product_data.description is not None:
        product.description = product_data.description

    db.flush()
    db.refresh(product)

    return product


@router.delete("/{product_id}", response_model=MessageResponse)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_admin)
):
    """Delete a product (protected)."""
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": "Product not found"}
        )

    db.delete(product)

    return MessageResponse(message="Product deleted successfully")
