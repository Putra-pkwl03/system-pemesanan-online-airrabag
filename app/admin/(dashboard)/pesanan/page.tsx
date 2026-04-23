import OrderStats from "../../../components/admin/dashboard/pesanan/OrderStats";
import OrderCard from "../../../components/admin/dashboard/pesanan/OrderCard";
// import OrderPagination from "../../../components/admin/dashboard/pesanan/OrderPagination";

const orders = [
  { id: 1, name: "Premium Monstera Leaf", price: "450.000", customer: "Budi Santoso", date: "12 OKT 2026", image: "/monstera.jpg" },
  { id: 2, name: "Arbequina Olive Tree", price: "1.250.000", customer: "Siti Aminah", date: "12 OKT 2026", image: "/olive.jpg" },
  { id: 3, name: "Fiddle Leaf Fig L", price: "890.000", customer: "Rahmat Hidayat", date: "12 OKT 2026", image: "/fiddle.jpg" },
  { id: 4, name: "Sansevieria Zeylanica", price: "225.000", customer: "Dewi Lestari", date: "11 OKT 2026", image: "/snakeplant.jpg" },
  { id: 5, name: "Artisan Terrarium Kit", price: "580.000", customer: "Andi Wijaya", date: "11 OKT 2026", image: "/terrarium.jpg" },
];

export default function PesananPage() {
  return (
     <section>
    
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-900">Pesanan</h1>
        <p className="text-gray-400 text-sm">Kelola pesanan masuk.</p>
      </div>

      <OrderStats />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} />
        ))}
    
      </div>
{/* 
      <OrderPagination /> */}
    
    </section>
  );
}