import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Mengambil semua data promo
export async function GET() {
  try {
    const promos = await prisma.promo.findMany({
      include: {
        mainProduct: true,   
        secondProduct: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(promos, { status: 200 });
  } catch (error) {
    console.error("Error fetching promos:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data promo" },
      { status: 500 }
    );
  }
}

// POST: Membuat promo bundle baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mainProductId, secondProductId, promoPrice, description } = body;

    // VALIDASI KETAT: Pastikan ID ada dan merupakan angka
    if (!mainProductId || !secondProductId || !promoPrice) {
      return NextResponse.json(
        { error: "ID Produk Utama, Produk Kedua, dan Harga Promo wajib diisi!" },
        { status: 400 }
      );
    }

    const newPromo = await prisma.promo.create({
      data: {
        promoPrice: parseFloat(promoPrice),
        description: description || "",
        isActive: true,
        // Gunakan connect untuk relasi yang lebih aman di Prisma
        mainProduct: {
          connect: { id: Number(mainProductId) }
        },
        secondProduct: {
          connect: { id: Number(secondProductId) }
        }
      },
      include: {
        mainProduct: true,
        secondProduct: true,
      }
    });

    return NextResponse.json(
      { message: "Promo berhasil dibuat", data: newPromo },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating promo:", error);
    // Jika error karena ID produk tidak ditemukan di database
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Salah satu produk tidak ditemukan di database" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Gagal membuat promo: " + error.message },
      { status: 500 }
    );
  }
}

// PATCH: Memperbarui data promo bundle
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, mainProductId, secondProductId, promoPrice, description, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "ID Promo wajib diisi untuk update" }, { status: 400 });
    }

    const updatedPromo = await prisma.promo.update({
      where: { id: Number(id) },
      data: {
        // Gunakan update jika ID produk dikirim, jika tidak biarkan data lama
        ...(mainProductId && {
          mainProduct: { connect: { id: Number(mainProductId) } }
        }),
        ...(secondProductId && {
          secondProduct: { connect: { id: Number(secondProductId) } }
        }),
        ...(promoPrice !== undefined && { promoPrice: parseFloat(promoPrice) }),
        ...(description !== undefined && { description: description }),
        ...(isActive !== undefined && { isActive: isActive }),
      },
      include: {
        mainProduct: true,
        secondProduct: true,
      }
    });

    return NextResponse.json(
      { message: "Promo berhasil diperbarui", data: updatedPromo },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating promo:", error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Data promo atau produk tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Gagal memperbarui promo: " + error.message },
      { status: 500 }
    );
  }
}

// DELETE: Untuk menghapus promo (Opsional)
export async function DELETE(req: NextRequest) {
  try {
    // Ambil ID dari body JSON, bukan dari searchParams
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID promo diperlukan" }, { status: 400 });
    }

    await prisma.promo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Promo berhasil dihapus" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting promo:", error);
    return NextResponse.json({ error: "Gagal menghapus promo" }, { status: 500 });
  }
}